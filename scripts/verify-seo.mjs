import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(projectRoot, 'dist');
const content = JSON.parse(
  await readFile(path.join(projectRoot, 'src/content/portfolioContent.json'), 'utf8'),
);

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function countMatches(value, expression) {
  return [...value.matchAll(expression)].length;
}

function visibleText(document) {
  return document
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractStructuredData(document, filePath) {
  const match = document.match(
    /<script type="application\/ld\+json" id="structured-data">([\s\S]*?)<\/script>/i,
  );
  invariant(match, `${filePath}: missing structured data`);
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`${filePath}: invalid JSON-LD: ${error.message}`);
  }
}

function expectedCanonical(routePath) {
  return routePath === '/' ? `${content.siteUrl}/` : `${content.siteUrl}${routePath}`;
}

const routes = [
  '/',
  '/resume',
  ...content.caseStudies.map((study) => `/case-studies/${study.slug}`),
  '/contact',
];

for (const routePath of routes) {
  const filePath = routePath === '/'
    ? path.join(distDirectory, 'index.html')
    : path.join(distDirectory, routePath.slice(1), 'index.html');
  const document = await readFile(filePath, 'utf8');
  const canonical = expectedCanonical(routePath);

  invariant(document.includes('class="site-shell"'), `${filePath}: React route was not server-rendered`);
  invariant(!document.includes('seo-snapshot'), `${filePath}: legacy snapshot markup remains`);
  invariant(countMatches(document, /<h1(?:\s|>)/g) === 1, `${filePath}: expected exactly one h1`);
  invariant(
    document.includes(`<link rel="canonical" href="${canonical}" />`),
    `${filePath}: canonical does not match the final no-slash URL`,
  );
  invariant(
    document.includes('name="robots" content="index, follow'),
    `${filePath}: indexable route is missing index/follow`,
  );
  invariant(!document.includes('name="keywords"'), `${filePath}: obsolete meta keywords remain`);
  invariant(!document.includes('name="geo.'), `${filePath}: obsolete geo metadata remains`);

  const schema = extractStructuredData(document, filePath);
  invariant(schema['@context'] === 'https://schema.org', `${filePath}: invalid schema context`);

  for (const match of document.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (
      href.startsWith('/') &&
      href !== '/' &&
      !href.startsWith('/assets/') &&
      !href.endsWith('.pdf')
    ) {
      invariant(!href.endsWith('/'), `${filePath}: internal link has a trailing slash: ${href}`);
    }
  }
}

const homepage = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const homepageText = visibleText(homepage);
invariant(
  homepageText.includes('AI-native product engineering.'),
  'Homepage: server-rendered and hydrated H1 copy is missing',
);
invariant(
  homepageText.includes('Wojciech Sacewicz · AI-native developer · Tricity, Poland'),
  'Homepage: person, role and professional location are not visible near the H1',
);

const homepageSchema = extractStructuredData(homepage, 'dist/index.html');
const homepageGraph = homepageSchema['@graph'];
const person = homepageGraph.find((node) => node['@type'] === 'Person');
invariant(person.jobTitle === 'AI Native Developer Intern', 'Person schema: jobTitle is not factual');
invariant(person.workLocation, 'Person schema: professional workLocation is missing');
invariant(!person.homeLocation, 'Person schema: homeLocation should not be published');
invariant(
  Array.isArray(person.knowsAbout) && person.knowsAbout.includes('React'),
  'Person schema: curated knowsAbout is missing',
);

for (const study of content.caseStudies) {
  const filePath = path.join(
    distDirectory,
    'case-studies',
    study.slug,
    'index.html',
  );
  const document = await readFile(filePath, 'utf8');
  const documentText = visibleText(document);

  for (const requiredText of [
    `Case study by ${content.person.name}`,
    'Published',
    'Updated',
    'Context',
    'Role and boundaries',
    'Constraints',
    'Implementation',
    'Decisions and trade-offs',
    'Verification',
    'Measurement',
    'Disclosure boundary',
    'What can be checked.',
  ]) {
    invariant(documentText.includes(requiredText), `${filePath}: missing ${requiredText}`);
  }

  const schema = extractStructuredData(document, filePath);
  const graph = schema['@graph'];
  invariant(Array.isArray(graph), `${filePath}: case-study schema is not self-contained`);
  invariant(graph.some((node) => node['@type'] === 'Article'), `${filePath}: Article schema missing`);
  invariant(graph.some((node) => node['@type'] === 'Person'), `${filePath}: author node missing`);
  invariant(
    graph.some((node) => node['@type'] === 'BreadcrumbList'),
    `${filePath}: BreadcrumbList missing`,
  );
  const article = graph.find((node) => node['@type'] === 'Article');
  invariant(article.datePublished === study.datePublished, `${filePath}: published date mismatch`);
  invariant(article.dateModified === study.dateModified, `${filePath}: modified date mismatch`);
}

const notFoundPath = path.join(distDirectory, '404.html');
const notFound = await readFile(notFoundPath, 'utf8');
invariant(
  notFound.includes('name="robots" content="noindex, nofollow"'),
  '404.html: noindex,nofollow is missing',
);
invariant(!/rel="canonical"/i.test(notFound), '404.html: error document must not have a canonical');
invariant(countMatches(notFound, /<h1(?:\s|>)/g) === 1, '404.html: expected one h1');

const sitemap = await readFile(path.join(distDirectory, 'sitemap.xml'), 'utf8');
for (const routePath of routes) {
  invariant(
    sitemap.includes(`<loc>${expectedCanonical(routePath)}</loc>`),
    `sitemap.xml: missing ${expectedCanonical(routePath)}`,
  );
}
invariant(!sitemap.includes(`${content.siteUrl}/404`), 'sitemap.xml: 404 must not be included');

const redirects = await readFile(path.join(distDirectory, '_redirects'), 'utf8');
invariant(redirects.includes('/404 / 302'), '_redirects: direct /404 redirect missing');

const mainSource = await readFile(path.join(projectRoot, 'src/main.tsx'), 'utf8');
invariant(mainSource.includes('hydrateRoot'), 'src/main.tsx: hydration is not configured');
invariant(!mainSource.includes('replaceChildren'), 'src/main.tsx: prerendered markup is still deleted');

console.log(`Verified React SSG parity, metadata, schema, canonicals and evidence for ${routes.length} routes.`);
