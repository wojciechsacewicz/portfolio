import { describe, expect, it } from 'vitest';
import {
  decodeSha256Hex,
  parseBasicAuthorization,
  verifyPassword,
} from './auth';

function createBasicHeader(username: string, password: string): string {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(value),
  );

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

describe('private preview authentication', () => {
  it('parses Basic Auth while preserving colons in the password', () => {
    expect(parseBasicAuthorization(createBasicHeader('wojtek', 'one:two'))).toEqual({
      username: 'wojtek',
      password: 'one:two',
    });
  });

  it('rejects malformed authorization headers', () => {
    expect(parseBasicAuthorization(null)).toBeNull();
    expect(parseBasicAuthorization('Bearer token')).toBeNull();
    expect(parseBasicAuthorization('Basic not-valid-base64%%%')).toBeNull();
    expect(parseBasicAuthorization(`Basic ${btoa('missing-separator')}`)).toBeNull();
  });

  it('validates the password against its SHA-256 digest', async () => {
    const expectedDigest = await sha256Hex('correct-password');

    await expect(verifyPassword('correct-password', expectedDigest)).resolves.toBe(true);
    await expect(verifyPassword('wrong-password', expectedDigest)).resolves.toBe(false);
  });

  it('rejects malformed configured digests', () => {
    expect(() => decodeSha256Hex('not-a-digest')).toThrow(
      'Expected a 64-character SHA-256 hexadecimal digest.',
    );
  });
});
