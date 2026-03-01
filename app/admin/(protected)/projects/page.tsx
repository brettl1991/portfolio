import Link from "next/link"
import { Plus } from "lucide-react"

import { ActionToast } from "@/components/admin/action-toast"
import { ProjectsTable } from "@/components/admin/projects-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjectsForAdmin } from "@/lib/data/admin"

import { deleteProjectAction, toggleProjectPublishAction } from "@/app/admin/(protected)/actions"

interface ProjectsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams
  const search = typeof params.search === "string" ? params.search : ""
  const status = typeof params.status === "string" ? params.status : "all"
  const deleted = params.deleted === "1"
  const updated = params.updated === "1"
  const projects = await getProjectsForAdmin(search, status)

  return (
    <div className="space-y-4">
      {deleted ? <ActionToast message="Project deleted." /> : null}
      {updated ? <ActionToast message="Project status updated." /> : null}
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="font-mono text-xl">Projects</CardTitle>
          <Button asChild className="rounded-md">
            <Link href="/admin/projects/new">
              <Plus className="size-4" aria-hidden="true" />
              Add Project
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ProjectsTable
            projects={projects.map((project) => ({
              id: String(project.id),
              title: String(project.title),
              slug: String(project.slug),
              published: Boolean(project.published),
              status: String(project.status ?? "draft"),
              updated_at: project.updated_at ? String(project.updated_at) : undefined,
            }))}
            search={search}
            status={status}
            onTogglePublish={toggleProjectPublishAction}
            onDelete={deleteProjectAction}
          />
        </CardContent>
      </Card>
    </div>
  )
}
