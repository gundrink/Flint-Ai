import { unstable_cache } from "next/cache";
import { PluginRegistryTable } from "@/components/plugin-registry-table";
import { fetchRecentPluginRegistrations } from "@/lib/orbit-contracts";

const REGISTRY_FETCH_LIMIT = 80;

const getCachedPanel = unstable_cache(
  async () => {
    const plugins = await fetchRecentPluginRegistrations(REGISTRY_FETCH_LIMIT);
    return { plugins };
  },
  ["orbit-registry-panel-v4"],
  { revalidate: 120 },
);

export async function PluginRegistryPanel() {
  const { plugins } = await getCachedPanel();

  return (
    <section className="rounded-2xl border border-sw-border bg-white p-5">
      <div className="border-b border-sw-border pb-4">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
          Recently published
        </p>
        <p className="mt-1 text-sm font-light text-sw-muted-mid">
          Newest plugin listings as they appear in the catalog.
        </p>
      </div>

      <div className="mt-4">
        <PluginRegistryTable plugins={plugins} />
      </div>
    </section>
  );
}
