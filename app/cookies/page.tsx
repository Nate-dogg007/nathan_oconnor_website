import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about the cookies we use on our website and how they help improve your experience.",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>

        <p className="text-lg text-gray-600 mb-8">
          This Cookie Policy explains how Nathan O'Connor ("we", "us", or "our") uses cookies and similar technologies
          when you visit our website at nathanoconnor.co.uk (the "Service").
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
          <p className="text-gray-700 mb-4">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide
            you with a better experience by remembering your preferences and understanding how you use our site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Consent Management</h2>
          <p className="text-gray-700 mb-4">
            We use Cookiebot to manage your cookie preferences and ensure compliance with privacy regulations. You can
            update your cookie preferences at any time using the cookie banner or by contacting us.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strictly Necessary Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are essential for the website to function properly and cannot be disabled.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Cookiebot Consent Cookies</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Used to store your cookie consent preferences and ensure compliance with privacy regulations.
                </p>
                <p className="text-xs text-gray-500">Duration: 1 year</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Google Analytics / Google Tag Manager</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Used to analyze website traffic and user behavior to improve our services.
                </p>
                <p className="text-xs text-gray-500">Duration: Up to 2 years</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are used to track visitors across websites to display relevant advertisements.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Advertising and Remarketing</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Used to show you relevant ads based on your interests and browsing behavior.
                </p>
                <p className="text-xs text-gray-500">Duration: Varies, typically up to 2 years</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Digify Cookies</h2>
          <p className="text-gray-700 mb-4">
            We use first-party cookies to record session continuity and, with your consent, campaign attribution data.
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">_digify_session / _digify_sid</h4>
              <p className="text-sm text-gray-600 mb-2">
                Strictly necessary for ensuring form submissions and preventing spam.
              </p>
              <p className="text-xs text-gray-500">Duration: Expires after 30 minutes</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">_digify</h4>
              <p className="text-sm text-gray-600 mb-2">
                Stores non-personal attribution data (e.g. UTM parameters, referrer). Session-only until consent is
                given; may persist up to 1 year if you consent to analytics/advertising cookies.
              </p>
              <p className="text-xs text-gray-500">Duration: Session-only until consent, up to 1 year with consent</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Privacy Note:</strong> No personal data is stored in these cookies. Any identifiers are
              randomised.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
          <p className="text-gray-700 mb-4">You can control and manage cookies in several ways:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Use our cookie consent banner when you first visit our website</li>
            <li>Adjust your browser settings to block or delete cookies</li>
            <li>Use browser extensions that block tracking cookies</li>
            <li>Contact us directly to discuss your preferences</li>
          </ul>
          <p className="text-gray-700">
            Please note that blocking certain cookies may impact your experience on our website and limit some
            functionality.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-700 mb-4">
            Some cookies on our website are set by third-party services. We do not control these cookies, and you should
            check the relevant third party's website for more information about their cookies and how to manage them.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong>Email:</strong> info@nathanoconnor.co.uk
              <br />
              <strong>Website:</strong> nathanoconnor.co.uk
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
