import type { LucideIcon } from "lucide-react"

import { typography } from "@/data/config/typography"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
  className?: string
}

export function SectionHeader({ title, icon: Icon, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-center gap-2", className)}>
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-cyan-600/10 text-cyan-700 ring-1 ring-cyan-600/20 dark:bg-cyan-400/15 dark:text-cyan-300 dark:ring-cyan-400/20">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <h2 className={cn(typography.sectionHeading, "text-slate-900 dark:text-slate-100")}>{title}</h2>
    </div>
  )
}
