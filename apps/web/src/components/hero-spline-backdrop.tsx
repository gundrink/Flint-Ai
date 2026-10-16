"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full bg-gradient-to-b from-violet-200/25 via-transparent to-transparent"
      aria-hidden
    />
  ),
});

/** Same scene URL pattern as 0g.ai hero; swap for your own Spline export if needed. */
const SPLINE_SCENE =
  "https://prod.spline.design/8pPimd7NSLy2aRzO/scene.splinecode";

/**
 * Decorative Spline layer under the header / hero (transparent, non-interactive).
 * Mirrors `.spline_wrapper` + `.hero_spline` structure from 0g.ai.
 */
export function HeroSplineBackdrop() {
  return (
    <div
      className="spline_wrapper pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(50vh,480px)] select-none overflow-hidden md:h-[min(58vh,560px)]"
      aria-hidden
    >
      <div
        className="hero_spline absolute left-1/2 top-0 h-full w-[min(130%,1100px)] opacity-[0.42] motion-reduce:hidden md:opacity-[0.38]"
        style={{
          transform: "translate3d(-50%, 0, 0) scale3d(1.25, 1.25, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        <Spline
          scene={SPLINE_SCENE}
          className="!h-full !w-full min-h-[280px] [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-b from-transparent via-white/70 to-white md:h-44" />
    </div>
  );
}
