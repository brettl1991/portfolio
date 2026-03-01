import Link from "next/link"
import { Github, Instagram, Linkedin, Mail } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/public/reveal"
import { typography } from "@/data/config/typography"
import { highlightWord } from "@/lib/format"
import type { SiteContent, SocialLink } from "@/types/content"

interface HeroProps {
  site: SiteContent
  socialLinks: SocialLink[]
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  x: Github,
  website: Mail,
}

export function Hero({ site, socialLinks }: HeroProps) {
  const headline = highlightWord(site.hero_headline, site.hero_accent_word)

  return (
    <section id="home" className="scroll-mt-24 py-14 lg:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <div className="relative mb-6 inline-flex">
            <div className="absolute -inset-2 rounded-full bg-cyan-500/20 blur-xl dark:bg-cyan-400/30" aria-hidden="true" />
            <Avatar className="relative size-24 ring-2 ring-cyan-600/30 sm:size-28 lg:size-32 dark:ring-cyan-400/40">
              <AvatarImage src={site.avatar_url} alt={`${site.hero_badge} avatar`} />
              <AvatarFallback className="bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                {site.hero_badge
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-cyan-600/25 bg-white px-3 py-1 text-xs font-medium text-cyan-700 shadow-sm shadow-cyan-600/10 dark:border-cyan-400/30 dark:bg-slate-900 dark:text-cyan-300 dark:shadow-cyan-400/10">
              {site.hero_badge}
            </span>
          </div>
        </Reveal>

        <Reveal className="motion-safe:delay-100">
          <h1 className={typography.heroHeading}>
            {headline.before}
            {headline.match ? <span className="text-cyan-600 dark:text-cyan-400">{headline.match}</span> : null}
            {headline.after}
          </h1>
        </Reveal>

        <Reveal className="motion-safe:delay-150">
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {site.hero_subheadline}
          </p>
        </Reveal>

        <Reveal className="motion-safe:delay-200">
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-md motion-safe:hover:-translate-y-px">
              <a href={`mailto:${site.contact_email}`}>
                <Mail className="size-4" aria-hidden="true" />
                Contact me
              </a>
            </Button>
            {socialLinks.slice(0, 3).map((social) => {
              const Icon = socialIcons[social.icon] ?? Github

              return (
                <Button
                  key={social.id}
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-md border-slate-900/15 text-cyan-700 hover:bg-cyan-600/10 hover:text-cyan-800 motion-safe:hover:-translate-y-px dark:border-white/15 dark:text-cyan-300 dark:hover:bg-cyan-400/15 dark:hover:text-cyan-200"
                >
                  <Link href={social.url} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <Icon className="size-4" />
                  </Link>
                </Button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
