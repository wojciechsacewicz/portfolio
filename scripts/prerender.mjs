import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const distDirectory = path.join(projectRoot, 'dist');
const profile = JSON.parse(
  await readFile(path.join(projectRoot, 'src/content/seoProfile.json'), 'utf8'),
);
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');

const personId = `${profile.siteUrl}/#wojciech-sacewicz`;
const profileId = `${profile.siteUrl}/#profile`;
const capabilities = profile.capabilityGroups.flatMap((group) => group.items);
const indexedRoutes = [
  '/',
  '/resume',
  ...profile.caseStudies.map((study) => `/case-studies/${study.slug}`),
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

function escapeAttribute(value) {
  return escapeHtml(value);
}

function canonicalUrl(routePath) {
  return routePath === '/' ? `${profile.siteUrl}/` : `${profile.siteUrl}${routePath}`;
}

function renderTags(items) {
  return `<ul class="seo-tags">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderNavigation() {
  return `<nav aria-label="Portfolio pages">
    <a href="/">Portfolio</a>
    <a href="/resume">Structured resume</a>
    ${profile.caseStudies
      .map((study) => `<a href="/case-studies/${escapeAttribute(study.slug)}">${escapeHtml(study.shortTitle)}</a>`)
      .join('')}
    <a href="/contact">Contact</a>
  </nav>`;
}

function renderCapabilities() {
  return `<div class="seo-grid">${profile.capabilityGroups
    .map(
      (group) => `<article>
        <h3>${escapeHtml(group.title)}</h3>
        <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </article>`,
    )
    .join('')}</div>`;
}

function renderCaseStudyCards() {
  return `<div class="seo-grid">${profile.caseStudies
    .map(
      (study) => `<article>
        <h3><a href="/case-studies/${escapeAttribute(study.slug)}">${escapeHtml(study.title)}</a></h3>
        <p>${escapeHtml(study.description)}</p>
        <p><strong>Outcome:</strong> ${escapeHtml(study.outcome)}</p>
        ${renderTags(study.technologies)}
      </article>`,
    )
    .join('')}</div>`;
}

function renderExperience() {
  return `<div class="seo-grid">${profile.experience
    .map(
      (entry) => `<article>
        <p>${escapeHtml(entry.period)}</p>
        <h3>${escapeHtml(entry.role)} — ${escapeHtml(entry.company)}</h3>
        <p>${escapeHtml(entry.summary)}</p>
      </article>`,
    )
    .join('')}</div>`;
}

function renderFaq() {
  return profile.faq
    .map(
      (item) => `<article>
        <h3>${escapeHtml(item.question)}</h3>
        <p>${escapeHtml(item.answer)}</p>
      </article>`,
    )
    .join('');
}

function renderHomeSnapshot() {
  return `<div class="seo-snapshot">
    ${renderNavigation()}
    <main>
      <p>Wojciech Sacewicz · ${escapeHtml(profile.person.location)}</p>
      <h1>AI-native developer and product engineer in Poland / Tricity</h1>
      <p>${escapeHtml(profile.person.summary)}</p>
      <p>${escapeHtml(profile.person.fit)}</p>
      <div class="seo-links">
        <a href="/resume">Read structured resume</a>
        <a href="${escapeAttribute(profile.person.links.github)}">GitHub</a>
        <a href="${escapeAttribute(profile.person.links.linkedin)}">LinkedIn</a>
        <a href="/contact">Contact</a>
      </div>

      <section>
        <h2>Relevant roles</h2>
        ${renderTags(profile.roleAliases)}
      </section>

      <section>
        <h2>Capabilities, technologies and engineering workflows</h2>
        ${renderCapabilities()}
      </section>

      <section>
        <h2>Selected evidence and case studies</h2>
        ${renderCaseStudyCards()}
      </section>

      <section>
        <h2>Commercial experience</h2>
        ${renderExperience()}
      </section>

      <section>
        <h2>Recruiter and AI search questions</h2>
        <div class="seo-grid">${renderFaq()}</div>
      </section>

      <section>
        <h2>Education and languages</h2>
        <p>${escapeHtml(profile.person.education)}. ${escapeHtml(profile.person.languages.join(', '))}.</p>
      </section>
    </main>
  </div>`;
}

function renderResumeSnapshot() {
  return `<div class="seo-snapshot">
    ${renderNavigation()}
    <main>
      <p>Structured resume · updated ${escapeHtml(profile.lastModified)}</p>
      <h1>${escapeHtml(profile.person.name)} — ${escapeHtml(profile.person.headline)}</h1>
      <p><strong>Location:</strong> ${escapeHtml(profile.person.location)}</p>
      <p>${escapeHtml(profile.person.summary)}</p>
      <p>${escapeHtml(profile.person.fit)}</p>

      <section>
        <h2>Role matches</h2>
        ${renderTags(profile.roleAliases)}
      </section>

      <section>
        <h2>Experience</h2>
        ${renderExperience()}
      </section>

      <section>
        <h2>Technical and product capabilities</h2>
        ${renderCapabilities()}
      </section>

      <section>
        <h2>Case studies</h2>
        ${renderCaseStudyCards()}
      </section>

      <section>
        <h2>Education and languages</h2>
        <p>${escapeHtml(profile.person.education)}</p>
        ${renderTags(profile.person.languages)}
      </section>

      <div class="seo-links">
        <a href="/cv-portfolio-en.pdf">PDF CV</a>
        <a href="/contact">Contact Wojciech Sacewicz</a>
      </div>
    </main>
  </div>`;
}

function renderCaseStudySnapshot(study) {
  return `<div class="seo-snapshot">
    ${renderNavigation()}
    <main>
      <p>Case study by ${escapeHtml(profile.person.name)}</p>
      <h1>${escapeHtml(study.title)}</h1>
      <p>${escapeHtml(study.description)}</p>

      <section>
        <h2>Problem</h2>
        <p>${escapeHtml(study.problem)}</p>
      </section>
      <section>
        <h2>Ownership and contribution</h2>
        <p>${escapeHtml(study.ownership)}</p>
      </section>
      <section>
        <h2>Outcome</h2>
        <p>${escapeHtml(study.outcome)}</p>
      </section>
      <section>
        <h2>Technology and methods</h2>
        ${renderTags(study.technologies)}
      </section>
      <div class="seo-links">
        ${study.liveUrl ? `<a href="${escapeAttribute(study.liveUrl)}">Open live product</a>` : ''}
        <a href="/resume">Wojciech Sacewicz resume</a>
        <a href="/contact">Contact</a>
      </div>
    </main>
  </div>`;
}

function renderContactSnapshot() {
  return `<div class="seo-snapshot">
    ${renderNavigation()}
    <main>
      <p>Contact · ${escapeHtml(profile.person.location)}</p>
      <h1>Contact ${escapeHtml(profile.person.name)}</h1>
      <p>For product engineering, React and TypeScript development, Cloudflare work, internal tools, AI-native development or workflow automation.</p>
      <div class="seo-links">
        <a href="${escapeAttribute(profile.person.links.email)}">Email</a>
        <a href="${escapeAttribute(profile.person.links.linkedin)}">LinkedIn</a>
        <a href="${escapeAttribute(profile.person.links.github)}">GitHub</a>
        <a href="/resume">Structured resume</a>
      </div>
    </main>
  </div>`;
}

function renderNotFoundSnapshot() {
  return `<div class="seo-snapshot">
    ${renderNavigation()}
    <main>
      <p>404</p>
      <h1>This page does not exist.</h1>
      <p>Return to the portfolio, structured resume or one of the project case studies.</p>
    </main>
  </div>`;
}

function personSchema() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: profile.person.name,
    alternateName: profile.person.alternateName,
    url: `${profile.siteUrl}/`,
    image: `${profile.siteUrl}/assets/wojtek-profile.png`,
    jobTitle: profile.roleAliases,
    description: profile.person.summary,
    email: profile.person.links.email.replace('mailto:', ''),
    homeLocation: {
      '@type': 'Place',
      name: profile.person.location,
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
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Gdańsk',
    },
    knowsLanguage: ['Polish', 'English'],
    knowsAbout: [...new Set([...profile.roleAliases, ...capabilities])],
    sameAs: [profile.person.links.github, profile.person.links.linkedin],
  };
}

function homepageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${profile.siteUrl}/#website`,
        url: `${profile.siteUrl}/`,
        name: `${profile.person.name} — Portfolio`,
        description: profile.person.summary,
        inLanguage: 'en',
      },
      {
        '@type': 'ProfilePage',
        '@id': profileId,
        url: `${profile.siteUrl}/`,
        name: `${profile.person.name} — ${profile.person.headline}`,
        dateModified: profile.lastModified,
        mainEntity: { '@id': personId },
      },
      personSchema(),
      {
        '@type': 'ItemList',
        name: 'Wojciech Sacewicz case studies',
        itemListElement: profile.caseStudies.map((study, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${profile.siteUrl}/case-studies/${study.slug}`,
          name: study.title,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: profile.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

function resumeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${profile.siteUrl}/resume#profile`,
        url: `${profile.siteUrl}/resume`,
        name: `${profile.person.name} — Structured Resume`,
        description: profile.person.fit,
        dateModified: profile.lastModified,
        mainEntity: { '@id': personId },
      },
    ],
  };
}

function caseStudySchema(study) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${profile.siteUrl}/case-studies/${study.slug}#article`,
    url: `${profile.siteUrl}/case-studies/${study.slug}`,
    headline: study.title,
    description: study.description,
    dateModified: profile.lastModified,
    inLanguage: 'en',
    author: { '@id': personId },
    about: study.technologies,
    keywords: study.technologies.join(', '),
    mainEntityOfPage: `${profile.siteUrl}/case-studies/${study.slug}`,
  };
}

function contactSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'ContactPage',
        url: `${profile.siteUrl}/contact`,
        name: `Contact ${profile.person.name}`,
        description: `Contact ${profile.person.name} for AI-native product engineering, React, TypeScript, Cloudflare, internal tools and automation work.`,
        mainEntity: { '@id': personId },
      },
    ],
  };
}

function routeDefinition(routePath) {
  if (routePath === '/') {
    return {
      title: 'Wojciech Sacewicz — AI-Native Developer | Poland / Tricity',
      description: profile.person.summary,
      type: 'profile',
      snapshot: renderHomeSnapshot(),
      schema: homepageSchema(),
    };
  }

  if (routePath === '/resume') {
    return {
      title: 'Wojciech Sacewicz Resume — AI-Native Developer | Poland / Tricity',
      description: `${profile.person.name} is an AI-native developer and product engineer in Poland / Tricity working with React, TypeScript, Cloudflare, coding agents and automation.`,
      type: 'profile',
      snapshot: renderResumeSnapshot(),
      schema: resumeSchema(),
    };
  }

  if (routePath === '/contact') {
    return {
      title: 'Contact Wojciech Sacewicz — AI-Native Developer',
      description: `Contact ${profile.person.name} for AI-native product engineering, React, TypeScript, Cloudflare, internal tools and workflow automation.`,
      type: 'profile',
      snapshot: renderContactSnapshot(),
      schema: contactSchema(),
    };
  }

  const study = profile.caseStudies.find(
    (candidate) => routePath === `/case-studies/${candidate.slug}`,
  );

  if (study) {
    return {
      title: `${study.title} | Wojciech Sacewicz`,
      description: study.description,
      type: 'article',
      snapshot: renderCaseStudySnapshot(study),
      schema: caseStudySchema(study),
    };
  }

  return {
    title: 'Page not found | Wojciech Sacewicz',
    description: 'The requested portfolio page does not exist.',
    type: 'website',
    snapshot: renderNotFoundSnapshot(),
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page not found',
    },
  };
}

function replaceMeta(document, attributeName, attributeValue, content) {
  const expression = new RegExp(
    `<meta[^>]+${attributeName}=["']${attributeValue}["'][^>]*>`,
    'i',
  );
  return document.replace(
    expression,
    `<meta ${attributeName}="${escapeAttribute(attributeValue)}" content="${escapeAttribute(content)}" />`,
  );
}

function renderDocument(routePath, definition) {
  const canonical = canonicalUrl(routePath);
  let document = template;
  document = document.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(definition.title)}</title>`);
  document = replaceMeta(document, 'name', 'description', definition.description);
  document = replaceMeta(document, 'property', 'og:title', definition.title);
  document = replaceMeta(document, 'property', 'og:description', definition.description);
  document = replaceMeta(document, 'property', 'og:type', definition.type);
  document = replaceMeta(document, 'property', 'og:url', canonical);
  document = replaceMeta(document, 'name', 'twitter:title', definition.title);
  document = replaceMeta(document, 'name', 'twitter:description', definition.description);
  document = document.replace(
    /<link[^>]+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
  );
  document = document.replace(
    /<script type="application\/ld\+json" id="structured-data">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="structured-data">${JSON.stringify(definition.schema)}</script>`,
  );
  document = document.replace(
    '<div id="root"></div>',
    `<div id="root">${definition.snapshot}</div>`,
  );
  return document;
}

async function writeRoute(routePath, definition) {
  const targetDirectory = routePath === '/'
    ? distDirectory
    : path.join(distDirectory, routePath.slice(1));
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(
    path.join(targetDirectory, 'index.html'),
    renderDocument(routePath, definition),
    'utf8',
  );
}

for (const routePath of indexedRoutes) {
  await writeRoute(routePath, routeDefinition(routePath));
}

await writeFile(
  path.join(distDirectory, '404.html'),
  renderDocument('/404', routeDefinition('/404')),
  'utf8',
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedRoutes
  .map(
    (routePath) => `  <url>
    <loc>${escapeHtml(canonicalUrl(routePath))}</loc>
    <lastmod>${profile.lastModified}</lastmod>
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

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${profile.siteUrl}/sitemap.xml
`;
await writeFile(path.join(distDirectory, 'robots.txt'), robots, 'utf8');

const llmsSummary = `# ${profile.person.name}

> ${profile.person.summary}

- Location: ${profile.person.location}
- Primary profile: ${profile.person.headline}
- Best fit: ${profile.person.fit}
- Resume: ${profile.siteUrl}/resume
- GitHub: ${profile.person.links.github}
- LinkedIn: ${profile.person.links.linkedin}

## Case studies
${profile.caseStudies
  .map((study) => `- [${study.title}](${profile.siteUrl}/case-studies/${study.slug}): ${study.outcome}`)
  .join('\n')}

## Core capabilities
${profile.capabilityGroups
  .map((group) => `- ${group.title}: ${group.items.join(', ')}`)
  .join('\n')}
`;
await writeFile(path.join(distDirectory, 'llms.txt'), llmsSummary, 'utf8');

const llmsFull = `${llmsSummary}
## Relevant roles
${profile.roleAliases.map((role) => `- ${role}`).join('\n')}

## Experience
${profile.experience
  .map((entry) => `- ${entry.period}: ${entry.role}, ${entry.company}. ${entry.summary}`)
  .join('\n')}

## Recruiter questions
${profile.faq
  .map((item) => `### ${item.question}\n${item.answer}`)
  .join('\n\n')}
`;
await writeFile(path.join(distDirectory, 'llms-full.txt'), llmsFull, 'utf8');

console.log(`Prerendered ${indexedRoutes.length} indexable routes plus 404, sitemap, robots and LLM discovery files.`);
