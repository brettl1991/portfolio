import { UserRound } from "lucide-react"

import { Reveal } from "@/components/public/reveal"
import { SectionHeader } from "@/components/public/section-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { SiteContent } from "@/types/content"

interface AboutSectionProps {
  site: SiteContent
}

const highlightPhrases = ["maintainable systems", "delightful user interfaces", "production software"]

function renderWithHighlights(text: string) {
  let remaining = text
  const fragments: Array<{ value: string; highlighted: boolean }> = []

  while (remaining.length > 0) {
    const next = highlightPhrases
      .map((phrase) => ({
        phrase,
        index: remaining.toLowerCase().indexOf(phrase.toLowerCase()),
      }))
      .filter((item) => item.index >= 0)
      .sort((a, b) => a.index - b.index)[0]

    if (!next) {
      fragments.push({ value: remaining, highlighted: false })
      break
    }

    if (next.index > 0) {
      fragments.push({ value: remaining.slice(0, next.index), highlighted: false })
    }

    fragments.push({ value: remaining.slice(next.index, next.index + next.phrase.length), highlighted: true })
    remaining = remaining.slice(next.index + next.phrase.length)
  }

  return fragments
}

export function AboutSection({ site }: AboutSectionProps) {
  const fragments = renderWithHighlights(site.about_body)

  return (
    <section id="about" className="scroll-mt-24 py-14 lg:py-20">
      <Reveal>
        <SectionHeader title={site.about_title || "About"} icon={UserRound} />
      </Reveal>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300" style={{ textAlign: "justify" }}>
            {fragments.map((fragment, index) =>
              fragment.highlighted ? (
                <span key={`${fragment.value}-${index}`} className="font-medium text-cyan-700 dark:text-cyan-300">
                  {fragment.value}
                </span>
              ) : (
                <span key={`${fragment.value}-${index}`}>{fragment.value}</span>
              ),
            )}
          </p>
        </Reveal>
        <Reveal className="motion-safe:delay-150">
          <div className="flex justify-center lg:justify-end">
            <Avatar className="size-28 ring-2 ring-cyan-600/25 dark:ring-cyan-400/30">
              <AvatarImage src={site.avatar_url} alt={`${site.hero_badge} portrait`} />
              <AvatarFallback className="bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                {site.hero_badge
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
