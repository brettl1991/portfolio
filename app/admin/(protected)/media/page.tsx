import Image from "next/image"
import { FileText } from "lucide-react"

import { ActionToast } from "@/components/admin/action-toast"
import { DeleteActionDialog } from "@/components/admin/delete-action-dialog"
import { CopyUrlButton } from "@/components/admin/copy-url-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getMediaForAdmin } from "@/lib/data/admin"
import { fileExtensionLabel, isImageAsset } from "@/lib/media"

import { deleteMediaAction, uploadMediaAction } from "@/app/admin/(protected)/actions"

interface MediaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminMediaPage({ searchParams }: MediaPageProps) {
  const [mediaAssets, params] = await Promise.all([getMediaForAdmin(), searchParams])
  const uploaded = params.uploaded === "1"
  const deleted = params.deleted === "1"
  const error = typeof params.error === "string" ? params.error : ""

  return (
    <div className="space-y-4">
      {uploaded ? <ActionToast message="Media uploaded." /> : null}
      {deleted ? <ActionToast message="Media deleted." /> : null}
      {error ? (
        <ActionToast
          type="error"
          message={error === "file_required" ? "Please choose a file before uploading." : "Media upload failed."}
        />
      ) : null}
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader>
          <CardTitle className="font-mono text-xl">Media Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploaded ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Media uploaded successfully.
            </p>
          ) : null}
          {deleted ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Media item deleted.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error === "file_required" ? "Please choose a file before uploading." : "Media upload failed."}
            </p>
          ) : null}

          <form action={uploadMediaAction} className="grid gap-4 rounded-xl border border-slate-900/10 p-4 dark:border-white/10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file" accept="image/*,.pdf" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt_text">Alt Text (images only)</Label>
              <Input id="alt_text" name="alt_text" placeholder="Dashboard screenshot" />
            </div>
            <Button type="submit" className="rounded-md">
              Upload
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">Supported here: images and PDF files.</p>

          {mediaAssets.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mediaAssets.map((asset) => {
                const deleteAction = deleteMediaAction.bind(null, String(asset.id), String(asset.file_path))
                const fileName = String(asset.file_name)
                const publicUrl = String(asset.public_url)
                const isImage = isImageAsset(fileName, publicUrl)

                return (
                  <Card key={String(asset.id)} className="overflow-hidden rounded-2xl border-slate-900/10 dark:border-white/10">
                    {isImage ? (
                      <Image
                        src={publicUrl}
                        alt={String(asset.alt_text || asset.file_name || "Media item")}
                        width={1280}
                        height={720}
                        unoptimized
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="size-8" aria-hidden="true" />
                          <span className="rounded-full bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">
                            {fileExtensionLabel(fileName, publicUrl)}
                          </span>
                        </div>
                      </div>
                    )}
                    <CardContent className="space-y-3 p-4">
                      <p className="truncate text-sm font-medium">{fileName}</p>
                      <div className="flex flex-wrap gap-2">
                        <CopyUrlButton url={publicUrl} />
                        <DeleteActionDialog
                          title="Delete media"
                          description="This removes the file from storage and the media catalog."
                          action={deleteAction}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-900/20 p-6 text-center text-sm text-muted-foreground dark:border-white/20">
              No media uploaded yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
