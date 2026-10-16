"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { useAppKitAccount } from "@reown/appkit/react";

import { ConnectButton } from "@/components/connect-button";

export default function ConnectPage() {
  const { isConnected } = useAppKitAccount();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-20">
      <section className="panel max-w-md" aria-label="Connect wallet">
        <p className="eyebrow">Solana mainnet</p>
        <h1 className="font-display text-4xl font-semibold">Connect a wallet</h1>
        <p className="mt-3 text-muted">One wallet signature. No email login.</p>
        <div className="mt-8">
          <ConnectButton label="Connect Wallet" />
        </div>
        {mounted && isConnected ? (
          <Link className="mt-6 inline-block text-accent underline-offset-4 hover:underline" href="/app">
            Enter the app
          </Link>
        ) : null}
      </section>
    </main>
  );
}
