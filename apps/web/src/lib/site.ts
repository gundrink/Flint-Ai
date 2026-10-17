const UNSET = new Set(["", "null", "undefined"]);

function optional(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  if (UNSET.has(trimmed.toLowerCase())) return "";
  return trimmed;
}

function httpUrl(value: string | undefined): string {
  const trimmed = optional(value);
  if (!/^https?:\/\//i.test(trimmed)) return "";
  return trimmed;
}

function xUrl(value: string | undefined): string {
  const trimmed = optional(value);
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^@/, "");
  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) return "";
  return `https://x.com/${handle}`;
}

/**
 * The only identity file. Header, footer, metadata, and the pump.fun
 * create summary all read from here.
 */
export const site = {
  name: optional(process.env.NEXT_PUBLIC_NAME) || "FlintAi",
  ticker: optional(process.env.NEXT_PUBLIC_TICKER) || "AGENTFLINT",
  tagline: "Struck once on Solana.",
  description:
    "FlintAi is a coin on Solana mainnet. The site carries the ticker, the social links, and the contract address.",
  accent: "#E85D04",
  xUrl: xUrl(process.env.NEXT_PUBLIC_X_URL),
  telegramUrl: httpUrl(process.env.NEXT_PUBLIC_TELEGRAM_URL),
  ca: optional(process.env.NEXT_PUBLIC_CA),
};
