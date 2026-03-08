export function formatCHF(value: number): string {
  const rounded = Math.round(value);
  const parts = rounded.toString().split("");
  const out: string[] = [];
  for (let i = 0; i < parts.length; i += 1) {
    const fromEnd = parts.length - i;
    out.push(parts[i]);
    if (fromEnd > 1 && fromEnd % 3 === 1) out.push("’");
  }
  return `CHF ${out.join("")}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
