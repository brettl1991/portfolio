import { render } from "@testing-library/react"

import { ActionToast } from "@/components/admin/action-toast"

const toastSuccess = jest.fn()
const toastError = jest.fn()
const toastInfo = jest.fn()

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
    info: (...args: unknown[]) => toastInfo(...args),
  },
}))

describe("ActionToast", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    toastSuccess.mockClear()
    toastError.mockClear()
    toastInfo.mockClear()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("calls success toast by default", () => {
    render(<ActionToast message="Saved" />)

    expect(toastSuccess).toHaveBeenCalledTimes(1)
    expect(toastSuccess).toHaveBeenCalledWith("Saved", { id: "success:Saved" })
  })

  it("returns early for empty message", () => {
    render(<ActionToast message="" />)

    expect(toastSuccess).not.toHaveBeenCalled()
    expect(toastError).not.toHaveBeenCalled()
    expect(toastInfo).not.toHaveBeenCalled()
  })

  it("dedupes duplicate toasts in short time window", () => {
    const first = render(<ActionToast message="Saved" />)
    first.unmount()

    render(<ActionToast message="Saved" />)
    expect(toastSuccess).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(2000)
    render(<ActionToast message="Saved" />)

    expect(toastSuccess).toHaveBeenCalledTimes(2)
  })

  it("calls error and info variants", () => {
    const { rerender } = render(<ActionToast type="error" message="Failed" />)
    rerender(<ActionToast type="info" message="Heads up" />)

    expect(toastError).toHaveBeenCalledWith("Failed", { id: "error:Failed" })
    expect(toastInfo).toHaveBeenCalledWith("Heads up", { id: "info:Heads up" })
  })
})
