export type OrbitPlugin = {
  id: string;
  name: string;
  version: string;
  owner: string;
  slug: string;
  description: string;
  pricePerInstall: bigint;
  pricePerUsage: bigint;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
};

export type OrbitPluginWithBilling = OrbitPlugin & {
  installCount: bigint;
  usageCount: bigint;
  earningsWei: bigint;
};
