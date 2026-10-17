import Link from "next/link";

import { FaqList } from "@/components/landing/faq-list";
import { HeroStage } from "@/components/landing/hero-stage";
import { IconBadge, LandingIcon, type IconName } from "@/components/landing/landing-icon";
import { HeaderEyebrow } from "@/components/header-eyebrow";
import { InstallSnippet } from "@/components/install-snippet";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/motion/scramble-text";
import { SkillCard } from "@/components/skill-card";
import { site } from "@/lib/site";
import { swBtnPrimary, swBtnSecondary } from "@/lib/sw-button";
import type { SkillPreview } from "@/lib/skills-types";

const marquee: { label: string; icon: IconName }[] = [
  { label: "Discover", icon: "search" },
  { label: "Publish", icon: "pen" },
  { label: "Price in SOL", icon: "coin" },
  { label: "Install", icon: "terminal" },
  { label: "Dashboard", icon: "layout" },
  { label: "OpenClaw", icon: "bot" },
  { label: "Phantom", icon: "wallet" },
  { label: "Solflare", icon: "spark" },
  { label: "Mainnet", icon: "globe" },
];

const steps: { n: string; title: string; body: string; icon: IconName }[] = [
  {
    n: "01",
    title: "Connect the wallet",
    body: "A Solana wallet is the only account. Approve Phantom or Solflare on mainnet. The dashboard stays closed until that connection is on the right network.",
    icon: "wallet",
  },
  {
    n: "02",
    title: "Describe the plugin",
    body: "Set the name, the slug, and a short description. Mark the listing free, or set the SOL charged each time an agent calls it.",
    icon: "file",
  },
  {
    n: "03",
    title: "Hand over the command",
    body: "The plugin page prints an install command. The agent keeps its own runtime. FlintAi does not run the plugin on this site.",
    icon: "terminal",
  },
  {
    n: "04",
    title: "Read the desk",
    body: "Listings, install totals, and earnings sit on the publisher dashboard, tied to the wallet that opened it.",
    icon: "layout",
  },
];

const capabilities: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Search that reaches the catalog",
    body: "Look up a plugin by name, slug, or description. The box on this page sends you to the catalog with the query already filled in.",
    icon: "search",
  },
  {
    title: "Free and paid, side by side",
    body: "Filter the catalog to free listings or paid ones. A paid card shows the SOL amount per call. A free card charges nothing per use.",
    icon: "tag",
  },
  {
    title: "A desk for publishers",
    body: "The dashboard lists what your wallet published. Open a row for the install count, the price, and the earnings recorded against that listing.",
    icon: "layout",
  },
  {
    title: "An install line on every page",
    body: "Each plugin page carries the command an agent can run, plus the slug and the price, so nothing important is only in the card.",
    icon: "terminal",
  },
  {
    title: "Wallet, not a password",
    body: "Publisher tools ask for a Solana signature. There is no separate FlintAi password and no email login beside the wallet.",
    icon: "key",
  },
  {
    title: "Ticker in the chrome",
    body: `$${site.ticker}, X, Telegram, and the contract address sit in the header and the footer. An empty address reads as not struck yet.`,
    icon: "spark",
  },
];

type HomeLandingProps = {
  latest: SkillPreview[];
  popular: SkillPreview[];
};

export function HomeLanding({ latest, popular }: HomeLandingProps) {
  return (
    <main className="flex-1">
      <div className="flint-scroll-progress" aria-hidden />

      <section className="relative overflow-hidden border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div
          className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-sw-p4/50 blur-3xl motion-safe:animate-flint-float"
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <div className="motion-safe:animate-flint-rise">
              <HeaderEyebrow>
                <ScrambleText text="OpenClaw plugins · Solana" />
              </HeaderEyebrow>
            </div>
            <h1
              className="mt-5 max-w-xl text-4xl font-light tracking-[-0.02em] text-balance sm:text-6xl sm:leading-[1.05] motion-safe:animate-flint-rise"
              style={{ animationDelay: "0.08s" }}
            >
              A catalog for the plugins your agents run.
            </h1>
            <p
              className="mt-6 max-w-xl text-lg font-light leading-relaxed text-sw-muted text-pretty motion-safe:animate-flint-rise"
              style={{ animationDelay: "0.16s" }}
            >
              FlintAi is where a publisher lists a plugin, prices each call in SOL, and leaves an
              install command an agent can run. The wallet is Solana. The runtime stays with the
              agent.
            </p>
            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-flint-rise"
              style={{ animationDelay: "0.24s" }}
            >
              <Link href="/plugins" className={swBtnPrimary}>
                <LandingIcon name="search" />
                Browse the catalog
              </Link>
              <Link href="/dashboard/publish" className={swBtnSecondary}>
                <LandingIcon name="pen" />
                Open the publisher desk
              </Link>
            </div>
          </div>
          <div className="motion-safe:animate-flint-rise" style={{ animationDelay: "0.2s" }}>
            <HeroStage />
          </div>
        </div>
      </section>

      <section
        aria-label="What FlintAi covers"
        className="relative overflow-hidden border-b border-sw-border/80 bg-sw-p5/40 py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max motion-safe:animate-flint-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {marquee.map((item) => (
                <li
                  key={`${copy}-${item.label}`}
                  className="flex items-center gap-3 px-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-sw-purple-shade"
                >
                  <LandingIcon name={item.icon} className="size-3.5" />
                  {item.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-24 border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <HeaderEyebrow>How it works</HeaderEyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
              From a wallet signature to a command an agent can run.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.n} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-sw-border bg-white p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-sw-p2 hover:shadow-[0_18px_40px_-28px_rgba(146,0,225,0.7)] motion-reduce:hover:translate-y-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-medium tracking-[0.16em] text-sw-purple-shade">
                      {step.n}
                    </span>
                    <IconBadge name={step.icon} />
                  </div>
                  <h3 className="mt-4 text-xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-sw-muted">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-sw-border/80 bg-[#faf7fd] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Reveal>
              <HeaderEyebrow>Two desks</HeaderEyebrow>
              <h2 className="mt-4 text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
                Publishers write the listing. Agents read it.
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal>
              <article className="rounded-3xl border border-sw-border bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <IconBadge name="pen" />
                  <h3 className="text-2xl font-medium tracking-tight">For publishers</h3>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-sw-muted">
                  You keep the plugin. FlintAi keeps the public record: the name, the slug, the
                  description, and whether each call is free or priced in SOL. After you connect,
                  the dashboard is the page you come back to — your listings, the install totals,
                  and the earnings attached to them.
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-sw-muted">
                  The publisher form asks for that record before anything is written. A wallet on
                  Solana mainnet has to be connected first. There is no second account to create.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="rounded-3xl border border-sw-border bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <IconBadge name="bot" />
                  <h3 className="text-2xl font-medium tracking-tight">For agents</h3>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed text-sw-muted">
                  An agent needs a stable slug, a price it can read, and a command it can run. The
                  catalog is that index. Search from this page or from the plugins page, open the
                  listing, and copy the install line.
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-sw-muted">
                  The plugin still runs in the agent’s runtime. FlintAi does not host the execution.
                  It tells the agent what the plugin is called, what a call costs, and how to
                  install it.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <HeaderEyebrow>On this site</HeaderEyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
              The pages, the price, and the wallet.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 0.06}>
                <article className="h-full rounded-2xl border border-sw-border p-5 transition-[background-color,border-color] duration-300 hover:border-sw-p2 hover:bg-sw-p5/50">
                  <IconBadge name={item.icon} />
                  <h3 className="mt-4 text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-sw-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="plugins"
        className="scroll-mt-24 border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <HeaderEyebrow>SDK</HeaderEyebrow>
            <h2 className="mt-4 text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
              Scaffold, publish, install.
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-sw-muted">
              The SDK covers the three commands a publisher and an agent share: start a plugin,
              publish the listing, and install it somewhere else. Pick a package manager and copy
              the line.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <InstallSnippet />
          </Reveal>
        </div>
      </section>

      <section
        id="search"
        className="sw-bg-dotted scroll-mt-24 border-b border-white/10 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-black sm:text-5xl">
              Search before you install.
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-black/80">
              The query goes to the catalog. Paid and free are one click if you already know which
              kind of listing you want.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/plugins" method="get" role="search">
              <label htmlFor="plugin-query" className="sr-only">
                Search plugins
              </label>
              <div className="relative min-w-0 flex-1">
                <LandingIcon
                  name="search"
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-sw-purple-shade"
                />
                <input
                  id="plugin-query"
                  name="q"
                  type="search"
                  placeholder="Search by name or slug…"
                  className="h-12 w-full rounded-2xl border border-white/20 bg-white/95 pl-11 pr-4 font-mono text-sm font-light text-sw-fg shadow-sm outline-none transition-[box-shadow,border-color] placeholder:text-sw-muted-mid/70 focus:border-sw-focus focus:ring-2 focus:ring-sw-focus/35"
                />
              </div>
              <button type="submit" className={`${swBtnPrimary} h-12 shrink-0 items-center px-8 py-0`}>
                <LandingIcon name="arrow" />
                Search
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/plugins?pricing=paid"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:border-sw-p1 hover:bg-sw-p5/80"
              >
                <LandingIcon name="coin" className="size-3.5" />
                Paid plugins
              </Link>
              <Link
                href="/plugins?pricing=free"
                className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:border-sw-p1 hover:bg-sw-p5/80"
              >
                <LandingIcon name="tag" className="size-3.5" />
                Free plugins
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="browse" className="scroll-mt-24 border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <CatalogBand
            title="Latest"
            body="The three newest active plugins. When the catalog is still opening, this band stays quiet on purpose."
            emptyTitle="No active plugins yet."
            emptyBody="The first listings will land here in the order they are published. Until then, the publisher desk is the way in."
            skills={latest}
            columns="lg:grid-cols-3"
          />
        </div>
      </section>

      <section className="border-b border-sw-border/80 bg-[#faf7fd] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <CatalogBand
            title="Popular"
            body="Sorted by total installs, so the plugins agents actually picked rise to the front."
            emptyTitle="No install data yet."
            emptyBody="Install counts start at zero until a listing exists and an agent installs it. The catalog page is ready for that first row."
            skills={popular}
            columns="lg:grid-cols-4"
          />
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-b border-sw-border/80 bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <HeaderEyebrow>Questions</HeaderEyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
              About FlintAi
            </h2>
            <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-sw-muted">
              A plugin marketplace on Solana: discovery, publishing, and pay-per-use pricing.
              Developers publish listings here. Agents install and run the plugins in their own
              runtime.
            </p>
          </Reveal>
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-sw-p3">
              Next listing
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-light tracking-[-0.02em] sm:text-5xl sm:leading-[1.1]">
              Put a plugin where an agent can find it.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plugins"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-[0.6875rem] text-base font-medium text-black transition-colors duration-300 hover:bg-sw-p4"
              >
                <LandingIcon name="search" />
                Browse the catalog
              </Link>
              <Link
                href="/dashboard/publish"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 px-5 py-[0.6875rem] text-base font-medium text-white transition-colors duration-300 hover:border-sw-p2 hover:bg-white/10"
              >
                <LandingIcon name="pen" />
                Publish a plugin
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function CatalogBand({
  title,
  body,
  emptyTitle,
  emptyBody,
  skills,
  columns,
}: {
  title: string;
  body: string;
  emptyTitle: string;
  emptyBody: string;
  skills: SkillPreview[];
  columns: string;
}) {
  return (
    <>
      <Reveal>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-light tracking-[-0.02em] text-sw-fg sm:text-5xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light text-sw-muted">{body}</p>
          </div>
          <Link
            href="/plugins"
            className="text-sm font-medium text-sw-fg hover:text-sw-purple-shade"
          >
            View all
          </Link>
        </div>
      </Reveal>
      <ul className={`mt-10 grid gap-4 sm:grid-cols-2 ${columns}`}>
        {skills.length === 0 ? (
          <li className="col-span-full">
            <Reveal>
              <div className="rounded-2xl border border-dashed border-sw-border bg-white px-6 py-10 text-sw-muted">
                <p className="text-lg font-medium text-sw-fg">{emptyTitle}</p>
                <p className="mt-2 max-w-xl text-sm font-light leading-relaxed">{emptyBody}</p>
                <Link
                  href="/dashboard/publish"
                  className="mt-5 inline-flex text-sm font-medium text-sw-purple-shade"
                >
                  Open the publisher desk
                </Link>
              </div>
            </Reveal>
          </li>
        ) : (
          skills.map((skill, index) => (
            <li key={skill.pluginId ?? skill.slug}>
              <Reveal delay={index * 0.06}>
                <SkillCard skill={skill} />
              </Reveal>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
