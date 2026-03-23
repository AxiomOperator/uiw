import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand + mission */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Iran War Cost Tracker
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A public accountability dashboard. All figures are estimates based
              on current public reporting and stated methodology assumptions.
              This site is independent and non-partisan.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              Pages
            </p>
            {[
              { href: "/", label: "Home" },
              { href: "/methodology", label: "Methodology" },
              { href: "/sources", label: "Sources" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-6 opacity-40" />

        <p className="text-xs text-muted-foreground text-center">
          Data is based on current public estimates and stated methodology
          assumptions. Not affiliated with any government agency or political
          organization. Last data update: March 2026.
        </p>
      </div>
    </footer>
  );
}
