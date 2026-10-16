import type { ReactNode } from "react";

export const iconNames = [
  "wallet",
  "coin",
  "terminal",
  "file",
  "search",
  "tag",
  "layout",
  "key",
  "spark",
  "pen",
  "bot",
  "arrow",
  "globe",
  "box",
] as const;

export type IconName = (typeof iconNames)[number];

type LandingIconProps = {
  name: IconName;
  className?: string;
};

export function LandingIcon({ name, className = "size-4" }: LandingIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {mark[name]}
    </svg>
  );
}

export function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sw-p5 text-sw-purple-shade">
      <LandingIcon name={name} className="size-[18px]" />
    </span>
  );
}

const mark: Record<IconName, ReactNode> = {
  wallet: (
    <>
      <path d="M4 8.5h16v10.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 18.7V8.5Z" />
      <path d="M4 8.5 6.4 5h11.2L20 8.5" />
      <path d="M15.5 13.5H20" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8.2v7.6M9.4 10.1h3.4a1.7 1.7 0 0 1 0 3.4H9.4" />
    </>
  ),
  terminal: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="m7.5 9.5 3 2.5-3 2.5M12.5 15h4" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h6.5L19 9v11.5H7V3.5Z" />
      <path d="M13.5 3.5V9H19" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m15.8 15.8 4.2 4.2" />
    </>
  ),
  tag: (
    <>
      <path d="M4 12.2 12.2 4H20v7.8L11.8 20 4 12.2Z" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4" width="7.5" height="6.5" rx="1.2" />
      <rect x="13" y="4" width="7.5" height="3.5" rx="1.2" />
      <rect x="13" y="9.5" width="7.5" height="10.5" rx="1.2" />
      <rect x="3.5" y="12.5" width="7.5" height="7.5" rx="1.2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14" r="3.2" />
      <path d="M11 14h9M17.2 14v2.6M14.4 14v2" />
    </>
  ),
  spark: <path d="M12 2.8 13.7 9.2 20.2 12 13.7 14.8 12 21.2 10.3 14.8 3.8 12 10.3 9.2 12 2.8Z" />,
  pen: (
    <>
      <path d="m4.5 19.5 4.1-1.1L19.2 7.8a2 2 0 0 0-2.8-2.8L5.8 15.6 4.5 19.5Z" />
      <path d="m14.2 6.8 3 3" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="10.5" rx="3" />
      <path d="M12 8V4.5" />
      <circle cx="12" cy="4.2" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="9.2" cy="13" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="13" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.2 2.4 3.3 5.1 3.3 8S14.2 17.6 12 20c-2.2-2.4-3.3-5.1-3.3-8S9.8 6.4 12 4Z" />
    </>
  ),
  box: (
    <>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M12 12.2 20 8M12 12.2 4 8M12 12.2V20.5" />
    </>
  ),
};
