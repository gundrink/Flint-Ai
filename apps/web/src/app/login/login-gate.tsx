"use client";

import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { useConnectWallet } from "@/components/connect-wallet-context";
import { safeReturnPath } from "@/lib/safe-return-url";
import { swBtnPrimary } from "@/lib/sw-button";

export function LoginGate() {
  const { openConnectWallet } = useConnectWallet();
  const searchParams = useSearchParams();
  const raw = searchParams.get("returnUrl") ?? searchParams.get("next");
  const returnUrl = safeReturnPath(raw);

  return (
    <div className="flex flex-1 flex-col text-sw-fg">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-light tracking-tight text-sw-fg">Sign in</h1>
          <p className="text-sm font-light text-sw-muted">
            Connect your wallet to open the publisher dashboard. Your wallet will only open when you
            choose to connect.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            openConnectWallet({
              returnUrl,
              afterClose: "/",
            })
          }
          className={swBtnPrimary}
        >
          Connect wallet
        </button>
      </main>
    </div>
  );
}
