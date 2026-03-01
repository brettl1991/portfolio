"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  once?: boolean
}

export function Reveal({ children, className, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"hidden" | "visible">("visible")

  useEffect(() => {
    const element = ref.current

    /* istanbul ignore next -- defensive runtime guard */
    if (!element || typeof window === "undefined") {
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      return
    }

    const inInitialViewport = element.getBoundingClientRect().top <= window.innerHeight * 0.9

    if (inInitialViewport) {
      return
    }

    let hideFrame = 0
    hideFrame = window.requestAnimationFrame(() => setPhase("hidden"))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("visible")
          if (once) {
            observer.unobserve(entry.target)
          }
          return
        }

        if (!once) {
          setPhase("hidden")
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observer.observe(element)

    return () => {
      window.cancelAnimationFrame(hideFrame)
      observer.disconnect()
    }
  }, [once])

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none",
        phase === "hidden" ? "motion-safe:translate-y-8 motion-safe:opacity-0 motion-safe:blur-sm" : "opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
