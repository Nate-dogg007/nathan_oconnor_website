"use client"

import { usePathname, useSearchParams } from "next/navigation"

export default function AboutMeClient() {
  const pathname = usePathname()
  const qs = useSearchParams()
  const queryString = qs?.toString()

  // Example: you can read UTM params here, fire analytics, personalize, etc.
  // Do not move this hook code back into a Server Component.
  return (
    <p className="mt-4 text-sm text-zinc-500">
      {"URL: "}
      {pathname}
      {queryString ? `?${queryString}` : ""}
    </p>
  )
}
