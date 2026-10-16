/** Internal path only — avoids open redirects via `returnUrl` query. */
export function safeReturnPath(raw: string | null | undefined): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  if (raw.includes("\\") || raw.includes("\n") || raw.includes("@")) return "/dashboard";
  return raw;
}
