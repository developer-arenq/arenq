// pages/policies/terms-of-service.js

import React from "react";

const TermsOfService = () => {
  return (
    <main className="px-4 py-10 bg-white text-gray-800">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Terms of Service
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Effective Date: 11/07/2025
        </p>

        <section className="mb-6">
          <p>
            Welcome to <strong>Arenq</strong>. By accessing or using our website
            (
            <a
              href="https://arenq.co.in"
              className="text-blue-600 underline"
            >
              www.arenq.co.in
            </a>
            ), you agree to comply with and be bound by these Terms of Service.
            If you do not agree with these terms, please do not use our website
            or services.
          </p>
        </section>

        {[
          {
            title: "1. About Arenq",
            content:
              "Arenq specializes in advanced lithium battery technology, battery energy storage systems (BESS), industrial batteries, EV batteries, telecom batteries, UPS batteries, inverter batteries, renewable energy storage solutions, and other energy storage products for residential, commercial, and industrial applications.",
          },

          {
            title: "2. Acceptance of Terms",
            content:
              "By using this website, you confirm that you are at least 18 years of age or are using the website under the supervision of a parent or legal guardian.",
          },

          {
            title: "3. User Accounts",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and up-to-date information.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
                <li>You are responsible for all activities under your account.</li>
                <li>
                  Arenq reserves the right to suspend or terminate accounts for
                  misuse or fraudulent activity.
                </li>
              </ul>
            ),
          },

          {
            title: "4. Products & Specifications",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Product specifications, images, and technical information are
                  provided for reference purposes.
                </li>
                <li>
                  Actual products may vary slightly due to manufacturing
                  improvements.
                </li>
                <li>
                  Arenq reserves the right to modify specifications or pricing
                  without prior notice.
                </li>
              </ul>
            ),
          },

          {
            title: "5. Orders & Payment",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Orders are confirmed only after successful payment or order
                  confirmation by Arenq.
                </li>
                <li>
                  We reserve the right to reject or cancel any order for any
                  reason.
                </li>
                <li>
                  Prices displayed on the website are subject to applicable
                  taxes unless otherwise stated.
                </li>
              </ul>
            ),
          },

          {
            title: "6. Shipping & Delivery",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Delivery timelines are estimates and may vary depending on
                  product availability and shipping location.
                </li>
                <li>
                  Customers are responsible for providing accurate delivery
                  information.
                </li>
                <li>
                  Arenq is not liable for delays caused by logistics partners or
                  force majeure events.
                </li>
              </ul>
            ),
          },

          {
            title: "7. Warranty & Returns",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Warranty coverage varies depending on the product category.
                </li>
                <li>
                  Please refer to our{" "}
                  <a
                    href="/policies/refund-policy"
                    className="text-blue-600 underline"
                  >
                    Refund & Return Policy
                  </a>
                  .
                </li>
                <li>
                  Products damaged due to misuse or unauthorized modifications
                  are not covered under warranty.
                </li>
              </ul>
            ),
          },

          {
            title: "8. Intellectual Property",
            content:
              "All trademarks, logos, product images, graphics, technical documents, and website content are the intellectual property of Arenq unless otherwise stated. Unauthorized use is strictly prohibited.",
          },

          {
            title: "9. Acceptable Use",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>Do not misuse or interfere with website functionality.</li>
                <li>Do not attempt unauthorized access.</li>
                <li>Do not upload malicious software or harmful content.</li>
                <li>Do not violate applicable laws or regulations.</li>
              </ul>
            ),
          },

          {
            title: "10. Third-Party Services",
            content:
              "Our website may contain links to third-party websites or services. Arenq is not responsible for the content, policies, or practices of third-party websites.",
          },

          {
            title: "11. Disclaimer",
            content:
              'All products, services, and website content are provided on an "as available" and "as is" basis without warranties of any kind except where required by law.',
          },

          {
            title: "12. Limitation of Liability",
            content:
              "To the fullest extent permitted by law, Arenq shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website.",
          },

          {
            title: "13. Indemnification",
            content:
              "You agree to indemnify and hold Arenq harmless against any claims, liabilities, damages, losses, or expenses arising from your misuse of the website or violation of these Terms.",
          },

          {
            title: "14. Governing Law",
            content:
              "These Terms of Service shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Maharashtra, India.",
          },

          {
            title: "15. Changes to Terms",
            content:
              "Arenq reserves the right to modify these Terms of Service at any time. Updated versions will be published on this page.",
          },

          {
            title: "16. Contact Us",
            content: (
              <div>
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:info@arenq.co.in"
                    className="text-blue-600 underline"
                  >
                    info@arenq.co.in
                  </a>
                </p>

                <p>📞 Phone: +91 89562 25134</p>

                <p className="mt-2">
                  🌐 Website:{" "}
                  <a
                    href="https://arenq.co.in"
                    className="text-blue-600 underline"
                  >
                    www.arenq.co.in
                  </a>
                </p>
              </div>
            ),
          },
        ].map((section, index) => (
          <section key={index} className="mb-7">
            <h2 className="text-xl font-semibold mb-3">
              {section.title}
            </h2>

            <div className="leading-7 text-gray-700">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default TermsOfService;