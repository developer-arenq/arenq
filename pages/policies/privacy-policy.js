// pages/policies/privacy-policy.js

import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="px-4 py-10 bg-white text-gray-800">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Effective Date: 11/07/2025
        </p>

        <section className="mb-8">
          <p className="leading-7">
            At <strong>Arenq</strong>, we are committed to protecting your
            privacy and safeguarding the personal information you share with us.
            This Privacy Policy explains how we collect, use, store, and protect
            your information when you visit{" "}
            <a
              href="https://arenq.co.in"
              className="text-blue-600 underline"
            >
              www.arenq.co.in
            </a>{" "}
            or use our products and services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>

          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address,
              mobile number, company name, billing address, shipping address,
              GST details (if applicable), and account credentials.
            </li>

            <li>
              <strong>Order Information:</strong> Product purchases, invoices,
              warranty registrations, service requests, and payment details
              (payments are processed securely by third-party payment gateways).
            </li>

            <li>
              <strong>Technical Information:</strong> IP address, browser type,
              operating system, device information, cookies, pages visited, and
              website usage analytics.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>

          <ul className="list-disc list-inside space-y-2">
            <li>Process orders and deliver products.</li>
            <li>Provide warranty, technical support, and customer service.</li>
            <li>Respond to enquiries and quotation requests.</li>
            <li>Send order confirmations and service updates.</li>
            <li>Improve website performance and customer experience.</li>
            <li>
              Send marketing communications, product launches, and promotional
              offers (you may unsubscribe at any time).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            3. Information Sharing
          </h2>

          <p className="mb-3">
            We do not sell your personal information. Your information may be
            shared only with:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Payment gateway providers.</li>
            <li>Courier and logistics partners.</li>
            <li>Installation and service partners.</li>
            <li>Government authorities when legally required.</li>
            <li>
              Business partners involved in mergers, acquisitions, or company
              restructuring.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. Cookies & Analytics
          </h2>

          <p className="mb-3">
            We use cookies and analytics technologies to:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Remember your login preferences.</li>
            <li>Improve website performance.</li>
            <li>Understand visitor behaviour.</li>
            <li>Enhance website security.</li>
            <li>Provide a better browsing experience.</li>
          </ul>

          <p className="text-sm text-gray-500 mt-3">
            You can disable cookies through your browser settings at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. Data Security
          </h2>

          <ul className="list-disc list-inside space-y-2">
            <li>SSL encrypted communication.</li>
            <li>Secure payment processing.</li>
            <li>Restricted access to customer information.</li>
            <li>Regular monitoring and security updates.</li>
            <li>Industry-standard data protection practices.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. Your Rights
          </h2>

          <p className="mb-3">
            Depending on applicable laws, you may request to:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal information.</li>
            <li>Update or correct inaccurate information.</li>
            <li>Delete your personal information.</li>
            <li>Withdraw marketing consent.</li>
            <li>Request a copy of your stored information.</li>
          </ul>

          <p className="mt-3">
            Please contact us at{" "}
            <a
              href="mailto:info@arenq.co.in"
              className="text-blue-600 underline"
            >
              info@arenq.co.in
            </a>{" "}
            for any privacy-related requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            7. Third-Party Links
          </h2>

          <p>
            Our website may contain links to external websites. Arenq is not
            responsible for the privacy practices or content of third-party
            websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            8. Policy Updates
          </h2>

          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be published on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            9. Contact Us
          </h2>

          <p className="mb-2">
            <strong>Company:</strong> Arenq
          </p>

          <p className="mb-2">
            <strong>Website:</strong>{" "}
            <a
              href="https://arenq.co.in"
              className="text-blue-600 underline"
            >
              www.arenq.co.in
            </a>
          </p>

          <p className="mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@arenq.co.in"
              className="text-blue-600 underline"
            >
              info@arenq.co.in
            </a>
          </p>

          <p className="mb-2">
            <strong>Phone:</strong> +91 89562 25134
          </p>

          <p>
            <strong>Registered Office:</strong>
            <br />
            Arenq
            <br />
            Maharashtra, India
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;