export function formatDateLabel(startDate: string, endDate: string | null, dateLabel?: string) {
  if (dateLabel) {
    return dateLabel
  }

  const formatter = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
  })

  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null

  if (Number.isNaN(start.valueOf())) {
    return ""
  }

  const startText = formatter.format(start)
  const endText = end && !Number.isNaN(end.valueOf()) ? formatter.format(end) : "Present"

  return `${startText} - ${endText}`
}

export function highlightWord(text: string, highlight: string) {
  if (!highlight) {
    return { before: text, match: "", after: "" }
  }

  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index < 0) {
    return { before: text, match: "", after: "" }
  }

  return {
    before: text.slice(0, index),
    match: text.slice(index, index + highlight.length),
    after: text.slice(index + highlight.length),
  }
}
