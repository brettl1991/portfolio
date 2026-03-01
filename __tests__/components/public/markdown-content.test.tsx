import { render, screen } from "@testing-library/react"

import { MarkdownContent } from "@/components/public/markdown-content"

describe("MarkdownContent", () => {
  it("renders section headings, list items, and inline styles", () => {
    render(
      <MarkdownContent
        markdown={[
          "## Overview",
          "Built with **Next.js** and `TypeScript`.",
          "- Feature one",
          "- Feature two",
        ].join("\n")}
      />,
    )

    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("Feature one")).toBeInTheDocument()
    expect(screen.getByText("Feature two")).toBeInTheDocument()
  })

  it("renders tertiary heading and handles blank lines", () => {
    const { container } = render(
      <MarkdownContent markdown={["### Details", "", "Paragraph"].join("\n")} />,
    )

    expect(screen.getByRole("heading", { name: "Details" })).toBeInTheDocument()
    expect(screen.getByText("Paragraph")).toBeInTheDocument()
    expect(container.querySelector("div.h-2")).toBeInTheDocument()
  })
})
