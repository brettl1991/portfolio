insert into public.site_content (
  id,
  logo_mark,
  logo_text,
  hero_badge,
  hero_headline,
  hero_accent_word,
  hero_subheadline,
  avatar_url,
  about_title,
  about_body,
  contact_title,
  contact_subtitle,
  contact_email,
  resume_url,
  footer_attribution
)
values (
  1,
  '{A}',
  'Alex Builder',
  'Alex Builder',
  'Crafting modern web experiences that scale with teams',
  'modern',
  'I build performant products across frontend, backend, and cloud infrastructure, with a strong focus on developer experience.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'About Me',
  'I am a full-stack engineer focused on building maintainable systems, delightful user interfaces, and robust delivery pipelines.',
  'Get In Touch',
  'Looking to collaborate on a product, platform upgrade, or developer tooling initiative? Let us talk.',
  'hello@example.com',
  'https://example.com/resume',
  'Designed and developed by Alex Builder.'
)
on conflict (id) do update set
  logo_mark = excluded.logo_mark,
  logo_text = excluded.logo_text,
  hero_badge = excluded.hero_badge,
  hero_headline = excluded.hero_headline,
  hero_accent_word = excluded.hero_accent_word,
  hero_subheadline = excluded.hero_subheadline,
  avatar_url = excluded.avatar_url,
  about_title = excluded.about_title,
  about_body = excluded.about_body,
  contact_title = excluded.contact_title,
  contact_subtitle = excluded.contact_subtitle,
  contact_email = excluded.contact_email,
  resume_url = excluded.resume_url,
  footer_attribution = excluded.footer_attribution,
  updated_at = now();

insert into public.social_links (label, url, icon, sort_order, visible)
values
  ('GitHub', 'https://github.com', 'github', 1, true),
  ('LinkedIn', 'https://linkedin.com', 'linkedin', 2, true),
  ('Instagram', 'https://instagram.com', 'instagram', 3, true)
on conflict (icon) do update set
  label = excluded.label,
  url = excluded.url,
  sort_order = excluded.sort_order,
  visible = excluded.visible,
  updated_at = now();
