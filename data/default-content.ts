import type { ExperienceEntry, Project, SiteContent, SocialLink } from "@/types/content"

export const defaultSiteContent: SiteContent = {
  id: 1,
  logo_mark: "{A}",
  logo_text: "Alex Builder",
  hero_badge: "Alex Builder",
  hero_headline: "Crafting modern web experiences that scale with teams",
  hero_accent_word: "modern",
  hero_subheadline:
    "I build performant products across frontend, backend, and cloud infrastructure, with a strong focus on developer experience.",
  avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  about_title: "About Me",
  about_body:
    "I am a full-stack engineer focused on building maintainable systems, delightful user interfaces, and robust delivery pipelines. I enjoy turning ambitious ideas into polished production software.",
  contact_title: "Get In Touch",
  contact_subtitle:
    "Looking to collaborate on a product, platform upgrade, or developer tooling initiative? Let us talk.",
  contact_email: "hello@example.com",
  resume_url: "https://example.com/resume",
  footer_attribution: "Designed and developed by Alex Builder.",
}

export const defaultSocialLinks: SocialLink[] = [
  {
    id: 1,
    label: "GitHub",
    url: "https://github.com",
    icon: "github",
    sort_order: 1,
    visible: true,
  },
  {
    id: 2,
    label: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin",
    sort_order: 2,
    visible: true,
  },
  {
    id: 3,
    label: "Instagram",
    url: "https://instagram.com",
    icon: "instagram",
    sort_order: 3,
    visible: true,
  },
]

export const defaultProjects: Project[] = [
  {
    id: "default-1",
    title: "Realtime Collaboration Platform",
    slug: "realtime-collaboration-platform",
    excerpt:
      "A collaborative workspace with presence, realtime comments, and intelligent notifications built for distributed product teams.",
    body_md: `## Overview\nA collaborative environment where teams share context and ship faster.\n\n## Features\n- Presence indicators\n- Realtime comments\n- Role-based access\n\n## Challenges\nBalancing live updates and query efficiency required careful caching strategy.\n\n## Learnings\nInvesting early in telemetry reduced production regressions by a meaningful margin.`,
    tech_tags: ["Next.js", "Supabase", "Tailwind"],
    cover_image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    thumbnail_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    gallery_images: [
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    ],
    demo_url: "https://example.com",
    github_url: "https://github.com",
    role: "Lead Engineer",
    timeline: "2024 - 2025",
    status: "published",
    published: true,
  },
]

export const defaultExperience: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: "Northstar Labs",
    role: "Senior Frontend Engineer",
    start_date: "2023-01-01",
    end_date: null,
    date_label: "2023 - Present",
    description:
      "Led UI architecture modernization, introduced reusable design primitives, and improved release confidence with stronger testing strategy.",
    sort_order: 1,
  },
]
