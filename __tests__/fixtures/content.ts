import type { Project, SiteContent, SocialLink } from "@/types/content"

export const siteFixture: SiteContent = {
  id: 1,
  logo_mark: "{A}",
  logo_text: "Alex Builder",
  hero_badge: "Alex Builder",
  hero_headline: "Crafting modern web experiences",
  hero_accent_word: "modern",
  hero_subheadline: "I build performant products.",
  avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  about_title: "About Me",
  about_body: "I build maintainable systems and delightful user interfaces.",
  contact_title: "Get In Touch",
  contact_subtitle: "Let us collaborate.",
  contact_email: "hello@example.com",
  resume_url: "https://example.com/resume.pdf",
  footer_attribution: "Designed and developed by Alex Builder.",
}

export const socialLinksFixture: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    url: "https://github.com/example",
    icon: "github",
    sort_order: 1,
    visible: true,
  },
  {
    id: 2,
    label: "LinkedIn",
    url: "https://linkedin.com/in/example",
    icon: "linkedin",
    sort_order: 2,
    visible: true,
  },
  {
    id: 3,
    label: "Instagram",
    url: "https://instagram.com/example",
    icon: "instagram",
    sort_order: 3,
    visible: true,
  },
]

export const projectFixture: Project = {
  id: "project-1",
  title: "Realtime Collaboration Platform",
  slug: "realtime-collaboration-platform",
  excerpt: "A collaborative workspace built for distributed teams.",
  body_md: "## Overview\nA great project.",
  tech_tags: ["Next.js", "Supabase", "Tailwind"],
  cover_image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  thumbnail_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  gallery_images: [],
  demo_url: "https://example.com/demo",
  github_url: "https://github.com/example/repo",
  role: "Lead Engineer",
  timeline: "2024 - 2025",
  status: "published",
  published: true,
}
