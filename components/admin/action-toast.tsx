"use client"

import { useEffect } from "react"
import { toast } from "sonner"

interface ActionToastProps {
  type?: "success" | "error" | "info"
  message: string
}

const recentToastMap = new Map<string, number>()
const TOAST_DEDUPE_WINDOW_MS = 2000

export function ActionToast({ type = "success", message }: ActionToastProps) {
  useEffect(() => {
    if (!message) {
      return
    }

    const id = `${type}:${message}`
    const now = Date.now()
    const lastShownAt = recentToastMap.get(id) ?? 0

    if (now - lastShownAt < TOAST_DEDUPE_WINDOW_MS) {
      return
    }

    recentToastMap.set(id, now)

    window.setTimeout(() => {
      const current = recentToastMap.get(id)
      if (current === now) {
        recentToastMap.delete(id)
      }
    }, TOAST_DEDUPE_WINDOW_MS)

    if (type === "error") {
      toast.error(message, { id })
      return
    }

    if (type === "info") {
      toast.info(message, { id })
      return
    }

    toast.success(message, { id })
  }, [message, type])

  return null
}
