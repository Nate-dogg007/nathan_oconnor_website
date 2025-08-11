"use client"

import { usePathname, useSearchParams } from "next/navigation"

export default function NotFoundClient() {
  const pathname = usePathname()
  const search = useSearchParams()
  const q = search?.toString()
  return (
    <p className="mt-4 text-sm text-zinc-500">
      {"Tried URL: "}
      {pathname}
      {q ? `?${q}` : ""}
    </p>
  )
}
