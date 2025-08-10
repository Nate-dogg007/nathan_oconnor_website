'use client'

import { Button } from '@/components/ui/button'

type HeroProps = {
  headline?: string
  subheadline?: string
  primaryHref?: string
  primaryTargetId?: string
}

export default function Hero({
  headline = 'Your headline',
  subheadline = 'Your subheadline',
  primaryHref,
  primaryTargetId,
}: HeroProps) {
  function handlePrimary() {
    if (primaryHref) {
      window.location.href = primaryHref
      return
    }
    if (primaryTargetId) {
      const el = document.getElementById(primaryTargetId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{headline}</h1>
      <p className="text-muted-foreground">{subheadline}</p>
      <Button onClick={handlePrimary}>Let’s talk</Button>
    </section>
  )
}
