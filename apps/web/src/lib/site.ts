function optional(value: string | undefined): string {
  return value?.trim() ?? "";
}

/**
 * The only identity file. Header, footer, metadata, and the pump.fun
 * create summary all read from here.
 */
export const site = {
  name: "FlintAi",
  ticker: "FLINTAI",
  tagline: "Struck once on Solana.",
  description:
    "FlintAi is a coin on Solana mainnet. The site carries the ticker, the social links, and the contract address.",
  accent: "#E85D04",
  xUrl: optional(process.env.NEXT_PUBLIC_X_URL),
  telegramUrl: optional(process.env.NEXT_PUBLIC_TELEGRAM_URL),
  ca: optional(process.env.NEXT_PUBLIC_CA),
};
