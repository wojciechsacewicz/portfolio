import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:8787';
const server = spawn(
  'pnpm',
  ['exec', 'wrangler', 'dev', '--local', '--ip', '127.0.0.1', '--port', '8787'],
  {
    env: { ...process.env, NO_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let logs = '';
server.stdout.on('data', (chunk) => {
  logs += chunk;
});
server.stderr.on('data', (chunk) => {
  logs += chunk;
});

function invariant(condition, message) {
  if (!condition) {
    throw new Error(`${message}\n\nWrangler output:\n${logs.slice(-6000)}`);
  }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/`, { redirect: 'manual' });
      if (response.status === 200) return;
    } catch {
      // The local asset server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Wrangler did not start.\n\n${logs}`);
}

async function expectFinalPage(routePath) {
  const response = await fetch(`${baseUrl}${routePath}`, { redirect: 'manual' });
  invariant(response.status === 200, `${routePath}: expected final 200, received ${response.status}`);
  const canonical = response.headers.get('content-type')?.includes('text/html')
    ? (await response.text()).match(/<link rel="canonical" href="([^"]+)" \/>/)?.[1]
    : undefined;
  const expected = routePath === '/' ? 'https://sacewi.cz/' : `https://sacewi.cz${routePath}`;
  invariant(canonical === expected, `${routePath}: expected canonical ${expected}, received ${canonical}`);
}

async function expectSlashRedirect(routePath) {
  const response = await fetch(`${baseUrl}${routePath}/`, { redirect: 'manual' });
  invariant(
    [301, 302, 307, 308].includes(response.status),
    `${routePath}/: expected one redirect, received ${response.status}`,
  );
  const location = response.headers.get('location');
  invariant(
    location === routePath || location === `${baseUrl}${routePath}`,
    `${routePath}/: expected redirect to ${routePath}, received ${location}`,
  );
}

try {
  await waitForServer();

  for (const routePath of [
    '/resume',
    '/contact',
    '/case-studies/veldia',
    '/case-studies/llmpolska',
    '/case-studies/dovista-automation',
  ]) {
    await expectFinalPage(routePath);
    await expectSlashRedirect(routePath);
  }

  const missing = await fetch(`${baseUrl}/definitely-missing-page`, { redirect: 'manual' });
  invariant(missing.status === 404, `Missing route: expected 404, received ${missing.status}`);
  const missingBody = await missing.text();
  invariant(
    missingBody.includes('name="robots" content="noindex, nofollow"'),
    'Missing route: noindex,nofollow metadata is missing',
  );

  for (const routePath of ['/404', '/404.html']) {
    const direct404 = await fetch(`${baseUrl}${routePath}`, { redirect: 'manual' });
    invariant(
      [301, 302, 307, 308, 404].includes(direct404.status),
      `${routePath}: must redirect away or return 404, received ${direct404.status}`,
    );
    if (direct404.status !== 404) {
      invariant(
        direct404.headers.get('location') === '/',
        `${routePath}: expected redirect to /`,
      );
    }
  }

  console.log('Verified Cloudflare no-slash canonicals, one-hop redirects and 404 behavior.');
} finally {
  server.kill('SIGTERM');
  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 3000);
    server.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}
