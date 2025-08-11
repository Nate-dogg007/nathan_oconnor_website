import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#101C3C] to-[#1a2951]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Marketing?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Let's discuss how data-driven strategies and AI automation can accelerate your business growth while
          maintaining privacy compliance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[#E8730C] px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[#D4620A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8730C]/60"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-transparent px-8 py-3 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  )
}
