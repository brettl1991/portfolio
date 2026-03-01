import { BriefcaseBusiness } from "lucide-react"

import { Reveal } from "@/components/public/reveal"
import { SectionHeader } from "@/components/public/section-header"
import { formatDateLabel } from "@/lib/format"
import type { ExperienceEntry } from "@/types/content"

interface ExperienceTimelineProps {
  entries: ExperienceEntry[]
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="scroll-mt-24 py-14 lg:py-20">
      <Reveal>
        <SectionHeader title="Experience" icon={BriefcaseBusiness} />
      </Reveal>
      <div className="space-y-6 lg:space-y-8">
        {entries.map((entry, index) => (
          <Reveal
            key={entry.id}
            className={index % 2 === 0 ? "" : "motion-safe:delay-100"}
          >
            <article className="relative rounded-2xl border border-slate-900/10 bg-white p-5 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-8">
              <div className="relative lg:pl-6">
                <span
                  className="absolute left-0 top-1 hidden h-full w-px bg-slate-300 dark:bg-slate-700 lg:block"
                  aria-hidden="true"
                />
                <span
                  className="absolute -left-1 top-1 hidden size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 lg:block"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">{entry.company}</p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{entry.role}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {formatDateLabel(entry.start_date, entry.end_date, entry.date_label)}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 lg:mt-0">
                {entry.description}
              </p>
              {index < entries.length - 1 ? (
                <span
                  className="absolute bottom-0 left-0 hidden h-px w-full bg-slate-900/5 dark:bg-white/5 lg:block"
                  aria-hidden="true"
                />
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
