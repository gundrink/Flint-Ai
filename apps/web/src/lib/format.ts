export function shortenAddress(address: string): string {
  if (address.length <= 8) return address;
  return `${address.slice(0, 4)}....${address.slice(-4)}`;
}

export function formatCa(ca: string): string {
  if (!ca) return "Not struck yet";
  return `CA : ${shortenAddress(ca)}`;
}

export function formatSol(lamports: number): string {
  const sol = lamports / 1_000_000_000;
  return sol.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function parseSolAmount(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  if (!/^\d+(\.\d{1,9})?$/.test(trimmed)) return null;
  const amount = Number(trimmed);
  if (!Number.isFinite(amount) || amount < 0 || amount > 100) return null;
  return amount;
}
