import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Large metric display card for the primary stats section.
 *
 * @param {string}  label       - Card title / metric name
 * @param {string}  value       - Formatted value to display large
 * @param {string}  [subtitle]  - Optional smaller text below the value
 * @param {string}  [badge]     - Optional badge text (e.g., "Estimated")
 * @param {string}  [className] - Extra class names
 * @param {string}  [icon]      - Optional emoji or short string icon
 */
export default function MetricCard({
  label,
  value,
  subtitle,
  badge,
  className,
  icon,
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/50 bg-card/80",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardDescription className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </CardDescription>
          {badge && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-3">
          {icon && (
            <span className="text-2xl" aria-hidden="true">
              {icon}
            </span>
          )}
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground tabular-nums">
            {value ?? "—"}
          </p>
        </div>
        {subtitle && (
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
