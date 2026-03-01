import { Plus } from "lucide-react"

import { DeleteActionDialog } from "@/components/admin/delete-action-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ExperienceItem {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
  date_label: string
  description: string
  sort_order: number
}

interface ExperienceFormProps {
  entries: ExperienceItem[]
  saveAction: (formData: FormData) => Promise<void>
  deleteAction: (id: string) => Promise<void>
}

function ExperienceEditor({
  entry,
  saveAction,
  deleteAction,
}: {
  entry: ExperienceItem
  saveAction: (formData: FormData) => Promise<void>
  deleteAction: (id: string) => Promise<void>
}) {
  const boundDelete = deleteAction.bind(null, entry.id)

  return (
    <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="font-mono text-base">{entry.company}</CardTitle>
        <DeleteActionDialog
          title="Delete experience entry"
          description="This action cannot be undone and will remove the entry from the timeline."
          action={boundDelete}
        />
      </CardHeader>
      <CardContent>
        <form action={saveAction} className="space-y-4">
          <input type="hidden" name="id" value={entry.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`company-${entry.id}`}>Company</Label>
              <Input id={`company-${entry.id}`} name="company" defaultValue={entry.company} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${entry.id}`}>Role</Label>
              <Input id={`role-${entry.id}`} name="role" defaultValue={entry.role} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`start-date-${entry.id}`}>Start Date</Label>
              <Input id={`start-date-${entry.id}`} type="date" name="start_date" defaultValue={entry.start_date} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`end-date-${entry.id}`}>End Date</Label>
              <Input
                id={`end-date-${entry.id}`}
                type="date"
                name="end_date"
                defaultValue={entry.end_date ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`sort-order-${entry.id}`}>Sort Order</Label>
              <Input
                id={`sort-order-${entry.id}`}
                type="number"
                name="sort_order"
                defaultValue={String(entry.sort_order)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`date-label-${entry.id}`}>Date Label</Label>
            <Input id={`date-label-${entry.id}`} name="date_label" defaultValue={entry.date_label} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`description-${entry.id}`}>Description</Label>
            <Textarea id={`description-${entry.id}`} name="description" defaultValue={entry.description} rows={4} />
          </div>
          <Button type="submit" className="rounded-md">
            Save Entry
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export function ExperienceForm({ entries, saveAction, deleteAction }: ExperienceFormProps) {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-slate-900/10 dark:border-white/10">
        <CardHeader>
          <CardTitle className="font-mono text-base">Add Experience Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={saveAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-company">Company</Label>
                <Input id="new-company" name="company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-role">Role</Label>
                <Input id="new-role" name="role" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="new-start-date">Start Date</Label>
                <Input id="new-start-date" type="date" name="start_date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-end-date">End Date</Label>
                <Input id="new-end-date" type="date" name="end_date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-sort-order">Sort Order</Label>
                <Input id="new-sort-order" type="number" name="sort_order" defaultValue="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-date-label">Date Label</Label>
              <Input id="new-date-label" name="date_label" placeholder="2022 - 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea id="new-description" name="description" rows={4} required />
            </div>
            <Button type="submit" className="rounded-md">
              <Plus className="size-4" aria-hidden="true" />
              Add Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {entries.map((entry) => (
          <ExperienceEditor
            key={entry.id}
            entry={entry}
            saveAction={saveAction}
            deleteAction={deleteAction}
          />
        ))}
      </div>
    </div>
  )
}
