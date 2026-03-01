"use server"

import { redirect } from "next/navigation"

import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    redirect("/admin/login?error=missing_fields")
  }

  if (!hasSupabaseEnv()) {
    redirect("/admin")
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect("/admin/login?error=invalid_credentials")
  }

  redirect("/admin")
}
