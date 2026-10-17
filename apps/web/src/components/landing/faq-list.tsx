"use client";

import { useState } from "react";

import { LandingIcon, type IconName } from "@/components/landing/landing-icon";
import { site } from "@/lib/site";

const faqs: { q: string; a: string; icon: IconName }[] = [
  {
    q: "Is there a FlintAi account?",
    a: "No. A Solana wallet is the account. Email and social login stay off. X and Telegram in the header are outbound links, not a way to sign in.",
    icon: "key",
  },
  {
    q: "Which network does the wallet use?",
    a: "Solana mainnet. Phantom, Solflare, and other Solana extensions can connect. If the wallet is on another network, the dashboard asks you to switch before publisher tools open.",
    icon: "globe",
  },
  {
    q: "Where does a plugin actually run?",
    a: "In the agent’s own runtime. FlintAi lists the plugin, shows the per-call price, and prints the install command. This site does not execute the plugin for you.",
    icon: "bot",
  },
  {
    q: "How is a paid plugin charged?",
    a: "The publisher sets a SOL amount per call, or marks the listing free. The catalog shows that price on the card and on the plugin page, next to the install count.",
    icon: "coin",
  },
  {
    q: "Why might the catalog look empty?",
    a: "Older listings lived on another chain. On Solana the catalog fills as publishers write listings from the dashboard. Until a listing exists, search still works and the counts stay at zero.",
    icon: "box",
  },
  {
    q: `What is the $${site.ticker} mark in the header?`,
    a: "The ticker for the FlintAi coin. It sits in the header and the footer with X, Telegram, and the contract address. The coin itself is created from the /app page. The address chip fills in after that mint is saved.",
    icon: "spark",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-sw-border border-y border-sw-border">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="flex items-center gap-3 text-base font-medium tracking-tight text-sw-fg sm:text-lg">
                <LandingIcon name={item.icon} className="size-4 shrink-0 text-sw-purple-shade" />
                {item.q}
              </span>
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border border-sw-border text-sw-purple-shade transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? "rotate-45 bg-sw-p5" : "bg-white"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-sm font-light leading-relaxed text-sw-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
