// pagesC

import React from 'react';

const ShippingPolicy = () => {
  return (
    <main className="px-4  py-10 text-gray-800 bg-white">

      <div className='w-5/6 m-auto'>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Shipping Information – Apneehatti
      </h1>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">
          At <strong>Apneehatti</strong>, we’re committed to delivering handcrafted and mountain-made products from the heart of the Himalayas right to your doorstep, safely and on time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-left">🚚 Shipping Timeline</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Order Processing Time:</strong> 1–2 business days</li>
          <li><strong>Standard Delivery:</strong> 4–8 business days (depending on location)</li>
          <li><strong>Remote/Mountain Areas:</strong> May take an additional 2–3 days</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500 italic">
          * Orders placed on Sundays or public holidays will be processed on the next working day.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-left">🌍 Shipping Coverage</h2>
        <p className="text-gray-700 leading-relaxed">
          We ship <strong>PAN India</strong> through trusted logistics partners.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          For bulk or international orders, please contact us at:{" "}
          <a
            href="mailto:info@arenq.co.in"
            className="text-blue-600 underline hover:text-blue-800"
          >
            info@arenq.co.in
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-left">💰 Shipping Charges</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Prepaid Orders:</strong> ₹70</li>
          <li><strong>Cash on Delivery (COD) Orders:</strong> ₹100</li>
        </ul>
      </section>
      </div>
    </main>
  );
};

export default ShippingPolicy;
