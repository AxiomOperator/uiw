# Iran War Cost Tracker

A public accountability dashboard that estimates the financial cost of U.S. military operations in the Iran conflict and translates that burden into concrete, per-person terms for working Americans.

**Live focus:** How much has the Iran war cost employed U.S. adults — in total, per day, per person, and what domestic programs that money could have funded.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript (no TypeScript) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (radix-nova style) |
| Charts | Recharts |
| Database | Supabase (PostgreSQL) |
| Linter/Formatter | Biome |
| Package Manager | npm |

---

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd uiw
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxx
```

Find these in your Supabase project under **Settings → API Keys**:
- **URL**: listed at the top of the API settings page
- **Publishable key** (`sb_publishable_...`): under the **API Keys** tab → click **Create new API Keys** if not yet generated

> **Legacy projects:** If your project only shows JWT-based keys, use the `anon` JWT value for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

### 3. Set up the Supabase database

In your Supabase project, open the **SQL Editor** and run the files in order:

**Step 1 — Create tables:**
```sql
-- Paste contents of sql/schema.sql
```

Or use the Supabase CLI:
```bash
supabase db push  # if using migrations
```

**Step 2 — Seed data:**
```sql
-- Paste contents of sql/seed.sql
```

The seed file inserts:
- 1 primary war cost snapshot (~$185B total, ~$1.15B/day as of March 2026)
- 5 historical snapshots for the trend chart
- 1 employment snapshot (~161.2M employed civilians)
- 12 tradeoff items (teachers, nurses, Pell Grants, etc.)
- 7 site sources

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
├── app/
│   ├── layout.js              # Root layout (dark mode, fonts, metadata)
│   ├── page.js                # Homepage dashboard
│   ├── methodology/
│   │   └── page.js            # Methodology explanation page
│   ├── sources/
│   │   └── page.js            # Sources & citations page
│   └── about/
│       └── page.js            # About page
├── components/
│   ├── Header.jsx             # Sticky nav header with mobile Sheet drawer
│   ├── Footer.jsx             # Site footer
│   ├── MetricCard.jsx         # Large stat display card
│   ├── TradeoffCard.jsx       # "What this could fund" card
│   ├── TrendChart.jsx         # Recharts area chart (client component)
│   └── ui/                    # shadcn/ui components
│       ├── button.jsx
│       ├── card.jsx
│       ├── badge.jsx
│       ├── separator.jsx
│       ├── tabs.jsx
│       ├── tooltip.jsx
│       └── sheet.jsx
├── lib/
│   ├── supabase/
│   │   └── client.js          # Supabase server-side client
│   ├── formatters.js          # USD, count, date formatters
│   └── calculations.js        # Metric computations, tradeoff enrichment
├── sql/
│   ├── schema.sql             # Table definitions (run first)
│   └── seed.sql               # Initial data (run after schema)
├── public/                    # Static assets
├── .env.example               # Environment variable template
└── README.md
```

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Homepage: hero, 4 metric cards, trend chart, tradeoff grid, sources |
| `/methodology` | Full methodology explanation with sourcing rationale |
| `/sources` | All data citations grouped by category |
| `/about` | Project purpose and design principles |

---

## Computed Metrics

All metrics are computed in `lib/calculations.js` from Supabase data:

| Metric | Formula |
|---|---|
| Total Cost | From primary `war_cost_snapshots` row |
| Daily Cost | From primary `war_cost_snapshots.estimated_daily_cost_usd` |
| Cost Per Worker | `total_cost ÷ employed_people` |
| Cost Per Worker Per Day | `daily_cost ÷ employed_people` |
| Funded Units (tradeoffs) | `total_cost ÷ unit_cost_usd` per item |

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run Biome linter
npm run format   # Run Biome formatter (auto-fix)
```

---

## Supabase Tables

| Table | Purpose |
|---|---|
| `war_cost_snapshots` | Cost estimates by date (one `is_primary = true`) |
| `employment_snapshots` | BLS employed count snapshots |
| `tradeoff_items` | "What this could fund" items with unit costs |
| `site_sources` | Bibliography / citation records |

---

## Phase 2 Ideas

- Live data ingestion from official government APIs (USASpending.gov, CBO API)
- Weekly automated snapshot updates
- State-level cost breakdown (cost per employed person by state)
- Interactive tradeoff calculator (user adjusts assumptions)
- Email digest / alert when new cost estimates are published
- Comparison to previous U.S. wars (Afghanistan, Iraq) in constant dollars
- Mobile app / PWA wrapper

---

## Disclaimer

All figures are estimates based on publicly available government reporting and stated methodology assumptions. This site is independent, non-partisan, and not affiliated with any government agency or political organization. Final audited war costs will differ from current estimates.
