import { parseBasicAuthorization, verifyPassword } from './auth';

const AUTH_REALM = 'Wojtek portfolio private preview';

function createUnauthorizedResponse(): Response {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      Vary: 'Authorization',
      'WWW-Authenticate': `Basic realm="${AUTH_REALM}", charset="UTF-8"`,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}

async function isAuthorized(request: Request, env: Env): Promise<boolean> {
  const credentials = parseBasicAuthorization(request.headers.get('Authorization'));

  if (!credentials || credentials.username !== env.PREVIEW_USERNAME) {
    return false;
  }

  return verifyPassword(credentials.password, env.PREVIEW_PASSWORD_SHA256);
}

function applyPrivateResponseHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  headers.set('Cache-Control', 'private, max-age=0, must-revalidate');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('Vary', 'Authorization');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    if (!(await isAuthorized(request, env))) {
      return createUnauthorizedResponse();
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return applyPrivateResponseHeaders(assetResponse);
  },
} satisfies ExportedHandler<Env>;
