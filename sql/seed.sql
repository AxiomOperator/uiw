-- Iran War Cost Tracker — Seed Data
-- Run this AFTER schema.sql in the Supabase SQL editor.
-- Values are estimates based on publicly available reporting as of early 2026.

-- ============================================================
-- 1. War cost snapshots
-- ============================================================
-- Primary snapshot: cumulative estimated cost ~$185 billion
-- Based on CBO-style projections, DoD supplemental requests,
-- and independent defense budget analysis
insert into war_cost_snapshots
  (snapshot_date, total_cost_usd, estimated_daily_cost_usd, notes, source_label, source_url, is_primary)
values
  (
    '2026-03-01',
    185000000000.00,
    1150000000.00,
    'Cumulative estimated cost includes direct DoD operations, munitions expenditures, and supplemental appropriations as of March 2026. Excludes long-term veteran care and interest on war debt.',
    'Defense Budget Analysis, March 2026',
    'https://www.defense.gov',
    true
  ),
  -- Earlier data points for trend chart
  (
    '2025-10-01',
    12000000000.00,
    800000000.00,
    'Initial operations phase cost estimate.',
    'DoD Supplemental Request, Oct 2025',
    'https://www.defense.gov',
    false
  ),
  (
    '2025-11-01',
    38000000000.00,
    950000000.00,
    'Escalation phase — increased air campaign and naval operations.',
    'DoD Supplemental Request, Nov 2025',
    'https://www.defense.gov',
    false
  ),
  (
    '2025-12-01',
    72000000000.00,
    1050000000.00,
    'Sustained operations phase.',
    'DoD Monthly Estimate, Dec 2025',
    'https://www.defense.gov',
    false
  ),
  (
    '2026-01-01',
    105000000000.00,
    1100000000.00,
    'Continued operations — FY2026 supplemental approved.',
    'CBO Cost Estimate, Jan 2026',
    'https://www.cbo.gov',
    false
  ),
  (
    '2026-02-01',
    148000000000.00,
    1130000000.00,
    'Sustained high-intensity operations.',
    'DoD Monthly Estimate, Feb 2026',
    'https://www.defense.gov',
    false
  );

-- ============================================================
-- 2. Employment snapshots
-- ============================================================
insert into employment_snapshots
  (snapshot_date, employed_people, label, source_url, is_primary)
values
  (
    '2026-02-01',
    161200000,
    'Seasonally adjusted total employed, age 16+, Feb 2026',
    'https://www.bls.gov/news.release/empsit.nr0.htm',
    true
  );

-- ============================================================
-- 3. Tradeoff items
-- ============================================================
insert into tradeoff_items
  (name, unit_cost_usd, category, description, source_label, source_url, display_order, is_featured)
values
  (
    'Public school teachers (1 year salary + benefits)',
    75000.00,
    'Education',
    'Average total compensation for a full-time public school teacher for one academic year.',
    'National Education Association, 2025',
    'https://www.nea.org',
    1,
    true
  ),
  (
    'Free school lunches (1 year)',
    2.91,
    'Education',
    'Federal reimbursement rate per free school lunch under the National School Lunch Program.',
    'USDA FNS, 2025',
    'https://www.fns.usda.gov',
    2,
    true
  ),
  (
    'Pell Grants (maximum award)',
    7395.00,
    'Education',
    'Maximum federal Pell Grant award for one academic year (2025–2026).',
    'Federal Student Aid, 2025–2026',
    'https://studentaid.gov',
    3,
    true
  ),
  (
    'Registered nurses (1 year salary)',
    82000.00,
    'Healthcare',
    'Median annual salary for a registered nurse in the United States.',
    'BLS Occupational Outlook Handbook, 2025',
    'https://www.bls.gov',
    4,
    true
  ),
  (
    'VA outpatient medical visits',
    350.00,
    'Veterans',
    'Estimated average cost per outpatient visit at a VA medical facility.',
    'VA Office of Inspector General, 2024',
    'https://www.va.gov/oig',
    5,
    true
  ),
  (
    'Section 8 housing vouchers (1 year)',
    10200.00,
    'Housing',
    'Average annual cost per Housing Choice Voucher (Section 8) subsidy.',
    'HUD Picture of Subsidized Households, 2024',
    'https://www.hud.gov',
    6,
    true
  ),
  (
    'Community health center visits',
    295.00,
    'Healthcare',
    'Average cost per patient visit at a federally qualified health center.',
    'HRSA Uniform Data System, 2024',
    'https://www.hrsa.gov',
    7,
    false
  ),
  (
    'Rural road miles repaired',
    125000.00,
    'Infrastructure',
    'Estimated average cost per mile for resurfacing a rural two-lane road.',
    'FHWA Highway Statistics, 2024',
    'https://www.fhwa.dot.gov',
    8,
    true
  ),
  (
    'Full-time firefighters (1 year salary + benefits)',
    72000.00,
    'Public Safety',
    'Average total annual compensation for a career firefighter.',
    'IAFF Wages & Working Conditions Survey, 2024',
    'https://www.iaff.org',
    9,
    false
  ),
  (
    'Head Start slots (1 child, 1 year)',
    11000.00,
    'Education',
    'Average annual federal cost per child enrolled in Head Start early education.',
    'HHS ACF Head Start Program Facts, 2024',
    'https://www.acf.hhs.gov',
    10,
    true
  ),
  (
    'Child care subsidies (1 year)',
    9600.00,
    'Families',
    'Average annual Child Care and Development Fund subsidy per child.',
    'HHS CCDF Aggregate Report, 2024',
    'https://www.acf.hhs.gov',
    11,
    false
  ),
  (
    'Clean water infrastructure (small community)',
    2500000.00,
    'Infrastructure',
    'Estimated cost to upgrade water treatment and distribution for a small rural community (~5,000 residents).',
    'EPA Safe Drinking Water Infrastructure, 2024',
    'https://www.epa.gov',
    12,
    false
  );

-- ============================================================
-- 4. Site sources
-- ============================================================
insert into site_sources
  (category, title, url, publisher, published_at, notes)
values
  (
    'War Costs',
    'DoD Supplemental Appropriations — Iran Operations FY2026',
    'https://www.defense.gov/News/Releases/',
    'U.S. Department of Defense',
    '2026-01-15',
    'Official DoD supplemental budget requests for ongoing Iran operations.'
  ),
  (
    'War Costs',
    'CBO Cost Estimate: Iran Operations Supplemental Appropriations Act',
    'https://www.cbo.gov/publication/',
    'Congressional Budget Office',
    '2026-01-20',
    'Independent CBO scoring of the FY2026 Iran Operations supplemental bill.'
  ),
  (
    'Employment',
    'The Employment Situation — February 2026',
    'https://www.bls.gov/news.release/empsit.nr0.htm',
    'Bureau of Labor Statistics',
    '2026-03-07',
    'Monthly BLS employment situation summary. Total employed civilians age 16+.'
  ),
  (
    'Tradeoffs',
    'National Education Association Salary Rankings 2024–25',
    'https://www.nea.org/resource-library/teacher-salary-rankings',
    'National Education Association',
    '2025-04-01',
    'Annual ranking of average teacher salaries by state. Used for national average estimate.'
  ),
  (
    'Tradeoffs',
    'USDA FNS National School Lunch Program: Program Data',
    'https://www.fns.usda.gov/nslp/program-data',
    'USDA Food and Nutrition Service',
    '2025-09-01',
    'Federal reimbursement rates and participation data for the National School Lunch Program.'
  ),
  (
    'Tradeoffs',
    'HUD Picture of Subsidized Households 2024',
    'https://www.huduser.gov/portal/datasets/picture.html',
    'U.S. Department of Housing and Urban Development',
    '2024-12-01',
    'HUD dataset on households receiving rental assistance, including Section 8/HCV costs.'
  ),
  (
    'Methodology',
    'Watson Institute Costs of War Project',
    'https://watson.brown.edu/costsofwar/',
    'Brown University Watson Institute',
    '2025-11-01',
    'Academic project tracking the full costs of U.S. wars since 2001. Provides methodological framework for comprehensive war cost accounting.'
  );
