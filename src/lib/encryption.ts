import crypto from "crypto";

const algorithm = "aes-256-cbc";

// Convert hex key from env → buffer
const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");

if (key.length !== 32) {
  throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex characters)");
}

// Encrypt
export function encrypt(text: string) {
  const iv = crypto.randomBytes(16); // unique every time

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

// Decrypt
export function decrypt(data: string) {
  const [ivHex, encrypted] = data.split(":");

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}