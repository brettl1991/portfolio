interface SiteFooterProps {
  attribution: string
}

export function SiteFooter({ attribution }: SiteFooterProps) {
  return (
    <footer className="border-t border-slate-900/10 py-8 text-center dark:border-white/10">
      <p className="text-xs text-slate-500 dark:text-slate-400">{attribution}</p>
    </footer>
  )
}
