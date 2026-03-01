import { fileExtensionLabel, isDocumentAsset, isImageAsset, matchesMediaKind } from "@/lib/media"

describe("media helpers", () => {
  it("detects image assets by file name", () => {
    expect(isImageAsset("avatar.png")).toBe(true)
    expect(isImageAsset("resume.pdf")).toBe(false)
  })

  it("detects document assets by extension", () => {
    expect(isDocumentAsset("resume.pdf")).toBe(true)
    expect(isDocumentAsset("photo.webp")).toBe(false)
  })

  it("falls back to URL extension when file name has none", () => {
    expect(isImageAsset("avatar", "https://cdn.example.com/avatar.webp")).toBe(true)
    expect(isDocumentAsset("resume", "https://cdn.example.com/resume.pdf")).toBe(true)
  })

  it("handles files with no extension", () => {
    expect(isImageAsset("avatar", "")).toBe(false)
    expect(isDocumentAsset("resume", "")).toBe(false)
    expect(fileExtensionLabel("resume", "")).toBe("FILE")
  })

  it("filters by picker kind", () => {
    expect(matchesMediaKind("avatar.jpg", "", "images")).toBe(true)
    expect(matchesMediaKind("resume.pdf", "", "images")).toBe(false)
    expect(matchesMediaKind("resume.pdf", "", "documents")).toBe(true)
    expect(matchesMediaKind("anything.bin", "", "all")).toBe(true)
  })

  it("returns uppercase extension labels", () => {
    expect(fileExtensionLabel("resume.pdf")).toBe("PDF")
    expect(fileExtensionLabel("https://cdn.example.com/file.docx?token=abc")).toBe("DOCX")
  })
})
