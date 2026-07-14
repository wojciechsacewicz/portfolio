import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(projectRoot, 'dist');
const content = JSON.parse(
  await readFile(path.join(projectRoot, 'src/content/portfolioContent.json'), 'utf8'),
);
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');

const personId = `${content.siteUrl}/#wojciech-sacewicz`;
const websiteId = `${content.siteUrl}/#website`;
const indexedRoutes = [
  '/',
  '/resume',
  ...content.caseStudies.map((study) => `/case-studies/${study.slug}`),
  '/contact',
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function canonicalUrl(routePath) {
  return routePath === '/' ? `${content.siteUrl}/` : `${content.siteUrl}${routePath}`;
}

function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${content.siteUrl}/`,
    name: `${content.person.name} — Portfolio`,
    description: content.person.summary,
    inLanguage: 'en',
  };
}

function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: content.person.name,
    alternateName: content.person.alternateName,
    url: `${content.siteUrl}/`,
    image: `${content.siteUrl}/assets/wojtek-profile.png`,
    jobTitle: content.person.currentJobTitle,
    description: content.person.summary,
    email: content.person.links.email.replace('mailto:', ''),
    workLocation: {
      '@type': 'Place',
      name: 'Tricity metropolitan area',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Pomeranian Voivodeship',
        addressCountry: 'PL',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'IDEGO',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Gdańsk',
    },
    knowsLanguage: ['Polish', 'English'],
    knowsAbout: content.person.knowsAbout,
    sameAs: [content.person.links.github, content.person.links.linkedin],
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function homepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${content.siteUrl}/#profile`,
        url: `${content.siteUrl}/`,
        name: `${content.person.name} — ${content.person.headline}`,
        description: content.person.summary,
        dateModified: content.lastModified,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
      },
      personSchema(),
      {
        '@type': 'ItemList',
        name: `${content.person.name} case studies`,
        itemListElement: content.caseStudies.map((study, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${content.siteUrl}/case-studies/${study.slug}`,
          name: study.title,
        })),
      },
    ],
  };
}

function resumeSchema() {
  const url = `${content.siteUrl}/resume`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      personSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: `${content.person.name} — Structured Resume`,
        description: content.person.fit,
        dateModified: content.lastModified,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        ...breadcrumbSchema([
          { name: 'Portfolio', url: `${content.siteUrl}/` },
          { name: 'Resume', url },
        ]),
        '@id': `${url}#breadcrumb`,
      },
    ],
  };
}

function caseStudyEntity(study) {
  if (study.entityType === 'SoftwareApplication') {
    return {
      '@type': 'SoftwareApplication',
      '@id': `${study.liveUrl}#software`,
      name: study.shortTitle,
      url: study.liveUrl,
      description: study.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    };
  }

  if (study.entityType === 'WebSite') {
    return {
      '@type': 'WebSite',
      '@id': `${study.liveUrl}#website`,
      name: study.shortTitle,
      url: study.liveUrl,
      description: study.description,
      inLanguage: 'pl',
    };
  }

  return undefined;
}

function caseStudySchema(study) {
  const url = `${content.siteUrl}/case-studies/${study.slug}`;
  const entity = caseStudyEntity(study);
  const article = {
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: study.title,
    description: study.description,
    datePublished: study.datePublished,
    dateModified: study.dateModified,
    inLanguage: 'en',
    author: { '@id': personId },
    isPartOf: { '@id': websiteId },
    mainEntityOfPage: url,
    breadcrumb: { '@id': `${url}#breadcrumb` },
    about: [
      ...study.technologies.map((technology) => ({
        '@type': 'Thing',
        name: technology,
      })),
      ...(entity ? [{ '@id': entity['@id'] }] : []),
    ],
  };

  if (study.image) {
    article.image = study.image;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      personSchema(),
      article,
      {
        ...breadcrumbSchema([
          { name: 'Portfolio', url: `${content.siteUrl}/` },
          { name: 'Case studies', url: `${content.siteUrl}/resume` },
          { name: study.shortTitle, url },
        ]),
        '@id': `${url}#breadcrumb`,
      },
      ...(entity ? [entity] : []),
    ],
  };
}

function contactSchema() {
  const url = `${content.siteUrl}/contact`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
      personSchema(),
      {
        '@type': 'ContactPage',
        '@id': `${url}#page`,
        url,
        name: `Contact ${content.person.name}`,
        description: `Contact ${content.person.name} for AI-native product engineering, React, TypeScript, Cloudflare, internal tools and workflow automation.`,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        ...breadcrumbSchema([
          { name: 'Portfolio', url: `${content.siteUrl}/` },
          { name: 'Contact', url },
        ]),
        '@id': `${url}#breadcrumb`,
      },
    ],
  };
}

function routeDefinition(routePath) {
  if (routePath === '/') {
    return {
      title: 'Wojciech Sacewicz — AI-Native Developer | Tricity, Poland',
      description: content.person.summary,
      type: 'profile',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      canonical: canonicalUrl(routePath),
      image: `${content.siteUrl}/assets/wojtek-profile.png`,
      schema: homepageSchema(),
    };
  }

  if (routePath === '/resume') {
    return {
      title: 'Wojciech Sacewicz Resume — AI-Native Developer | Tricity, Poland',
      description: `${content.person.name} is an AI-native developer and product engineer in Tricity, Poland, working with React, TypeScript, Cloudflare, coding agents and automation.`,
      type: 'profile',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1',
      canonical: canonicalUrl(routePath),
      image: `${content.siteUrl}/assets/wojtek-profile.png`,
      schema: resumeSchema(),
    };
  }

  if (routePath === '/contact') {
    return {
      title: 'Contact Wojciech Sacewicz — AI-Native Developer',
      description: `Contact ${content.person.name} for AI-native product engineering, React, TypeScript, Cloudflare, internal tools and workflow automation.`,
      type: 'profile',
      robots: 'index, follow',
      canonical: canonicalUrl(routePath),
      image: `${content.siteUrl}/assets/wojtek-profile.png`,
      schema: contactSchema(),
    };
  }

  const study = content.caseStudies.find(
    (candidate) => routePath === `/case-studies/${candidate.slug}`,
  );

  if (study) {
    return {
      title: `${study.title} | Wojciech Sacewicz`,
      description: study.description,
      type: 'article',
      robots: 'index, follow, max-image-preview:large, max-snippet:-1',
      canonical: canonicalUrl(routePath),
      image: study.image || `${content.siteUrl}/assets/wojtek-profile.png`,
      schema: caseStudySchema(study),
    };
  }

  return {
    title: 'Page not found | Wojciech Sacewicz',
    description: 'The requested portfolio page does not exist.',
    type: 'website',
    robots: 'noindex, nofollow',
    canonical: null,
    image: `${content.siteUrl}/assets/wojtek-profile.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page not found',
      isPartOf: { '@id': websiteId },
    },
  };
}

function replaceMeta(document, attributeName, attributeValue, value) {
  const expression = new RegExp(
    `<meta[^>]+${attributeName}=["']${attributeValue}["'][^>]*>`,
    'i',
  );
  return document.replace(
    expression,
    `<meta ${attributeName}="${escapeHtml(attributeValue)}" content="${escapeHtml(value)}" />`,
  );
}

function renderDocument(markup, definition) {
  let document = template;
  document = document.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(definition.title)}</title>`,
  );
  document = replaceMeta(document, 'name', 'description', definition.description);
  document = replaceMeta(document, 'name', 'robots', definition.robots);
  document = replaceMeta(document, 'property', 'og:title', definition.title);
  document = replaceMeta(document, 'property', 'og:description', definition.description);
  document = replaceMeta(document, 'property', 'og:type', definition.type);
  document = replaceMeta(
    document,
    'property',
    'og:url',
    definition.canonical ?? `${content.siteUrl}/`,
  );
  document = replaceMeta(document, 'property', 'og:image', definition.image);
  document = replaceMeta(document, 'name', 'twitter:title', definition.title);
  document = replaceMeta(document, 'name', 'twitter:description', definition.description);
  document = replaceMeta(document, 'name', 'twitter:image', definition.image);

  if (definition.canonical) {
    document = document.replace(
      /<link[^>]+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeHtml(definition.canonical)}" />`,
    );
  } else {
    document = document.replace(/\s*<link[^>]+rel=["']canonical["'][^>]*>/i, '');
  }

  document = document.replace(
    /<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="structured-data">${JSON.stringify(definition.schema)}</script>`,
  );
  document = document.replace(
    /<div id="root" data-render-mode="fallback">[\s\S]*?<\/div>/i,
    `<div id="root" data-render-mode="ssr">${markup}</div>`,
  );
  document = document.replace(/\s*<style id="static-fallback-style">[\s\S]*?<\/style>/i, '');
  return document;
}

async function writeRoute(routePath, markup, definition) {
  const targetDirectory = routePath === '/'
    ? distDirectory
    : path.join(distDirectory, routePath.slice(1));
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(
    path.join(targetDirectory, 'index.html'),
    renderDocument(markup, definition),
    'utf8',
  );
}

const vite = await createServer({
  root: projectRoot,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const serverEntry = await vite.ssrLoadModule('/src/entry-server.tsx');

  for (const routePath of indexedRoutes) {
    await writeRoute(
      routePath,
      serverEntry.render(routePath),
      routeDefinition(routePath),
    );
  }

  await writeFile(
    path.join(distDirectory, '404.html'),
    renderDocument(serverEntry.render('/404'), routeDefinition('/404')),
    'utf8',
  );
} finally {
  await vite.close();
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedRoutes
  .map(
    (routePath) => `  <url>
    <loc>${escapeHtml(canonicalUrl(routePath))}</loc>
    <lastmod>${content.lastModified}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${content.siteUrl}/sitemap.xml
`;
await writeFile(path.join(distDirectory, 'robots.txt'), robots, 'utf8');

const redirects = `/404 / 302
/404.html / 302
`;
await writeFile(path.join(distDirectory, '_redirects'), redirects, 'utf8');

const llmsSummary = `# ${content.person.name}

> ${content.person.summary}

- Professional location: ${content.person.location}
- Availability: ${content.person.availability}
- Current formal title: ${content.person.currentJobTitle}
- Professional profile: ${content.person.headline}
- Best fit: ${content.person.fit}
- Resume: ${content.siteUrl}/resume
- GitHub: ${content.person.links.github}
- LinkedIn: ${content.person.links.linkedin}

## Case studies
${content.caseStudies
  .map(
    (study) =>
      `- [${study.title}](${content.siteUrl}/case-studies/${study.slug}): ${study.outcome}`,
  )
  .join('\n')}

## Core capabilities
${content.capabilityGroups
  .map((group) => `- ${group.title}: ${group.items.join(', ')}`)
  .join('\n')}
`;
await writeFile(path.join(distDirectory, 'llms.txt'), llmsSummary, 'utf8');

const llmsFull = `${llmsSummary}
## Role matches
${content.roleMatches.map((role) => `- ${role}`).join('\n')}

## Experience
${content.experience
  .map((entry) => `- ${entry.period}: ${entry.role}, ${entry.company}. ${entry.summary}`)
  .join('\n')}

## Case-study evidence and limitations
${content.caseStudies
  .map(
    (study) => `### ${study.title}
${study.description}

Outcome: ${study.outcome}

Measurement: ${study.measurement}

Limitations: ${study.limitations}

Evidence:
${study.evidence.map((item) => `- ${item.label}: ${item.url}`).join('\n')}`,
  )
  .join('\n\n')}
`;
await writeFile(path.join(distDirectory, 'llms-full.txt'), llmsFull, 'utf8');

console.log(
  `Server-rendered ${indexedRoutes.length} indexable routes plus a noindex 404, sitemap, robots and discovery files.`,
);
