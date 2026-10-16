import Link from "next/link";
import { PluginInstallCommand } from "@/components/plugin-install-command";
import type { OrbitPluginWithBilling } from "@/lib/orbit-contracts";
import { orbitPluginToSkillPreview } from "@/lib/skills-from-orbit";
import { formatPricingLabel, isPayPerCall } from "@/lib/skills-types";
import { formatEther } from "@/lib/amount";

const statusBadge = {
  live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  retired: "bg-gray-100 text-gray-500 border-gray-200",
} as const;

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
      className={`flex flex-col gap-2 rounded-xl border p-4 ${
        accent
          ? "border-sw-p2/40 bg-gradient-to-br from-sw-p5 to-white"
          : "border-sw-border bg-white"
      }`}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-sw-muted-mid">
        {label}
      </p>
      <p className="text-2xl font-light tracking-tight text-sw-fg">{value}</p>
      {sub ? <p className="text-xs font-light text-sw-muted-mid">{sub}</p> : null}
    </div>
  );
}

type PluginDetailViewProps = {
  plugin: OrbitPluginWithBilling;
  backHref: string;
  backLabel: string;
  showPublishAction?: boolean;
};

export function PluginDetailView({
  plugin,
  backHref,
  backLabel,
  showPublishAction = false,
}: PluginDetailViewProps) {
  const preview = orbitPluginToSkillPreview(plugin);
  const status = plugin.isActive ? "live" : "retired";
  const usageCount =
    plugin.usageCount > BigInt(Number.MAX_SAFE_INTEGER)
      ? Number.MAX_SAFE_INTEGER
      : Number(plugin.usageCount);
  const installCount =
    plugin.installCount > BigInt(Number.MAX_SAFE_INTEGER)
      ? Number.MAX_SAFE_INTEGER
      : Number(plugin.installCount);

  return (
    <div className="space-y-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm font-medium text-sw-muted-mid transition-colors hover:text-sw-purple-shade"
      >
        <span aria-hidden>←</span> {backLabel}
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${plugin.isActive ? "bg-emerald-500" : "bg-gray-300"}`}
              aria-hidden
            />
            <h1 className="font-mono text-2xl font-normal tracking-tight text-sw-fg sm:text-3xl">
              {preview.name}
            </h1>
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusBadge[status]}`}
            >
              {status}
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] text-sw-muted-mid">
            {plugin.slug} · v{plugin.version}
          </p>
        </div>
        {showPublishAction ? (
          <Link
            href="/dashboard/publish"
            className="inline-flex shrink-0 items-center rounded-full border border-sw-border bg-white px-4 py-2 text-sm font-medium text-sw-fg transition-colors hover:border-sw-p2/60 hover:bg-sw-p5"
          >
            Publish update
          </Link>
        ) : null}
      </div>

      <p className="max-w-3xl text-sm font-light leading-relaxed text-sw-muted">{preview.summary}</p>

      {preview.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {preview.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sw-border bg-white px-2.5 py-1 font-mono text-[10px] text-sw-muted-mid"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <PluginInstallCommand slug={plugin.slug} pluginName={preview.name} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Installs" value={installCount.toLocaleString()} accent />
        <StatCard label="Usage" value={usageCount.toLocaleString()} />
        <StatCard
          label="Earnings"
          value={`${formatEther(plugin.earningsWei)} SOL`}
          accent
        />
        <StatCard label="Pricing" value={formatPricingLabel(preview.pricing)} />
      </div>

      <div className="rounded-2xl border border-sw-border bg-white p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
          Pricing
        </p>
        <p className="mt-3 font-mono text-lg font-normal text-sw-fg">
          {formatPricingLabel(preview.pricing)}
        </p>
        <p className="mt-2 font-mono text-xs text-sw-muted-mid">
          Install: {formatEther(plugin.pricePerInstall)} SOL · per use:{" "}
          {formatEther(plugin.pricePerUsage)} SOL
        </p>
        <p className="mt-3 text-sm font-light leading-relaxed text-sw-muted">
          {isPayPerCall(preview.pricing)
            ? "Users pay per install or per use according to the prices above."
            : "Free to install and use — no per-call charges."}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sw-border bg-white">
        <p className="border-b border-sw-border px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
          Details
        </p>
        <dl className="divide-y divide-sw-border font-mono text-xs">
          {(
            [
              ["Slug", plugin.slug],
              ["Version", plugin.version],
              ["Publisher", plugin.owner],
            ] as const
          ).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="text-sw-muted-mid">{key}</dt>
              <dd className="break-all text-sw-fg sm:max-w-[65%] sm:text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {showPublishAction ? (
        <div className="rounded-xl border border-sw-border bg-sw-p5/40 px-4 py-3.5">
          <p className="text-sm font-medium text-sw-fg">Withdraw earnings</p>
          <p className="mt-0.5 text-xs font-light text-sw-muted-mid">
            Earnings can be withdrawn to your wallet from the publisher dashboard when you&apos;re ready.
          </p>
        </div>
      ) : null}
    </div>
  );
}
