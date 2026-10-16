"use client";

import { useEffect, useMemo, useState } from "react";
import { TablePagination } from "@/components/table-pagination";
import { explorerTxUrl } from "@/lib/orbit-contracts";
import { paginateSlice } from "@/lib/paginate";

const PAGE_SIZE = 8;

export type RegistryTableRow = {
  pluginId: string;
  owner: string;
  name: string;
  version: string;
  transactionHash: string;
};

function shortAddr(a: string): string {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export function PluginRegistryTable({ plugins }: { plugins: RegistryTableRow[] }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [plugins.length]);

  const pageRows = useMemo(
    () => paginateSlice(plugins, page, PAGE_SIZE),
    [plugins, page],
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-sw-border font-mono text-[10px] uppercase tracking-[0.1em] text-sw-muted-mid">
              <th className="py-2 pr-3 font-medium">Name</th>
              <th className="py-2 pr-3 font-medium">Version</th>
              <th className="py-2 pr-3 font-medium">Publisher</th>
              <th className="py-2 font-medium">Details</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[11px]">
            {plugins.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center font-sans font-light text-sw-muted-mid">
                  No recent publications yet.
                </td>
              </tr>
            ) : (
              pageRows.map((p) => (
                <tr key={`${p.transactionHash}-${p.pluginId}`} className="border-b border-sw-border/80">
                  <td className="max-w-[140px] truncate py-2 pr-3 font-sans font-light text-sw-fg">
                    {p.name}
                  </td>
                  <td className="py-2 pr-3 text-sw-muted-mid">{p.version}</td>
                  <td className="py-2 pr-3 text-sw-muted-mid">{shortAddr(p.owner)}</td>
                  <td className="py-2">
                    <a
                      className="font-sans text-sm text-sw-p1 hover:text-sw-purple-shade"
                      href={explorerTxUrl(p.transactionHash as `0x${string}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View receipt
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        page={page}
        pageSize={PAGE_SIZE}
        totalItems={plugins.length}
        onPageChange={setPage}
        itemLabel="publications"
      />
    </>
  );
}
