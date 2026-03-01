"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { ThemeSwitch } from "@/components/ThemeSwitch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { publicNavItems } from "@/data/config/navigation"
import { useActiveNavSection } from "@/hooks/use-active-nav-section"
import { cn } from "@/lib/utils"

interface TopNavProps {
  logoMark: string
  logoText: string
}

export function TopNav({ logoMark, logoText }: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { activeSection, setActiveSection } = useActiveNavSection(publicNavItems, { initialSection: "home" })

  function handleNavClick(sectionId: string) {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-slate-50/90 backdrop-blur dark:border-white/10 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-cyan-600/10 font-mono text-sm font-semibold text-cyan-700 ring-1 ring-cyan-600/25 transition-colors group-hover:bg-cyan-600/20 dark:bg-cyan-400/15 dark:text-cyan-300 dark:ring-cyan-400/25 dark:group-hover:bg-cyan-400/25">
            {logoMark}
          </span>
          <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100">
            {logoText}
          </span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <nav className="flex items-center gap-1" aria-label="Primary">
            {publicNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/40",
                  activeSection === item.id
                    ? "bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeSwitch />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-mono text-base">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile navigation">
                {publicNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors",
                      activeSection === item.id
                        ? "bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
