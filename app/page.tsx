import { AboutSection } from "@/components/public/about-section"
import { ContactCta } from "@/components/public/contact-cta"
import { ExperienceTimeline } from "@/components/public/experience-timeline"
import { Hero } from "@/components/public/hero"
import { ProjectsGrid } from "@/components/public/projects-grid"
import { SiteFooter } from "@/components/public/site-footer"
import { TopNav } from "@/components/public/top-nav"
import { getPublicHomepageData } from "@/lib/data/public"

export default async function HomePage() {
  const { site, projects, experience, socialLinks } = await getPublicHomepageData()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <TopNav logoMark={site.logo_mark} logoText={site.logo_text} />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero site={site} socialLinks={socialLinks} />
        <ProjectsGrid projects={projects} />
        <ExperienceTimeline entries={experience} />
        <AboutSection site={site} />
        <ContactCta site={site} socialLinks={socialLinks} />
      </main>
      <SiteFooter attribution={site.footer_attribution} />
    </div>
  )
}
