create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id integer primary key default 1,
  logo_mark text not null default '{A}',
  logo_text text not null default 'Alex Builder',
  hero_badge text not null default 'Alex Builder',
  hero_headline text not null default 'Crafting modern web experiences that scale with teams',
  hero_accent_word text not null default 'modern',
  hero_subheadline text not null default 'I build performant products across frontend, backend, and cloud infrastructure.',
  avatar_url text not null default '',
  about_title text not null default 'About Me',
  about_body text not null default '',
  contact_title text not null default 'Get In Touch',
  contact_subtitle text not null default '',
  contact_email text not null default 'hello@example.com',
  resume_url text not null default '',
  footer_attribution text not null default 'Designed and developed by Alex Builder.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  body_md text not null default '',
  tech_tags text[] not null default '{}',
  cover_image_url text not null default '',
  thumbnail_url text not null default '',
  gallery_images text[] not null default '{}',
  demo_url text not null default '',
  github_url text not null default '',
  role text not null default '',
  timeline text not null default '',
  status text not null default 'draft',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published, published_at desc);
create index if not exists projects_slug_idx on public.projects (slug);

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  start_date date not null,
  end_date date,
  date_label text not null default '',
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists experience_sort_order_idx on public.experience (sort_order asc);

create table if not exists public.social_links (
  id bigserial primary key,
  label text not null,
  url text not null,
  icon text not null unique,
  sort_order integer not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists social_links_visible_idx on public.social_links (visible, sort_order asc);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null unique,
  public_url text not null,
  alt_text text not null default '',
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.projects enable row level security;
alter table public.experience enable row level security;
alter table public.social_links enable row level security;
alter table public.media enable row level security;

create policy "Public read site content"
  on public.site_content
  for select
  using (true);

create policy "Authenticated manage site content"
  on public.site_content
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read published projects"
  on public.projects
  for select
  using (published = true);

create policy "Authenticated manage projects"
  on public.projects
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read experience"
  on public.experience
  for select
  using (true);

create policy "Authenticated manage experience"
  on public.experience
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read visible social links"
  on public.social_links
  for select
  using (visible = true);

create policy "Authenticated manage social links"
  on public.social_links
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public read media metadata"
  on public.media
  for select
  using (true);

create policy "Authenticated manage media metadata"
  on public.media
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media bucket"
  on storage.objects
  for select
  using (bucket_id = 'media');

create policy "Authenticated manage media bucket"
  on storage.objects
  for all
  using (bucket_id = 'media' and auth.role() = 'authenticated')
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
