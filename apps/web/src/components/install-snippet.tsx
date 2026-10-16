"use client";

import { useCallback, useState } from "react";
import {
  ORBIT_SDK_DOCS_URL,
  ORBIT_SDK_NPM,
  type OrbitSdkPackageManager,
  orbitSdkInstallCommands,
} from "@/lib/plugin-install-command";

export function InstallSnippet() {
  const [active, setActive] = useState<OrbitSdkPackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const selected = orbitSdkInstallCommands[active];
  const command = selected.command;

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [command]);

  return (
    <div className="overflow-hidden rounded-2xl border border-sw-border bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap gap-1 border-b border-sw-border p-1">
        {(Object.keys(orbitSdkInstallCommands) as OrbitSdkPackageManager[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`rounded-xl px-3 py-2 font-mono text-xs font-light transition-[background-color,color] duration-300 ${
              active === id
                ? "bg-black text-white"
                : "text-sw-muted hover:bg-black/[0.05] hover:text-sw-fg"
            }`}
          >
            {orbitSdkInstallCommands[id].label}
          </button>
        ))}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-sm font-light leading-relaxed text-sw-purple-shade">
            <code>{command}</code>
          </pre>
          <button
            type="button"
            onClick={() => void copy()}
            className="shrink-0 self-start rounded-full border border-sw-border bg-white px-4 py-2 text-sm font-medium text-sw-fg transition-colors hover:border-sw-p2/60 hover:bg-sw-p5 sm:self-center"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-3 text-xs font-light text-sw-muted">
          FlintAi SDK for publishing plugins on Solana — includes{" "}
          <span className="font-mono text-sw-fg">orbit-init</span>,{" "}
          <span className="font-mono text-sw-fg">orbit-publish</span>, and{" "}
          <span className="font-mono text-sw-fg">orbit-install</span>. See{" "}
          <a
            href={ORBIT_SDK_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sw-p1 hover:text-sw-purple-shade"
          >
            {ORBIT_SDK_NPM}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
