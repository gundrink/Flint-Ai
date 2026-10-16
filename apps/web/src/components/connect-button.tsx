"use client";

import { useSyncExternalStore } from "react";

import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";

import { publicEnv } from "@/lib/env";
import { shortenAddress } from "@/lib/format";

export function ConnectButton({ label = "Connect" }: { label?: string }) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!publicEnv.reownProjectId) {
    return (
      <button type="button" className="connect-button" disabled>
        Set project id
      </button>
    );
  }

  if (!mounted) {
    return (
      <button type="button" className="connect-button" disabled>
        {label}
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <span className="flex items-center gap-3">
        <span className="font-mono text-sm">{shortenAddress(address)}</span>
        <button
          type="button"
          className="text-sm text-muted underline-offset-4 hover:underline"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </span>
    );
  }

  return (
    <button type="button" className="connect-button" onClick={() => open()}>
      {label}
    </button>
  );
}
