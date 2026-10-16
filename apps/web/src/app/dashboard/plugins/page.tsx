import Link from "next/link";
import { formatEther } from "@/lib/amount";
import { DashboardPluginsTable } from "@/components/dashboard-plugins-table";
import { ORBIT_REGISTRY_PROXY } from "@/lib/orbit-contracts";
import { getDashboardPluginRows } from "@/lib/orbit-data";

export default async function DashboardPluginsPage() {
  const { rows, error, scopeNote } = await getDashboardPluginRows(ORBIT_REGISTRY_PROXY);
  const liveCount = rows.filter((s) => s.status === "live").length;
  let totalEarnings = BigInt(0);
  for (const r of rows) {
    totalEarnings += BigInt(r.earningsWei);
  }
  const totalCalls = rows.reduce((a, s) => a + s.totalCalls, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-sw-fg">My Plugins</h1>
          <p className="mt-1 text-sm font-light text-sw-muted-mid">
            {liveCount} live · {rows.length} total · {scopeNote}
          </p>
        </div>
        <Link
          href="/dashboard/publish"
          className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#9200e1]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Publish new plugin
        </Link>
      </div>

      {error ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-sw-border bg-white p-4 text-center">
          <p className="text-2xl font-light tracking-tight text-sw-fg">{liveCount}</p>
          <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
            Live
          </p>
        </div>
        <div className="rounded-xl border border-sw-border bg-white p-4 text-center">
          <p className="text-2xl font-light tracking-tight text-sw-fg">{totalCalls.toLocaleString()}</p>
          <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sw-muted-mid">
            Total usage
          </p>
        </div>
        <div className="rounded-xl border border-sw-border bg-white p-4 text-center">
          <p className="text-2xl font-light tracking-tight text-sw-fg">{formatEther(totalEarnings)}</p>
          <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sw-purple-shade">
            SOL earned (sum)
          </p>
        </div>
      </div>

      <DashboardPluginsTable rows={rows} />

      <div className="flex items-start gap-3 rounded-xl border border-sw-border bg-sw-p5/40 px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-sw-fg">Withdraw earnings</p>
          <p className="mt-0.5 text-xs font-light text-sw-muted-mid">
            Withdraw to your wallet when you&apos;re ready. Totals here are summaries across your
            listings.
          </p>
        </div>
      </div>
    </div>
  );
}
