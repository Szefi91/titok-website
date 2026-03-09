-- Ha a tábla már régebbi sémával létezik: hiányzó oszlopok hozzáadása.
-- Futtasd a Supabase Dashboard → SQL Editor-ban (egyszer, majd Run).

alter table public.statiszta_signups
  add column if not exists pizza_preference text not null default 'magyaros';

alter table public.statiszta_signups
  add column if not exists confirmed_attendance boolean not null default false;

alter table public.statiszta_signups
  add column if not exists future_interest boolean not null default false;

alter table public.statiszta_signups
  add column if not exists accepts_code boolean not null default false;
