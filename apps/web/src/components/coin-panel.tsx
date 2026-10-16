"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

import { publicEnv } from "@/lib/env";
import { formatSol } from "@/lib/format";
import { site } from "@/lib/site";

export function CoinPanel() {
  const { address } = useAppKitAccount();
  const [sol, setSol] = useState<string>("…");

  useEffect(() => {
    if (!address) return;
    let cancel = false;
    const connection = new Connection(publicEnv.rpcUrl, "confirmed");
    connection
      .getBalance(new PublicKey(address))
      .then((lamports) => {
        if (!cancel) setSol(formatSol(lamports));
      })
      .catch(() => {
        if (!cancel) setSol("Unavailable");
      });
    return () => {
      cancel = true;
    };
  }, [address]);

  return (
    <section className="panel" aria-label="FlintAi coin">
      <p className="eyebrow">Solana mainnet</p>
      <h1 className="font-display text-3xl font-semibold">${site.ticker}</h1>
      <p className="mt-3 text-muted">Wallet balance {sol} SOL</p>
      <p className="mt-6 break-all font-mono text-sm">{site.ca}</p>
      <a
        className="mt-6 inline-block text-accent underline-offset-4 hover:underline"
        href={`https://pump.fun/coin/${site.ca}`}
        target="_blank"
        rel="noreferrer"
      >
        Buy on pump.fun
      </a>
    </section>
  );
}
