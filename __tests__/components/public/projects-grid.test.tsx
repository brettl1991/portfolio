import { render, screen } from "@testing-library/react"

import { ProjectsGrid } from "@/components/public/projects-grid"
import { projectFixture } from "@/__tests__/fixtures/content"

describe("ProjectsGrid", () => {
  it("renders empty state when there are no projects", () => {
    render(<ProjectsGrid projects={[]} />)

    expect(screen.getByText("No published projects yet.")).toBeInTheDocument()
  })

  it("renders project cards when projects exist", () => {
    render(<ProjectsGrid projects={[projectFixture, { ...projectFixture, id: "2", title: "Analytics Dashboard" }]} />)

    expect(screen.getByText("Realtime Collaboration Platform")).toBeInTheDocument()
    expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument()
  })

  it("applies staggered class variants for third project items", () => {
    const { container } = render(
      <ProjectsGrid
        projects={[
          projectFixture,
          { ...projectFixture, id: "2", title: "Second" },
          { ...projectFixture, id: "3", title: "Third" },
        ]}
      />,
    )

    expect(screen.getByText("Third")).toBeInTheDocument()
    expect(container.querySelector('div[class*="motion-safe:delay-200"]')).toBeInTheDocument()
  })
})
