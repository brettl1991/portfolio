import { render, screen } from "@testing-library/react"

import { SiteFooter } from "@/components/public/site-footer"

describe("SiteFooter", () => {
  it("renders attribution text", () => {
    render(<SiteFooter attribution="Designed and developed by Alex Builder." />)

    expect(screen.getByText("Designed and developed by Alex Builder.")).toBeInTheDocument()
  })
})
