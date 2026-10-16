"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { swBtnPrimarySm, swBtnSecondarySm } from "@/lib/sw-button";
import { publicEnv } from "@/lib/env";
import { useSolanaSession } from "@/lib/use-solana";

type ConnectWalletModalProps = {
  isOpen: boolean;
  onClose: () => void;
  returnTo: string;
  onHide: () => void;
  onDisconnectWallet: () => void;
};

export function ConnectWalletModal({
  isOpen,
  onClose,
  returnTo,
  onHide,
  onDisconnectWallet,
}: ConnectWalletModalProps) {
  const titleId = useId();
  const router = useRouter();
  const successNavigated = useRef(false);
  const { isConnected, wrongNetwork, open, switchToSolana, disconnect, isDisconnecting } =
    useSolanaSession();
  const [switching, setSwitching] = useState(false);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      successNavigated.current = false;
      return;
    }
    if (!isConnected || wrongNetwork || successNavigated.current) return;
    successNavigated.current = true;
    onHide();
    router.push(returnTo);
  }, [isOpen, isConnected, wrongNetwork, onHide, returnTo, router]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleDismiss, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label="Close dialog"
        onClick={handleDismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] max-h-[min(90vh,640px)] w-full max-w-md overflow-y-auto rounded-2xl border border-sw-border bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.25)]"
      >
        <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-sw-border bg-white/95 px-4 py-3 backdrop-blur-sm">
          <h2 id={titleId} className="text-lg font-light tracking-tight text-sw-fg">
            Connect wallet
          </h2>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-2 text-sw-muted-mid transition-colors hover:bg-sw-p5 hover:text-sw-fg"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-5 pt-4">
          <p className="text-sm font-light leading-relaxed text-sw-muted">
            Connect a Solana wallet to use publisher tools. There is no separate password.
          </p>
          <p className="mt-2 text-sm font-light leading-relaxed text-sw-muted">
            Phantom, Solflare, and other Solana wallet extensions.
          </p>

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-sw-border bg-sw-p5/20 p-4">
            {!publicEnv.reownProjectId ? (
              <p className="text-sm font-light text-sw-muted">
                Set NEXT_PUBLIC_REOWN_PROJECT_ID before the wallet can open.
              </p>
            ) : !isConnected ? (
              <>
                <ol className="list-inside list-decimal space-y-1.5 text-xs font-light leading-relaxed text-sw-muted-mid">
                  <li>Install a Solana wallet extension.</li>
                  <li>Use the primary button below.</li>
                  <li>Approve the connection on Solana mainnet.</li>
                </ol>
                <button
                  type="button"
                  onClick={() => open()}
                  className={`w-full justify-center ${swBtnPrimarySm}`}
                >
                  Connect wallet
                </button>
              </>
            ) : wrongNetwork ? (
              <>
                <p className="text-sm font-light text-amber-950">
                  Your wallet is on the wrong network. Switch to{" "}
                  <span className="font-medium">Solana</span> to continue.
                </p>
                <button
                  type="button"
                  disabled={switching}
                  onClick={() => {
                    setSwitching(true);
                    switchToSolana();
                    setSwitching(false);
                  }}
                  className={`w-full justify-center ${swBtnPrimarySm}`}
                >
                  {switching ? "Switching network…" : "Switch to Solana"}
                </button>
                <button
                  type="button"
                  disabled={isDisconnecting}
                  onClick={() => {
                    void disconnect().then(() => onDisconnectWallet());
                  }}
                  className={`w-full justify-center ${swBtnSecondarySm}`}
                >
                  {isDisconnecting ? "Disconnecting…" : "Disconnect wallet"}
                </button>
              </>
            ) : (
              <p className="text-center text-sm font-light text-sw-muted-mid">
                Opening your workspace…
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
