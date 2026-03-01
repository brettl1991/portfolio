import { formatDateLabel, highlightWord } from "@/lib/format"

describe("formatDateLabel", () => {
  it("returns explicit date label when provided", () => {
    expect(formatDateLabel("2024-01-01", null, "2024 - Present")).toBe("2024 - Present")
  })

  it("returns empty string for invalid start date", () => {
    expect(formatDateLabel("invalid", null)).toBe("")
  })

  it("formats open-ended ranges with Present", () => {
    const value = formatDateLabel("2024-01-15T12:00:00.000Z", null)

    expect(value).toContain("2024")
    expect(value).toContain("Present")
    expect(value).toContain("-")
  })

  it("formats closed ranges when end date is valid", () => {
    const value = formatDateLabel("2024-01-01T00:00:00.000Z", "2024-06-01T00:00:00.000Z")

    expect(value).toContain("2024")
    expect(value).not.toContain("Present")
  })

  it("falls back to Present when end date is invalid", () => {
    const value = formatDateLabel("2024-01-01T00:00:00.000Z", "invalid")

    expect(value).toContain("Present")
  })
})

describe("highlightWord", () => {
  it("splits text around matching word", () => {
    const result = highlightWord("Crafting modern web experiences", "modern")

    expect(result).toEqual({
      before: "Crafting ",
      match: "modern",
      after: " web experiences",
    })
  })

  it("returns full text as before when no match exists", () => {
    expect(highlightWord("No accent here", "missing")).toEqual({
      before: "No accent here",
      match: "",
      after: "",
    })
  })

  it("returns unchanged text when highlight is empty", () => {
    expect(highlightWord("No accent here", "")).toEqual({
      before: "No accent here",
      match: "",
      after: "",
    })
  })
})
