-- Roadmap phases table definition
create extension if not exists "pgcrypto";

create table if not exists public.roadmap_phases (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    order_index integer not null default 0,
    year text not null,
    title text not null,
    status text not null check (status in ('completed', 'in-progress', 'upcoming')),
    status_label text not null,
    icon text not null,
    description text,
    items jsonb not null default '[]'::jsonb
);

create index if not exists roadmap_phases_order_idx on public.roadmap_phases (order_index asc);

alter table public.roadmap_phases enable row level security;

-- Admin access policy (requires service_role token, just like statiszta_signups)
-- If public read access is desired without server actions:
-- create policy "Public read access" on public.roadmap_phases for select using (true);

-- Insert initial data
insert into public.roadmap_phases (order_index, year, title, status, status_label, icon, description, items)
values
(0, '2020–2023', 'Előző Évadok', 'completed', 'TELJESÍTVE', '🎬', '3 évad, több tucat epizód, egy növekvő közösség.', '["1–3. évad forgatása és megjelenése", "YouTube csatorna felépítése", "Közösség kialakulása", "ARG elemek bevezetése"]'::jsonb),
(1, '2025', 'Előkészítés', 'completed', 'TELJESÍTVE', '📋', 'A 4. évad alapjainak lefektetése.', '["Forgatókönyv írás megkezdése", "Új karakterek kidolgozása", "Helyszínbejárások", "Stáb összeállítás"]'::jsonb),
(2, '2025–2026', 'Forgatás', 'in-progress', 'FOLYAMATBAN', '🎥', 'A 4. évad forgatási blokkjai.', '["Első forgatási blokk ✓", "Második forgatási blokk", "Statiszta felvételek", "Speciális helyszíni forgatások"]'::jsonb),
(3, '2026', 'Utómunka', 'upcoming', 'HAMAROSAN', '🖥️', 'Vágás, VFX és hangkeverés.', '["Vágás és szerkesztés", "VFX és vizuális effektek", "Hangkeverés és zene", "Színkorrekció"]'::jsonb),
(4, '2026–2027', 'Premiere & Megjelenés', 'upcoming', 'TERVEZÉS ALATT', '🚀', 'A 4. évad debütálása.', '["Előzetes és promóció", "Premiere esemény", "Epizódok megjelenése", "Közösségi események"]'::jsonb);
