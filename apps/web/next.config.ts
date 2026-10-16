import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { NextConfig } from "next";

const PUBLIC_KEYS = [
  "NEXT_PUBLIC_NAME",
  "NEXT_PUBLIC_TICKER",
  "NEXT_PUBLIC_CA",
  "NEXT_PUBLIC_X_URL",
  "NEXT_PUBLIC_TELEGRAM_URL",
  "NEXT_PUBLIC_REOWN_PROJECT_ID",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SOLANA_RPC_URL",
] as const;

function monorepoRoot(): string {
  const cwd = process.cwd();
  if (existsSync(path.join(cwd, "apps/web/package.json"))) return cwd;
  return path.resolve(cwd, "../..");
}

function loadRootPublicEnv() {
  const file = path.join(monorepoRoot(), ".env.local");
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!PUBLIC_KEYS.includes(key as (typeof PUBLIC_KEYS)[number])) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadRootPublicEnv();

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline"],
  async redirects() {
    return [
      { source: "/skills", destination: "/plugins", permanent: true },
      { source: "/skills/:slug", destination: "/plugins/:slug", permanent: true },
      { source: "/dashboard/skills", destination: "/dashboard/plugins", permanent: true },
    ];
  },
};

export default nextConfig;
