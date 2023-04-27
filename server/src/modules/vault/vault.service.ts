import { Vault, VaultModel } from "./vault.model";
export function createVault(input: { user: string; salt: string }): Vault {
  return VaultModel.create({ input });
}
