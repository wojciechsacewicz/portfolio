export interface BasicCredentials {
  readonly username: string;
  readonly password: string;
}

const BASIC_AUTH_PREFIX = 'Basic ';
const SHA_256_HEX_LENGTH = 64;
const textEncoder = new TextEncoder();

type TimingSafeSubtleCrypto = SubtleCrypto & {
  timingSafeEqual?: (left: BufferSource, right: BufferSource) => boolean;
};

export function parseBasicAuthorization(
  authorizationHeader: string | null,
): BasicCredentials | null {
  if (!authorizationHeader?.startsWith(BASIC_AUTH_PREFIX)) return null;

  try {
    const encodedCredentials = authorizationHeader.slice(BASIC_AUTH_PREFIX.length).trim();
    const decodedCredentials = atob(encodedCredentials);
    const separatorIndex = decodedCredentials.indexOf(':');

    if (separatorIndex < 0) return null;

    return {
      username: decodedCredentials.slice(0, separatorIndex),
      password: decodedCredentials.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function decodeSha256Hex(hexDigest: string): Uint8Array {
  if (
    hexDigest.length !== SHA_256_HEX_LENGTH ||
    !/^[0-9a-f]+$/i.test(hexDigest)
  ) {
    throw new Error('Expected a 64-character SHA-256 hexadecimal digest.');
  }

  const bytes = new Uint8Array(SHA_256_HEX_LENGTH / 2);

  for (let index = 0; index < bytes.length; index += 1) {
    const byteStart = index * 2;
    bytes[index] = Number.parseInt(hexDigest.slice(byteStart, byteStart + 2), 16);
  }

  return bytes;
}

function fallbackTimingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) return false;

  let difference = 0;
  for (let index = 0; index < left.byteLength; index += 1) {
    difference |= left[index] ^ right[index];
  }

  return difference === 0;
}

function timingSafeEqual(left: Uint8Array, right: Uint8Array): boolean {
  const subtleCrypto = crypto.subtle as TimingSafeSubtleCrypto;

  if (typeof subtleCrypto.timingSafeEqual === 'function') {
    return subtleCrypto.timingSafeEqual(left, right);
  }

  return fallbackTimingSafeEqual(left, right);
}

export async function verifyPassword(
  password: string,
  expectedSha256Hex: string,
): Promise<boolean> {
  const candidateDigest = new Uint8Array(
    await crypto.subtle.digest('SHA-256', textEncoder.encode(password)),
  );
  const expectedDigest = decodeSha256Hex(expectedSha256Hex);

  return timingSafeEqual(candidateDigest, expectedDigest);
}
