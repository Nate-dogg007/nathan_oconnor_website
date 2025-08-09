import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Understand Nathan O'Connor's Cookie Policy, including how cookies are used and mapped to Google Consent Mode v2 categories for privacy compliance.",
  alternates: {
    canonical: `${BASE_URL}/cookies`,
  },
  openGraph: {
    title: "Cookie Policy | Nathan O'Connor",
    description:
      "Understand Nathan O'Connor's Cookie Policy, including how cookies are used and mapped to Google Consent Mode v2 categories for privacy compliance.",
    url: `${BASE_URL}/cookies`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "Cookie Policy",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Nathan O'Connor",
    description:
      "Understand Nathan O'Connor's Cookie Policy, including how cookies are used and mapped to Google Consent Mode v2 categories for privacy compliance.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function CookiesPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cookie Policy (Consent Mode v2 Mapping)
          </h1>
          <div className="mt-4 text-lg text-gray-600">
            <p>
              <strong>Effective Date:</strong>{" "}
              {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              <strong>Business Name:</strong> Nathan O'Connor
            </p>
            <p>
              <strong>Contact Email:</strong>{" "}
              <a href="mailto:info@nathanoconnor.co.uk" className="text-blue-600 hover:text-blue-800">
                info@nathanoconnor.co.uk
              </a>
            </p>
          </div>

          <p className="mt-6 text-gray-700">
            This Cookie Policy outlines how I use cookies and maps them to the categories defined under Google Consent
            Mode v2 to comply with GDPR and other privacy regulations.
          </p>

          <div className="mt-12 space-y-12">
            {/* Consent Mode v2 Categories */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Consent Mode v2 Categories & Cookies</h2>
              <p className="mt-4 text-gray-700">
                Google Consent Mode v2 introduces the following consent categories. I use these to manage how cookies
                are set based on your preferences:
              </p>
            </section>

            {/* Essential Cookies */}
            <section>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🛡️</span>
                <h3 className="text-xl font-bold text-gray-900">a) Essential Cookies (`security_storage`)</h3>
              </div>
              <p className="mt-4 text-gray-700">
                These cookies are always active and are required for the basic operation of the site, such as security
                and network management.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Examples:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">__cf_bm</code> – Cloudflare bot protection
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">csrftoken</code> – CSRF token for form
                    security
                  </li>
                </ul>
              </div>
            </section>

            {/* Analytics Cookies */}
            <section>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <h3 className="text-xl font-bold text-gray-900">b) Analytics Cookies (`analytics_storage`)</h3>
              </div>
              <p className="mt-4 text-gray-700">
                Used to collect information about how visitors use my site, allowing me to improve performance and user
                experience.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Examples:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">_ga</code> – Google Analytics user
                    identifier
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">_ga_{"<container-id>"}</code> – Session
                    persistence
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">_gid</code> – Tracks user behavior
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">_gat</code> – Limits request rates
                  </li>
                </ul>
              </div>
            </section>

            {/* Advertising Cookies */}
            <section>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <h3 className="text-xl font-bold text-gray-900">c) Advertising Cookies (`ad_storage`)</h3>
              </div>
              <p className="mt-4 text-gray-700">
                Used to deliver relevant ads and measure their effectiveness, including tracking conversions and
                building remarketing audiences.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Examples:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">gclid</code> – Google Click Identifier
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">gcl_au</code> – Google Ads remarketing
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">IDE</code> – DoubleClick for advertising
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">test_cookie</code> – Used to test if the
                    browser supports cookies
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">conversion_linker</code> – Helps attribute
                    conversions across domains
                  </li>
                </ul>
              </div>
            </section>

            {/* Functional Cookies */}
            <section>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚙️</span>
                <h3 className="text-xl font-bold text-gray-900">d) Functional Cookies (`functionality_storage`)</h3>
              </div>
              <p className="mt-4 text-gray-700">
                Enable the website to remember choices you make and provide enhanced, more personal features.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Examples:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">hubspotutk</code> – HubSpot user tracking
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">messagesUtk</code> – HubSpot chat sessions
                  </li>
                </ul>
              </div>
            </section>

            {/* Personalisation Cookies */}
            <section>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎨</span>
                <h3 className="text-xl font-bold text-gray-900">
                  e) Personalisation Cookies (`personalization_storage`)
                </h3>
              </div>
              <p className="mt-4 text-gray-700">
                Used to deliver personalized content based on your interactions or preferences.
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">Examples:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">lang</code> – Language settings
                  </li>
                  <li>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">VISITOR_INFO1_LIVE</code> – YouTube viewer
                    preferences
                  </li>
                </ul>
              </div>
            </section>

            {/* Managing Preferences */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Managing Your Preferences</h2>
              <p className="mt-4 text-gray-700">
                When you first visit my website, you are prompted to choose your cookie preferences using our Consent
                Management Platform (CMP) powered by <strong>CookieYes</strong>. You can update your preferences at any
                time.
              </p>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Updates</h2>
              <p className="mt-4 text-gray-700">
                I may update this policy from time to time. Any changes will be reflected on this page with an updated
                effective date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
              <p className="mt-4 text-gray-700">
                If you have any questions about my Cookie Policy or how your data is used, please contact:
              </p>
              <div className="mt-4 text-gray-700">
                <p>
                  <strong>Nathan O'Connor</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@nathanoconnor.co.uk" className="text-blue-600 hover:text-blue-800">
                    info@nathanoconnor.co.uk
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
