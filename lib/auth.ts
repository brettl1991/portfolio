import { redirect } from "next/navigation"

import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function getAdminSession(options?: { redirectToLogin?: boolean }) {
  if (!hasSupabaseEnv()) {
    return {
      user: null,
      fallbackMode: true,
    }
  }

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && options?.redirectToLogin !== false) {
    redirect("/admin/login")
  }

  return {
    user,
    fallbackMode: false,
  }
}

export async function requireAdminClient() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return supabase
}
