// components/hero.tsx
export default function Hero() {
return (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10">
    {/* Hero content here */}
  </div>
);
}

// components/contact-form.tsx
export default function ContactForm() {
return (
  <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12">
    {/* Form content here */}
  </div>
);
}

// app/page.tsx
import Hero from "@/components/hero";
import Pillars from "@/components/pillars";
import FAQ from "@/components/faq";
import CTA from "@/components/cta";
import ContactForm from "@/components/contact-form";

export default function Home() {
return (
  <main>
    <Hero />
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <Pillars />
      <FAQ />
      <CTA />
      <ContactForm className="mt-12 mb-16" />
    </div>
  </main>
);
}

// app/contact/ContactPageClient.tsx
import ContactForm from "@/components/contact-form";

export default function ContactPageClient() {
return (
  <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
    <ContactForm />
  </div>
);
}
