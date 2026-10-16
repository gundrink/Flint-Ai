"use client";

import { Buffer } from "buffer";

import { solana } from "@reown/appkit/networks";
import { createAppKit, type CreateAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";

import { publicEnv } from "@/lib/env";
import { site } from "@/lib/site";

if (typeof globalThis.Buffer === "undefined") {
  globalThis.Buffer = Buffer;
}

const solanaAdapter = new SolanaAdapter();
const origin =
  typeof window === "undefined" ? publicEnv.appUrl : window.location.origin;

// Wallet-only. `basic` skips the dashboard fetch that turns email and
// social login back on. The site's X and Telegram links are separate.
createAppKit({
  adapters: [solanaAdapter],
  networks: [solana],
  defaultNetwork: solana,
  projectId: publicEnv.reownProjectId || "00000000000000000000000000000000",
  metadata: {
    name: site.name,
    description: site.tagline,
    url: origin,
    icons: [`${origin}/icon.svg`],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": site.accent,
    "--w3m-color-mix": "#100c09",
    "--w3m-color-mix-strength": 20,
  },
  basic: true,
} as unknown as CreateAppKit);

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return children;
}
