import { render, screen } from "@testing-library/react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

describe("UI primitives", () => {
  it("renders Badge with default and asChild variants", () => {
    const { rerender } = render(<Badge>Default badge</Badge>)
    expect(screen.getByText("Default badge")).toBeInTheDocument()

    rerender(
      <Badge asChild variant="link">
        <a href="/docs">Docs</a>
      </Badge>,
    )

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs")
  })

  it("renders Button with regular and asChild branches", () => {
    const { rerender } = render(<Button variant="secondary">Click</Button>)
    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument()

    rerender(
      <Button asChild variant="link">
        <a href="/about">About</a>
      </Button>,
    )

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about")
  })

  it("uses default variants when no button or badge variant is provided", () => {
    render(
      <div>
        <Button>Default button</Button>
        <Badge>Default badge variant</Badge>
      </div>,
    )

    expect(screen.getByRole("button", { name: "Default button" })).toHaveAttribute("data-variant", "default")
    expect(screen.getByText("Default badge variant")).toHaveAttribute("data-variant", "default")
    expect(buttonVariants()).toContain("bg-primary")
    expect(badgeVariants()).toContain("bg-primary")
  })

  it("renders card composition including action and description slots", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card title</CardTitle>
          <CardDescription>Card description</CardDescription>
          <CardAction>
            <button type="button">Action</button>
          </CardAction>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByText("Card title")).toBeInTheDocument()
    expect(screen.getByText("Card description")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })
})
