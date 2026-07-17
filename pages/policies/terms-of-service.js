// pages/policies/terms-of-service.js

import React from 'react';

const TermsOfService = () => {
  return (
  <main className="px-4  py-10 text-gray-800 bg-white">

      <div className='w-5/6 m-auto'>
      <h1 className="text-3xl font-bold mb-2 text-center">Terms of Service</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Effective Date: 11/07/2025</p>

      <section className="mb-6">
        <p>
          Welcome to <strong>Arenq</strong>! By using our website (<a href="https://www.arenq.co.in" className="text-blue-600 underline hover:text-blue-800">www.arenq.co.in</a>) or any of our services, you agree to be bound by the following Terms of Service. Please read them carefully.
        </p>
      </section>

      {[
        {
          title: "1. About Us",
          content:
            "Arenq is an online platform offering authentic Himalayan products including food, wellness items, and handicrafts. We work closely with local farmers, artisans, and small producers.",
        },
        {
          title: "2. User Agreement",
          content:
            "By accessing our platform, you confirm that you are at least 18 years old or using it under guardian supervision. Your use of this site means you accept these terms.",
        },
        {
          title: "3. Account & Information",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>Provide accurate and true details</li>
              <li>Keep your login credentials private</li>
              <li>You are responsible for all activity under your account</li>
              <li>We reserve the right to suspend accounts for misuse or false information.</li>
            </ul>
          ),
        },
        {
          title: "4. Products & Pricing",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>We aim to provide accurate product details, but slight variations may occur due to handmade or natural processes.</li>
              <li>Prices are subject to change without notice.</li>
              <li>All prices are final at the time of order placement.</li>
            </ul>
          ),
        },
        {
          title: "5. Orders & Payment",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>Orders are confirmed only after successful payment.</li>
              <li>We accept payments via secure third-party gateways.</li>
              <li>Arenq may cancel orders at its discretion.</li>
            </ul>
          ),
        },
        {
          title: "6. Shipping",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>We deliver across India. Delivery charges and timelines are shown at checkout.</li>
              <li>Delays may occur due to external factors.</li>
              <li>Ensure your shipping address is correct.</li>
            </ul>
          ),
        },
        {
          title: "7. Returns & Cancellations",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>Refer to our <a href="/policies/refund-policy" className="text-blue-600 underline hover:text-blue-800">Return & Refund Policy</a>.</li>
              <li>Cancellations are accepted only before shipping.</li>
              <li>Perishable/custom products may not be eligible for return.</li>
            </ul>
          ),
        },
        {
          title: "8. Intellectual Property",
          content:
            "All content (text, images, logos) belongs to Arenq or is used with permission. You may not reproduce or use any content without written approval.",
        },
        {
          title: "9. Prohibited Use",
          content: (
            <ul className="list-disc list-inside space-y-2">
              <li>Violate laws</li>
              <li>Spread false or harmful content</li>
              <li>Infringe on rights of others</li>
              <li>Access restricted areas</li>
            </ul>
          ),
        },
        {
          title: "10. External Links",
          content:
            "Our site may include links to other websites. We are not responsible for their content, policies, or services.",
        },
        {
          title: "11. No Warranties",
          content:
            'All services and products are offered "as is" without any warranties. We do not guarantee error-free or uninterrupted service.',
        },
        {
          title: "12. Limitation of Liability",
          content:
            "Arenq is not responsible for any losses, damages, or interruptions arising from use of our platform.",
        },
        {
          title: "13. Indemnity",
          content:
            "You agree to hold Arenq harmless from any claims or issues arising from your use of our site or violation of these terms.",
        },
        {
          title: "14. Legal Jurisdiction",
          content:
            "These terms are governed by Indian law. Any disputes will be under the jurisdiction of courts in Dharamshala, Himachal Pradesh.",
        },
        {
          title: "15. Policy Updates",
          content:
            "We may revise these terms anytime. Continued use of the site implies acceptance of the changes.",
        },
        {
          title: "16. Contact Us",
          content: (
            <div>
              <p>
                📧 Email:{" "}
                <a href="mailto:info@arenq.co.in" className="text-blue-600 underline hover:text-blue-800">
                  info@arenq.co.in
                </a>
              </p>
              <p>📞 Phone: +91 8956225134</p>
              <p className="mt-2">
                📍 <strong>Address:</strong><br />
                Arenq<br />
                Bhagsunag Road, Opposite Hotel Green,<br />
                McLeod Ganj, Dharamshala,<br />
                Himachal Pradesh – 176219
              </p>
            </div>
          ),
        },
      ].map((section, index) => (
        <section className="mb-6" key={index}>
          <h2 className="text-xl font-semibold mb-2 text-left">{section.title}</h2>
          <div className="leading-relaxed">{section.content}</div>
        </section>
      ))}
      </div>
    </main>
  );
};

export default TermsOfService;
