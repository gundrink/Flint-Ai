import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { LoginGate } from "./login-gate";

function LoginFallback() {
  return (
    <div className="flex flex-1 flex-col text-sw-fg">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="h-4 w-48 animate-pulse rounded bg-sw-border" aria-hidden />
        <p className="sr-only">Loading…</p>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginGate />
    </Suspense>
  );
}
