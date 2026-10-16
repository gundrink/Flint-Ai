import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import { SiteFooterConnectWallet } from "@/components/site-footer-connect";
import { SiteMarks } from "@/components/site-marks";
import { site } from "@/lib/site";

const productNav = [
  { href: "/plugins", label: "Plugins" },
  { href: "/#search", label: "Search" },
  { href: "/#about", label: "About" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sw-border/80 bg-white/90 px-4 py-10 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-sw-fg transition-opacity hover:opacity-85"
              aria-label={`${site.name} home`}
            >
              <span className="flex h-5 w-10 shrink-0">
                <LogoMark className="h-full w-full" />
              </span>
              <span className="text-sm font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-2 text-sm font-light leading-relaxed text-sw-muted">
              Discover plugins, publish your own, and track installs and earnings. Browse in the
              browser; your agent runs plugins in its own environment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-sw-muted-mid">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm font-light text-sw-muted">
                {productNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-sw-fg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-sw-muted-mid">
                Account
              </p>
              <ul className="mt-3 space-y-2 text-sm font-light text-sw-muted">
                <li>
                  <SiteFooterConnectWallet />
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-sw-muted-mid">
                Solana
              </p>
              <div className="mt-3">
                <SiteMarks />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-sw-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-sw-muted-mid">
            Open source oriented · Built for sharp agents
          </p>
          <p className="text-xs font-light text-sw-muted-mid">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
