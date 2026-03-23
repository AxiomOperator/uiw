import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { formatDate } from "@/lib/formatters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Sources",
  description:
    "All data sources used by the Iran War Cost Tracker, including official government documents, CBO estimates, and research citations.",
};

async function getSources() {
  try {
    const { data, error } = await supabase
      .from("site_sources")
      .select("*")
      .order("category")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

const CATEGORY_ORDER = [
  "War Costs",
  "Employment",
  "Tradeoffs",
  "Methodology",
];

function groupByCategory(sources) {
  const grouped = {};
  for (const source of sources) {
    if (!grouped[source.category]) grouped[source.category] = [];
    grouped[source.category].push(source);
  }
  // Sort categories by preferred order, then alphabetically for unknowns
  const sorted = {};
  const ordered = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];
  for (const cat of ordered) {
    if (grouped[cat]) sorted[cat] = grouped[cat];
  }
  return sorted;
}

export default async function SourcesPage() {
  const sources = await getSources();
  const grouped = groupByCategory(sources);
  const hasData = sources.length > 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
            <Link href="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4 text-xs border-border/60 text-muted-foreground">
            Data Sources
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Sources &amp; Citations
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            Every figure on this site is sourced from publicly available
            government documents, official budget filings, or nonpartisan
            research. Sources are listed below by category.
          </p>
        </div>

        {!hasData ? (
          <div className="rounded-lg border border-border/40 bg-card/50 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No sources found. Make sure Supabase is connected and the seed
              data has been inserted.
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/methodology">Read Methodology</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <h2
                  id={`cat-${category}`}
                  className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  {category}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((source) => (
                    <Card
                      key={source.id}
                      className="border-border/40 bg-card/50 hover:border-border transition-colors"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold leading-snug">
                          {source.url ? (
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-1.5 hover:text-primary transition-colors"
                            >
                              {source.title}
                              <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                            </a>
                          ) : (
                            source.title
                          )}
                        </CardTitle>
                        {source.publisher && (
                          <CardDescription className="text-xs">
                            {source.publisher}
                            {source.published_at
                              ? ` · ${formatDate(source.published_at)}`
                              : ""}
                          </CardDescription>
                        )}
                      </CardHeader>
                      {source.notes && (
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {source.notes}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <Separator className="my-10 opacity-30" />

        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Sources are updated as new public data becomes available. If you
          believe a source is inaccurate or outdated, this project welcomes
          corrections.
        </p>
      </main>
      <Footer />
    </div>
  );
}
