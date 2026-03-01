"use client"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteActionDialogProps {
  title: string
  description: string
  action: () => Promise<void>
  triggerLabel?: string
}

export function DeleteActionDialog({
  title,
  description,
  action,
  triggerLabel = "Delete",
}: DeleteActionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-md text-destructive">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-md">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <Button type="submit" variant="destructive" className="rounded-md">
              Confirm delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
