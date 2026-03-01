import { ActionToast } from "@/components/admin/action-toast"
import { ExperienceForm } from "@/components/admin/experience-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getExperienceForAdmin } from "@/lib/data/admin"

import { deleteExperienceAction, saveExperienceAction } from "@/app/admin/(protected)/actions"

interface ExperiencePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function AdminExperiencePage({ searchParams }: ExperiencePageProps) {
  const [entries, params] = await Promise.all([getExperienceForAdmin(), searchParams])
  const saved = params.saved === "1"
  const deleted = params.deleted === "1"

  return (
    <div className="space-y-4">
      {saved ? <ActionToast message="Experience updated." /> : null}
      {deleted ? <ActionToast message="Experience entry deleted." /> : null}
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader>
          <CardTitle className="font-mono text-xl">Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Experience updated successfully.
            </p>
          ) : null}
          {deleted ? (
            <p className="rounded-md border border-emerald-600/20 bg-emerald-600/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              Experience entry deleted.
            </p>
          ) : null}
          <ExperienceForm
            entries={entries.map((entry) => ({
              id: String(entry.id),
              company: String(entry.company),
              role: String(entry.role),
              start_date: String(entry.start_date),
              end_date: entry.end_date ? String(entry.end_date) : null,
              date_label: String(entry.date_label ?? ""),
              description: String(entry.description),
              sort_order: Number(entry.sort_order ?? 0),
            }))}
            saveAction={saveExperienceAction}
            deleteAction={deleteExperienceAction}
          />
        </CardContent>
      </Card>
    </div>
  )
}
