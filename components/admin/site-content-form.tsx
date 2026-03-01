"use client"

import { useState } from "react"

import { MediaPickerDialog } from "@/components/admin/media-picker-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface SiteContentFormProps {
  siteContent: Record<string, unknown>
  socialLinks: Array<{ icon: string; url: string }>
  mediaAssets: Array<{ id: string; file_name: string; public_url: string }>
  action: (formData: FormData) => Promise<void>
}

function getSocialUrl(links: Array<{ icon: string; url: string }>, icon: string) {
  return links.find((link) => link.icon === icon)?.url ?? ""
}

export function SiteContentForm({ siteContent, socialLinks, mediaAssets, action }: SiteContentFormProps) {
  const [avatarUrl, setAvatarUrl] = useState(String(siteContent.avatar_url ?? ""))
  const [resumeUrl, setResumeUrl] = useState(String(siteContent.resume_url ?? ""))

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="id" value={String(siteContent.id ?? 1)} />
      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" forceMount>
          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Hero & Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="logo_mark">Logo Mark</Label>
                  <Input id="logo_mark" name="logo_mark" defaultValue={String(siteContent.logo_mark ?? "{A}")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo_text">Logo Text</Label>
                  <Input id="logo_text" name="logo_text" defaultValue={String(siteContent.logo_text ?? "")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_badge">Hero Badge</Label>
                <Input id="hero_badge" name="hero_badge" defaultValue={String(siteContent.hero_badge ?? "")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_headline">Hero Headline</Label>
                <Input id="hero_headline" name="hero_headline" defaultValue={String(siteContent.hero_headline ?? "")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_accent_word">Hero Accent Word</Label>
                <Input
                  id="hero_accent_word"
                  name="hero_accent_word"
                  defaultValue={String(siteContent.hero_accent_word ?? "")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subheadline">Hero Subheadline</Label>
                <Textarea
                  id="hero_subheadline"
                  name="hero_subheadline"
                  rows={4}
                  defaultValue={String(siteContent.hero_subheadline ?? "")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input id="avatar_url" name="avatar_url" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
                <div className="flex flex-wrap gap-2">
                  <MediaPickerDialog
                    assets={mediaAssets}
                    acceptKind="images"
                    title="Pick Avatar Image"
                    description="Choose a square image for the hero and about avatar."
                    triggerLabel="Choose from media"
                    onSelect={(url) => setAvatarUrl(url)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Best results: square image (1:1), at least 800 x 800.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="social_github">GitHub URL</Label>
                  <Input id="social_github" name="social_github" defaultValue={getSocialUrl(socialLinks, "github")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                  <Input
                    id="social_linkedin"
                    name="social_linkedin"
                    defaultValue={getSocialUrl(socialLinks, "linkedin")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="social_instagram">Instagram URL</Label>
                  <Input
                    id="social_instagram"
                    name="social_instagram"
                    defaultValue={getSocialUrl(socialLinks, "instagram")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" forceMount>
          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about_title">About Title</Label>
                <Input id="about_title" name="about_title" defaultValue={String(siteContent.about_title ?? "About Me")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about_body">About Body</Label>
                <Textarea id="about_body" name="about_body" rows={8} defaultValue={String(siteContent.about_body ?? "")} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" forceMount>
          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Contact CTA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_title">CTA Title</Label>
                <Input id="contact_title" name="contact_title" defaultValue={String(siteContent.contact_title ?? "")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_subtitle">CTA Subtitle</Label>
                <Textarea
                  id="contact_subtitle"
                  name="contact_subtitle"
                  rows={4}
                  defaultValue={String(siteContent.contact_subtitle ?? "")}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input id="contact_email" name="contact_email" defaultValue={String(siteContent.contact_email ?? "")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume_url">Resume URL</Label>
                  <Input id="resume_url" name="resume_url" value={resumeUrl} onChange={(event) => setResumeUrl(event.target.value)} />
                  <div className="flex flex-wrap gap-2">
                    <MediaPickerDialog
                      assets={mediaAssets}
                      acceptKind="documents"
                      title="Pick Resume File"
                      description="Choose a PDF from Supabase Storage."
                      triggerLabel="Choose PDF"
                      onSelect={(url) => setResumeUrl(url)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Upload your resume as PDF in Media, then select it here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" forceMount>
          <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-mono text-base">Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer_attribution">Footer Attribution</Label>
                <Input
                  id="footer_attribution"
                  name="footer_attribution"
                  defaultValue={String(siteContent.footer_attribution ?? "")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button type="submit" className="rounded-md">
        Save Site Content
      </Button>
    </form>
  )
}
