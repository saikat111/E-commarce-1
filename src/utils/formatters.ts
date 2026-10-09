/**
 * Currency & Number Formatters for Bangladeshi Taka (BDT)
 */

export function formatBDT(amount: number): string {
  return `৳${Math.round(amount).toLocaleString('en-US')}`;
}

export function formatBDTCompact(amount: number): string {
  if (amount >= 100000) {
    return `৳${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `৳${(amount / 1000).toFixed(1)}K`;
  }
  return `৳${amount}`;
}
