import Link from "next/link";
import { PluginRegistryPanel } from "@/components/plugin-registry-panel";
import {
  aggregateUsageAndEarnings,
  getCachedOrbitActivity,
  getCachedOrbitPlugins,
  topPluginsByUsage,
} from "@/lib/orbit-data";
import { formatEther } from "@/lib/amount";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border p-5 ${
        accent
          ? "border-sw-p2/40 bg-gradient-to-br from-sw-p5 to-white"
          : "border-sw-border bg-white"
      }`}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
        {label}
      </p>
      <p className="text-3xl font-light tracking-tight text-sw-fg">{value}</p>
      {sub && <p className="text-xs font-light text-sw-muted-mid">{sub}</p>}
    </div>
  );
}

const activityIcon: Record<string, React.ReactNode> = {
  install: (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sw-p5 text-sw-purple-shade">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path d="M6.5 1.5v7M3.5 6l3 2.5L9.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 11.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  ),
  usage: (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sw-p5 text-sw-purple-shade">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path d="M2.5 10.5h8M4 4.5h6M4 7h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  ),
  withdraw: (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path d="M2.5 5.5h8l-1.5 6h-5l-1.5-6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  ),
  publish: (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        <path d="M6.5 8.5V1.5M3.5 4.5L6.5 1.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 11.5h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  ),
};

const activityTypeIcon: Record<string, React.ReactNode> = {
  publish: activityIcon.publish,
  install: activityIcon.install,
  usage: activityIcon.usage,
  withdraw: activityIcon.withdraw,
};

const statusBadge: Record<string, string> = {
  live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  retired: "bg-gray-100 text-gray-500 border-gray-200",
};

export default async function DashboardPage() {
  const [{ plugins, error }, activity] = await Promise.all([
    getCachedOrbitPlugins(),
    getCachedOrbitActivity(),
  ]);

  const agg = aggregateUsageAndEarnings(plugins);
  const totalUsageStr =
    agg.totalUsage > BigInt(Number.MAX_SAFE_INTEGER)
      ? `${Number.MAX_SAFE_INTEGER}+`
      : agg.totalUsage.toString();
  const top = topPluginsByUsage(plugins, 3);
  const liveTop = top.filter((p) => p.isActive);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-2xl font-light tracking-tight text-sw-fg">Overview</h1>
        <p className="mt-1 text-sm font-light text-sw-muted-mid">
          Summary of your plugin catalog
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total usage" value={totalUsageStr} accent />
        <StatCard
          label="Total earnings"
          value={`${formatEther(agg.totalEarningsWei)} SOL`}
          accent
        />
        <StatCard label="Active plugins" value={String(agg.activeCount)} />
        <StatCard label="Listed plugins" value={String(plugins.length)} />
      </div>

      <PluginRegistryPanel />

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-sw-border bg-white p-5">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
                Usage by plugin
              </p>
              <p className="mt-1 text-xl font-light tracking-tight text-sw-fg">
                Top {Math.min(7, plugins.length)} by usage
              </p>
            </div>
          </div>
          {plugins.length === 0 ? (
            <p className="text-sm font-light text-sw-muted-mid">No plugins registered yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPluginsByUsage(plugins, 7).map((p) => {
                const u =
                  p.usageCount > BigInt(Number.MAX_SAFE_INTEGER)
                    ? Number.MAX_SAFE_INTEGER
                    : Number(p.usageCount);
                const maxU = Math.max(
                  1,
                  ...topPluginsByUsage(plugins, 7).map((x) =>
                    x.usageCount > BigInt(Number.MAX_SAFE_INTEGER)
                      ? Number.MAX_SAFE_INTEGER
                      : Number(x.usageCount),
                  ),
                );
                const pct = (u / maxU) * 100;
                return (
                  <li key={p.id}>
                    <Link
                      href={`/dashboard/plugins/${p.slug}`}
                      className="block rounded-lg px-1 py-1.5 transition-colors hover:bg-sw-p5/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sw-focus/35"
                    >
                      <div className="mb-1 flex justify-between gap-2 font-mono text-[11px]">
                        <span className="truncate text-sw-fg">{p.name}</span>
                        <span className="shrink-0 text-sw-muted-mid">{u.toLocaleString()}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-sw-p5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sw-p2 to-sw-p1"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-sw-border bg-white p-5">
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
            Recent activity
          </p>
          <div className="flex flex-col gap-3">
            {activity.length === 0 ? (
              <p className="text-xs font-light text-sw-muted-mid">No recent activity yet.</p>
            ) : (
              activity.slice(0, 8).map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  {activityTypeIcon[event.type] ?? activityIcon.publish}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-light leading-snug text-sw-fg">{event.message}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-sw-muted-mid">
                      {event.timestampLabel}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-sw-border bg-white">
        <div className="flex items-center justify-between border-b border-sw-border px-5 py-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
            Top plugins
          </p>
          <Link
            href="/dashboard/plugins"
            className="font-mono text-[11px] text-sw-p1 transition-colors hover:text-sw-purple-shade"
          >
            View all →
          </Link>
        </div>
        <div className="divide-y divide-sw-border">
          {liveTop.length === 0 ? (
            <p className="px-5 py-6 text-sm font-light text-sw-muted-mid">No active plugins.</p>
          ) : (
            liveTop.map((plugin) => (
              <div
                key={plugin.id}
                className="flex flex-wrap items-center gap-3 px-5 py-4 transition-colors hover:bg-sw-p5/20"
              >
                <Link
                  href={`/dashboard/plugins/${plugin.slug}`}
                  className="group min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sw-focus/35"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-sw-fg group-hover:text-sw-purple-shade">
                      {plugin.name}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium ${statusBadge.live}`}
                    >
                      live
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-sw-muted-mid">
                    {plugin.slug} · {plugin.id.slice(0, 10)}…
                  </p>
                </Link>
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="font-mono text-xs font-medium text-sw-fg">
                      {(plugin.usageCount > BigInt(Number.MAX_SAFE_INTEGER)
                        ? Number.MAX_SAFE_INTEGER
                        : Number(plugin.usageCount)
                      ).toLocaleString()}
                    </p>
                    <p className="font-mono text-[10px] text-sw-muted-mid">usage</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-medium text-sw-fg">
                      {formatEther(plugin.earningsWei)} SOL
                    </p>
                    <p className="font-mono text-[10px] text-sw-muted-mid">earned</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-medium text-sw-fg">
                      <Link
                        className="text-sw-p1 hover:text-sw-purple-shade"
                        href={`/dashboard/plugins/${plugin.slug}`}
                      >
                        Open
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
