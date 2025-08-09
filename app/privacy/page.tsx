import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Nathan O'Connor's Privacy Policy, outlining how your data is collected, used, and protected in compliance with GDPR and privacy-first principles.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Nathan O'Connor",
    description:
      "Read Nathan O'Connor's Privacy Policy, outlining how your data is collected, used, and protected in compliance with GDPR and privacy-first principles.",
    url: `${BASE_URL}/privacy`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "Privacy Policy",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Nathan O'Connor",
    description:
      "Read Nathan O'Connor's Privacy Policy, outlining how your data is collected, used, and protected in compliance with GDPR and privacy-first principles.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function PrivacyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-12 space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">1. Who I Am</h2>
              <p className="mt-4 text-gray-700">
                I am a digital marketing and automation consultant committed to privacy-first data practices. I help
                businesses grow through performance marketing, automated workflows, and secure data strategies. This
                privacy policy explains how I collect, use, and store your data when you visit my website or engage with
                my services.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. What Data I Collect</h2>
              <p className="mt-4 text-gray-700">I may collect and process the following types of personal data:</p>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    a) Website Interaction Data (via GTM & Analytics):
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    <li>Pages visited, time on site, and navigation paths</li>
                    <li>Referrer and UTM parameters</li>
                    <li>Clicks and form interactions</li>
                    <li>IP address and approximate geolocation (if consented)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">b) Form Submissions (via HubSpot):</h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Business information (e.g., company name, website, job title)</li>
                    <li>Marketing preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    c) Cookies and Tracking (via CookieYes & Google Tag Manager):
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    <li>Consent preferences (stored via a consent cookie)</li>
                    <li>Google Click ID (GCLID) for ad attribution (only if consented)</li>
                    <li>Session data for engagement scoring (if implemented)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    d) Customer Match & Email Marketing (via HubSpot & Google Ads):
                  </h3>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
                    <li>Only with your explicit opt-in for marketing communications and remarketing</li>
                    <li>Email addresses or phone numbers (hashed when used for remarketing)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. How I Collect Your Data</h2>
              <p className="mt-4 text-gray-700">I collect data through:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Contact Forms:</strong> Powered by HubSpot and integrated with my CRM
                </li>
                <li>
                  <strong>Tracking Scripts:</strong> Implemented via Google Tag Manager and configured with CookieYes
                  for GDPR-compliant consent management
                </li>
                <li>
                  <strong>Advertising Clicks:</strong> GCLID and UTM parameters stored if consent is granted
                </li>
                <li>
                  <strong>Manual Uploads:</strong> For marketing lists (only where you have opted in)
                </li>
              </ul>
            </section>

            {/* Section 4 - Updated */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Why I Collect Your Data</h2>
              <p className="mt-4 text-gray-700">I collect and process data to:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Respond to your enquiries and provide relevant services</li>
                <li>Measure performance across marketing campaigns and platforms</li>
                <li>Optimize conversion paths by understanding how users engage with my content</li>
                <li>
                  Feed high-quality conversion data back to Google Ads to improve bidding strategies (e.g., using GCLID
                  and offline conversion imports)
                </li>
                <li>Build privacy-compliant remarketing and lookalike audiences through hashed, consented user data</li>
                <li>
                  Contribute to Google Ads' Signals and Smart Bidding systems, helping to train models to better
                  understand user intent and improve campaign performance
                </li>
                <li>Attribute results accurately through my first-party data and server-side setups</li>
              </ul>
              <p className="mt-4 text-gray-700">
                I do not sell or rent your data. Any data shared with platforms like Google Ads is only done:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>If explicit consent has been provided, and</li>
                <li>In a hashed or anonymized form (where applicable)</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Legal Basis for Processing</h2>
              <p className="mt-4 text-gray-700">I process your data based on:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Consent</strong> (e.g., for cookies, email marketing, and remarketing)
                </li>
                <li>
                  <strong>Contractual necessity</strong> (e.g., responding to service enquiries)
                </li>
                <li>
                  <strong>Legitimate interest</strong> (e.g., site performance measurement, fraud prevention)
                </li>
              </ul>
              <p className="mt-4 text-gray-700">
                You can withdraw your consent at any time by adjusting your cookie settings or unsubscribing from
                emails.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. How I Store and Protect Your Data</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Data is stored securely within HubSpot (CRM and marketing automation platform).</li>
                <li>
                  Form submissions and interactions are encrypted in transit and stored within GDPR-compliant systems.
                </li>
                <li>
                  Google Ads and analytics data is stored according to the platforms' own privacy policies and retention
                  policies.
                </li>
                <li>
                  I use reasonable security measures to protect personal data against loss, misuse, unauthorized access,
                  disclosure, alteration, and destruction.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. How Long I Keep Your Data</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>CRM and contact form data:</strong> up to 2 years after your last interaction
                </li>
                <li>
                  <strong>Analytics data:</strong> retained according to Google Analytics settings (typically 14–26
                  months)
                </li>
                <li>
                  <strong>Marketing data:</strong> retained as long as you remain subscribed or until you withdraw
                  consent
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Your Data Rights (GDPR)</h2>
              <p className="mt-4 text-gray-700">You have the right to:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion ("right to be forgotten")</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with a Data Protection Authority (ICO in the UK)</li>
              </ul>
              <p className="mt-4 text-gray-700">
                To exercise your rights, please email:{" "}
                <a href="mailto:info@nathanoconnor.co.uk" className="text-blue-600 hover:text-blue-800">
                  info@nathanoconnor.co.uk
                </a>
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Third-Party Tools I Use</h2>
              <p className="mt-4 text-gray-700">
                I may share data with the following platforms under strict privacy terms:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>HubSpot</strong> – CRM, automation, and form submissions
                </li>
                <li>
                  <strong>Google Ads</strong> – For conversion tracking and audience matching (if consented)
                </li>
                <li>
                  <strong>Google Analytics 4</strong> – For performance tracking (consent-based)
                </li>
                <li>
                  <strong>CookieYes</strong> – Consent management platform
                </li>
                <li>
                  <strong>CallTrackingMetrics / Tagging tools</strong> – For attribution (if implemented)
                </li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">10. International Data Transfers</h2>
              <p className="mt-4 text-gray-700">
                I only use vendors that provide GDPR-compliant data protection measures. Some data may be stored in or
                processed by systems located outside the UK/EU (e.g., HubSpot in the US), but all transfers are covered
                by Standard Contractual Clauses (SCCs) or equivalent safeguards.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">11. Changes to This Policy</h2>
              <p className="mt-4 text-gray-700">
                I may update this policy from time to time. The latest version will always be available on my website.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">12. Contact Us</h2>
              <p className="mt-4 text-gray-700">If you have any questions or concerns, please contact:</p>
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
