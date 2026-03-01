import Link from "next/link"
import { LayoutDashboard, BriefcaseBusiness, FolderKanban, ImageIcon, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getAdminSession } from "@/lib/auth"

import { signOutAction } from "@/app/admin/(protected)/actions"

export const dynamic = "force-dynamic"

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site", label: "Site Content", icon: Settings },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
]

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getAdminSession()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
          <div className="space-y-1">
            <p className="font-mono text-sm font-semibold">Portfolio CMS</p>
            <p className="text-xs text-muted-foreground">{session.user?.email ?? "Fallback preview mode"}</p>
          </div>
          <Separator />
          <nav className="grid gap-1" aria-label="Admin navigation">
            {navLinks.map((item) => {
              const Icon = item.icon
              return (
                <Button key={item.href} variant="ghost" className="justify-start rounded-md" asChild>
                  <Link href={item.href}>
                    <Icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
          <Separator />
          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full rounded-md">
              <Link href="/" target="_blank" rel="noreferrer">
                Open Public Site
              </Link>
            </Button>
            <form action={signOutAction}>
              <Button type="submit" variant="secondary" className="w-full rounded-md">
                Sign Out
              </Button>
            </form>
          </div>
        </aside>

        <section className="space-y-4">
          {!session.user && session.fallbackMode ? (
            <div className="rounded-xl border border-amber-600/30 bg-amber-600/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
              Running in fallback mode. Configure Supabase environment variables to enable authentication and
              persistence.
            </div>
          ) : null}
          {children}
        </section>
      </div>
    </div>
  )
}
