"use client";

import { useCallback, useState } from "react";
import {
  ORBIT_SDK_DOCS_URL,
  ORBIT_SDK_NPM,
  pluginInstallSteps,
} from "@/lib/plugin-install-command";

type PluginInstallCommandProps = {
  slug: string;
  pluginName: string;
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="shrink-0 rounded-full border border-sw-border bg-white px-4 py-2 text-sm font-medium text-sw-fg transition-colors hover:border-sw-p2/60 hover:bg-sw-p5"
    >
      {copied ? "Copied" : label}
    </button>
  );
}

export function PluginInstallCommand({ slug, pluginName }: PluginInstallCommandProps) {
  const steps = pluginInstallSteps(slug);
  const allCommands = steps.map((s) => s.command).join("\n");

  return (
    <section className="overflow-hidden rounded-2xl border border-sw-border bg-white">
      <div className="border-b border-sw-border px-5 py-3">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-sw-muted-mid">
          Install with OpenClaw
        </p>
        <p className="mt-1 text-sm font-light text-sw-muted">
          Commands from{" "}
          <a
            href={ORBIT_SDK_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sw-p1 hover:text-sw-purple-shade"
          >
            {ORBIT_SDK_NPM}
          </a>{" "}
          — add <span className="font-medium text-sw-fg">{pluginName}</span> to your agent.
        </p>
      </div>

      <ol className="divide-y divide-sw-border">
        {steps.map(({ step, title, command, hint }) => (
          <li key={step} className="space-y-3 p-4 sm:p-5">
            <div className="flex items-baseline gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sw-p5 font-mono text-[11px] font-semibold text-sw-purple-shade">
                {step}
              </span>
              <p className="text-sm font-medium text-sw-fg">{title}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <pre className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-sw-border bg-sw-p5/30 px-4 py-3 font-mono text-sm font-light leading-relaxed text-sw-purple-shade">
                <code>{command}</code>
              </pre>
              <CopyButton text={command} label="Copy" />
            </div>
            {hint ? <p className="text-xs font-light text-sw-muted-mid">{hint}</p> : null}
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sw-border px-5 py-3">
        <p className="text-xs font-light text-sw-muted-mid">
          Paid plugins settle in SOL. Free plugins skip billing.
        </p>
        <CopyButton text={allCommands} label="Copy all" />
      </div>
    </section>
  );
}
