// pages/policies/privacy-policy.js

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="px-4  py-10 text-gray-800 bg-white">

      <div className='w-5/6 m-auto'>

      <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Effective Date: 11/07/2025</p>

      <section className="mb-6">
        <p className="leading-relaxed">
          At <strong>Arenq</strong>, we value your privacy and are committed to protecting your personal information. By using our website or services, you agree to the terms of this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">📋 What Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Personal Information:</strong> Name, phone number, email address, billing and shipping address, login details, and payment info (processed securely via third-party gateways).
          </li>
          <li>
            <strong>Browsing Data:</strong> IP address, browser type, device info, pages visited, time spent, and cookies.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left ">🔍 How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Process and deliver your orders</li>
          <li>Provide customer support and updates</li>
          <li>Send offers, promotions, and newsletters (opt-out anytime)</li>
          <li>Improve our website and user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">🤝 Data Sharing</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Trusted partners (payment gateways, logistics, email tools)</li>
          <li>Government authorities if required by law</li>
          <li>In case of merger, acquisition, or business transfer</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">🍪 Cookies</h2>
        <p className="mb-2">
          We use cookies to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Maintain login sessions</li>
          <li>Understand user behavior</li>
          <li>Personalize your experience</li>
        </ul>
        <p className="text-sm text-gray-500 mt-2">
          You can manage cookies via your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">🔒 Data Security</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>SSL encryption</li>
          <li>Secure payment processing</li>
          <li>Regular internal audits</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">🛡️ Your Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access, update, or delete your data</li>
          <li>Opt out of marketing emails</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mt-2">
          For any such requests, email us at:{" "}
          <a href="mailto:info@arenq.co.in" className="text-blue-600 underline hover:text-blue-800">
            info@arenq.co.in
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-left">📅 Policy Updates</h2>
        <p>
          We may revise this policy anytime. Updates will be posted here with a new effective date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 text-left">📬 Contact Us</h2>
        <p className="mb-1">
          <strong>Email:</strong>{" "}
          <a href="mailto:info@arenq.co.in" className="text-blue-600 underline hover:text-blue-800">
            info@arenq.co.in
          </a>
        </p>
        <p>
          <strong>Address:</strong><br />
          Arenq<br />
          Bhagsunag Road, Opposite Hotel Green,<br />
          McLeod Ganj, Dharamshala,<br />
          Himachal Pradesh – 176219
        </p>
      </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
