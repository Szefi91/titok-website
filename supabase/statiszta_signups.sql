-- Statiszta jelentkezések táblája
create extension if not exists "pgcrypto";

create table if not exists public.statiszta_signups (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    full_name text not null,
    email text not null,
    availability_slot text not null,
    preferred_role text,
    notes text,
    pizza_preference text not null default 'magyaros',
    confirmed_attendance boolean not null default false,
    future_interest boolean not null default false,
    accepts_code boolean not null default false
);

create index if not exists statiszta_signups_email_idx on public.statiszta_signups (lower(email));
create index if not exists statiszta_signups_created_idx on public.statiszta_signups (created_at desc);

alter table public.statiszta_signups enable row level security;

-- Anonymous (NEXT_PUBLIC) kulccsal ne engedjünk insertet, csak a server action használ szerviz kulcsot.
-- Ha később szükség lenne rá, lehet külön policyt létrehozni meghatározott auth role-nak.
