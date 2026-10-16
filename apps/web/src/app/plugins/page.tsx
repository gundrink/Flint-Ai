import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SkillCard } from "@/components/skill-card";
import { getCachedSkillCatalog } from "@/lib/orbit-data";
import {
  filterCatalogSkills,
  parsePriceBandFilter,
  parsePricingFilter,
  parseSkillListSort,
  sortCatalogSkills,
  type PriceBandFilter,
  type PricingFilter,
  type SkillListSort,
} from "@/lib/skills-types";

export const metadata: Metadata = {
  title: "Plugins — FlintAi",
  description:
    "Browse OpenClaw plugins with live pricing, install counts, and pay-per-use options.",
};

type SearchParams = Promise<{
  sort?: string;
  q?: string;
  pricing?: string;
  band?: string;
}>;

type PluginsUrlState = {
  q: string;
  sort: SkillListSort;
  pricing: PricingFilter;
  band: PriceBandFilter;
};

function buildPluginsPath(base: PluginsUrlState, patch: Partial<PluginsUrlState> = {}): string {
  const s = { ...base, ...patch };
  const p = new URLSearchParams();
  const qt = s.q.trim();
  if (qt) p.set("q", qt);
  if (s.sort !== "downloads") p.set("sort", s.sort);
  if (s.pricing === "free") p.set("pricing", "free");
  if (s.pricing === "paid") p.set("pricing", "paid");
  if (s.band !== "all" && s.pricing !== "free") p.set("band", s.band);
  const qs = p.toString();
  return qs ? `/plugins?${qs}` : "/plugins";
}

export default async function PluginsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const qRaw = typeof sp.q === "string" ? sp.q : "";
  const state: PluginsUrlState = {
    q: qRaw,
    sort: parseSkillListSort(sp.sort),
    pricing: parsePricingFilter(sp.pricing),
    band: parsePriceBandFilter(sp.band),
  };

  let list = await getCachedSkillCatalog();
  list = filterCatalogSkills(list, {
    query: state.q,
    pricing: state.pricing,
    band: state.band,
  });
  list = sortCatalogSkills(list, state.sort);

  const sortOptions: { value: SkillListSort; label: string }[] = [
    { value: "downloads", label: "Installs" },
    { value: "name", label: "Name" },
  ];

  const bandOptions: { value: PriceBandFilter; label: string; hint: string }[] = [
    { value: "low", label: "Budget", hint: "Under 0.008 per call" },
    { value: "mid", label: "Standard", hint: "0.008 – 0.02 per call" },
    { value: "high", label: "Premium", hint: "0.02 and above per call" },
  ];

  const hasActiveFilters =
    state.q.trim() !== "" ||
    state.pricing !== "all" ||
    state.band !== "all" ||
    state.sort !== "downloads";

  return (
    <div className="flex flex-1 flex-col text-sw-fg">
      <SiteHeader />
      <main className="flex-1 border-b border-sw-border/80 bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-light tracking-[-0.02em] sm:text-5xl"># Plugins</h1>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-sw-muted">
            Every listing shows live install counts and pricing. Filter by free or paid, then sort by
            popularity or name.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            action="/plugins"
            method="get"
            role="search"
          >
            <label htmlFor="plugins-q" className="sr-only">
              Search plugins
            </label>
            <input
              id="plugins-q"
              name="q"
              type="search"
              defaultValue={state.q}
              placeholder="Name, slug, description…"
              className="h-12 w-full flex-1 rounded-2xl border border-sw-input-border bg-white px-4 font-mono text-sm font-light text-sw-fg placeholder:text-sw-muted-mid/70 shadow-sm outline-none transition-[box-shadow,border-color] focus:border-sw-focus focus:ring-2 focus:ring-sw-focus/35"
            />
            {state.sort !== "downloads" ? (
              <input type="hidden" name="sort" value={state.sort} />
            ) : null}
            {state.pricing === "free" ? <input type="hidden" name="pricing" value="free" /> : null}
            {state.pricing === "paid" ? <input type="hidden" name="pricing" value="paid" /> : null}
            {state.band !== "all" && state.pricing !== "free" ? (
              <input type="hidden" name="band" value={state.band} />
            ) : null}
            <button
              type="submit"
              className="h-12 shrink-0 rounded-2xl bg-black px-8 text-sm font-medium text-white transition-[background-color] duration-300 hover:bg-[#9200e1] sm:px-10"
            >
              Search
            </button>
          </form>

          <div className="mt-10 flex flex-col gap-6 border-t border-sw-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm font-light text-sw-muted-mid">
              {list.length} result{list.length === 1 ? "" : "s"}
              {state.q.trim() ? ` for “${state.q.trim()}”` : ""}
              {state.pricing === "paid" ? " · paid" : ""}
              {state.pricing === "free" ? " · free" : ""}
              {state.band !== "all" && state.pricing !== "free" ? ` · ${state.band} band` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="sr-only">Sort by</span>
              {sortOptions.map(({ value, label }) => {
                const active = state.sort === value;
                return (
                  <Link
                    key={value}
                    href={buildPluginsPath(state, { sort: value })}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-sw-fg text-white"
                        : "border border-sw-border bg-white text-sw-muted hover:border-sw-p2/50 hover:bg-sw-p5/60"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={buildPluginsPath(state, {
                pricing: state.pricing === "paid" ? "all" : "paid",
                band: state.pricing === "paid" ? state.band : "all",
              })}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                state.pricing === "paid"
                  ? "border-sw-fg bg-sw-p5 text-sw-fg"
                  : "border-sw-border text-sw-muted hover:border-sw-p2/50 hover:bg-sw-p5/50"
              }`}
            >
              Pay-per-call only
            </Link>
            <Link
              href={buildPluginsPath(state, {
                pricing: state.pricing === "free" ? "all" : "free",
                band: "all",
              })}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                state.pricing === "free"
                  ? "border-sw-fg bg-sw-p5 text-sw-fg"
                  : "border-sw-border text-sw-muted hover:border-sw-p2/50 hover:bg-sw-p5/50"
              }`}
            >
              Free only
            </Link>
            {hasActiveFilters ? (
              <Link
                href="/plugins"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-sw-purple-shade underline-offset-4 hover:underline"
              >
                Reset filters
              </Link>
            ) : null}
          </div>

          {state.pricing !== "free" ? (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-sw-muted-mid">
                Price range (paid plugins)
              </p>
              <div className="flex flex-wrap gap-2">
                {bandOptions.map(({ value, label, hint }) => {
                  const active = state.band === value;
                  return (
                    <Link
                      key={value}
                      href={buildPluginsPath(state, {
                        band: active ? "all" : value,
                      })}
                      title={hint}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "border-sw-fg bg-sw-p5 text-sw-fg"
                          : "border-sw-border text-sw-muted hover:border-sw-p2/50 hover:bg-sw-p5/50"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}

          {list.length === 0 ? (
            <p className="mt-12 text-center text-sm font-light text-sw-muted">
              No plugins match these filters. Try clearing search or price band.
            </p>
          ) : (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((skill) => (
                <li key={skill.pluginId ?? skill.slug}>
                  <SkillCard skill={skill} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
