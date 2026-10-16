"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { useSolanaSession } from "@/lib/use-solana";

type PricingKind = "free" | "pay-per-call";
type Step = 1 | 2 | "success";

const STEPS = [
  { n: 1, label: "Metadata" },
  { n: 2, label: "Pricing & submit" },
] as const;

function StepIndicator({ current }: { current: Step }) {
  if (current === "success") return null;
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, i) => {
        const done = typeof current === "number" && s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200 ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "bg-sw-p1 text-white"
                      : "bg-sw-border text-sw-muted-mid"
                }`}
              >
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  s.n
                )}
              </span>
              <span className={`hidden text-xs font-medium sm:block ${active ? "text-sw-fg" : "text-sw-muted-mid"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-8 transition-colors duration-300 ${done ? "bg-emerald-400" : "bg-sw-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PublishPage() {
  const { address, isConnected, wrongNetwork, open, switchToSolana } = useSolanaSession();

  const [step, setStep] = useState<Step>(1);
  const [displayName, setDisplayName] = useState("");
  const [slug, setSlug] = useState("");
  const [version, setVersion] = useState("0.1.0");
  const [description, setDescription] = useState("");
  const [pricingKind, setPricingKind] = useState<PricingKind>("free");
  const [priceAmount, setPriceAmount] = useState("");
  const [localError, setLocalError] = useState<string | undefined>();

  const wrongChain = wrongNetwork;

  const step1Valid =
    displayName.trim().length >= 2 &&
    slug.trim().length >= 2 &&
    version.trim().length >= 1 &&
    description.trim().length >= 4;
  const step2Valid =
    pricingKind === "free" ||
    (pricingKind === "pay-per-call" && Number.parseFloat(priceAmount) > 0);

  const submit = useCallback(() => {
    setLocalError(undefined);
    if (!address) {
      setLocalError("Connect your Solana wallet first.");
      return;
    }
    if (wrongChain) {
      setLocalError("Switch to Solana to continue.");
      return;
    }
    setLocalError(
      "The plugin registry is not on Solana yet, so this form does not send a transaction.",
    );
  }, [address, wrongChain]);

  if (step === "success") {
    return (
      <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sw-p1 to-sw-purple-shade shadow-[0_8px_32px_rgba(183,95,255,0.35)]">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
              <path d="M7 18l8 8 14-14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h2 className="text-2xl font-light tracking-tight text-sw-fg">Published</h2>
            <p className="mt-2 text-sm font-light text-sw-muted-mid">
              <span className="font-mono font-medium text-sw-fg">{slug}</span> is live in the catalog.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/dashboard/plugins/${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#9200e1]"
            >
              View listing
            </Link>
            <Link
              href="/dashboard/plugins"
              className="inline-flex items-center gap-2 rounded-full border border-sw-border bg-white px-5 py-2.5 text-sm font-medium text-sw-fg transition-[border-color,background-color] hover:border-sw-p2/60 hover:bg-sw-p5"
            >
              My plugins
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-sw-fg">Publish Plugin</h1>
          <p className="mt-1 text-sm font-light text-sw-muted-mid">
            Add your plugin to the catalog and set install or per-use pricing.
          </p>
        </div>
        <StepIndicator current={step} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {!isConnected ? (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-[#9200e1] disabled:opacity-40"
          >
            Connect wallet
          </button>
        ) : (
          <span className="rounded-full border border-sw-border bg-white px-3 py-1 font-mono text-[11px] text-sw-muted-mid">
            {address?.slice(0, 6)}…{address?.slice(-4)}
          </span>
        )}
        {isConnected && wrongChain ? (
          <button
            type="button"
            onClick={() => switchToSolana()}
            className="rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 hover:bg-amber-100 disabled:opacity-40"
          >
            Switch to Solana
          </button>
        ) : null}
      </div>

      {localError ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {localError}
        </p>
      ) : null}

      <div className="rounded-2xl border border-sw-border bg-white p-6">
        {step === 1 && (
          <div className="space-y-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
              Step 1 — Metadata
            </p>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-sw-fg" htmlFor="display-name">
                Display name <span className="text-red-400">*</span>
              </label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-xl border border-sw-input-border bg-white px-3.5 py-2.5 font-mono text-sm text-sw-fg outline-none focus:border-sw-p1 focus:ring-2 focus:ring-sw-p1/20"
                placeholder="e.g. Text translation"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-sw-fg" htmlFor="slug">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                className="w-full rounded-xl border border-sw-input-border bg-white px-3.5 py-2.5 font-mono text-sm text-sw-fg outline-none focus:border-sw-p1 focus:ring-2 focus:ring-sw-p1/20"
                placeholder="openclaw-translation"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-sw-fg" htmlFor="version">
                Version <span className="text-red-400">*</span>
              </label>
              <input
                id="version"
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full rounded-xl border border-sw-input-border bg-white px-3.5 py-2.5 font-mono text-sm text-sw-fg outline-none focus:border-sw-p1 focus:ring-2 focus:ring-sw-p1/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-sw-fg" htmlFor="desc">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none rounded-xl border border-sw-input-border bg-white px-3.5 py-2.5 text-sm text-sw-fg outline-none focus:border-sw-p1 focus:ring-2 focus:ring-sw-p1/20"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
              Step 2 — Pricing
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["free", "pay-per-call"] as PricingKind[]).map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setPricingKind(kind)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-[border-color,background-color] duration-200 ${
                    pricingKind === kind
                      ? "border-sw-p1 bg-sw-p5"
                      : "border-sw-border bg-white hover:border-sw-p2/50 hover:bg-sw-p5/30"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      pricingKind === kind ? "bg-sw-p1 text-white" : "bg-sw-border text-sw-muted-mid"
                    }`}
                  >
                    {kind === "free" ? "0" : "Ξ"}
                  </span>
                  <div>
                    <p className="text-sm font-medium capitalize text-sw-fg">
                      {kind === "free" ? "Free" : "Pay per usage"}
                    </p>
                    <p className="mt-0.5 text-[11px] font-light text-sw-muted-mid">
                      {kind === "free" ? "No charge to install or use" : "Set price per use below"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {pricingKind === "pay-per-call" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-sw-fg" htmlFor="price">
                  Price per usage (SOL, e.g. 0.001) <span className="text-red-400">*</span>
                </label>
                <input
                  id="price"
                  type="text"
                  inputMode="decimal"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value)}
                  className="w-full rounded-xl border border-sw-input-border bg-white px-3.5 py-2.5 font-mono text-sm text-sw-fg outline-none focus:border-sw-p1 focus:ring-2 focus:ring-sw-p1/20"
                  placeholder="0.001"
                />
              </div>
            )}
            <div className="rounded-xl border border-sw-border bg-sw-canvas p-4 text-xs text-sw-muted-mid">
              <p>
                <span className="font-medium text-sw-fg">Name</span> {displayName}
              </p>
              <p className="mt-1">
                <span className="font-medium text-sw-fg">Slug</span> {slug}
              </p>
              <p className="mt-1">
                <span className="font-medium text-sw-fg">Version</span> {version}
              </p>
            </div>
          </div>
        )}

        <div className={`mt-6 flex ${step === 1 ? "justify-end" : "justify-between"}`}>
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 rounded-full border border-sw-border bg-white px-4 py-2 text-sm font-medium text-sw-muted-mid transition-[border-color,background-color] hover:border-sw-p2/40 hover:bg-sw-p5/40 hover:text-sw-fg"
            >
              Back
            </button>
          ) : null}
          {step === 1 ? (
            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#9200e1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          ) : step === 2 ? (
            <button
              type="button"
              disabled={!step2Valid || !isConnected || wrongChain}
              onClick={() => void submit()}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#9200e1] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Publish plugin
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
