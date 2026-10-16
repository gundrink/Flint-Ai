"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";
import { useConnectWallet } from "@/components/connect-wallet-context";
import { site } from "@/lib/site";
import { swBtnPrimarySm, swBtnSecondarySm } from "@/lib/sw-button";
import { useSolanaSession } from "@/lib/use-solana";

const easeOut = "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    exact: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    href: "/dashboard/plugins",
    label: "My Plugins",
    exact: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 1.5C8 1.5 5.5 3 5.5 5.5C5.5 6.88 6.62 8 8 8C9.38 8 10.5 6.88 10.5 5.5C10.5 3 8 1.5 8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M3 14.5C3 14.5 3 11 8 11C13 11 13 14.5 13 14.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/publish",
    label: "Publish Plugin",
    exact: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 10.5V2.5M4.5 6L8 2.5L11.5 6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 13.5h12"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

function DashboardAccessGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { isConnected, wrongNetwork, switchToSolana, disconnect, isDisconnecting } =
    useSolanaSession();
  const { openConnectWallet } = useConnectWallet();

  const returnAfterConnect = pathname.startsWith("/dashboard") ? pathname : "/dashboard";

  if (!isConnected) {
    return (
      <div className="flex min-h-[min(100dvh,880px)] flex-col items-center justify-center gap-6 bg-white px-6 py-16 text-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-sw-fg opacity-80 transition-opacity hover:opacity-100"
          aria-label={`${site.name} home`}
        >
          <span className="flex h-6 w-12">
            <LogoMark className="h-full w-full" />
          </span>
          <span className="text-sm font-semibold">{site.name}</span>
        </Link>
        <div className="max-w-md space-y-3">
          <h1 className="text-2xl font-light tracking-tight text-sw-fg">Dashboard</h1>
          <p className="text-sm font-light leading-relaxed text-sw-muted">
            Connect your Solana wallet to open the publisher dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            openConnectWallet({
              returnUrl: returnAfterConnect,
              afterClose: "/",
            })
          }
          className={swBtnPrimarySm}
        >
          Connect wallet
        </button>
        <Link href="/" className={`text-sm ${swBtnSecondarySm}`}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[min(100dvh,880px)] flex-col items-center justify-center gap-6 bg-white px-6 py-16 text-center">
      <Link href="/" className="flex items-center gap-2 text-sw-fg opacity-80 transition-opacity hover:opacity-100">
        <span className="flex h-6 w-12">
          <LogoMark className="h-full w-full" />
        </span>
        <span className="text-sm font-semibold">{site.name}</span>
      </Link>
      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-light tracking-tight text-sw-fg">Wrong network</h1>
        <p className="text-sm font-light leading-relaxed text-sw-muted">
          Switch your wallet to <span className="font-medium text-sw-fg">Solana</span> to
          continue.
        </p>
      </div>
      <button
        type="button"
        onClick={() => switchToSolana()}
        className={swBtnPrimarySm}
      >
        Switch to Solana
      </button>
      <button
        type="button"
        disabled={isDisconnecting}
        onClick={() =>
          void disconnect().then(() => router.push("/"))
        }
        className={swBtnSecondarySm}
      >
        {isDisconnecting ? "Disconnecting…" : "Disconnect wallet"}
      </button>
    </div>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { address, disconnect, isDisconnecting } = useSolanaSession();

  function isActive(item: (typeof navItems)[number]) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <div className="flex flex-1">
      <aside className="hidden w-56 shrink-0 border-r border-sw-border bg-white/80 backdrop-blur-sm lg:flex lg:flex-col">
        <div className="flex h-14 items-center gap-3 border-b border-sw-border px-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sw-fg transition-opacity duration-200 hover:opacity-75"
            aria-label={`${site.name} home`}
          >
            <span className="flex h-5 w-10 items-center">
              <LogoMark className="h-full w-full" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{site.name}</span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-3">
          <div>
            <p className="mb-1.5 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
              Developer
            </p>
            <nav className="flex flex-col gap-0.5" aria-label="Dashboard">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-[background-color,color] duration-200 ${easeOut} ${
                      active
                        ? "bg-sw-p5 text-sw-purple-shade"
                        : "text-sw-muted-mid hover:bg-sw-p5/50 hover:text-sw-fg"
                    }`}
                  >
                    <span className={`shrink-0 ${active ? "text-sw-p1" : "text-sw-muted-mid"}`}>
                      {item.icon}
                    </span>
                    {item.label}
                    {active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sw-p1" aria-hidden />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="border-t border-sw-border p-3">
          <div className="rounded-xl border border-sw-border/80 bg-sw-p5/40 px-3 py-2.5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sw-muted-mid">
              Wallet
            </p>
            <p className="mt-1 truncate font-mono text-xs text-sw-fg" title={address}>
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </p>
            <button
              type="button"
              disabled={isDisconnecting}
              onClick={() => {
                void disconnect().then(() => router.push("/"));
              }}
              className="mt-2 w-full rounded-lg border border-sw-border bg-white px-2 py-1.5 text-center text-xs font-medium text-sw-fg transition-colors hover:bg-sw-p5 disabled:opacity-50"
            >
              {isDisconnecting ? "Disconnecting…" : "Disconnect wallet"}
            </button>
          </div>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-sw-border bg-white/95 backdrop-blur-md lg:hidden">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors duration-150 ${
                active ? "text-sw-purple-shade" : "text-sw-muted-mid"
              }`}
            >
              <span className={active ? "text-sw-p1" : "text-sw-muted-mid"}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-sw-border bg-white/80 px-4 backdrop-blur-sm sm:px-6">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
            Dashboard
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={isDisconnecting}
              onClick={() => {
                void disconnect().then(() => router.push("/"));
              }}
              className="rounded-full border border-sw-border bg-white px-3 py-1.5 text-xs font-medium text-sw-muted-mid transition-colors hover:border-sw-p2/60 hover:bg-sw-p5/60 hover:text-sw-fg disabled:opacity-50"
            >
              {isDisconnecting ? "Disconnecting…" : "Disconnect wallet"}
            </button>
            <Link
              href="/dashboard/publish"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-[border-color,background-color,color] duration-200 ${
                pathname.startsWith("/dashboard/publish")
                  ? "border-sw-p1 bg-sw-p5 text-sw-purple-shade"
                  : "border-sw-border bg-white text-sw-muted-mid hover:border-sw-p2/60 hover:bg-sw-p5/60 hover:text-sw-fg"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Publish plugin</span>
              <span className="sm:hidden">Publish</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isConnected, wrongNetwork } = useSolanaSession();
  const allowed = isConnected && !wrongNetwork;

  if (!allowed) {
    return <DashboardAccessGate />;
  }

  return <DashboardShell>{children}</DashboardShell>;
}
