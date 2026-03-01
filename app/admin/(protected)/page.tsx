import Link from "next/link"
import { BriefcaseBusiness, FolderKanban, FilePenLine, ImageIcon, Settings } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminDashboardStats } from "@/lib/data/admin"

const quickActions = [
  { href: "/admin/site", label: "Edit Site Content", icon: Settings },
  { href: "/admin/projects", label: "Manage Projects", icon: FolderKanban },
  { href: "/admin/projects/new", label: "Add Project", icon: FilePenLine },
  { href: "/admin/experience", label: "Update Experience", icon: BriefcaseBusiness },
  { href: "/admin/media", label: "Open Media Library", icon: ImageIcon },
]

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats()

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
        <p className="text-sm text-muted-foreground">Overview</p>
        <h1 className="mt-1 font-mono text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage all public portfolio content from a single workspace.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.projectsCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{stats.publishedCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.draftCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Experience Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{stats.experienceCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-mono text-base">Quick Actions</CardTitle>
          {!stats.hasSeedContent ? <Badge variant="secondary">Create first site row</Badge> : null}
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon

            return (
              <Button key={action.href} asChild variant="outline" className="justify-start rounded-md">
                <Link href={action.href}>
                  <Icon className="size-4" aria-hidden="true" />
                  {action.label}
                </Link>
              </Button>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
