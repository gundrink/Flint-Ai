import Link from "next/link";
import type { SkillPreview } from "@/lib/skills-types";
import { formatPricingLabel, isPayPerCall } from "@/lib/skills-types";

type SkillCardProps = {
  skill: SkillPreview;
};

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link
      href={`/plugins/${skill.slug}`}
      className="group flex flex-col rounded-2xl border border-sw-border bg-white p-5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-sw-p1 hover:bg-sw-p5 hover:shadow-[0_2px_24px_rgba(183,95,255,0.12)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate font-mono text-sm font-normal text-sw-fg">{skill.name}</span>
            {isPayPerCall(skill.pricing) ? (
              <span
                className="shrink-0 rounded-full border border-sw-p2/50 bg-sw-p5/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sw-purple-shade"
                title="Pay-per-call via escrow"
              >
                Paid
              </span>
            ) : (
              <span
                className="shrink-0 rounded-full border border-sw-border bg-sw-canvas px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sw-muted-mid"
                title="No per-call charge in marketplace config"
              >
                Free
              </span>
            )}
            {skill.verified ? (
              <span
                className="shrink-0 rounded-full bg-sw-p5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sw-purple-shade"
                title="Verified publisher"
              >
                Verified
              </span>
            ) : null}
          </div>
          <p className="line-clamp-2 text-sm font-light leading-relaxed text-sw-muted">
            {skill.summary}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-sw-border bg-sw-canvas px-2 py-0.5 font-mono text-[11px] font-light text-sw-muted-mid"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 font-mono text-[11px] font-light text-sw-muted-mid">
        <span className="text-sw-fg">{formatPricingLabel(skill.pricing)}</span>
        <span>{skill.downloads.toLocaleString()} installs</span>
      </div>
    </Link>
  );
}
