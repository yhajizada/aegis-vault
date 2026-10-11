/**
 * Zero-Knowledge Client-Side Cryptographic Engine for AegisVault
 * Implements:
 * - PBKDF2 (SHA-256, 100,000 iterations) for key derivation
 * - AES-GCM 256-bit encryption with random 96-bit (12-byte) IV
 * - Galois Field GF(2^8) arithmetic for Shamir's Secret Sharing (Information-Theoretic Security)
 */

// ==========================================
// 1. Web Crypto API: Zero-Knowledge AES-GCM
// ==========================================

export interface EncryptedPayload {
  ciphertext: string; // Base64 encoded ciphertext + auth tag
  iv: string;         // Base64 encoded IV (12 bytes)
  salt: string;       // Base64 encoded salt (16 bytes)
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function generateSalt(): Promise<Uint8Array> {
  const salt = new Uint8Array(16);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(salt);
  } else {
    // Fallback for node environment during SSR/testing
    for (let i = 0; i < 16; i++) salt[i] = Math.floor(Math.random() * 256);
  }
  return salt;
}

export async function deriveKeyFromPassword(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptData(
  plainText: string,
  password: string,
  existingSalt?: Uint8Array
): Promise<EncryptedPayload> {
  const salt = existingSalt || (await generateSalt());
  const key = await deriveKeyFromPassword(password, salt);
  
  const iv = new Uint8Array(12);
  window.crypto.getRandomValues(iv);

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plainText);

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv.buffer as ArrayBuffer,
    },
    key,
    encodedData
  );

  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
  };
}

export async function decryptData(
  payload: EncryptedPayload,
  password: string
): Promise<string> {
  const salt = base64ToBuffer(payload.salt);
  const iv = base64ToBuffer(payload.iv);
  const ciphertext = base64ToBuffer(payload.ciphertext);

  const key = await deriveKeyFromPassword(password, salt);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv.buffer as ArrayBuffer,
    },
    key,
    ciphertext.buffer as ArrayBuffer
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}

// ==========================================
// 2. Shamir's Secret Sharing (GF(2^8) Galois Field)
// ==========================================

// Precomputed GF(256) exp and log tables with primitive polynomial 0x11d (x^8 + x^4 + x^3 + x^2 + 1)
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_EXP[i + 255] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) {
      x ^= 0x11d;
    }
  }
  GF_LOG[0] = 0; // Avoid NaN/out-of-bound
})();

function gfAdd(a: number, b: number): number {
  return a ^ b;
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function gfDiv(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero in GF(256)");
  if (a === 0) return 0;
  let diff = GF_LOG[a] - GF_LOG[b];
  if (diff < 0) diff += 255;
  return GF_EXP[diff];
}

export interface KeyShare {
  id: number;       // x-coordinate (1..255)
  shareData: string; // Hex representation of y-values
}

/**
 * Split a secret string into N shares with threshold K using Shamir's Secret Sharing
 */
export function splitSecret(secret: string, totalShares: number, threshold: number): KeyShare[] {
  if (threshold < 2 || threshold > totalShares || totalShares > 255) {
    throw new Error("Invalid Shamir parameters: threshold must be <= totalShares <= 255");
  }

  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(secret);
  const shares: { id: number; values: number[] }[] = [];

  for (let i = 1; i <= totalShares; i++) {
    shares.push({ id: i, values: new Array(secretBytes.length) });
  }

  // For each byte in secret, create random polynomial P(x) = secret + a1*x + a2*x^2 + ... + a(k-1)*x^(k-1)
  for (let b = 0; b < secretBytes.length; b++) {
    const coeffs = new Uint8Array(threshold);
    coeffs[0] = secretBytes[b]; // Constant term is the secret byte

    if (typeof window !== "undefined" && window.crypto) {
      const rand = new Uint8Array(threshold - 1);
      window.crypto.getRandomValues(rand);
      for (let c = 1; c < threshold; c++) coeffs[c] = rand[c - 1];
    } else {
      for (let c = 1; c < threshold; c++) coeffs[c] = Math.floor(Math.random() * 256);
    }

    // Evaluate polynomial for each share x in [1..totalShares]
    for (let s = 0; s < totalShares; s++) {
      const x = shares[s].id;
      let y = coeffs[0];
      for (let c = 1; c < threshold; c++) {
        let xPow = 1;
        for (let p = 0; p < c; p++) xPow = gfMul(xPow, x);
        y = gfAdd(y, gfMul(coeffs[c], xPow));
      }
      shares[s].values[b] = y;
    }
  }

  // Convert to formatted hex key shares
  return shares.map((s) => ({
    id: s.id,
    shareData: Array.from(s.values)
      .map((v) => v.toString(16).padStart(2, "0"))
      .join(""),
  }));
}

/**
 * Reconstruct the original secret from any K valid shares using Lagrange Interpolation
 */
export function reconstructSecret(shares: KeyShare[]): string {
  if (shares.length < 2) {
    throw new Error("At least 2 shares are required to reconstruct secret");
  }

  // Ensure unique share IDs
  const uniqueIds = new Set(shares.map((s) => s.id));
  if (uniqueIds.size !== shares.length) {
    throw new Error("Duplicate shares provided");
  }

  const byteLength = shares[0].shareData.length / 2;
  const decodedShares = shares.map((s) => {
    const bytes = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
      bytes[i] = parseInt(s.shareData.substring(i * 2, i * 2 + 2), 16);
    }
    return { x: s.id, y: bytes };
  });

  const reconstructedBytes = new Uint8Array(byteLength);

  // For each byte index, compute Lagrange interpolation at x = 0
  for (let b = 0; b < byteLength; b++) {
    let secretByte = 0;

    for (let i = 0; i < decodedShares.length; i++) {
      const xi = decodedShares[i].x;
      const yi = decodedShares[i].y[b];

      // Compute basis polynomial l_i(0) = Product of (0 - xj) / (xi - xj) for j != i
      let li = 1;
      for (let j = 0; j < decodedShares.length; j++) {
        if (i === j) continue;
        const xj = decodedShares[j].x;
        // In GF(2^8), subtraction is XOR, identical to addition: 0 ^ xj = xj
        const num = xj;
        const den = gfAdd(xi, xj);
        const term = gfDiv(num, den);
        li = gfMul(li, term);
      }

      secretByte = gfAdd(secretByte, gfMul(yi, li));
    }

    reconstructedBytes[b] = secretByte;
  }

  const decoder = new TextDecoder();
  return decoder.decode(reconstructedBytes);
}
