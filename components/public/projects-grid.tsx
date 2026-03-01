import { FolderCode } from "lucide-react"

import { ProjectCard } from "@/components/public/project-card"
import { Reveal } from "@/components/public/reveal"
import { SectionHeader } from "@/components/public/section-header"
import type { Project } from "@/types/content"

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section id="projects" className="scroll-mt-24 py-14 lg:py-20">
      <Reveal>
        <SectionHeader title="Projects" icon={FolderCode} />
      </Reveal>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              className={index % 3 === 0 ? "" : index % 3 === 1 ? "motion-safe:delay-100" : "motion-safe:delay-200"}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal>
          <div className="rounded-2xl border border-dashed border-slate-900/20 bg-slate-100/60 p-8 text-center text-sm text-slate-600 dark:border-white/20 dark:bg-slate-900/40 dark:text-slate-300">
            No published projects yet.
          </div>
        </Reveal>
      )}
    </section>
  )
}
