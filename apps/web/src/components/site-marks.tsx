"use client";

import { useState } from "react";

import { formatCa } from "@/lib/format";
import { site } from "@/lib/site";

export function SiteMarks() {
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-xs tracking-wide text-sw-purple-shade">
        ${site.ticker}
      </span>
      <SocialLink href={site.xUrl} label="X">
        <XIcon />
      </SocialLink>
      <SocialLink href={site.telegramUrl} label="Telegram">
        <TelegramIcon />
      </SocialLink>
      <CaChip ca={site.ca} />
    </span>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      className="flex size-8 items-center justify-center rounded-lg border border-sw-border text-sw-muted hover:text-sw-fg"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function CaChip({ ca }: { ca: string }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    if (!ca) return;
    await navigator.clipboard.writeText(ca);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      className="h-8 rounded-lg border border-sw-border px-3 font-mono text-xs text-sw-muted hover:text-sw-fg disabled:cursor-default"
      onClick={copyAddress}
      disabled={!ca}
      aria-label={copied ? "Contract address copied" : "Copy contract address"}
    >
      {copied ? "Copied" : formatCa(ca)}
    </button>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.5 4.5 2.8 11.2c-1.2.5-1.2 1.1-.2 1.4l4.8 1.5 1.8 5.6c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.6-2.5 5.3 3.9c1 .5 1.6.3 1.9-.9l3.4-16c.3-1.4-.5-2-1.4-1.6zM8.8 14.2l9.7-6.1c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.4-2-4.8z"
      />
    </svg>
  );
}
