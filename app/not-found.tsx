import { Suspense } from "react"
import Link from "next/link"
import NotFoundClient from "@/components/not-found-client"

export const dynamic = "force-static"

export default function NotFound() {
  return (
    <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-zinc-600">The page you’re looking for doesn’t exist or may have moved.</p>

      {/* Any useSearchParams/usePathname must be inside Suspense and a client component */}
      <Suspense fallback={null}>
        <NotFoundClient />
      </Suspense>

      <div className="mt-8">
        <Link href="/" className="text-[#101C3C] underline hover:no-underline">
          Go back home
        </Link>
      </div>
    </main>
  )
}
