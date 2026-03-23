/**
 * Format a number as USD currency.
 * For large values uses compact notation (e.g., $185.0B, $1.15B, $7.50).
 */
export function formatUSD(value, options = {}) {
  if (value == null || Number.isNaN(value)) return "—";

  const { compact = false, decimals } = options;

  if (compact) {
    const abs = Math.abs(value);
    if (abs >= 1e12) {
      const d = decimals ?? 1;
      return `$${(value / 1e12).toFixed(d)}T`;
    }
    if (abs >= 1e9) {
      const d = decimals ?? 1;
      return `$${(value / 1e9).toFixed(d)}B`;
    }
    if (abs >= 1e6) {
      const d = decimals ?? 1;
      return `$${(value / 1e6).toFixed(d)}M`;
    }
    if (abs >= 1e3) {
      const d = decimals ?? 0;
      return `$${(value / 1e3).toFixed(d)}K`;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals ?? 2,
      maximumFractionDigits: decimals ?? 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? 0,
  }).format(value);
}

/**
 * Format a large integer count compactly (e.g., 161,200,000 → "161.2M").
 */
export function formatCount(value, options = {}) {
  if (value == null || Number.isNaN(value)) return "—";

  const { decimals = 1 } = options;
  const abs = Math.abs(value);

  if (abs >= 1e9) return `${(value / 1e9).toFixed(decimals)}B`;
  if (abs >= 1e6) return `${(value / 1e6).toFixed(decimals)}M`;
  if (abs >= 1e3) return `${(value / 1e3).toFixed(decimals)}K`;

  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Format a large integer with full comma separation (e.g., 161,200,000).
 */
export function formatInteger(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

/**
 * Format a date string (ISO) as a human-readable string.
 * e.g., "2026-03-01" → "March 1, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Format a compact count for tradeoff items.
 * e.g., 2466666 → "2.5M" or 12345 → "12,345"
 */
export function formatFundedUnits(value) {
  if (value == null || Number.isNaN(value)) return "—";

  const rounded = Math.floor(value);
  if (rounded >= 1e9) return `${(rounded / 1e9).toFixed(1)}B`;
  if (rounded >= 1e6) return `${(rounded / 1e6).toFixed(1)}M`;
  if (rounded >= 1e3) {
    return new Intl.NumberFormat("en-US").format(rounded);
  }
  return String(rounded);
}
