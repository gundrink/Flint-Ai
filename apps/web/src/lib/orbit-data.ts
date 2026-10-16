import { unstable_cache } from "next/cache";
import { cache } from "react";
import { formatEther } from "@/lib/amount";
import {
  fetchAllPluginsWithBilling,
  fetchOwnerPluginsWithBilling,
  fetchRecentActivity,
  type OrbitPluginWithBilling,
} from "@/lib/orbit-contracts";
import { fetchSkillCatalog } from "@/lib/skills-from-orbit";

export const getCachedSkillCatalog = unstable_cache(
  () => fetchSkillCatalog(),
  ["orbit-skill-catalog-v1"],
  { revalidate: 60 },
);

export type DashboardPluginRow = {
  slug: string;
  name: string;
  status: "live" | "retired";
  pricing: { kind: "free" } | { kind: "pay-per-call"; amount: string; token: string };
  pluginId: string;
  registryProxy: string;
  totalCalls: number;
  /** Wei as decimal string (JSON-safe for RSC / cache). */
  earningsWei: string;
  publishedAtIso: string;
};

const ZERO = BigInt(0);

function rowFromPlugin(p: OrbitPluginWithBilling, registryProxy: string): DashboardPluginRow {
  const pricing =
    p.pricePerInstall === ZERO && p.pricePerUsage === ZERO
      ? ({ kind: "free" } as const)
      : ({
          kind: "pay-per-call",
          amount: formatEther(p.pricePerUsage > ZERO ? p.pricePerUsage : p.pricePerInstall),
          token: "SOL",
        } as const);

  const sec = Number(p.createdAt);
  const publishedAtIso = Number.isFinite(sec)
    ? new Date(sec * 1000).toISOString()
    : new Date().toISOString();

  const calls =
    p.usageCount > BigInt(Number.MAX_SAFE_INTEGER)
      ? Number.MAX_SAFE_INTEGER
      : Number(p.usageCount);

  return {
    slug: p.slug,
    name: p.name,
    status: p.isActive ? "live" : "retired",
    pricing,
    pluginId: p.id,
    registryProxy,
    totalCalls: calls,
    earningsWei: p.earningsWei.toString(),
    publishedAtIso,
  };
}

function dashboardOwner(): string | undefined {
  const raw = process.env.ORBIT_DASHBOARD_OWNER?.trim();
  return raw || undefined;
}

/** Per-request dedupe; `unstable_cache` cannot store `bigint` from RPC (JSON.stringify). */
export const getCachedOrbitPlugins = cache(() => fetchAllPluginsWithBilling());

export const getCachedOrbitActivity = cache(() => fetchRecentActivity(12));

export async function getDashboardPluginRows(registryProxy: string): Promise<{
  rows: DashboardPluginRow[];
  error?: string;
  scopeNote: string;
}> {
  const owner = dashboardOwner();
  if (owner) {
    const { plugins, error } = await fetchOwnerPluginsWithBilling(owner);
    if (error) return { rows: [], error, scopeNote: "Your publisher account" };
    return {
      rows: plugins.map((p) => rowFromPlugin(p, registryProxy)),
      scopeNote: "Plugins you publish",
    };
  }
  const { plugins, error } = await getCachedOrbitPlugins();
  if (error) return { rows: [], error, scopeNote: "All plugins" };
  return {
    rows: plugins.map((p) => rowFromPlugin(p, registryProxy)),
    scopeNote: "All published plugins",
  };
}

export function aggregateUsageAndEarnings(plugins: OrbitPluginWithBilling[]): {
  totalUsage: bigint;
  totalEarningsWei: bigint;
  activeCount: number;
} {
  let totalUsage = ZERO;
  let totalEarningsWei = ZERO;
  let activeCount = 0;
  for (const p of plugins) {
    totalUsage += p.usageCount;
    totalEarningsWei += p.earningsWei;
    if (p.isActive) activeCount += 1;
  }
  return { totalUsage, totalEarningsWei, activeCount };
}

export function topPluginsByUsage(
  plugins: OrbitPluginWithBilling[],
  n: number,
): OrbitPluginWithBilling[] {
  return [...plugins]
    .filter((p) => p.isActive)
    .sort((a, b) => (a.usageCount === b.usageCount ? 0 : a.usageCount > b.usageCount ? -1 : 1))
    .slice(0, n);
}
