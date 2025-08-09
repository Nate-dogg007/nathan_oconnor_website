import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the Terms of Service for Nathan O'Connor's digital marketing and AI consulting services.",
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service | Nathan O'Connor",
    description: "Review the Terms of Service for Nathan O'Connor's digital marketing and AI consulting services.",
    url: `${BASE_URL}/terms`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "Terms of Service",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Nathan O'Connor",
    description: "Review the Terms of Service for Nathan O'Connor's digital marketing and AI consulting services.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function TermsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
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
            These Terms of Service ("Terms") govern your use of my website and any services provided by Nathan O'Connor
            ("I" or "my"). By accessing my website or engaging my services, you agree to be bound by these Terms.
          </p>

          <div className="mt-12 space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">1. Services Provided</h2>
              <p className="mt-4 text-gray-700">I offer digital marketing consulting services, which may include:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Performance marketing strategy and management</li>
                <li>Google Ads setup and optimisation</li>
                <li>Automation workflows (e.g., n8n, Airtable, HubSpot)</li>
                <li>Tracking and attribution setup (e.g., GTM, GA4)</li>
                <li>Privacy-first data and analytics solutions</li>
                <li>AI-assisted content creation and reporting</li>
              </ul>
              <p className="mt-4 text-gray-700">
                A full scope of services will be agreed upon in writing prior to project commencement.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Client Responsibilities</h2>
              <p className="mt-4 text-gray-700">To enable successful service delivery, clients must:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Provide timely access to relevant platforms, tools, and credentials</li>
                <li>Supply accurate and complete information as needed</li>
                <li>Respond promptly to requests or approvals</li>
                <li>Ensure they have the legal right to use any third-party tools or data shared</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Failure to meet these responsibilities may delay delivery or affect results.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. Payment Terms</h2>
              <p className="mt-4 text-gray-700">Unless otherwise agreed:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>All services are invoiced in advance or monthly in arrears</li>
                <li>Payment is due within 14 days of the invoice date</li>
                <li>Late payments may incur interest at 4% above the Bank of England base rate</li>
              </ul>
              <p className="mt-4 text-gray-700">
                I reserve the right to pause or terminate services for overdue accounts.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Intellectual Property</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  All strategies, workflows, and code developed during the engagement remain my property unless
                  explicitly transferred in writing
                </li>
                <li>You retain all rights to your own data, brand assets, and platforms</li>
              </ul>
              <p className="mt-4 text-gray-700">
                If I create content (e.g., ad copy, blog posts), usage rights will be detailed in the project agreement.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Confidentiality</h2>
              <p className="mt-4 text-gray-700">
                I treat all client data and information as confidential and will not share it with third parties without
                consent, except where required by law.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Data Protection</h2>
              <p className="mt-4 text-gray-700">
                I comply with the UK GDPR and related data privacy laws. For more information, see my{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
                .
              </p>
              <p className="mt-4 text-gray-700">
                If I act as a data processor on your behalf (e.g., in HubSpot or ad platforms), a separate{" "}
                <strong>Data Processing Agreement (DPA)</strong> may be required.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Liability</h2>
              <p className="mt-4 text-gray-700">
                I provide services on a best-efforts basis. While I aim to improve performance, I do not guarantee
                specific outcomes (e.g., sales, leads, ROI).
              </p>
              <p className="mt-4 text-gray-700">I am not liable for:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Indirect or consequential losses</li>
                <li>Third-party platform issues (e.g., Google Ads disapprovals, HubSpot outages)</li>
                <li>Any loss resulting from incorrect or incomplete data provided by the client</li>
              </ul>
              <p className="mt-4 text-gray-700">
                My total liability will not exceed the total fees paid by the client in the 3 months prior to any claim.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Termination</h2>
              <p className="mt-4 text-gray-700">
                Either party may terminate the engagement with 14 days' written notice.
              </p>
              <p className="mt-4 text-gray-700">In the event of termination:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>All outstanding fees will become immediately due</li>
                <li>Any deliverables created up to that point will be shared upon request</li>
                <li>Access to shared tools or platforms must be removed within 5 working days</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Use of AI & Automation Tools</h2>
              <p className="mt-4 text-gray-700">
                I may use AI systems (e.g., OpenAI, Claude, or similar) and automation platforms (e.g., n8n, Zapier) to
                improve efficiency and performance.
              </p>
              <p className="mt-4 text-gray-700">
                All use of AI is for internal efficiency or output generation only and is supervised to maintain quality
                and compliance.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">10. Changes to These Terms</h2>
              <p className="mt-4 text-gray-700">
                I reserve the right to update these Terms at any time. Any changes will be posted on my website.
                Continued use of my services constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">11. Governing Law</h2>
              <p className="mt-4 text-gray-700">
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes
                will be subject to the exclusive jurisdiction of the English courts.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">12. Contact</h2>
              <p className="mt-4 text-gray-700">If you have any questions about these Terms, please contact:</p>
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
