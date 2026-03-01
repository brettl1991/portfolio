import { act, render, screen } from "@testing-library/react"

import { TopNav } from "@/components/public/top-nav"

jest.mock("@/components/ThemeSwitch", () => ({
  __esModule: true,
  ThemeSwitch: () => <button type="button">Theme</button>,
}))

class IntersectionObserverMock {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

describe("TopNav", () => {
  const originalHash = window.location.hash
  const originalIntersectionObserver = window.IntersectionObserver

  beforeEach(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: IntersectionObserverMock,
    })
  })

  afterEach(() => {
    window.location.hash = originalHash
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: originalIntersectionObserver,
    })
  })

  it("activates section from hash after mount when hash matches nav id", () => {
    window.location.hash = "#projects"

    render(<TopNav logoMark="{A}" logoText="Alex" />)
    act(() => {
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    })

    const projectLinks = screen.getAllByRole("link", { name: "Projects" })
    expect(projectLinks.some((link) => link.getAttribute("aria-current") === "page")).toBe(true)
  })

  it("keeps Home active when hash does not match known nav sections", () => {
    window.location.hash = "#missing"

    render(<TopNav logoMark="{A}" logoText="Alex" />)

    const homeLinks = screen.getAllByRole("link", { name: "Home" })
    expect(homeLinks.some((link) => link.getAttribute("aria-current") === "page")).toBe(true)
  })
})
