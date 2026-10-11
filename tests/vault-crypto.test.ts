import { describe, it, expect } from "vitest";
import { splitSecret, reconstructSecret } from "../lib/vault-crypto";

describe("Shamir's Secret Sharing Cryptographic Scheme", () => {
  it("splits a master secret into 3 shares with a threshold of 2 and reconstructs successfully", () => {
    const originalMasterKey = "aegis-master-seed-98234-xyz-secret";
    
    // Split into 3 shares, threshold = 2 (2-of-3)
    const shares = splitSecret(originalMasterKey, 3, 2);
    expect(shares).toHaveLength(3);
    expect(shares[0].id).toBe(1);
    expect(shares[1].id).toBe(2);
    expect(shares[2].id).toBe(3);

    // Any 2 shares should be able to reconstruct the original secret
    // 1. Share 1 and Share 2
    const recovered12 = reconstructSecret([shares[0], shares[1]]);
    expect(recovered12).toBe(originalMasterKey);

    // 2. Share 1 and Share 3
    const recovered13 = reconstructSecret([shares[0], shares[2]]);
    expect(recovered13).toBe(originalMasterKey);
  });

  it("encrypts and decrypts sensitive vault secrets using AES-256-GCM zero-knowledge", async () => {
    // Ensure window/globalThis crypto is present
    if (typeof window === "undefined") {
      (globalThis as any).window = globalThis;
    }

    const { encryptData, decryptData } = await import("../lib/vault-crypto");
    const masterPassword = "SuperSecurePassword#2026!";
    const confidentialData = JSON.stringify({
      wallet: "0x71C...849",
      seedPhrase: "apple banana canyon desert eagle flame guitar hero island jungle kangaroo lemon",
      bankPin: "9482",
    });

    const encryptedPayload = await encryptData(confidentialData, masterPassword);
    expect(encryptedPayload.ciphertext).toBeDefined();
    expect(encryptedPayload.iv).toBeDefined();
    expect(encryptedPayload.salt).toBeDefined();
    // Ciphertext must NOT contain cleartext
    expect(encryptedPayload.ciphertext).not.toContain("seedPhrase");

    const decrypted = await decryptData(encryptedPayload, masterPassword);
    expect(decrypted).toBe(confidentialData);
    const parsed = JSON.parse(decrypted);
    expect(parsed.bankPin).toBe("9482");
  });
});
