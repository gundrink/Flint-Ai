/** https://www.npmjs.com/package/@orbit-0g/sdk — OpenClaw + Orbit on 0G Galileo */

export const ORBIT_SDK_NPM = "@orbit-0g/sdk";
export const ORBIT_SDK_DOCS_URL = "https://www.npmjs.com/package/@orbit-0g/sdk";

export type OrbitSdkPackageManager = "npm" | "pnpm" | "bun";

export const orbitSdkInstallCommands: Record<
  OrbitSdkPackageManager,
  { label: string; command: string }
> = {
  npm: { label: "npm", command: `npm i ${ORBIT_SDK_NPM}` },
  pnpm: { label: "pnpm", command: `pnpm add ${ORBIT_SDK_NPM}` },
  bun: { label: "bun", command: `bun add ${ORBIT_SDK_NPM}` },
};

/** Recommended: OpenClaw gateway wallet (shared across plugins). */
export function openClawWalletSetupCommand(): string {
  return "openclaw orbit wallet setup";
}

/** Standalone wallet setup from @orbit-0g/sdk. */
export function orbitInstallCliCommand(): string {
  return "npx orbit-install";
}

/** Install a published plugin from ClawHub (per SDK README). */
export function openClawInstallCommand(slug: string): string {
  return `openclaw plugins install clawhub:${slug}`;
}

export type PluginInstallStep = {
  step: number;
  title: string;
  command: string;
  hint?: string;
};

export function pluginInstallSteps(slug: string): PluginInstallStep[] {
  return [
    {
      step: 1,
      title: "Set up wallet (once)",
      command: openClawWalletSetupCommand(),
      hint: "Or run npx orbit-install — stores your key in ~/.orbit/.env for paid plugins.",
    },
    {
      step: 2,
      title: "Install this plugin",
      command: openClawInstallCommand(slug),
      hint: "Uses the ClawHub package for this listing’s slug.",
    },
  ];
}
