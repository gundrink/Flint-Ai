"use client";

type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
};

export function TablePagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  itemLabel = "rows",
}: TablePaginationProps) {
  const pages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), pages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  if (totalItems <= pageSize) {
    return (
      <p className="border-t border-sw-border px-4 py-3 text-center font-mono text-[11px] text-sw-muted-mid">
        {totalItems === 0 ? `No ${itemLabel}` : `${totalItems} ${itemLabel}`}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 border-t border-sw-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[11px] text-sw-muted-mid">
        {start}–{end} of {totalItems} {itemLabel}
      </p>
      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="rounded-full border border-sw-border bg-white px-3.5 py-1.5 text-sm font-medium text-sw-fg transition-colors hover:border-sw-p2/60 hover:bg-sw-p5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <span className="min-w-[4.5rem] text-center font-mono text-[11px] text-sw-muted-mid">
          {safePage} / {pages}
        </span>
        <button
          type="button"
          disabled={safePage >= pages}
          onClick={() => onPageChange(safePage + 1)}
          className="rounded-full border border-sw-border bg-white px-3.5 py-1.5 text-sm font-medium text-sw-fg transition-colors hover:border-sw-p2/60 hover:bg-sw-p5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
