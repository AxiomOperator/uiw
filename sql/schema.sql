-- Iran War Cost Tracker — Supabase Schema
-- Run this in the Supabase SQL editor to create all tables.

-- Drop tables in reverse dependency order (for re-runs)
drop table if exists site_sources;
drop table if exists tradeoff_items;
drop table if exists employment_snapshots;
drop table if exists war_cost_snapshots;

-- 1. War cost snapshots
create table war_cost_snapshots (
  id                    uuid primary key default gen_random_uuid(),
  snapshot_date         date not null,
  total_cost_usd        numeric(20, 2) not null,
  estimated_daily_cost_usd numeric(20, 2) not null,
  notes                 text,
  source_label          text,
  source_url            text,
  is_primary            boolean not null default false,
  created_at            timestamptz not null default now()
);

-- Only one primary snapshot allowed (enforced by application logic)
create index idx_war_cost_primary on war_cost_snapshots(is_primary);
create index idx_war_cost_date on war_cost_snapshots(snapshot_date);

-- 2. Employment snapshots
create table employment_snapshots (
  id              uuid primary key default gen_random_uuid(),
  snapshot_date   date not null,
  employed_people bigint not null,
  label           text,
  source_url      text,
  is_primary      boolean not null default false,
  created_at      timestamptz not null default now()
);

create index idx_employment_primary on employment_snapshots(is_primary);

-- 3. Tradeoff items — "what this money could have funded"
create table tradeoff_items (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  unit_cost_usd  numeric(20, 2) not null,
  category       text not null,
  description    text,
  source_label   text,
  source_url     text,
  display_order  integer not null default 0,
  is_featured    boolean not null default false,
  created_at     timestamptz not null default now()
);

create index idx_tradeoff_featured on tradeoff_items(is_featured);
create index idx_tradeoff_order on tradeoff_items(display_order);

-- 4. Site sources — bibliography / citation list
create table site_sources (
  id            uuid primary key default gen_random_uuid(),
  category      text not null,
  title         text not null,
  url           text,
  publisher     text,
  published_at  date,
  notes         text,
  created_at    timestamptz not null default now()
);

create index idx_sources_category on site_sources(category);
