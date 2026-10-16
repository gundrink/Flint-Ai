import type { OrbitPluginWithBilling } from "@/lib/plugin-types";

export type { OrbitPlugin, OrbitPluginWithBilling } from "@/lib/plugin-types";

export const ORBIT_REGISTRY_PROXY = "";

export function explorerAddressUrl(address: string): string {
  return `https://solscan.io/account/${address}`;
}

export function explorerTxUrl(hash: string): string {
  return `https://solscan.io/tx/${hash}`;
}

export async function fetchRegistryOwner(): Promise<string | undefined> {
  return undefined;
}

export async function fetchAllPluginsWithBilling(): Promise<{
  plugins: OrbitPluginWithBilling[];
  error?: string;
}> {
  return { plugins: [] };
}

export async function fetchOwnerPluginsWithBilling(
  _owner: string,
): Promise<{
  plugins: OrbitPluginWithBilling[];
  error?: string;
}> {
  return { plugins: [] };
}

export async function fetchPluginBySlug(
  slug: string,
): Promise<OrbitPluginWithBilling | undefined> {
  const { plugins } = await fetchAllPluginsWithBilling();
  return plugins.find((plugin) => plugin.slug === slug);
}

export type OnChainActivity = {
  id: string;
  type: "publish" | "install" | "usage" | "withdraw";
  message: string;
  timestampLabel: string;
  blockNumber: bigint;
  txHash: string;
};

export async function fetchRecentActivity(_maxItems: number): Promise<OnChainActivity[]> {
  return [];
}

export async function fetchRecentPluginRegistrations(_max: number): Promise<
  {
    pluginId: string;
    owner: string;
    name: string;
    version: string;
    transactionHash: string;
  }[]
> {
  return [];
}
