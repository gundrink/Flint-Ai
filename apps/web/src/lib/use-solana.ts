"use client";

import { solana } from "@reown/appkit/networks";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";

export function useSolanaSession() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, switchNetwork } = useAppKitNetwork();
  const { disconnect } = useDisconnect();
  const networkId = caipNetwork?.caipNetworkId;
  const wrongNetwork = Boolean(
    isConnected && networkId && networkId !== solana.caipNetworkId,
  );

  async function disconnectWallet() {
    await disconnect();
  }

  return {
    address,
    isConnected,
    wrongNetwork,
    open,
    isDisconnecting: false,
    disconnect: disconnectWallet,
    switchToSolana: () => {
      switchNetwork(solana);
    },
  };
}
