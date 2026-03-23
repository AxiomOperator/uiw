import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Methodology",
  description:
    "How the Iran War Cost Tracker calculates estimated war costs, the employed American denominator, and domestic tradeoff comparisons.",
};

const sections = [
  {
    id: "what-is-measured",
    title: "What Is Being Measured",
    content: `This dashboard tracks the estimated financial cost of U.S. military operations related to the Iran conflict. The primary metric is cumulative total obligated spending — money that has been appropriated by Congress and committed to the military mission.

This includes: direct operational costs (fuel, munitions, logistics, personnel deployment), emergency supplemental appropriations passed by Congress, and known DoD contract obligations for Iran-related operations.

This does not include: estimated long-term veteran care costs, interest on war-related debt, diplomatic costs, intelligence spending (which is classified), or economic knock-on effects.`,
  },
  {
    id: "denominator",
    title: "Why \"Employed Americans\" Is the Denominator",
    content: `The "per employed American" metric uses the Bureau of Labor Statistics total employed civilian count (seasonally adjusted, age 16+) as the denominator.

We chose this denominator rather than total population or total taxpayers for three reasons:

1. Employed workers are the direct contributors to federal tax revenue through income and payroll taxes — they are the primary funders of federal spending.

2. It is a widely understood, regularly updated, and independently published figure from a trusted government source (BLS Employment Situation Summary).

3. It provides a more concrete frame of reference than "per capita" for a working adult audience.

We do not claim that each employed person contributes exactly this amount, or that the tax burden is distributed equally. It is a proportional framing tool, not a precise tax calculation.`,
  },
  {
    id: "cost-sources",
    title: "Where Cost Figures Come From",
    content: `Total cost estimates are derived from:

• Official DoD supplemental appropriations requests submitted to Congress
• Congressional Budget Office (CBO) independent cost estimates for Iran operations legislation
• Published defense budget analysis from nonpartisan research organizations

Daily cost estimates are calculated by dividing the most current total estimate by the number of days since operations began, cross-referenced against DoD-reported daily burn rates where available.

All figures represent the current best public estimate. They will be updated as new official data is published.`,
  },
  {
    id: "tradeoffs",
    title: "How Tradeoff Comparisons Work",
    content: `The "What This Could Have Funded" section divides the total estimated war cost by the unit cost of various domestic programs.

Formula: Funded Units = Total War Cost ÷ Unit Cost

For example: $185,000,000,000 ÷ $75,000 (teacher salary + benefits) = ~2,466,667 teacher-years.

Unit costs are sourced from official federal program data, government reports, and nonpartisan research. Each item cites its source.

These comparisons are illustrative. They do not imply that the war money would or should be redirected to these programs. They are intended to provide a tangible sense of scale.`,
  },
  {
    id: "assumptions",
    title: "Key Assumptions and Limitations",
    content: `• All figures are estimates based on current public reporting. Final audited costs will differ.
• Classified spending is not included and may be substantial.
• Long-term costs (veteran healthcare, interest on debt) are excluded from the primary total.
• Employment figures are point-in-time snapshots and change monthly.
• Unit costs for tradeoff items are national averages and vary significantly by region.
• This site does not model economic multiplier effects or opportunity costs beyond direct program comparisons.`,
  },
  {
    id: "transparency",
    title: "Transparency Commitment",
    content: `All source data is publicly available and linked on the Sources page. The methodology is published openly here. The codebase is designed to be auditable.

If you believe a figure is incorrect or a source is outdated, the site welcomes corrections. Estimates will be updated as new data becomes available.

This project is independent and non-partisan. It does not advocate for any specific policy position. Its purpose is to make public financial data legible and accessible to ordinary citizens.`,
  },
];

export default function MethodologyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
            <Link href="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4 text-xs border-border/60 text-muted-foreground">
            Methodology
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            How This Dashboard Works
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            This page explains what we measure, how we calculate it, what
            assumptions we make, and what we do not include. Transparency is
            central to this project.
          </p>
        </div>

        <div
          className="flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/5 px-4 py-3 mb-10 text-sm"
          role="note"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
          <p className="text-blue-300/90 text-xs leading-relaxed">
            All figures on this site are estimates based on publicly available
            information. They are not official government figures and have not
            been audited. Final actual costs will differ.
          </p>
        </div>

        <div className="space-y-0">
          {sections.map((section, i) => (
            <div key={section.id} id={section.id}>
              <div className="py-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
              {i < sections.length - 1 && (
                <Separator className="opacity-30" />
              )}
            </div>
          ))}
        </div>

        <Separator className="my-10 opacity-30" />

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/sources">View All Sources</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Dashboard</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
