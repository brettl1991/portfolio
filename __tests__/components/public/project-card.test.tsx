import { render, screen } from "@testing-library/react"

import { ProjectCard } from "@/components/public/project-card"
import { projectFixture } from "@/__tests__/fixtures/content"

describe("ProjectCard", () => {
  it("renders project metadata and details link", () => {
    render(<ProjectCard project={projectFixture} />)

    expect(screen.getByText("Realtime Collaboration Platform")).toBeInTheDocument()
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("Supabase")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /view project/i })).toHaveAttribute(
      "href",
      "/projects/realtime-collaboration-platform",
    )
  })

  it("falls back to default thumbnail when image URLs are missing", () => {
    render(
      <ProjectCard
        project={{
          ...projectFixture,
          id: "missing-image",
          title: "No Image Project",
          thumbnail_url: "",
          cover_image_url: "",
        }}
      />,
    )

    expect(screen.getByRole("img", { name: "No Image Project preview" })).toHaveAttribute("src", "/window.svg")
  })
})
