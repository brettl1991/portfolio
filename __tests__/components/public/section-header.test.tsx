import { render, screen } from "@testing-library/react"
import { FolderCode } from "lucide-react"

import { SectionHeader } from "@/components/public/section-header"

describe("SectionHeader", () => {
  it("renders section heading text", () => {
    render(<SectionHeader title="Projects" icon={FolderCode} />)

    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument()
  })
})
