import { SHA256 } from "crypto-js";
import pbkdf2 from "crypto-js/pbkdf2";

export function hashPassword(password: string) {
  return SHA256(password).toString();
}

export function generateVaultKey({
  email,
  hashedPassword,
  salt,
}: {
  email: string;
  hashedPassword: string;
  salt: string;
}) {
  return pbkdf2(`${email}${hashPassword}`, salt, { keySize: 32 }).toString();
}
