-- MediGuide Supabase schema
-- Run this in the Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.checkups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  symptoms text[] not null default '{}',
  possible_conditions text[] not null default '{}',
  severity text not null check (severity in ('Mild', 'Moderate', 'Severe')),
  recommendation text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_checkups_user_id_created_at
  on public.checkups (user_id, created_at desc);

alter table public.checkups enable row level security;

drop policy if exists "Users can read own checkups" on public.checkups;
create policy "Users can read own checkups"
  on public.checkups
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own checkups" on public.checkups;
create policy "Users can insert own checkups"
  on public.checkups
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own checkups" on public.checkups;
create policy "Users can update own checkups"
  on public.checkups
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own checkups" on public.checkups;
create policy "Users can delete own checkups"
  on public.checkups
  for delete
  using (auth.uid() = user_id);
