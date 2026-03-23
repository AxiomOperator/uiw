"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function formatYAxis(value) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(0)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(0)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
  return `$${value}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0]?.value;
  let displayValue = "—";
  if (value != null) {
    if (value >= 1e9) displayValue = `$${(value / 1e9).toFixed(1)}B`;
    else if (value >= 1e6) displayValue = `$${(value / 1e6).toFixed(1)}M`;
    else displayValue = `$${value.toLocaleString()}`;
  }

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-lg">
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-muted-foreground">
        Total cost:{" "}
        <span className="font-semibold text-foreground">{displayValue}</span>
      </p>
    </div>
  );
}

/**
 * Area chart showing war cost trend over time.
 * @param {Array} data - Output of buildCostTimeSeries()
 */
export default function TrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground text-sm">
          No trend data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Estimated Cumulative Cost Over Time
        </CardTitle>
        <CardDescription className="text-xs">
          Total estimated war expenditure by month, based on public reporting
          and official budget documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="w-full"
          style={{ height: 260 }}
          role="img"
          aria-label="Area chart showing cumulative war cost rising over time"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
            >
              <defs>
                <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="oklch(0.65 0.15 240)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="oklch(0.65 0.15 240)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(1 0 0 / 8%)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11, fill: "oklch(0.556 0 0)" }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalCost"
                stroke="oklch(0.70 0.16 240)"
                strokeWidth={2}
                fill="url(#costGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "oklch(0.70 0.16 240)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
