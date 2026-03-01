import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

import { MarkdownContent } from "@/components/public/markdown-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNextPublishedProject, getPublishedProjectBySlug } from "@/lib/data/public"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getPublishedProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const nextProject = await getNextPublishedProject(slug)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="rounded-md">
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Link>
          </Button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
          <Image
            src={project.cover_image_url || "/window.svg"}
            alt={project.title}
            width={1600}
            height={900}
            unoptimized
            className="aspect-video w-full object-cover"
          />
          <div className="space-y-5 p-6 lg:p-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
            <div className="flex flex-wrap gap-2">
              {project.tech_tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full bg-cyan-600/10 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.demo_url ? (
                <Button asChild className="rounded-md">
                  <Link href={project.demo_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Live
                  </Link>
                </Button>
              ) : null}
              {project.github_url ? (
                <Button asChild variant="outline" className="rounded-md">
                  <Link href={project.github_url} target="_blank" rel="noreferrer">
                    <Github className="size-4" aria-hidden="true" />
                    GitHub
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="space-y-8">
            <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
              <CardContent className="p-6 lg:p-8">
                <MarkdownContent markdown={project.body_md} />
              </CardContent>
            </Card>

            {project.gallery_images.length > 0 ? (
              <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="font-mono text-lg">Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.gallery_images.map((image) => (
                      <Image
                        key={image}
                        src={image}
                        alt={`${project.title} gallery item`}
                        width={1280}
                        height={720}
                        unoptimized
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
              <CardHeader>
                <CardTitle className="font-mono text-base">Project Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Role</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{project.role || "Developer"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Timeline</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{project.timeline || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Stack</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {project.tech_tags.join(", ") || "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {nextProject ? (
              <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
                <CardHeader>
                  <CardTitle className="font-mono text-base">Next Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
                  >
                    {nextProject.title}
                  </Link>
                </CardContent>
              </Card>
            ) : null}
          </aside>
        </section>
      </main>
    </div>
  )
}
