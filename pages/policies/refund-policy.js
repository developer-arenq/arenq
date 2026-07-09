// pages/policies/refund-policy.js

import Head from 'next/head';
import React from 'react';

const RefundPolicy = () => {
    return (
        <>
            <Head>
                <title>Cancellation/Return Policy</title>
            </Head>
            <main className="px-4  py-10 text-gray-800 bg-white">

                <div className='w-5/6 m-auto'>
                    <h1 className="text-3xl font-bold mb-6 text-center">Cancellation/Return Policy</h1>

                    <section className="mb-6">
                        <p className="leading-relaxed">
                            We stand by the quality of our products and strive for <strong>100% customer satisfaction</strong>. However, due to the artisanal and perishable nature of some items, our return policy is outlined below:
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-left">✅ Eligible for Return / Refund</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>The product is damaged, defective, expired, or incorrect.</li>
                            <li>The issue is reported within <strong>2 calendar days</strong> of delivery.</li>
                            <li>A <strong>clear unboxing video</strong> is provided (from the moment of opening the sealed parcel).</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-left">❌ Not Eligible for Return</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Used or opened consumables (e.g., jams, ghee, juices, spices)</li>
                            <li>Products without original packaging</li>
                            <li>Personalized, handmade, or fragile items (unless damaged on arrival)</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-left">📦 How to Request a Return</h2>
                        <p className="mb-2">
                            Email us at:{" "}
                            <a href="mailto:info@arenq.co.in" className="text-blue-600 underline hover:text-blue-800">
                                info@arenq.co.in
                            </a>{" "}
                            within <strong>2 days</strong> of delivery.
                        </p>
                        <p className="mb-2">
                            Return method:{" "}<strong>By mail</strong>
                        </p>
                        <p className="mb-2">
                            Return label:{" "} <strong>Included in the package</strong>
                        </p>
                        <p className="mb-2">
                            Restocking fees:{" "} <strong>No cost</strong>
                        </p>
                        <p className="mb-2">Include the following in your email:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Your Order ID</li>
                            <li>Photo or video proof of the issue</li>
                            <li>Unboxing video (strongly recommended)</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-3 text-left">💰 Refund Process</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Once approved, refunds are processed within <strong>7 business days</strong></li>
                            <li>Refunds are credited to the original payment method</li>
                            <li>For prepaid COD orders, bank details will be requested for NEFT transfer</li>
                        </ul>
                    </section>

                    <section className="mt-8 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-3 text-left">📞 Need Help?</h2>
                        <p className="mb-1">
                            <strong>Email:</strong>{" "}
                            <a href="mailto:info@arenq.co.in" className="text-blue-600 underline hover:text-blue-800">
                                info@arenq.co.in
                            </a>
                        </p>
                        <p>
                            <strong>Phone/WhatsApp:</strong> +91 8956225134<br />
                            <span className="text-sm text-gray-600">10 AM – 6 PM, Mon–Sat</span>
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
};

export default RefundPolicy;
