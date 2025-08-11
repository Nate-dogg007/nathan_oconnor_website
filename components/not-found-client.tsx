"use client"

import { usePathname, useSearchParams } from "next/navigation"

export default function NotFoundClient() {
  // Safe here: we’re in a client component, rendered inside <Suspense>
  const pathname = usePathname()
  const search = useSearchParams()

  // Optional: surface a little context for debugging or analytics
  const q = search?.toString()
  return (
    <p className="mt-4 text-sm text-zinc-500">
      {"Tried URL: "}
      {pathname}
      {q ? `?${q}` : ""}
    </p>
  )
}
