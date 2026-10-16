"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useSolanaSession } from "@/lib/use-solana";
import { ConnectWalletModal } from "@/components/connect-wallet-modal";
import { safeReturnPath } from "@/lib/safe-return-url";

export type OpenConnectWalletOptions = {
  returnUrl?: string | null;
  /** If the user closes the modal while still disconnected, navigate here. */
  afterClose?: string;
};

type ConnectWalletContextValue = {
  openConnectWallet: (opts?: OpenConnectWalletOptions) => void;
  closeConnectWallet: () => void;
  isConnectWalletOpen: boolean;
};

const ConnectWalletContext = createContext<ConnectWalletContextValue | null>(null);

export function useConnectWallet(): ConnectWalletContextValue {
  const ctx = useContext(ConnectWalletContext);
  if (!ctx) {
    throw new Error("useConnectWallet must be used within ConnectWalletProvider");
  }
  return ctx;
}

export function ConnectWalletProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isConnected } = useSolanaSession();
  const [isOpen, setIsOpen] = useState(false);
  const [returnTo, setReturnTo] = useState("/dashboard");
  const isConnectedRef = useRef(isConnected);
  const afterCloseRef = useRef("/");

  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  const openConnectWallet = useCallback((opts?: OpenConnectWalletOptions) => {
    setReturnTo(safeReturnPath(opts?.returnUrl ?? null));
    afterCloseRef.current = opts?.afterClose ?? "/";
    setIsOpen(true);
  }, []);

  const closeConnectWallet = useCallback(() => {
    setIsOpen(false);
    if (!isConnectedRef.current) {
      router.push(afterCloseRef.current);
    }
  }, [router]);

  const hideModalOnly = useCallback(() => {
    setIsOpen(false);
  }, []);

  const exitAfterDisconnectWallet = useCallback(() => {
    setIsOpen(false);
    router.push(afterCloseRef.current);
  }, [router]);

  const value = useMemo(
    () => ({
      openConnectWallet,
      closeConnectWallet,
      isConnectWalletOpen: isOpen,
    }),
    [closeConnectWallet, isOpen, openConnectWallet],
  );

  return (
    <ConnectWalletContext.Provider value={value}>
      {children}
      <ConnectWalletModal
        isOpen={isOpen}
        onClose={closeConnectWallet}
        returnTo={returnTo}
        onHide={hideModalOnly}
        onDisconnectWallet={exitAfterDisconnectWallet}
      />
    </ConnectWalletContext.Provider>
  );
}
