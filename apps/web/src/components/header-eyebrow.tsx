import type { ReactNode } from "react";

type HeaderEyebrowProps = {
  children: ReactNode;
};

/**
 * Matches 0g.ai `.header-eyebrow` (pill tint, purple dot, Geistmono uppercase).
 * Reference: https://0g.ai/
 */
export function HeaderEyebrow({ children }: HeaderEyebrowProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-[1000px] bg-[#b75fff26] px-2.5 py-1.5">
      <div
        className="aspect-square w-[0.3125rem] shrink-0 rounded-full bg-sw-p1"
        aria-hidden
      />
      <div className="font-mono text-xs font-medium uppercase leading-none tracking-wide text-sw-p1">
        {children}
      </div>
    </div>
  );
}
