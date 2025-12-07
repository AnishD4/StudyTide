-- QUICK START: Run this in Supabase SQL Editor
-- This creates the essential tables for StudyTide

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Settings table
create table if not exists public.user_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  school_days text[] default array['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  school_start_time time default '08:00',
  school_end_time time default '15:00',
  preferred_study_start_time time default '16:00',
  preferred_study_end_time time default '21:00',
  max_study_hours_per_day integer default 4,
  break_duration_minutes integer default 15,
  study_session_duration_minutes integer default 45,
  notifications_enabled boolean default true,
  reminder_before_due_hours integer default 24,
  daily_summary_enabled boolean default true,
  daily_summary_time time default '07:00',
  theme text default 'system',
  week_starts_on text default 'sunday',
  gpa_scale numeric default 4.0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;

-- Drop existing policies if they exist (to avoid conflicts)
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Users can view own settings" on public.user_settings;
drop policy if exists "Users can insert own settings" on public.user_settings;
drop policy if exists "Users can update own settings" on public.user_settings;

-- RLS Policies for profiles
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- RLS Policies for user_settings
create policy "Users can view own settings" on public.user_settings
  for select using (auth.uid() = user_id);

create policy "Users can insert own settings" on public.user_settings
  for insert with check (auth.uid() = user_id);

create policy "Users can update own settings" on public.user_settings
  for update using (auth.uid() = user_id);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.user_settings (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger (drop first if exists)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- For existing users: Create their profile if it doesn't exist
-- Run this part manually if you already have users signed up
insert into public.profiles (id, email, full_name, avatar_url)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name'),
  raw_user_meta_data->>'avatar_url'
from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing;

-- Create settings for existing users
insert into public.user_settings (user_id)
select id from public.profiles
where id not in (select user_id from public.user_settings)
on conflict (user_id) do nothing;

