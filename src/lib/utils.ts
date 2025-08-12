import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Parse currency strings like "$22.99", "14.799,00 TL", "1,299.50" into a numeric value
export function parseCurrencyToNumber(rawPrice: string | number): number {
  if (typeof rawPrice === 'number') return rawPrice;
  if (!rawPrice) return 0;

  const trimmed = String(rawPrice).trim();
  // Detect comma decimal format
  const hasCommaDecimal = /\d,\d{1,2}$/.test(trimmed) || (trimmed.includes(',') && (trimmed.split(',').pop() || '').length <= 2);

  // Keep only digits and separators for normalization
  let normalized = trimmed.replace(/[^0-9,.-]/g, '');

  if (hasCommaDecimal) {
    // 14.799,00 -> 14799.00
    normalized = normalized.replace(/\./g, '').replace(',', '.');
  } else {
    // Remove thousands commas if any
    const dotParts = normalized.split('.');
    if (dotParts.length > 2) normalized = normalized.replace(/,/g, '');
  }

  const numeric = parseFloat(normalized);
  return Number.isFinite(numeric) ? numeric : 0;
}