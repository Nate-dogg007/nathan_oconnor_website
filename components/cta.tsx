'use client'

import { Button } from '@/components/ui/button'

type CTAProps = {
  label?: string
  href?: string           // e.g., '/contact' or 'mailto:you@example.com'
  targetId?: string       // e.g., 'contact-section' to smooth-scroll
  className?: string
}

export default function CTA({
  label = 'Get in touch',
  href,
  targetId,
  className,
}: CTAProps) {
  function handleClick() {
    if (href) {
      // Navigate or open mailto:
      window.location.href = href
      return
    }
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Button onClick={handleClick} className={className}>
      {label}
    </Button>
  )
}
