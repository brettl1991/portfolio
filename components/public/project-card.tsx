import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Project } from "@/types/content"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const thumbnail = project.thumbnail_url || project.cover_image_url || "/window.svg"

  return (
    <Card className="group overflow-hidden rounded-2xl border-slate-900/10 bg-white shadow-lg shadow-slate-900/10 transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl motion-safe:hover:shadow-cyan-600/20 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40 dark:motion-safe:hover:shadow-cyan-400/20">
      <CardHeader className="p-4">
        <Link href={`/projects/${project.slug}`} className="block overflow-hidden rounded-xl">
          <Image
            src={thumbnail}
            alt={`${project.title} preview`}
            width={1280}
            height={720}
            unoptimized
            className="aspect-video w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
          />
        </Link>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech_tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="line-clamp-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
        >
          View project
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  )
}
