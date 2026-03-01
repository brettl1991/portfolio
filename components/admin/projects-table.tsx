import Link from "next/link"
import { MoreHorizontal, PencilLine } from "lucide-react"

import { DeleteActionDialog } from "@/components/admin/delete-action-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectRow {
  id: string
  title: string
  slug: string
  published: boolean
  status?: string
  updated_at?: string
}

interface ProjectsTableProps {
  projects: ProjectRow[]
  search: string
  status: string
  onTogglePublish: (projectId: string, shouldPublish: boolean) => Promise<void>
  onDelete: (projectId: string) => Promise<void>
}

function formatDate(value?: string) {
  if (!value) {
    return "-"
  }

  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) {
    return "-"
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function ProjectsTable({
  projects,
  search,
  status,
  onTogglePublish,
  onDelete,
}: ProjectsTableProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-4">
        <form method="get" className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem_auto]">
          <Input name="search" defaultValue={search} placeholder="Search by title or slug" />
          <select
            name="status"
            defaultValue={status}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <Button type="submit" variant="outline" className="rounded-md">
            Filter
          </Button>
        </form>

        <div className="rounded-2xl border border-slate-900/10 bg-white shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => {
                  const toggleAction = onTogglePublish.bind(null, project.id, !project.published)
                  const deleteAction = onDelete.bind(null, project.id)

                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{project.title}</p>
                        <p className="text-xs text-muted-foreground">/{project.slug}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={project.published ? "bg-emerald-600/15 text-emerald-700 dark:text-emerald-300" : ""}
                        >
                          {project.published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(project.updated_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon-sm" aria-label="Open row actions">
                                    <MoreHorizontal className="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={6}>Row actions</TooltipContent>
                              </Tooltip>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/projects/${project.id}`}>
                                  <PencilLine className="size-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <form action={toggleAction} className="w-full">
                                  <button type="submit" className="flex w-full items-center gap-2">
                                    {project.published ? "Unpublish" : "Publish"}
                                  </button>
                                </form>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <DeleteActionDialog
                            title="Delete project"
                            description="This permanently removes the project from the CMS and public site."
                            action={deleteAction}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                    No projects match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
