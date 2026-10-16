/** Display a 18-decimal token amount. The catalog stores prices this way. */
export function formatEther(wei: bigint): string {
  const base = BigInt(10) ** BigInt(18);
  const whole = wei / base;
  const fraction = (wei % base).toString().padStart(18, "0").replace(/0+$/, "");
  return fraction ? `${whole.toString()}.${fraction}` : whole.toString();
}
