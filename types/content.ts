export type SocialIcon = "github" | "linkedin" | "instagram" | "x" | "website"

export interface SiteContent {
  id: number
  logo_mark: string
  logo_text: string
  hero_badge: string
  hero_headline: string
  hero_accent_word: string
  hero_subheadline: string
  avatar_url: string
  about_title: string
  about_body: string
  contact_title: string
  contact_subtitle: string
  contact_email: string
  resume_url: string
  footer_attribution: string
  updated_at?: string
}

export interface SocialLink {
  id: number
  label: string
  url: string
  icon: SocialIcon
  sort_order: number
  visible: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  excerpt: string
  body_md: string
  tech_tags: string[]
  cover_image_url: string
  thumbnail_url: string
  gallery_images: string[]
  demo_url: string
  github_url: string
  role: string
  timeline: string
  status: "draft" | "published"
  published: boolean
  published_at?: string
  created_at?: string
  updated_at?: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  date_label: string
  description: string
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface MediaAsset {
  id: string
  file_name: string
  file_path: string
  public_url: string
  alt_text: string
  created_at?: string
}
