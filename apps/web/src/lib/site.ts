const UNSET = new Set(["", "null", "undefined"]);

function optional(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (UNSET.has(trimmed.toLowerCase())) return "";
  return trimmed;
}

function externalUrl(value: string | undefined): string {
  const trimmed = optional(value);
  if (!/^https?:\/\//i.test(trimmed)) return "";
  return trimmed;
}

/**
 * The only identity file. Header, footer, metadata, and the pump.fun
 * create summary all read from here.
 */
export const site = {
  name: optional(process.env.NEXT_PUBLIC_NAME) || "FlintAi",
  ticker: optional(process.env.NEXT_PUBLIC_TICKER) || "FLINTAI",
  tagline: "Struck once on Solana.",
  description:
    "FlintAi is a coin on Solana mainnet. The site carries the ticker, the social links, and the contract address.",
  accent: "#E85D04",
  xUrl: externalUrl(process.env.NEXT_PUBLIC_X_URL),
  telegramUrl: externalUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL),
  ca: optional(process.env.NEXT_PUBLIC_CA),
};
