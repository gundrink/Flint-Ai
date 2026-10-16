/** Catalog / card types backed by OrbitRegistry + OrbitBilling (native 0G wei pricing). */
export type SkillPricing =
  | { kind: "free" }
  | { kind: "pay-per-call"; amount: string; token: string };

export type SkillPreview = {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  downloads: number;
  verified?: boolean;
  pricing: SkillPricing;
  /** Stable key when multiple rows share slug semantics */
  pluginId?: string;
};

export type SkillListSort = "downloads" | "name";

export type PricingFilter = "all" | "free" | "paid";

export type PriceBandFilter = "all" | "low" | "mid" | "high";

export function formatPricingLabel(pricing: SkillPricing): string {
  if (pricing.kind === "free") return "Free";
  return `${pricing.amount} ${pricing.token} / call`;
}

export function isPayPerCall(pricing: SkillPricing): pricing is Extract<
  SkillPricing,
  { kind: "pay-per-call" }
> {
  return pricing.kind === "pay-per-call";
}

export function parseSkillListSort(raw: string | undefined): SkillListSort {
  if (raw === "name") return "name";
  return "downloads";
}

export function sortCatalogSkills(
  skills: SkillPreview[],
  sort: SkillListSort,
): SkillPreview[] {
  const next = [...skills];
  if (sort === "name") {
    next.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    next.sort((a, b) => b.downloads - a.downloads);
  }
  return next;
}

export function parsePricingFilter(raw: string | undefined): PricingFilter {
  if (raw === "free") return "free";
  if (raw === "paid") return "paid";
  return "all";
}

export function parsePriceBandFilter(raw: string | undefined): PriceBandFilter {
  if (raw === "low" || raw === "mid" || raw === "high") return raw;
  return "all";
}

function payPerCallAmountNative(pricing: SkillPricing): number | null {
  if (pricing.kind !== "pay-per-call") return null;
  const n = Number.parseFloat(pricing.amount);
  return Number.isFinite(n) ? n : null;
}

/** Bands on native 0G per-call amount (from `formatEther(pricePerUsage)`). */
function matchesPriceBand(pricing: SkillPricing, band: PriceBandFilter): boolean {
  if (band === "all") return true;
  const n = payPerCallAmountNative(pricing);
  if (n === null) return false;
  if (band === "low") return n < 0.008;
  if (band === "mid") return n >= 0.008 && n < 0.02;
  return n >= 0.02;
}

export function filterCatalogSkills(
  skills: SkillPreview[],
  opts: {
    query?: string;
    pricing: PricingFilter;
    band: PriceBandFilter;
  },
): SkillPreview[] {
  let out = skills;
  const q = opts.query?.trim().toLowerCase();
  if (q) {
    out = out.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  if (opts.pricing === "free") {
    out = out.filter((s) => s.pricing.kind === "free");
  } else if (opts.pricing === "paid") {
    out = out.filter((s) => s.pricing.kind === "pay-per-call");
  }
  if (opts.band !== "all" && opts.pricing !== "free") {
    out = out.filter((s) => matchesPriceBand(s.pricing, opts.band));
  }
  return out;
}
