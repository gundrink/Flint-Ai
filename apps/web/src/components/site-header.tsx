"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConnectWallet } from "@/components/connect-wallet-context";
import { SiteMarks } from "@/components/site-marks";
import { LogoMark } from "@/components/logo-mark";
import { site } from "@/lib/site";
import { swBtnNav, swBtnNavSm, swBtnSecondarySm } from "@/lib/sw-button";

const mainNav = [
  { href: "/plugins", label: "Plugins" },
  { href: "/#how", label: "How" },
  { href: "/#search", label: "Search" },
  { href: "/#about", label: "About" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

const docsHref = "https://solana.com/docs";

const easeOutExpo = "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";

const navPillClass = `rounded-full border border-transparent px-3.5 py-2 text-[15px] font-medium text-sw-muted outline-none transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-sw-p2/40 hover:bg-sw-p5/90 hover:text-sw-fg focus-visible:border-sw-p1/50 focus-visible:bg-sw-p5 focus-visible:ring-2 focus-visible:ring-sw-focus/25 ${easeOutExpo}`;

function MenuIcon2({ open }: { open: boolean }) {
  return (
    <div
      className={`flex h-12 w-12 flex-col items-center justify-center ${easeOutExpo} motion-reduce:transition-none`}
      aria-hidden
    >
      <span
        className={`h-0.5 w-6 origin-center rounded-full bg-sw-fg motion-reduce:transition-none ${easeOutExpo} transition-[transform] duration-300 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`my-1.5 flex h-0.5 w-6 items-center justify-center rounded-full bg-sw-fg motion-reduce:transition-none ${easeOutExpo} transition-[opacity,transform] duration-300 ${
          open ? "scale-x-0 opacity-0" : ""
        }`}
      >
        <span className="h-0 w-1" aria-hidden />
      </span>
      <span
        className={`h-0.5 w-6 origin-center rounded-full bg-sw-fg motion-reduce:transition-none ${easeOutExpo} transition-[transform] duration-300 ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openConnectWallet } = useConnectWallet();

  function openWalletModal() {
    const path = pathname || "/";
    const onLogin = path === "/login";
    openConnectWallet({
      returnUrl: "/dashboard",
      afterClose: onLogin ? "/" : path,
    });
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-2 z-[100] px-3 sm:top-3 sm:px-5 md:px-8">
        <div className="pointer-events-auto mx-auto max-w-6xl">
          <div
            className={`rounded-2xl border border-sw-border/90 bg-white/90 shadow-[0_8px_32px_-6px_rgba(183,95,255,0.14),0_4px_14px_-4px_rgba(0,0,0,0.06)] backdrop-blur-xl ${easeOutExpo}`}
          >
            <div className="flex w-full items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
              <Link
                href="/"
                className={`group/brand flex shrink-0 items-center gap-3 rounded-xl py-1 pr-2 text-sw-fg ${easeOutExpo} transition-opacity duration-200 hover:opacity-85 active:opacity-100`}
                aria-label={`${site.name} home`}
              >
                <span className="flex h-[1.5rem] w-[3rem] items-center text-sw-fg">
                  <LogoMark className="h-full w-full" />
                </span>
                <span className="hidden text-[15px] font-semibold leading-none tracking-tight sm:inline lg:text-[17px]">
                  {site.name}
                </span>
              </Link>
              <div className="min-w-0">
                <SiteMarks />
              </div>

              <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
                <button
                  type="button"
                  className={`-mr-1 rounded-xl border-0 bg-transparent p-0 md:hidden ${easeOutExpo} transition-colors duration-200 hover:bg-sw-p5/60`}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-nav-overlay"
                  onClick={() => setMobileOpen((o) => !o)}
                >
                  <MenuIcon2 open={mobileOpen} />
                </button>

                <nav
                  className="hidden items-center md:flex md:gap-0.5 lg:gap-1"
                  aria-label="Main"
                >
                  {mainNav.map((item) => (
                    <Link key={item.href} href={item.href} className={navPillClass}>
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href={docsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${swBtnNavSm} !rounded-full motion-reduce:transition-none ${easeOutExpo} transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    Docs
                  </Link>
                </nav>

                <div className="hidden h-6 w-px bg-sw-border md:block" aria-hidden />

                <div className="hidden items-center gap-2 md:flex">
                  <button
                    type="button"
                    onClick={openWalletModal}
                    className={`${swBtnSecondarySm} !rounded-full motion-reduce:transition-none ${easeOutExpo} transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    Connect wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[4.5rem] shrink-0 sm:h-[4.75rem]" aria-hidden />

      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-[90] bg-sw-p5/95 backdrop-blur-sm md:hidden motion-reduce:transition-none ${easeOutExpo} transition-[opacity,visibility] duration-300 ${
          mobileOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`flex h-full flex-col overflow-y-auto bg-gradient-to-b from-white to-sw-p5/40 pb-28 pt-[5.5rem] motion-reduce:transition-none ${easeOutExpo} transition-[opacity,transform] duration-500 ${
            mobileOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-md space-y-5 px-5">
            <SiteMarks />
            <div className="rounded-2xl border border-sw-border bg-white p-5 shadow-[0_4px_20px_-4px_rgba(183,95,255,0.12)]">
              <p className="mb-4 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-sw-purple-shade">
                <span className="h-1 w-1 rounded-full bg-sw-p1" aria-hidden />
                Menu
              </p>
              <div className="flex flex-col gap-1">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-lg font-light tracking-tight text-sw-fg transition-colors hover:bg-sw-p5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href={docsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${swBtnNav} w-full justify-center !rounded-full !py-3.5 motion-reduce:transition-none ${easeOutExpo} transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                onClick={() => setMobileOpen(false)}
              >
                Docs
              </Link>
              <button
                type="button"
                onClick={openWalletModal}
                className={`${swBtnSecondarySm} w-full justify-center !rounded-full !py-3.5 text-base motion-reduce:transition-none ${easeOutExpo} transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]`}
              >
                Connect wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
