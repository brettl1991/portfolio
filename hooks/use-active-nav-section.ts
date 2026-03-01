"use client"

import { useCallback, useEffect, useState } from "react"

interface ActiveSectionItem {
  id: string
}

interface UseActiveNavSectionOptions {
  initialSection?: string
}

export function useActiveNavSection(
  items: ActiveSectionItem[],
  { initialSection = "home" }: UseActiveNavSectionOptions = {},
) {
  const [activeSection, setActiveSection] = useState(initialSection)

  const updateActiveSection = useCallback((sectionId: string) => {
    setActiveSection((current) => (current === sectionId ? current : sectionId))
  }, [])

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    const validSections = new Set(items.map((item) => item.id))

    const syncActiveFromHash = () => {
      const hashSection = window.location.hash.replace("#", "")
      if (hashSection && validSections.has(hashSection)) {
        updateActiveSection(hashSection)
      }
    }

    const frame = window.requestAnimationFrame(syncActiveFromHash)
    window.addEventListener("hashchange", syncActiveFromHash)

    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (sectionElements.length === 0) {
      return () => {
        window.cancelAnimationFrame(frame)
        window.removeEventListener("hashchange", syncActiveFromHash)
      }
    }

    const sectionVisibility = new Map<string, number>()
    sectionElements.forEach((section) => sectionVisibility.set(section.id, 0))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const topVisibleSection = [...sectionVisibility.entries()].sort((a, b) => b[1] - a[1])[0]

        if (topVisibleSection && topVisibleSection[1] > 0) {
          updateActiveSection(topVisibleSection[0])
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: "-30% 0px -45% 0px",
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", syncActiveFromHash)
      observer.disconnect()
    }
  }, [items, updateActiveSection])

  return {
    activeSection,
    setActiveSection: updateActiveSection,
  }
}
