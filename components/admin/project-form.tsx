"use client"

import { Save, Upload } from "lucide-react"

import { MediaPickerDialog } from "@/components/admin/media-picker-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useProjectEditorState } from "@/hooks/use-project-editor-state"

interface ProjectFormData {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  body_md?: string
  tech_tags?: string[]
  cover_image_url?: string
  thumbnail_url?: string
  gallery_images?: string[]
  demo_url?: string
  github_url?: string
  role?: string
  timeline?: string
  published?: boolean
}

interface MediaAsset {
  id: string
  file_name: string
  public_url: string
}

interface ProjectFormProps {
  project: ProjectFormData | null
  mediaAssets: MediaAsset[]
  action: (formData: FormData) => Promise<void>
}

export function ProjectForm({ project, mediaAssets, action }: ProjectFormProps) {
  const {
    coverImageUrl,
    setCoverImageUrl,
    thumbnailUrl,
    setThumbnailUrl,
    galleryImages,
    setGalleryImages,
    published,
    setPublished,
    selectCoverImage,
    selectThumbnailImage,
    addGalleryImage,
  } = useProjectEditorState(project)

  const statusLabel = published ? "Published" : "Draft"

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="id" value={project?.id ?? "new"} />
      <input type="hidden" name="published" value={published ? "true" : "false"} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
          <CardHeader>
            <CardTitle className="font-mono text-base">Project Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={project?.title ?? ""} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={project?.slug ?? ""} placeholder="auto-from-title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech_tags">Tech Tags (comma separated)</Label>
                <Input
                  id="tech_tags"
                  name="tech_tags"
                  defaultValue={(project?.tech_tags ?? []).join(", ")}
                  placeholder="Next.js, Supabase, Tailwind"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" defaultValue={project?.excerpt ?? ""} rows={4} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body_md">Body (Markdown)</Label>
              <Textarea id="body_md" name="body_md" defaultValue={project?.body_md ?? ""} rows={14} required />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-slate-900/10 px-3 py-2 dark:border-white/10">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-xs text-muted-foreground">{statusLabel}</p>
                </div>
                <Switch checked={published} onCheckedChange={setPublished} aria-label="Toggle published" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" defaultValue={project?.role ?? ""} placeholder="Lead Engineer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input id="timeline" name="timeline" defaultValue={project?.timeline ?? ""} placeholder="2024 - 2025" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">Cover Image URL</Label>
                <Input
                  id="cover_image_url"
                  name="cover_image_url"
                  value={coverImageUrl}
                  onChange={(event) => setCoverImageUrl(event.target.value)}
                  placeholder="https://..."
                />
                <MediaPickerDialog
                  assets={mediaAssets}
                  onSelect={selectCoverImage}
                  title="Pick cover image"
                  triggerLabel="Pick Cover Image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  name="thumbnail_url"
                  value={thumbnailUrl}
                  onChange={(event) => setThumbnailUrl(event.target.value)}
                  placeholder="https://..."
                />
                <MediaPickerDialog
                  assets={mediaAssets}
                  onSelect={selectThumbnailImage}
                  title="Pick thumbnail image"
                  triggerLabel="Pick Thumbnail"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gallery_images">Gallery Image URLs (one per line)</Label>
                <Textarea
                  id="gallery_images"
                  name="gallery_images"
                  value={galleryImages}
                  onChange={(event) => setGalleryImages(event.target.value)}
                  rows={6}
                />
                <MediaPickerDialog
                  assets={mediaAssets}
                  onSelect={addGalleryImage}
                  title="Add gallery image"
                  triggerLabel="Add Gallery Images"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo_url">Live URL</Label>
                <Input id="demo_url" name="demo_url" defaultValue={project?.demo_url ?? ""} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  name="github_url"
                  defaultValue={project?.github_url ?? ""}
                  placeholder="https://github.com/..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" name="intent" value="save" className="rounded-md">
          <Save className="size-4" aria-hidden="true" />
          Save Draft
        </Button>
        <Button type="submit" name="intent" value="publish" variant="outline" className="rounded-md">
          <Upload className="size-4" aria-hidden="true" />
          Save & Publish
        </Button>
      </div>
    </form>
  )
}
