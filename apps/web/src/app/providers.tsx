"use client";

import type { ReactNode } from "react";

import { ConnectWalletProvider } from "@/components/connect-wallet-context";
import { AppKitProvider } from "@/lib/appkit";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppKitProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <ConnectWalletProvider>{children}</ConnectWalletProvider>
      </div>
    </AppKitProvider>
  );
}
