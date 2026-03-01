import Link from "next/link"
import { FileDown, Linkedin, Mail } from "lucide-react"

import { Reveal } from "@/components/public/reveal"
import { Button } from "@/components/ui/button"
import type { SiteContent, SocialLink } from "@/types/content"

interface ContactCtaProps {
  site: SiteContent
  socialLinks: SocialLink[]
}

function getLinkedInUrl(socialLinks: SocialLink[]) {
  return socialLinks.find((item) => item.icon === "linkedin")?.url ?? "https://linkedin.com"
}

export function ContactCta({ site, socialLinks }: ContactCtaProps) {
  const linkedInUrl = getLinkedInUrl(socialLinks)

  return (
    <section id="contact" className="scroll-mt-24 py-14 lg:py-20">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-900/10 bg-white p-8 text-center shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
            {site.contact_title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {site.contact_subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" asChild className="rounded-md motion-safe:hover:-translate-y-px">
              <a href={`mailto:${site.contact_email}`}>
                <Mail className="size-4" aria-hidden="true" />
                Email
              </a>
            </Button>
            <Button variant="outline" asChild className="rounded-md motion-safe:hover:-translate-y-px">
              <Link href={linkedInUrl} target="_blank" rel="noreferrer">
                <Linkedin className="size-4" aria-hidden="true" />
                LinkedIn
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-md motion-safe:hover:-translate-y-px">
              <Link href={site.resume_url} target="_blank" rel="noreferrer">
                <FileDown className="size-4" aria-hidden="true" />
                Resume
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
