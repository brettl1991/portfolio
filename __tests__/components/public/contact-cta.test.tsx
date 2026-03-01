import { render, screen } from "@testing-library/react"

import { ContactCta } from "@/components/public/contact-cta"
import { siteFixture, socialLinksFixture } from "@/__tests__/fixtures/content"

describe("ContactCta", () => {
  it("renders title, subtitle and action links", () => {
    render(<ContactCta site={siteFixture} socialLinks={socialLinksFixture} />)

    expect(screen.getByRole("heading", { name: "Get In Touch" })).toBeInTheDocument()
    expect(screen.getByText("Let us collaborate.")).toBeInTheDocument()

    const emailLink = screen.getByRole("link", { name: /email/i })
    const linkedInLink = screen.getByRole("link", { name: /linkedin/i })
    const resumeLink = screen.getByRole("link", { name: /resume/i })

    expect(emailLink).toHaveAttribute("href", "mailto:hello@example.com")
    expect(linkedInLink).toHaveAttribute("href", "https://linkedin.com/in/example")
    expect(resumeLink).toHaveAttribute("href", "https://example.com/resume.pdf")
  })

  it("falls back to default LinkedIn URL when link is missing", () => {
    render(<ContactCta site={siteFixture} socialLinks={[]} />)

    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://linkedin.com")
  })
})
