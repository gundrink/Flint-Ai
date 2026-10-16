"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatEther } from "@/lib/amount";
import { TablePagination } from "@/components/table-pagination";
import type { DashboardPluginRow } from "@/lib/orbit-data";
import { paginateSlice } from "@/lib/paginate";

const PAGE_SIZE = 10;

const statusBadge: Record<"live" | "retired", string> = {
  live: "bg-emerald-50 text-emerald-700 border-emerald-200",
  retired: "bg-gray-100 text-gray-500 border-gray-200",
};

const statusDot: Record<"live" | "retired", string> = {
  live: "bg-emerald-500",
  retired: "bg-gray-300",
};

function PricingBadge({
  pricing,
}: {
  pricing: { kind: "free" } | { kind: "pay-per-call"; amount: string; token: string };
}) {
  if (pricing.kind === "free") {
    return (
      <span className="rounded-full border border-sw-border bg-sw-canvas px-2 py-0.5 font-mono text-[10px] text-sw-muted-mid">
        Free
      </span>
    );
  }
  return (
    <span className="rounded-full border border-sw-p2/50 bg-sw-p5/80 px-2 py-0.5 font-mono text-[10px] text-sw-purple-shade">
      {pricing.amount} {pricing.token}/call
    </span>
  );
}

export function DashboardPluginsTable({ rows }: { rows: DashboardPluginRow[] }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [rows.length]);

  const pageRows = useMemo(() => paginateSlice(rows, page, PAGE_SIZE), [rows, page]);

  return (
    <div className="overflow-hidden rounded-2xl border border-sw-border bg-white">
      <div className="hidden grid-cols-[1fr_120px_90px_120px_80px] gap-4 border-b border-sw-border px-5 py-3 md:grid">
        {["Plugin", "Pricing", "Usage", "Earnings", "Status"].map((col) => (
          <p
            key={col}
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-sw-muted-mid last:text-right"
          >
            {col}
          </p>
        ))}
      </div>

      <div className="divide-y divide-sw-border">
        {rows.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm font-light text-sw-muted-mid">
            No plugins yet. Connect your wallet and publish your first plugin.
          </p>
        ) : (
          pageRows.map((row) => (
            <Link
              key={row.pluginId}
              href={`/dashboard/plugins/${row.slug}`}
              className="group grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-sw-p5/30 focus-visible:bg-sw-p5/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sw-focus/35 md:grid-cols-[1fr_120px_90px_120px_80px] md:items-center md:gap-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusDot[row.status]}`}
                    aria-hidden
                  />
                  <span className="font-mono text-sm font-normal text-sw-fg group-hover:text-sw-purple-shade">
                    {row.name}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-sw-muted-mid">{row.slug}</p>
                <p className="mt-1 font-mono text-[10px] text-sw-muted-mid">
                  Published{" "}
                  {new Date(row.publishedAtIso).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="md:justify-self-start">
                <PricingBadge pricing={row.pricing} />
              </div>

              <div>
                <p className="font-mono text-sm text-sw-fg md:text-xs">
                  {row.totalCalls.toLocaleString()}
                </p>
                <p className="font-mono text-[10px] text-sw-muted-mid md:hidden">usage</p>
              </div>

              <div>
                <p className="font-mono text-sm text-sw-fg md:text-xs">
                  {formatEther(BigInt(row.earningsWei))} SOL
                </p>
                <p className="font-mono text-[10px] text-sw-muted-mid md:hidden">earned</p>
              </div>

              <div className="flex items-center justify-between gap-2 md:justify-end">
                <span
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium capitalize ${statusBadge[row.status]}`}
                >
                  {row.status}
                </span>
                <span
                  className="font-mono text-[10px] text-sw-muted-mid transition-colors group-hover:text-sw-p1 md:hidden"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      <TablePagination
        page={page}
        pageSize={PAGE_SIZE}
        totalItems={rows.length}
        onPageChange={setPage}
        itemLabel="plugins"
      />
    </div>
  );
}
