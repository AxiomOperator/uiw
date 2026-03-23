import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatFundedUnits, formatUSD } from "@/lib/formatters";

const CATEGORY_COLORS = {
  Education: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Healthcare: "bg-green-500/10 text-green-400 border-green-500/20",
  Veterans: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Housing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Infrastructure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Public Safety": "bg-red-500/10 text-red-400 border-red-500/20",
  Families: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

/**
 * Card showing a single "what this could have funded" tradeoff item.
 *
 * @param {object} item - tradeoff_items row with fundedUnits added
 */
export default function TradeoffCard({ item }) {
  const categoryClass =
    CATEGORY_COLORS[item.category] ??
    "bg-muted/50 text-muted-foreground border-border";

  return (
    <Card className="flex flex-col border-border/50 bg-card/80 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold leading-snug text-foreground">
            {item.name}
          </CardTitle>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-xs border", categoryClass)}
          >
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-3">
        {item.fundedUnits != null && (
          <div>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              {formatFundedUnits(item.fundedUnits)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              could be funded
            </p>
          </div>
        )}
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">
            {item.description}
          </p>
        )}
        <p className="text-xs text-muted-foreground border-t border-border/30 pt-2 mt-auto">
          Unit cost:{" "}
          <span className="font-medium text-foreground">
            {formatUSD(Number(item.unit_cost_usd), { compact: true })}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
