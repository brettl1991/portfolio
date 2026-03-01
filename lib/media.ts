export type MediaPickerKind = "images" | "documents" | "all"

const imageExtensions = new Set(["jpg", "jpeg", "png", "gif", "webp", "avif", "svg", "bmp"])
const documentExtensions = new Set(["pdf", "doc", "docx", "txt"])

function extractExtension(value: string) {
  const normalized = value.toLowerCase().split("?")[0].split("#")[0]
  const slashIndex = normalized.lastIndexOf("/")
  const segment = normalized.slice(slashIndex + 1)
  const parts = segment.split(".")

  return parts.length > 1 ? parts[parts.length - 1] : ""
}

export function isImageAsset(fileName: string, publicUrl = "") {
  const extension = extractExtension(fileName) || extractExtension(publicUrl)
  return imageExtensions.has(extension)
}

export function isDocumentAsset(fileName: string, publicUrl = "") {
  const extension = extractExtension(fileName) || extractExtension(publicUrl)
  return documentExtensions.has(extension)
}

export function matchesMediaKind(fileName: string, publicUrl: string, kind: MediaPickerKind) {
  if (kind === "all") {
    return true
  }

  if (kind === "images") {
    return isImageAsset(fileName, publicUrl)
  }

  return isDocumentAsset(fileName, publicUrl)
}

export function fileExtensionLabel(fileName: string, publicUrl = "") {
  const extension = extractExtension(fileName) || extractExtension(publicUrl)
  return extension ? extension.toUpperCase() : "FILE"
}
