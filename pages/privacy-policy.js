import Head from "next/head";

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy | ApneeHatti</title>
                <meta
                    name="description"
                    content="Read the privacy policy of ApneeHatti to understand how we collect, use, and protect your personal information."
                />
                <link rel="canonical" href="https://www.arenq.co.in/privacy-policy" />
            </Head>

            <div className="w-full bg-gray-100">
                <div className=" lg:max-w-6xl bg-white m-auto p-5">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                    <p className="mb-4">Last Updated: August 8, 2025</p>

                    <p className="mb-6">
                        At <strong>ApneeHatti</strong>, we value your privacy and are committed to protecting your personal information.
                        This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Personal details (name, email, phone number, shipping address)</li>
                        <li>Payment information (processed securely through our payment gateway)</li>
                        <li>Browsing data (IP address, browser type, pages visited)</li>
                        <li>Cookies & similar tracking technologies</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li>To process and deliver your orders</li>
                        <li>To send order updates and promotional offers</li>
                        <li>To improve our website and product offerings</li>
                        <li>For fraud prevention and security purposes</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies Policy</h2>
                    <p className="mb-6">
                        We use cookies to improve your shopping experience, analyze website traffic, and personalize content.
                        You can choose to accept or decline cookies through our cookie consent banner.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing of Information</h2>
                    <p className="mb-6">
                        We do not sell your personal information to third parties. We may share your data with trusted partners such as
                        payment processors, delivery services, and analytics providers to fulfill your orders and improve our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
                    <p className="mb-6">
                        We implement industry-standard security measures to protect your data. However, no method of transmission over
                        the internet is 100% secure.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
                    <ul className="list-disc pl-6 mb-6">
                        <li>Access, update, or delete your personal data</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Disable cookies via your browser settings</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
                    <p className="mb-6">
                        If you have any questions about our Privacy Policy, please contact us at:
                    </p>
                    <p className="font-medium">
                        📧 Email: info@arenq.co.in <br />
                        📞 Phone: +91-8956225134
                    </p>
                </div>
            </div>
        </>
    );
}
