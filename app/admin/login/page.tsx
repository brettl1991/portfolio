import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { hasSupabaseEnv } from "@/lib/supabase/env"

import { loginAction } from "@/app/admin/login/actions"

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const errorMessages: Record<string, string> = {
  missing_fields: "Please enter both email and password.",
  invalid_credentials: "Could not sign in with those credentials.",
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const errorKey = typeof params.error === "string" ? params.error : ""

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <Card className="w-full max-w-md rounded-2xl border-slate-900/10 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/40">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="font-mono text-2xl">Admin Login</CardTitle>
          <CardDescription>Sign in to manage portfolio content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {errorKey ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessages[errorKey] ?? "Unable to sign in."}
            </p>
          ) : null}

          {hasSupabaseEnv() ? (
            <form action={loginAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" autoComplete="current-password" required />
              </div>
              <Button type="submit" className="w-full rounded-md">
                Sign In
              </Button>
            </form>
          ) : (
            <div className="space-y-4 rounded-lg border border-dashed border-slate-900/20 p-4 text-sm text-muted-foreground dark:border-white/20">
              <p>
                Supabase environment variables are not configured. Admin routes are available in fallback mode so you can
                preview the UI.
              </p>
              <Button asChild variant="outline" className="w-full rounded-md">
                <Link href="/admin">Open Admin Preview</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
