import { createElement, type ReactNode } from "react"

import "@testing-library/jest-dom"

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props
    delete rest.unoptimized
    delete rest.priority
    delete rest.fill
    delete rest.loader
    delete rest.quality
    delete rest.placeholder
    delete rest.blurDataURL
    return createElement("img", {
      src: String(src),
      alt: String(alt ?? ""),
      ...rest,
    })
  },
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname?: string }
    children: ReactNode
  }) =>
    createElement(
      "a",
      {
        href: typeof href === "string" ? href : String(href.pathname ?? ""),
        ...rest,
      },
      children,
    ),
}))

if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  })
}
