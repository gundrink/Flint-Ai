function optional(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const publicEnv = {
  reownProjectId: optional(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  appUrl: optional(process.env.NEXT_PUBLIC_APP_URL) || "http://localhost:3000",
  cluster: "mainnet-beta",
  rpcUrl:
    optional(process.env.NEXT_PUBLIC_SOLANA_RPC_URL) ||
    "https://api.mainnet-beta.solana.com",
};

export const STRIKE_PRIORITY_FEE_SOL = 0.00005;
export const STRIKE_SLIPPAGE_PERCENT = 10;
