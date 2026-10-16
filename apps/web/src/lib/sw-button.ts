/**
 * Class bundles aligned with 0g.ai Webflow `.button`, `.is-secondary`, `.is-nav`
 * (shared CSS: black CTA, hover `--purple-shade` #9200e1, secondary frosted + purple hover).
 * Reference: https://0g.ai/
 */
export const swBtnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-[0.6875rem] text-center text-base font-medium leading-tight text-white transition-[background-color] duration-300 hover:bg-[#9200e1]";

export const swBtnPrimarySm =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-2 text-center text-sm font-medium leading-tight text-white transition-[background-color] duration-300 hover:bg-[#9200e1]";

export const swBtnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-black/20 bg-black/[0.05] px-5 py-[0.6875rem] text-center text-base font-medium leading-tight text-black transition-[border-color,background-color] duration-300 hover:border-[#b75fff] hover:bg-[#f3e6fe]";

export const swBtnSecondarySm =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-black/20 bg-black/[0.05] px-4 py-2 text-center text-sm font-medium leading-tight text-black transition-[border-color,background-color] duration-300 hover:border-[#b75fff] hover:bg-[#f3e6fe]";

export const swBtnNavSm =
  "inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-4 py-2 text-center text-sm font-semibold leading-snug tracking-tight text-black shadow-[0_2px_12px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)_inset] transition-[background-color,box-shadow] duration-300 hover:bg-[#e3c1ff] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]";

/** Matches 0g.ai `.button.is-nav` (desktop Docs CTA). */
export const swBtnNav =
  "inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-[1.125rem] pb-3.5 pt-4 text-center text-base font-semibold leading-snug tracking-tight text-black shadow-[0_2px_16px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.95)_inset] transition-[background-color,box-shadow] duration-300 hover:bg-[#e3c1ff] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]";
