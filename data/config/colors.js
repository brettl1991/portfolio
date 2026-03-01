export const palette = {
  accentScale: "cyan",
  supportScale: "emerald",
  light: {
    page: "bg-slate-50",
    surface: "bg-white",
    surfaceMuted: "bg-slate-100",
    border: "border-slate-900/10",
    text: "text-slate-900",
    textMuted: "text-slate-600",
  },
  dark: {
    page: "dark:bg-slate-950",
    surface: "dark:bg-slate-900",
    surfaceMuted: "dark:bg-slate-800",
    border: "dark:border-white/10",
    text: "dark:text-slate-100",
    textMuted: "dark:text-slate-300",
  },
  accent: {
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-600/20 dark:border-cyan-400/30",
    ring: "ring-cyan-600/20 dark:ring-cyan-400/20",
    soft: "bg-cyan-600/10 dark:bg-cyan-400/15",
  },
  support: {
    text: "text-emerald-600 dark:text-emerald-400",
    soft: "bg-emerald-600/10 dark:bg-emerald-400/15",
  },
}

export const themeClasses = {
  page:
    "min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100",
  surface:
    "rounded-2xl border border-slate-900/10 bg-white shadow-lg shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40",
  mutedText: "text-slate-600 dark:text-slate-300",
  subtleBorder: "border border-slate-900/10 dark:border-white/10",
  accentText: "text-cyan-600 dark:text-cyan-400",
  accentRing: "ring-1 ring-cyan-600/20 dark:ring-cyan-400/20",
  accentGlow:
    "shadow-lg shadow-cyan-600/10 ring-1 ring-cyan-600/20 dark:shadow-cyan-400/15 dark:ring-cyan-400/20",
}
