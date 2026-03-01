import { cache } from "react"

import { defaultExperience, defaultProjects, defaultSiteContent } from "@/data/default-content"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const textSearch = (needle: string, haystack: string) =>
  haystack.toLowerCase().includes(needle.toLowerCase())

export const getAdminDashboardStats = cache(async () => {
  if (!hasSupabaseEnv()) {
    const published = defaultProjects.filter((project) => project.published).length
    const drafts = defaultProjects.length - published

    return {
      projectsCount: defaultProjects.length,
      publishedCount: published,
      draftCount: drafts,
      experienceCount: defaultExperience.length,
      hasSeedContent: true,
      fallbackMode: true,
    }
  }

  const supabase = await createSupabaseServerClient()

  const [{ count: projectsCount }, { count: publishedCount }, { count: draftCount }, { count: experienceCount }, siteResult] =
    await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", false),
      supabase.from("experience").select("id", { count: "exact", head: true }),
      supabase.from("site_content").select("id").limit(1).maybeSingle(),
    ])

  return {
    projectsCount: projectsCount ?? 0,
    publishedCount: publishedCount ?? 0,
    draftCount: draftCount ?? 0,
    experienceCount: experienceCount ?? 0,
    hasSeedContent: Boolean(siteResult.data),
    fallbackMode: false,
  }
})

export async function getSiteContentForAdmin() {
  if (!hasSupabaseEnv()) {
    return defaultSiteContent
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("site_content").select("*").limit(1).maybeSingle()

  return data ?? defaultSiteContent
}

export async function getSocialLinksForAdmin() {
  if (!hasSupabaseEnv()) {
    return []
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("social_links").select("*").order("sort_order", { ascending: true })

  return data ?? []
}

export async function getProjectsForAdmin(search = "", status = "all") {
  if (!hasSupabaseEnv()) {
    return defaultProjects.filter((project) => {
      const searchMatches = !search || textSearch(search, `${project.title} ${project.slug}`)
      const statusMatches =
        status === "all" ? true : status === "published" ? project.published : !project.published

      return searchMatches && statusMatches
    })
  }

  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from("projects")
    .select("id, title, slug, status, published, updated_at, created_at")
    .order("updated_at", { ascending: false, nullsFirst: false })

  if (search) {
    query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
  }

  if (status === "published") {
    query = query.eq("published", true)
  }

  if (status === "draft") {
    query = query.eq("published", false)
  }

  const { data } = await query

  return data ?? []
}

export async function getProjectForAdmin(id: string) {
  if (id === "new") {
    return null
  }

  if (!hasSupabaseEnv()) {
    return defaultProjects.find((project) => project.id === id) ?? null
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle()

  return data
}

export async function getExperienceForAdmin() {
  if (!hasSupabaseEnv()) {
    return defaultExperience
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("experience").select("*").order("sort_order", { ascending: true })

  return data ?? []
}

export async function getMediaForAdmin() {
  if (!hasSupabaseEnv()) {
    return []
  }

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false })

  return data ?? []
}
