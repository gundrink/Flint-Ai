"use client";

import { useConnectWallet } from "@/components/connect-wallet-context";

export function SiteFooterConnectWallet() {
  const { openConnectWallet } = useConnectWallet();
  return (
    <button
      type="button"
      onClick={() =>
        openConnectWallet({
          returnUrl: "/dashboard",
          afterClose: "/",
        })
      }
      className="text-left transition-colors hover:text-sw-fg"
    >
      Connect wallet
    </button>
  );
}
