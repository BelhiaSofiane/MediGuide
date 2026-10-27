-- Run after schema.sql for a new database, or by itself for an existing checkups table.
-- Re-running is safe for data. Existing rows keep is_simulated = false.
begin;

alter table public.checkups add column if not exists is_simulated boolean not null default false;

-- The original check allowed only Mild/Moderate/Severe. This permits demo rows
-- without changing any existing row or removing those legacy values.
alter table public.checkups drop constraint if exists checkups_severity_check;
alter table public.checkups add constraint checkups_severity_check
  check (severity in ('Mild', 'Moderate', 'Severe', 'Demo'));

-- NOT VALID preserves older rows that might exceed the new limits. PostgreSQL
-- still enforces these checks for new and updated rows.
alter table public.checkups drop constraint if exists checkups_symptoms_bounds_check;
alter table public.checkups add constraint checkups_symptoms_bounds_check
  check (cardinality(symptoms) between 1 and 10 and length(array_to_string(symptoms, '')) <= 1000) not valid;
alter table public.checkups drop constraint if exists checkups_conditions_bounds_check;
alter table public.checkups add constraint checkups_conditions_bounds_check
  check (cardinality(possible_conditions) <= 10) not valid;
alter table public.checkups drop constraint if exists checkups_recommendation_bounds_check;
alter table public.checkups add constraint checkups_recommendation_bounds_check
  check (length(recommendation) <= 1000) not valid;
alter table public.checkups drop constraint if exists checkups_demo_shape_check;
alter table public.checkups add constraint checkups_demo_shape_check
  check (not is_simulated or (severity = 'Demo' and cardinality(possible_conditions) = 0)) not valid;

create index if not exists idx_checkups_user_created_id
  on public.checkups (user_id, created_at desc, id desc);

alter table public.checkups enable row level security;
revoke all on public.checkups from anon;
grant select, insert, update, delete on public.checkups to authenticated;

drop policy if exists "Users can read own checkups" on public.checkups;
create policy "Users can read own checkups" on public.checkups
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users can insert own checkups" on public.checkups;
create policy "Users can insert own checkups" on public.checkups
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users can update own checkups" on public.checkups;
create policy "Users can update own checkups" on public.checkups
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users can delete own checkups" on public.checkups;
create policy "Users can delete own checkups" on public.checkups
  for delete to authenticated using (auth.uid() = user_id);

commit;
