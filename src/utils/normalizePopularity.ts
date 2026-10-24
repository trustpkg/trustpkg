const BILLION = 1_000_000_000;
const MILLION = 1_000_000;
const THOUSAND = 1_000;

export function normalizePopularity(value?: number): string {
  if (!value) {
    return ""
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (absValue >= BILLION) {
    return `${sign}${Math.floor((absValue / BILLION) * 100) / 100} Bln`;
  }

  if (absValue >= MILLION) {
    return `${sign}${Math.floor((absValue / MILLION) * 100) / 100} Mln`;
  }

  if (absValue >= THOUSAND) {
    return `${sign}${Math.floor((absValue / THOUSAND) * 100) / 100} K`;
  }

  return String(value);
}