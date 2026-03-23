/**
 * Compute all primary metrics from raw Supabase data.
 *
 * @param {object} costSnapshot  - Row from war_cost_snapshots where is_primary = true
 * @param {object} empSnapshot   - Row from employment_snapshots where is_primary = true
 * @returns {object} metrics
 */
export function computeMetrics(costSnapshot, empSnapshot) {
  if (!costSnapshot || !empSnapshot) {
    return {
      totalCost: null,
      dailyCost: null,
      employedPeople: null,
      costPerWorker: null,
      costPerWorkerPerDay: null,
      snapshotDate: null,
      employmentDate: null,
    };
  }

  const totalCost = Number(costSnapshot.total_cost_usd);
  const dailyCost = Number(costSnapshot.estimated_daily_cost_usd);
  const employedPeople = Number(empSnapshot.employed_people);

  const costPerWorker =
    employedPeople > 0 ? totalCost / employedPeople : null;
  const costPerWorkerPerDay =
    employedPeople > 0 ? dailyCost / employedPeople : null;

  return {
    totalCost,
    dailyCost,
    employedPeople,
    costPerWorker,
    costPerWorkerPerDay,
    snapshotDate: costSnapshot.snapshot_date,
    employmentDate: empSnapshot.snapshot_date,
  };
}

/**
 * Compute funded units for a tradeoff item given total war cost.
 *
 * @param {number} totalCost      - Total war cost in USD
 * @param {number} unitCostUSD    - Cost per unit (e.g., per teacher per year)
 * @returns {number} How many units could theoretically be funded
 */
export function computeFundedUnits(totalCost, unitCostUSD) {
  if (!totalCost || !unitCostUSD || unitCostUSD <= 0) return null;
  return Math.floor(totalCost / unitCostUSD);
}

/**
 * Enrich tradeoff items with computed funded unit counts.
 *
 * @param {Array}  tradeoffItems  - Array of tradeoff_items rows
 * @param {number} totalCost      - Total war cost in USD
 * @returns {Array} Items with fundedUnits field added
 */
export function enrichTradeoffs(tradeoffItems, totalCost) {
  if (!tradeoffItems || !totalCost) return tradeoffItems ?? [];
  return tradeoffItems.map((item) => ({
    ...item,
    fundedUnits: computeFundedUnits(totalCost, Number(item.unit_cost_usd)),
  }));
}

/**
 * Build a chart-ready data series from war_cost_snapshots rows.
 * Returns array sorted by date, formatted for Recharts.
 *
 * @param {Array} snapshots - Array of war_cost_snapshots rows
 * @returns {Array} [{ date, totalCost, dailyCost, label }, ...]
 */
export function buildCostTimeSeries(snapshots) {
  if (!snapshots || snapshots.length === 0) return [];

  return snapshots
    .slice()
    .sort((a, b) => new Date(a.snapshot_date) - new Date(b.snapshot_date))
    .map((s) => ({
      date: s.snapshot_date,
      totalCost: Number(s.total_cost_usd),
      dailyCost: Number(s.estimated_daily_cost_usd),
      label: new Date(s.snapshot_date + "T00:00:00Z").toLocaleDateString(
        "en-US",
        { month: "short", year: "numeric", timeZone: "UTC" }
      ),
    }));
}
