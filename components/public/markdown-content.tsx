interface MarkdownContentProps {
  markdown: string
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      )
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-slate-900 dark:text-slate-100">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  const lines = markdown.split("\n")

  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      {lines.map((line, index) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={`space-${index}`} className="h-2" aria-hidden="true" />
        }

        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={`h2-${index}`} className="pt-4 font-mono text-lg font-semibold text-slate-900 dark:text-slate-100">
              {trimmed.replace("## ", "")}
            </h2>
          )
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={`h3-${index}`} className="pt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              {trimmed.replace("### ", "")}
            </h3>
          )
        }

        if (trimmed.startsWith("- ")) {
          return (
            <li key={`li-${index}`} className="ml-5 list-disc">
              {renderInline(trimmed.replace("- ", ""))}
            </li>
          )
        }

        return <p key={`p-${index}`}>{renderInline(trimmed)}</p>
      })}
    </div>
  )
}
