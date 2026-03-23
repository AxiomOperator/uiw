import Link from "next/link";
import { ArrowRight, AlertCircle, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { computeMetrics, enrichTradeoffs, buildCostTimeSeries } from "@/lib/calculations";
import { formatUSD, formatDate } from "@/lib/formatters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetricCard from "@/components/MetricCard";
import TradeoffCard from "@/components/TradeoffCard";
import TrendChart from "@/components/TrendChart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Iran War Cost Tracker — The Cost to Working Americans",
  description:
    "A public accountability dashboard tracking the estimated financial cost of the Iran war to the American people, with a focus on employed U.S. adults.",
};

async function getData() {
  try {
    const [costRes, empRes, tradeoffRes, sourcesRes, allCostRes] =
      await Promise.all([
        supabase
          .from("war_cost_snapshots")
          .select("*")
          .eq("is_primary", true)
          .single(),
        supabase
          .from("employment_snapshots")
          .select("*")
          .eq("is_primary", true)
          .single(),
        supabase
          .from("tradeoff_items")
          .select("*")
          .eq("is_featured", true)
          .order("display_order"),
        supabase
          .from("site_sources")
          .select("*")
          .limit(4)
          .order("created_at", { ascending: false }),
        supabase
          .from("war_cost_snapshots")
          .select("*")
          .order("snapshot_date"),
      ]);

    return {
      costSnapshot: costRes.data ?? null,
      empSnapshot: empRes.data ?? null,
      tradeoffItems: tradeoffRes.data ?? [],
      sources: sourcesRes.data ?? [],
      allSnapshots: allCostRes.data ?? [],
      error: costRes.error || empRes.error || null,
    };
  } catch (err) {
    console.error("[HomePage] Supabase fetch failed:", err);
    return {
      costSnapshot: null,
      empSnapshot: null,
      tradeoffItems: [],
      sources: [],
      allSnapshots: [],
      error: err,
    };
  }
}

export default async function HomePage() {
  const { costSnapshot, empSnapshot, tradeoffItems, sources, allSnapshots, error } =
    await getData();

  const metrics = computeMetrics(costSnapshot, empSnapshot);
  const enrichedTradeoffs = enrichTradeoffs(tradeoffItems, metrics.totalCost);
  const chartData = buildCostTimeSeries(allSnapshots);

  const hasData = metrics.totalCost != null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="border-b border-border/40 bg-gradient-to-b from-card/30 to-transparent">
          <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4 text-xs font-medium text-muted-foreground border-border/60">
                Public Accountability Dashboard
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                The Cost of the Iran War to{" "}
                <span className="text-primary/80">Working Americans</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                This dashboard estimates the financial cost of U.S. military
                operations in the Iran conflict and translates that burden into
                concrete terms for the 161 million employed Americans who fund
                it through their taxes.
              </p>

              {metrics.snapshotDate && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Last updated:{" "}
                  <span className="font-medium text-foreground">
                    {formatDate(metrics.snapshotDate)}
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/methodology">
                    How We Calculate This
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sources">View Sources</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Data notice ─────────────────────────────────────── */}
        {!hasData && (
          <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Database not connected</p>
                <p className="text-xs mt-0.5 text-amber-400/80">
                  Add your Supabase credentials to .env.local to see live data.
                  See the README for setup instructions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Primary metrics ──────────────────────────────────── */}
        <section
          aria-labelledby="metrics-heading"
          className="container mx-auto max-w-6xl px-4 py-12 sm:px-6"
        >
          <h2
            id="metrics-heading"
            className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Key Estimates
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Based on current public reporting. All figures are estimates.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Estimated Total Cost"
              value={
                hasData
                  ? formatUSD(metrics.totalCost, { compact: true })
                  : "—"
              }
              subtitle={
                hasData
                  ? `As of ${formatDate(metrics.snapshotDate)}`
                  : "Connect Supabase to load data"
              }
              badge="Estimated"
            />
            <MetricCard
              label="Estimated Cost Per Day"
              value={
                hasData
                  ? formatUSD(metrics.dailyCost, { compact: true })
                  : "—"
              }
              subtitle="Current daily operational burn rate"
              badge="Estimated"
            />
            <MetricCard
              label="Cost Per Employed American"
              value={
                hasData && metrics.costPerWorker != null
                  ? formatUSD(metrics.costPerWorker, { compact: true, decimals: 0 })
                  : "—"
              }
              subtitle={
                hasData
                  ? `Across ${Intl.NumberFormat("en-US").format(metrics.employedPeople)} employed civilians`
                  : undefined
              }
              badge="Estimated"
            />
            <MetricCard
              label="Cost Per Employed American / Day"
              value={
                hasData && metrics.costPerWorkerPerDay != null
                  ? formatUSD(metrics.costPerWorkerPerDay, { compact: true, decimals: 2 })
                  : "—"
              }
              subtitle="Daily share of the ongoing operational cost"
              badge="Estimated"
            />
          </div>
        </section>

        <Separator className="mx-auto max-w-6xl opacity-30" />

        {/* ── Trend chart ──────────────────────────────────────── */}
        <section
          aria-labelledby="trend-heading"
          className="container mx-auto max-w-6xl px-4 py-12 sm:px-6"
        >
          <h2
            id="trend-heading"
            className="mb-2 text-sm font-semibold text-foreground"
          >
            Cost Trajectory
          </h2>
          <p className="mb-6 text-xs text-muted-foreground">
            Estimated cumulative cost since the start of operations, by month.
          </p>
          <TrendChart data={chartData} />
        </section>

        <Separator className="mx-auto max-w-6xl opacity-30" />

        {/* ── Tradeoffs ────────────────────────────────────────── */}
        <section
          aria-labelledby="tradeoffs-heading"
          className="container mx-auto max-w-6xl px-4 py-12 sm:px-6"
        >
          <h2
            id="tradeoffs-heading"
            className="mb-2 text-sm font-semibold text-foreground"
          >
            What This Money Could Have Funded
          </h2>
          <p className="mb-2 text-xs text-muted-foreground max-w-2xl">
            For context, here is what the estimated total war expenditure could
            theoretically fund at current domestic program costs.
          </p>
          <p className="mb-8 text-xs text-muted-foreground/70 italic">
            Comparisons are illustrative and do not imply direct trade-off
            decisions. Figures use publicly reported unit costs.
          </p>

          {enrichedTradeoffs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {enrichedTradeoffs.map((item) => (
                <TradeoffCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No tradeoff data available. Connect Supabase to load items.
            </p>
          )}
        </section>

        <Separator className="mx-auto max-w-6xl opacity-30" />

        {/* ── Methodology teaser ───────────────────────────────── */}
        <section
          aria-labelledby="methodology-teaser-heading"
          className="container mx-auto max-w-6xl px-4 py-12 sm:px-6"
        >
          <div className="rounded-xl border border-border/50 bg-card/50 p-8 sm:p-10">
            <Badge variant="outline" className="mb-4 text-xs border-border/60 text-muted-foreground">
              Methodology
            </Badge>
            <h2
              id="methodology-teaser-heading"
              className="text-xl sm:text-2xl font-bold text-foreground mb-3"
            >
              How These Estimates Are Calculated
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
              This dashboard uses official DoD budget requests, CBO cost
              estimates, and independent defense budget analysis to derive total
              and daily cost figures. The "per employed American" metric divides
              total cost by the Bureau of Labor Statistics count of employed
              civilians. All figures are clearly labeled as estimates.
            </p>
            <Button variant="outline" asChild>
              <Link href="/methodology">
                Read Full Methodology
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── Sources snippet ──────────────────────────────────── */}
        {sources.length > 0 && (
          <>
            <Separator className="mx-auto max-w-6xl opacity-30" />
            <section
              aria-labelledby="sources-teaser-heading"
              className="container mx-auto max-w-6xl px-4 py-12 sm:px-6"
            >
              <h2
                id="sources-teaser-heading"
                className="mb-6 text-sm font-semibold text-foreground"
              >
                Key Sources
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {sources.slice(0, 4).map((source) => (
                  <a
                    key={source.id}
                    href={source.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 rounded-lg border border-border/40 bg-card/50 px-4 py-3 hover:border-border transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className="w-fit text-xs border-border/50 text-muted-foreground"
                    >
                      {source.category}
                    </Badge>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {source.title}
                    </p>
                    {source.publisher && (
                      <p className="text-xs text-muted-foreground">
                        {source.publisher}
                      </p>
                    )}
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/sources">
                    View All Sources
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
