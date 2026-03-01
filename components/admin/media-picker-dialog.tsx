"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { FileText, ImagePlus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { fileExtensionLabel, isImageAsset, matchesMediaKind, type MediaPickerKind } from "@/lib/media"

interface MediaPickerAsset {
  id: string
  file_name: string
  public_url: string
}

interface MediaPickerDialogProps {
  assets: MediaPickerAsset[]
  onSelect: (url: string) => void
  title?: string
  description?: string
  acceptKind?: MediaPickerKind
  triggerLabel?: string
}

export function MediaPickerDialog({
  assets,
  onSelect,
  title = "Select Media",
  description = "Choose a file from the media library.",
  acceptKind = "images",
  triggerLabel = "Pick media",
}: MediaPickerDialogProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filteredAssets = useMemo(() => {
    const byKind = assets.filter((asset) => matchesMediaKind(asset.file_name, asset.public_url, acceptKind))

    if (!search) {
      return byKind
    }

    return byKind.filter((asset) => asset.file_name.toLowerCase().includes(search.toLowerCase()))
  }, [acceptKind, assets, search])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="rounded-md">
          <ImagePlus className="size-4" aria-hidden="true" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search files"
              className="pl-9"
            />
          </div>
          {filteredAssets.length > 0 ? (
            <div className="grid max-h-80 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((asset) => {
                const imageAsset = isImageAsset(asset.file_name, asset.public_url)

                return (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      onSelect(asset.public_url)
                      setOpen(false)
                    }}
                    className="group overflow-hidden rounded-xl border border-slate-900/10 text-left transition hover:border-cyan-600/30 hover:shadow-md hover:shadow-cyan-600/15 dark:border-white/10 dark:hover:border-cyan-400/30"
                  >
                    {imageAsset ? (
                      <Image
                        src={asset.public_url}
                        alt={asset.file_name}
                        width={640}
                        height={360}
                        unoptimized
                        className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="size-8" aria-hidden="true" />
                          <span className="rounded-full bg-slate-200 px-2 py-1 text-xs dark:bg-slate-700">
                            {fileExtensionLabel(asset.file_name, asset.public_url)}
                          </span>
                        </div>
                      </div>
                    )}
                    <p className="truncate px-3 py-2 text-xs text-slate-600 dark:text-slate-300">{asset.file_name}</p>
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-900/15 p-6 text-center text-sm text-muted-foreground dark:border-white/15">
              No matching files found.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
