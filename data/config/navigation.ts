export interface NavItem {
  label: string
  href: string
  id: string
}

export const publicNavItems: NavItem[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "About me", href: "#about", id: "about" },
]
