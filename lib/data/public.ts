import { cache } from "react"

import {
  defaultExperience,
  defaultProjects,
  defaultSiteContent,
  defaultSocialLinks,
} from "@/data/default-content"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { ExperienceEntry, Project, SiteContent, SocialLink } from "@/types/content"

const toStringArray = (input: unknown): string[] => {
  if (!Array.isArray(input)) {
    return []
  }

  return input.filter((value): value is string => typeof value === "string")
}

const normalizeProject = (project: Record<string, unknown>): Project => {
  const status = Boolean(project.published) ? "published" : "draft"

  return {
    id: String(project.id),
    title: String(project.title ?? "Untitled project"),
    slug: String(project.slug ?? ""),
    excerpt: String(project.excerpt ?? ""),
    body_md: String(project.body_md ?? ""),
    tech_tags: toStringArray(project.tech_tags),
    cover_image_url: String(project.cover_image_url ?? ""),
    thumbnail_url: String(project.thumbnail_url ?? project.cover_image_url ?? ""),
    gallery_images: toStringArray(project.gallery_images),
    demo_url: String(project.demo_url ?? ""),
    github_url: String(project.github_url ?? ""),
    role: String(project.role ?? ""),
    timeline: String(project.timeline ?? ""),
    published: Boolean(project.published),
    status,
    published_at: project.published_at ? String(project.published_at) : undefined,
    created_at: project.created_at ? String(project.created_at) : undefined,
    updated_at: project.updated_at ? String(project.updated_at) : undefined,
  }
}

const normalizeExperience = (entry: Record<string, unknown>): ExperienceEntry => ({
  id: String(entry.id),
  company: String(entry.company ?? ""),
  role: String(entry.role ?? ""),
  start_date: String(entry.start_date ?? ""),
  end_date: entry.end_date ? String(entry.end_date) : null,
  date_label: String(entry.date_label ?? ""),
  description: String(entry.description ?? ""),
  sort_order: Number(entry.sort_order ?? 0),
  created_at: entry.created_at ? String(entry.created_at) : undefined,
  updated_at: entry.updated_at ? String(entry.updated_at) : undefined,
})

const normalizeSiteContent = (value: Record<string, unknown>): SiteContent => ({
  id: Number(value.id ?? 1),
  logo_mark: String(value.logo_mark ?? defaultSiteContent.logo_mark),
  logo_text: String(value.logo_text ?? defaultSiteContent.logo_text),
  hero_badge: String(value.hero_badge ?? defaultSiteContent.hero_badge),
  hero_headline: String(value.hero_headline ?? defaultSiteContent.hero_headline),
  hero_accent_word: String(value.hero_accent_word ?? defaultSiteContent.hero_accent_word),
  hero_subheadline: String(value.hero_subheadline ?? defaultSiteContent.hero_subheadline),
  avatar_url: String(value.avatar_url ?? defaultSiteContent.avatar_url),
  about_title: String(value.about_title ?? defaultSiteContent.about_title),
  about_body: String(value.about_body ?? defaultSiteContent.about_body),
  contact_title: String(value.contact_title ?? defaultSiteContent.contact_title),
  contact_subtitle: String(value.contact_subtitle ?? defaultSiteContent.contact_subtitle),
  contact_email: String(value.contact_email ?? defaultSiteContent.contact_email),
  resume_url: String(value.resume_url ?? defaultSiteContent.resume_url),
  footer_attribution: String(value.footer_attribution ?? defaultSiteContent.footer_attribution),
  updated_at: value.updated_at ? String(value.updated_at) : undefined,
})

const normalizeSocialLink = (entry: Record<string, unknown>): SocialLink => ({
  id: Number(entry.id),
  label: String(entry.label ?? ""),
  url: String(entry.url ?? ""),
  icon: (entry.icon as SocialLink["icon"]) ?? "website",
  sort_order: Number(entry.sort_order ?? 0),
  visible: Boolean(entry.visible),
})

export const getPublicHomepageData = cache(async () => {
  if (!hasSupabaseEnv()) {
    return {
      site: defaultSiteContent,
      projects: defaultProjects,
      experience: defaultExperience,
      socialLinks: defaultSocialLinks,
      usedFallback: true,
    }
  }

  const supabase = await createSupabaseServerClient()

  const [siteResult, projectsResult, experienceResult, socialLinksResult] = await Promise.all([
    supabase.from("site_content").select("*").limit(1).maybeSingle(),
    supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false }),
    supabase.from("experience").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("social_links")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true }),
  ])

  const site = siteResult.data ? normalizeSiteContent(siteResult.data) : defaultSiteContent
  const projects = projectsResult.data
    ? projectsResult.data.map((project) => normalizeProject(project as Record<string, unknown>))
    : defaultProjects
  const experience = experienceResult.data
    ? experienceResult.data.map((entry) => normalizeExperience(entry as Record<string, unknown>))
    : defaultExperience
  const socialLinks = socialLinksResult.data
    ? socialLinksResult.data.map((entry) => normalizeSocialLink(entry as Record<string, unknown>))
    : defaultSocialLinks

  return {
    site,
    projects,
    experience,
    socialLinks,
    usedFallback: false,
  }
})

export const getPublishedProjectBySlug = cache(async (slug: string) => {
  if (!hasSupabaseEnv()) {
    return defaultProjects.find((project) => project.slug === slug) ?? null
  }

  const supabase = await createSupabaseServerClient()

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  return data ? normalizeProject(data as Record<string, unknown>) : null
})

export const getNextPublishedProject = cache(async (slug: string) => {
  if (!hasSupabaseEnv()) {
    const projects = defaultProjects
    const index = projects.findIndex((project) => project.slug === slug)
    if (index < 0) {
      return null
    }

    return projects[(index + 1) % projects.length] ?? null
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("projects")
    .select("id, title, slug")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })

  if (!data || data.length === 0) {
    return null
  }

  const index = data.findIndex((project) => project.slug === slug)

  if (index < 0) {
    return data[0]
  }

  return data[(index + 1) % data.length]
})
