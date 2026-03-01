"use client"

import { useState } from "react"

export interface ProjectEditorStateSource {
  cover_image_url?: string
  thumbnail_url?: string
  gallery_images?: string[]
  published?: boolean
}

function appendLineValue(current: string, next: string) {
  return current ? `${current}\n${next}` : next
}

export function useProjectEditorState(project: ProjectEditorStateSource | null) {
  const [coverImageUrl, setCoverImageUrl] = useState(project?.cover_image_url ?? "")
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail_url ?? project?.cover_image_url ?? "")
  const [galleryImages, setGalleryImages] = useState((project?.gallery_images ?? []).join("\n"))
  const [published, setPublished] = useState(Boolean(project?.published))

  const selectCoverImage = (url: string) => {
    setCoverImageUrl(url)
    setThumbnailUrl((current) => (current || url))
  }

  const selectThumbnailImage = (url: string) => {
    setThumbnailUrl(url)
  }

  const addGalleryImage = (url: string) => {
    setGalleryImages((current) => appendLineValue(current, url))
  }

  return {
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
  }
}
