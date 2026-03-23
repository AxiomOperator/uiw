import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "About",
  description:
    "About the Iran War Cost Tracker — its purpose, design principles, and commitment to transparency.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
            <Link href="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Badge variant="outline" className="mb-4 text-xs border-border/60 text-muted-foreground">
            About
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            About This Project
          </h1>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">Purpose</h2>
            <p>
              The Iran War Cost Tracker is a public accountability project. Its
              sole purpose is to make the financial cost of U.S. military
              operations in the Iran conflict legible, concrete, and accessible
              to ordinary citizens.
            </p>
            <p className="mt-3">
              War spending is often discussed in abstract terms — hundreds of
              billions of dollars that are difficult to contextualize. This
              project translates those figures into terms that working Americans
              can relate to: what it costs per employed person, what it costs
              per day, and what comparable domestic investments that money could
              represent.
            </p>
          </div>

          <Separator className="opacity-30" />

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">
              Design Principles
            </h2>
            <ul className="space-y-3 list-none pl-0">
              {[
                {
                  title: "Sober and data-forward.",
                  body: "Every claim is sourced. Numbers are presented clearly, not dramatized.",
                },
                {
                  title: "Non-partisan.",
                  body: "This project does not advocate for or against any political party, candidate, or policy position. It presents public financial data.",
                },
                {
                  title: "Transparent.",
                  body: "Methodology is documented openly. Sources are linked. Assumptions are stated explicitly.",
                },
                {
                  title: "Accessible.",
                  body: "Designed to be readable by anyone, not just policy analysts. Plain language is used throughout.",
                },
                {
                  title: "Honest about uncertainty.",
                  body: "All figures are estimates. Final audited costs will differ. This site says so clearly.",
                },
              ].map(({ title, body }) => (
                <li key={title} className="flex gap-2">
                  <span className="mt-0.5 text-foreground font-medium shrink-0">—</span>
                  <span>
                    <span className="font-medium text-foreground">{title}</span>{" "}
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="opacity-30" />

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">
              What This Project Is Not
            </h2>
            <p>
              This is not a protest site, a partisan platform, or advocacy
              content. It does not tell you whether the war is right or wrong.
              It does not advocate for or against military spending. It presents
              publicly available financial data in an accessible format.
            </p>
          </div>

          <Separator className="opacity-30" />

          <div>
            <h2 className="text-base font-semibold text-foreground mb-2">
              Data &amp; Updates
            </h2>
            <p>
              Data is sourced from official government documents, Congressional
              Budget Office analyses, and nonpartisan research organizations.
              Figures are updated as new public data becomes available. The
              methodology is documented on the{" "}
              <Link
                href="/methodology"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Methodology page
              </Link>
              .
            </p>
          </div>
        </div>

        <Separator className="my-10 opacity-30" />

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/methodology">
              Read Methodology
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sources">View Sources</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
