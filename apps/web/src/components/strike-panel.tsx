"use client";

import { solana } from "@reown/appkit/networks";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";
import {
  Connection,
  Keypair,
  VersionedTransaction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";

import {
  STRIKE_PRIORITY_FEE_SOL,
  STRIKE_SLIPPAGE_PERCENT,
  publicEnv,
} from "@/lib/env";
import { parseSolAmount } from "@/lib/format";
import { site } from "@/lib/site";

type WalletSigner = {
  signTransaction: (
    transaction: VersionedTransaction,
  ) => Promise<VersionedTransaction>;
};

type Phase = "edit" | "review" | "working" | "done";

export function StrikePanel() {
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, switchNetwork } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider<WalletSigner>("solana");
  const [phase, setPhase] = useState<Phase>("edit");
  const [buyInput, setBuyInput] = useState("0");
  const [image, setImage] = useState<File | null>(null);
  const [pinataReady, setPinataReady] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [mint, setMint] = useState("");
  const [signature, setSignature] = useState("");

  const onMainnet = caipNetwork?.caipNetworkId === solana.caipNetworkId;
  const buyAmount = parseSolAmount(buyInput);

  useEffect(() => {
    let cancel = false;
    fetch("/api/metadata")
      .then((response) => response.json())
      .then((body: { configured?: boolean }) => {
        if (!cancel) setPinataReady(Boolean(body.configured));
      })
      .catch(() => {
        if (!cancel) setPinataReady(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  const blockReason = strikeBlockReason({
    isConnected,
    onMainnet,
    pinataReady,
    image,
    buyAmount,
  });

  async function confirmStrike() {
    if (blockReason || !address || !image || buyAmount === null) return;
    setPhase("working");
    setError("");
    const mintKeypair = Keypair.generate();
    try {
      const form = new FormData();
      form.append("file", image);
      const metadataResponse = await fetch("/api/metadata", {
        method: "POST",
        body: form,
      });
      const metadataBody = (await metadataResponse.json()) as {
        uri?: string;
        error?: string;
      };
      if (!metadataResponse.ok || !metadataBody.uri) {
        throw new Error(metadataBody.error || "Metadata upload failed");
      }

      const txResponse = await fetch("https://pumpportal.fun/api/trade-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: address,
          action: "create",
          tokenMetadata: {
            name: site.name,
            symbol: site.ticker,
            uri: metadataBody.uri,
          },
          mint: mintKeypair.publicKey.toBase58(),
          denominatedInSol: "true",
          amount: buyAmount,
          slippage: STRIKE_SLIPPAGE_PERCENT,
          priorityFee: STRIKE_PRIORITY_FEE_SOL,
          pool: "pump",
        }),
      });
      if (!txResponse.ok) {
        const detail = await txResponse.text();
        throw new Error(detail || "Could not build the create transaction");
      }

      const bytes = new Uint8Array(await txResponse.arrayBuffer());
      const tx = VersionedTransaction.deserialize(bytes);
      const connection = new Connection(publicEnv.rpcUrl, "confirmed");
      const preview = await connection.simulateTransaction(tx, {
        replaceRecentBlockhash: true,
        sigVerify: false,
      });
      if (preview.value.err) {
        throw new Error("Simulation failed. Nothing was sent.");
      }

      tx.sign([mintKeypair]);
      const signed = await walletProvider.signTransaction(tx);
      const checked = await connection.simulateTransaction(signed, {
        sigVerify: false,
      });
      if (checked.value.err) {
        throw new Error("Simulation failed after signing. Nothing was sent.");
      }

      const sent = await connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: false,
      });
      setMint(mintKeypair.publicKey.toBase58());
      setSignature(sent);
      setPhase("done");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Strike failed");
      setPhase("review");
    }
  }

  if (phase === "done") {
    return (
      <section className="panel" aria-label="Coin created">
        <p className="eyebrow">Struck</p>
        <h1 className="font-display text-3xl font-semibold">The coin is live.</h1>
        <p className="mt-3 text-muted">
          Copy this address into <code>NEXT_PUBLIC_CA</code>. The header chip
          updates on the next build.
        </p>
        <p className="mt-6 break-all font-mono text-sm">{mint}</p>
        <p className="mt-4">
          <a
            className="text-accent underline-offset-4 hover:underline"
            href={`https://pump.fun/coin/${mint}`}
            target="_blank"
            rel="noreferrer"
          >
            View on pump.fun
          </a>
          <a
            className="ml-4 text-accent underline-offset-4 hover:underline"
            href={`https://solscan.io/tx/${signature}`}
            target="_blank"
            rel="noreferrer"
          >
            Transaction
          </a>
        </p>
      </section>
    );
  }

  return (
    <section className="panel" aria-label="Strike FlintAi">
      <p className="eyebrow">Solana mainnet</p>
      <h1 className="font-display text-3xl font-semibold">Strike {site.name}</h1>
      <p className="mt-3 max-w-xl text-muted">
        This creates ${site.ticker} on pump.fun. Nothing is sent until you
        confirm the summary and the wallet signs.
      </p>

      {isConnected && caipNetwork && !onMainnet ? (
        <button
          type="button"
          className="connect-button mt-6"
          onClick={() => switchNetwork(solana)}
        >
          Switch to Solana mainnet
        </button>
      ) : null}

      {phase === "edit" ? (
        <form
          className="mt-8 grid max-w-md gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            setPhase("review");
          }}
        >
          <label className="grid gap-2 text-sm">
            First buy, SOL
            <input
              className="h-11 rounded-lg border border-line bg-transparent px-3 font-mono"
              inputMode="decimal"
              value={buyInput}
              onChange={(event) => setBuyInput(event.target.value)}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Coin image
            <input
              className="text-sm text-muted"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" className="connect-button w-fit">
            Review strike
          </button>
        </form>
      ) : (
        <div className="mt-8 max-w-md">
          <dl className="grid gap-3 text-sm">
            <Row label="Name" value={site.name} />
            <Row label="Ticker" value={`$${site.ticker}`} />
            <Row label="Cluster" value="Solana mainnet" />
            <Row label="First buy" value={`${buyAmount ?? buyInput} SOL`} />
            <Row
              label="Priority fee"
              value={`${STRIKE_PRIORITY_FEE_SOL} SOL`}
            />
          </dl>
          <p className="mt-4 text-sm text-muted">
            Mint rent is inside the transaction. The wallet shows the full cost
            when it asks you to sign.
          </p>
          {blockReason ? <p className="mt-4 text-sm text-accent">{blockReason}</p> : null}
          {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="connect-button"
              disabled={Boolean(blockReason) || phase === "working"}
              onClick={() => void confirmStrike()}
            >
              {phase === "working" ? "Striking…" : "Confirm and sign"}
            </button>
            <button
              type="button"
              className="text-sm text-muted underline-offset-4 hover:underline"
              disabled={phase === "working"}
              onClick={() => {
                setError("");
                setPhase("edit");
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function strikeBlockReason({
  isConnected,
  onMainnet,
  pinataReady,
  image,
  buyAmount,
}: {
  isConnected: boolean;
  onMainnet: boolean;
  pinataReady: boolean | null;
  image: File | null;
  buyAmount: number | null;
}): string {
  if (!isConnected) return "Connect a Solana wallet before this can be sent.";
  if (!onMainnet) return "Switch the wallet to Solana mainnet.";
  if (pinataReady === false) return "Pinata is not configured. Nothing will be sent.";
  if (pinataReady === null) return "Checking metadata upload…";
  if (!image) return "Add a coin image.";
  if (buyAmount === null) return "Enter a first buy from 0 to 100 SOL.";
  return "";
}
