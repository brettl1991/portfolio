"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { requireAdminClient } from "@/lib/auth"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"

const toText = (value: FormDataEntryValue | null) => String(value ?? "").trim()

const toBool = (value: FormDataEntryValue | null) => {
  const normalized = String(value ?? "").toLowerCase()
  return normalized === "true" || normalized === "on" || normalized === "1"
}

const parseCommaList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

const parseLineList = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

function refreshAllContentPaths() {
  revalidatePath("/")
  revalidatePath("/projects/[slug]", "page")
  revalidatePath("/admin")
  revalidatePath("/admin/site")
  revalidatePath("/admin/projects")
  revalidatePath("/admin/experience")
  revalidatePath("/admin/media")
}

export async function signOutAction() {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login")
  }

  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()

  redirect("/admin/login")
}

export async function saveSiteContentAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/site?saved=1")
  }

  const supabase = await requireAdminClient()

  const siteId = Number(toText(formData.get("id")) || 1)
  const siteFieldKeys = [
    "logo_mark",
    "logo_text",
    "hero_badge",
    "hero_headline",
    "hero_accent_word",
    "hero_subheadline",
    "avatar_url",
    "about_title",
    "about_body",
    "contact_title",
    "contact_subtitle",
    "contact_email",
    "resume_url",
    "footer_attribution",
  ] as const

  const payload: { id: number } & Partial<Record<(typeof siteFieldKeys)[number], string>> = { id: siteId }

  siteFieldKeys.forEach((key) => {
    if (formData.has(key)) {
      payload[key] = toText(formData.get(key))
    }
  })

  const { error } = await supabase.from("site_content").upsert(payload, { onConflict: "id" })

  if (error) {
    redirect("/admin/site?error=save_failed")
  }

  const socialDefinitions = [
    {
      formKey: "social_github",
      icon: "github",
      label: "GitHub",
      sort_order: 1,
    },
    {
      formKey: "social_linkedin",
      icon: "linkedin",
      label: "LinkedIn",
      sort_order: 2,
    },
    {
      formKey: "social_instagram",
      icon: "instagram",
      label: "Instagram",
      sort_order: 3,
    },
  ] as const

  const socialRows = socialDefinitions
    .filter((item) => formData.has(item.formKey))
    .map((item) => {
      const url = toText(formData.get(item.formKey))
      return {
        icon: item.icon,
        label: item.label,
        sort_order: item.sort_order,
        url,
        visible: Boolean(url),
      }
    })

  if (socialRows.length > 0) {
    const { error: socialError } = await supabase.from("social_links").upsert(socialRows, { onConflict: "icon" })

    if (socialError) {
      redirect("/admin/site?error=save_failed")
    }
  }

  refreshAllContentPaths()
  redirect("/admin/site?saved=1")
}

export async function saveProjectAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/projects/new?saved=1")
  }

  const supabase = await requireAdminClient()

  const projectId = toText(formData.get("id"))
  const title = toText(formData.get("title"))
  const slugInput = toText(formData.get("slug"))
  const slug = slugInput || toSlug(title)
  const intent = toText(formData.get("intent"))

  const publishedFromForm = toBool(formData.get("published"))
  const published = intent === "publish" ? true : publishedFromForm

  const payload = {
    title,
    slug,
    excerpt: toText(formData.get("excerpt")),
    body_md: toText(formData.get("body_md")),
    tech_tags: parseCommaList(toText(formData.get("tech_tags"))),
    cover_image_url: toText(formData.get("cover_image_url")),
    thumbnail_url: toText(formData.get("thumbnail_url")) || toText(formData.get("cover_image_url")),
    gallery_images: parseLineList(toText(formData.get("gallery_images"))),
    demo_url: toText(formData.get("demo_url")),
    github_url: toText(formData.get("github_url")),
    role: toText(formData.get("role")),
    timeline: toText(formData.get("timeline")),
    status: published ? "published" : "draft",
    published,
    published_at: published ? new Date().toISOString() : null,
  }

  let savedId = projectId

  if (projectId && projectId !== "new") {
    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", projectId)
      .select("id")
      .single()

    if (error || !data) {
      redirect(`/admin/projects/${projectId}?error=save_failed`)
    }

    savedId = String(data.id)
  } else {
    const { data, error } = await supabase.from("projects").insert(payload).select("id").single()

    if (error || !data) {
      redirect("/admin/projects/new?error=create_failed")
    }

    savedId = String(data.id)
  }

  refreshAllContentPaths()
  redirect(`/admin/projects/${savedId}?saved=1`)
}

export async function toggleProjectPublishAction(projectId: string, shouldPublish: boolean) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/projects")
  }

  const supabase = await requireAdminClient()

  await supabase
    .from("projects")
    .update({
      published: shouldPublish,
      status: shouldPublish ? "published" : "draft",
      published_at: shouldPublish ? new Date().toISOString() : null,
    })
    .eq("id", projectId)

  refreshAllContentPaths()
  redirect("/admin/projects?updated=1")
}

export async function deleteProjectAction(projectId: string) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/projects")
  }

  const supabase = await requireAdminClient()
  await supabase.from("projects").delete().eq("id", projectId)

  refreshAllContentPaths()
  redirect("/admin/projects?deleted=1")
}

export async function saveExperienceAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/experience?saved=1")
  }

  const supabase = await requireAdminClient()

  const id = toText(formData.get("id"))

  const payload = {
    company: toText(formData.get("company")),
    role: toText(formData.get("role")),
    start_date: toText(formData.get("start_date")),
    end_date: toText(formData.get("end_date")) || null,
    date_label: toText(formData.get("date_label")),
    description: toText(formData.get("description")),
    sort_order: Number(toText(formData.get("sort_order")) || 0),
  }

  if (id) {
    await supabase.from("experience").update(payload).eq("id", id)
  } else {
    await supabase.from("experience").insert(payload)
  }

  refreshAllContentPaths()
  redirect("/admin/experience?saved=1")
}

export async function deleteExperienceAction(experienceId: string) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/experience")
  }

  const supabase = await requireAdminClient()
  await supabase.from("experience").delete().eq("id", experienceId)

  refreshAllContentPaths()
  redirect("/admin/experience?deleted=1")
}

export async function uploadMediaAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/media?uploaded=1")
  }

  const supabase = await requireAdminClient()

  const file = formData.get("file") as File | null
  const altText = toText(formData.get("alt_text"))

  if (!file || file.size === 0) {
    redirect("/admin/media?error=file_required")
  }

  const safeFileName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-")
  const path = `${Date.now()}-${safeFileName}`

  const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
    upsert: false,
    contentType: file.type || undefined,
  })

  if (uploadError) {
    redirect("/admin/media?error=upload_failed")
  }

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(path)

  await supabase.from("media").insert({
    file_name: file.name,
    file_path: path,
    public_url: publicUrlData.publicUrl,
    alt_text: altText,
  })

  refreshAllContentPaths()
  redirect("/admin/media?uploaded=1")
}

export async function deleteMediaAction(id: string, filePath: string) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/media")
  }

  const supabase = await requireAdminClient()

  await supabase.storage.from("media").remove([filePath])
  await supabase.from("media").delete().eq("id", id)

  refreshAllContentPaths()
  redirect("/admin/media?deleted=1")
}
