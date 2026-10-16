import { IconBadge, type IconName } from "@/components/landing/landing-icon";

const facts: {
  kicker: string;
  title: string;
  body: string;
  delay: string;
  icon: IconName;
}[] = [
  {
    kicker: "Wallet",
    title: "Solana mainnet",
    body: "Phantom or Solflare. No email login.",
    delay: "0s",
    icon: "wallet",
  },
  {
    kicker: "Price",
    title: "SOL per call",
    body: "Free, or a set amount each time an agent uses it.",
    delay: "0.6s",
    icon: "coin",
  },
  {
    kicker: "Install",
    title: "One command",
    body: "The listing prints it. The agent runs it locally.",
    delay: "1.2s",
    icon: "terminal",
  },
];

export function HeroStage() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
      <div className="relative mx-auto h-56 w-full" aria-hidden>
        <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2">
          <div className="size-full rounded-full border border-dashed border-sw-p2/80 motion-safe:animate-flint-spin" />
        </div>
        <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden">
          <div className="size-full rounded-full border border-sw-p1/50 motion-safe:animate-flint-spin-rev" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="size-3 rounded-full bg-sw-purple-shade shadow-[0_0_24px_#b75fff] motion-safe:animate-flint-pulse" />
        </div>
      </div>

      <ul className="relative z-[1] -mt-8 flex flex-col gap-4">
        {facts.map((fact, index) => (
          <li
            key={fact.title}
            className={`motion-safe:animate-flint-float rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_16px_40px_-24px_rgba(146,0,225,0.55)] backdrop-blur-sm ${
              index === 1 ? "ml-8 sm:ml-14" : index === 2 ? "ml-3 sm:ml-6" : "ml-0"
            }`}
            style={{ animationDelay: fact.delay }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-sw-purple-shade">
                  {fact.kicker}
                </p>
                <p className="mt-1 text-lg font-medium tracking-tight text-sw-fg">{fact.title}</p>
              </div>
              <IconBadge name={fact.icon} />
            </div>
            <p className="mt-2 text-sm font-light leading-relaxed text-sw-muted">{fact.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
