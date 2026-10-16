import { formatEther } from "@/lib/amount";
import {
  fetchAllPluginsWithBilling,
  type OrbitPluginWithBilling,
} from "@/lib/orbit-contracts";
import type { SkillPreview, SkillPricing } from "@/lib/skills-types";

const ZERO = BigInt(0);

function safeNumber(n: bigint): number {
  if (n > BigInt(Number.MAX_SAFE_INTEGER)) return Number.MAX_SAFE_INTEGER;
  return Number(n);
}

export function orbitPluginToSkillPreview(p: OrbitPluginWithBilling): SkillPreview {
  const pricing: SkillPricing =
    p.pricePerInstall === ZERO && p.pricePerUsage === ZERO
      ? { kind: "free" }
      : {
          kind: "pay-per-call",
          amount: formatEther(p.pricePerUsage > ZERO ? p.pricePerUsage : p.pricePerInstall),
          token: "SOL",
        };

  const tags = p.slug
    .split("-")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 5);

  return {
    slug: p.slug,
    name: p.name,
    summary: p.description?.trim() ? p.description : `${p.name} · v${p.version}`,
    tags: tags.length > 0 ? tags : ["plugin"],
    downloads: safeNumber(p.installCount),
    verified: false,
    pricing,
    pluginId: p.id,
  };
}

/** Active plugins from OrbitRegistry (Galileo), with billing install counts. */
export async function fetchSkillCatalog(): Promise<SkillPreview[]> {
  const { plugins, error } = await fetchAllPluginsWithBilling();
  if (error) return [];
  return plugins.filter((p) => p.isActive).map(orbitPluginToSkillPreview);
}

export function latestPluginsForHome(
  plugins: OrbitPluginWithBilling[],
  n: number,
): OrbitPluginWithBilling[] {
  return [...plugins]
    .filter((p) => p.isActive)
    .sort((a, b) => (a.createdAt === b.createdAt ? 0 : a.createdAt > b.createdAt ? -1 : 1))
    .slice(0, n);
}

export function popularPluginsForHome(
  plugins: OrbitPluginWithBilling[],
  n: number,
): OrbitPluginWithBilling[] {
  return [...plugins]
    .filter((p) => p.isActive)
    .sort((a, b) => (a.installCount === b.installCount ? 0 : a.installCount > b.installCount ? -1 : 1))
    .slice(0, n);
}
