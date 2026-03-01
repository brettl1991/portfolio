import { act, render, screen } from "@testing-library/react"

import { Reveal } from "@/components/public/reveal"

type ObserverCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void

let observerCallback: ObserverCallback | null = null
const observeMock = jest.fn()
const unobserveMock = jest.fn()
const disconnectMock = jest.fn()
const cancelAnimationFrameMock = jest.fn()

describe("Reveal", () => {
  const originalMatchMedia = window.matchMedia
  const originalIntersectionObserver = window.IntersectionObserver
  const originalRequestAnimationFrame = window.requestAnimationFrame
  const originalCancelAnimationFrame = window.cancelAnimationFrame

  beforeEach(() => {
    observerCallback = null
    observeMock.mockReset()
    unobserveMock.mockReset()
    disconnectMock.mockReset()
    cancelAnimationFrameMock.mockReset()

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    class IntersectionObserverMock {
      constructor(cb: ObserverCallback) {
        observerCallback = cb
      }

      observe = observeMock
      unobserve = unobserveMock
      disconnect = disconnectMock
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: IntersectionObserverMock,
    })

    Object.defineProperty(window, "requestAnimationFrame", {
      writable: true,
      value: jest.fn().mockImplementation((cb: (time: number) => void) => {
        cb(0)
        return 1
      }),
    })

    Object.defineProperty(window, "cancelAnimationFrame", {
      writable: true,
      value: cancelAnimationFrameMock,
    })

    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({
      width: 200,
      height: 200,
      top: 1200,
      left: 0,
      right: 200,
      bottom: 1400,
      x: 0,
      y: 1200,
      toJSON: () => ({}),
    }))
  })

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", { writable: true, value: originalMatchMedia })
    Object.defineProperty(window, "IntersectionObserver", { writable: true, value: originalIntersectionObserver })
    Object.defineProperty(window, "requestAnimationFrame", { writable: true, value: originalRequestAnimationFrame })
    Object.defineProperty(window, "cancelAnimationFrame", { writable: true, value: originalCancelAnimationFrame })
    jest.restoreAllMocks()
  })

  it("returns early on reduced motion", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <Reveal>
        <div>content</div>
      </Reveal>,
    )

    expect(observeMock).not.toHaveBeenCalled()
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("toggles hidden and visible phases based on intersection", () => {
    const { unmount, container } = render(
      <Reveal once={false}>
        <div>watch me</div>
      </Reveal>,
    )

    const wrapper = container.firstElementChild as HTMLElement

    expect(observeMock).toHaveBeenCalledTimes(1)
    expect(wrapper.className).toContain("motion-safe:opacity-0")

    act(() => {
      observerCallback?.([{ isIntersecting: true, target: wrapper }])
    })

    expect(wrapper.className).toContain("opacity-100")

    act(() => {
      observerCallback?.([{ isIntersecting: false, target: wrapper }])
    })

    expect(wrapper.className).toContain("motion-safe:opacity-0")

    unmount()
    expect(cancelAnimationFrameMock).toHaveBeenCalled()
    expect(disconnectMock).toHaveBeenCalled()
  })

  it("unobserves intersecting target when once is true", () => {
    const { container } = render(
      <Reveal>
        <div>once</div>
      </Reveal>,
    )

    const wrapper = container.firstElementChild as HTMLElement

    act(() => {
      observerCallback?.([{ isIntersecting: true, target: wrapper }])
    })

    expect(unobserveMock).toHaveBeenCalledWith(wrapper)
  })
})
