import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA)",
  description:
    "Access the Data Processing Agreement (DPA) for Nathan O'Connor's services, detailing data processing terms in accordance with UK GDPR.",
  alternates: {
    canonical: `${BASE_URL}/dpa`,
  },
  openGraph: {
    title: "Data Processing Agreement (DPA) | Nathan O'Connor",
    description:
      "Access the Data Processing Agreement (DPA) for Nathan O'Connor's services, detailing data processing terms in accordance with UK GDPR.",
    url: `${BASE_URL}/dpa`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "Data Processing Agreement",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Processing Agreement (DPA) | Nathan O'Connor",
    description:
      "Access the Data Processing Agreement (DPA) for Nathan O'Connor's services, detailing data processing terms in accordance with UK GDPR.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default function DPAPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Data Processing Agreement (DPA)
          </h1>
          <div className="mt-4 text-lg text-gray-600">
            <p>
              <strong>Effective Date:</strong>{" "}
              {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              <strong>Business Name (Data Processor):</strong> Nathan O'Connor
            </p>
            <p>
              <strong>Contact Email:</strong>{" "}
              <a href="mailto:info@nathanoconnor.co.uk" className="text-blue-600 hover:text-blue-800">
                info@nathanoconnor.co.uk
              </a>
            </p>
          </div>

          <p className="mt-6 text-gray-700">
            This Data Processing Agreement ("Agreement") forms part of the contract for services ("Main Agreement")
            between the Data Processor and the Data Controller. It outlines the terms under which the Data Processor
            will process personal data on behalf of the Data Controller in accordance with the UK GDPR and other
            applicable data protection laws.
          </p>

          <div className="mt-12 space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">1. Definitions</h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <strong>Data Controller</strong>: The client who determines the purposes and means of processing
                  personal data.
                </li>
                <li>
                  <strong>Data Processor</strong>: Nathan O'Connor, who processes data on behalf of the Data Controller.
                </li>
                <li>
                  <strong>Personal Data</strong>: Any information relating to an identified or identifiable natural
                  person.
                </li>
                <li>
                  <strong>Processing</strong>: Any operation or set of operations performed on personal data.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">2. Scope and Purpose</h2>
              <p className="mt-4 text-gray-700">
                The Data Processor shall process Personal Data only to the extent necessary to provide the agreed
                services, which may include:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Marketing automation</li>
                <li>CRM configuration (e.g., HubSpot)</li>
                <li>Data enrichment and analytics</li>
                <li>Tracking setup (e.g., GTM, GA4)</li>
                <li>Reporting and attribution</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">3. Instructions and Compliance</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>The Data Processor shall process data only on documented instructions from the Data Controller.</li>
                <li>The Data Processor shall comply with all applicable data protection laws and regulations.</li>
                <li>The Data Processor shall not use data for any other purpose without written consent.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">4. Confidentiality</h2>
              <p className="mt-4 text-gray-700">
                The Data Processor shall ensure that all persons authorised to process the personal data are subject to
                confidentiality obligations.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">5. Security</h2>
              <p className="mt-4 text-gray-700">
                The Data Processor shall implement appropriate technical and organisational measures to protect personal
                data against unauthorised or unlawful processing, accidental loss, destruction, or damage. These
                measures include:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Encrypted storage and transmission</li>
                <li>Access control and user authentication</li>
                <li>Regular security reviews and audits</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">6. Sub-processors</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>
                  The Data Controller authorises the use of third-party sub-processors, such as HubSpot, Google Ads,
                  GA4, Airtable, and CookieYes.
                </li>
                <li>A current list of sub-processors will be provided on request.</li>
                <li>
                  The Data Processor shall ensure that sub-processors are subject to data protection obligations
                  equivalent to those in this Agreement.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">7. Data Subject Rights</h2>
              <p className="mt-4 text-gray-700">
                The Data Processor shall assist the Data Controller in responding to data subject requests, including:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Right of access</li>
                <li>Right to rectification</li>
                <li>Right to erasure</li>
                <li>Right to data portability</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">8. Data Breach Notification</h2>
              <p className="mt-4 text-gray-700">
                In the event of a data breach, the Data Processor shall notify the Data Controller without undue delay,
                and provide all relevant information and assistance to comply with legal obligations.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">9. Data Transfers</h2>
              <p className="mt-4 text-gray-700">
                The Data Processor may transfer personal data outside the UK/EU only with appropriate safeguards in
                place, such as:
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy decisions</li>
                <li>Sub-processor compliance with data transfer requirements</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">10. Data Retention and Deletion</h2>
              <p className="mt-4 text-gray-700">Upon termination of the services, the Data Processor shall:</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Return or delete all personal data, at the Data Controller's request</li>
                <li>Confirm in writing that no data has been retained unless required by law</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">11. Duration</h2>
              <p className="mt-4 text-gray-700">
                This Agreement remains in effect for as long as the Data Processor processes personal data on behalf of
                the Data Controller.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">12. Governing Law</h2>
              <p className="mt-4 text-gray-700">This Agreement is governed by the laws of England and Wales.</p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">13. Applicability</h2>
              <p className="mt-4 text-gray-700">
                This Data Processing Agreement forms the basis of how I handle personal data on behalf of my clients and
                is incorporated into all client relationships by reference.
              </p>
              <p className="mt-4 text-gray-700">
                If you are a client and require a signed copy of this DPA, please contact me at{" "}
                <a href="mailto:info@nathanoconnor.co.uk" className="text-blue-600 hover:text-blue-800">
                  info@nathanoconnor.co.uk
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
