import { ActionToast } from "@/components/admin/action-toast"
import { SiteContentForm } from "@/components/admin/site-content-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMediaForAdmin, getSiteContentForAdmin, getSocialLinksForAdmin } from "@/lib/data/admin"

import { saveSiteContentAction } from "@/app/admin/(protected)/actions"

interface SiteContentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminSiteContentPage({ searchParams }: SiteContentPageProps) {
  const [siteContent, socialLinks, mediaAssets, params] = await Promise.all([
    getSiteContentForAdmin(),
    getSocialLinksForAdmin(),
    getMediaForAdmin(),
    searchParams,
  ])

  const saved = params.saved === "1"
  const error = params.error === "save_failed"

  return (
    <div className="space-y-4">
      {saved ? <ActionToast message="Site content saved." /> : null}
      {error ? <ActionToast type="error" message="Failed to save site content." /> : null}
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader>
          <CardTitle className="font-mono text-xl">Site Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Site content saved successfully.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Failed to save site content.
            </p>
          ) : null}
          <SiteContentForm
            siteContent={siteContent}
            socialLinks={socialLinks}
            mediaAssets={mediaAssets.map((asset) => ({
              id: String(asset.id),
              file_name: String(asset.file_name ?? ""),
              public_url: String(asset.public_url ?? ""),
            }))}
            action={saveSiteContentAction}
          />
        </CardContent>
      </Card>
    </div>
  )
}
