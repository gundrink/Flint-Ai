"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useAppKitAccount } from "@reown/appkit/react";

import { CoinPanel } from "@/components/coin-panel";
import { StrikePanel } from "@/components/strike-panel";
import { site } from "@/lib/site";

export default function AppPage() {
  const { isConnected } = useAppKitAccount();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-muted">Loading wallet…</p>
      </main>
    );
  }

  if (site.ca && !isConnected) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <section className="panel max-w-md">
          <h1 className="font-display text-3xl font-semibold">Wallet required</h1>
          <p className="mt-3 text-muted">
            Connect a Solana wallet on mainnet to see the balance.
          </p>
          <Link className="connect-button mt-6" href="/connect">
            Connect
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {site.ca ? <CoinPanel /> : <StrikePanel />}
    </main>
  );
}
