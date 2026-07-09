/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
    FaMountain,
    FaLeaf,
    FaShippingFast,
    FaBoxOpen,
    FaUsers,
    FaGift,
} from "react-icons/fa";
import Image from "next/image";

const BulkOrder = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        quantity: '',
        productInterest: '',
        message: '',
    });

    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatusMessage('Submitting your request...');

        try {
            const response = await fetch('/api/bulkorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatusMessage('Your bulk order request has been submitted successfully!');
                // ✅ Reset form here
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    organization: '',
                    quantity: '',
                    productInterest: '',
                    message: '',
                });
            } else {
                setStatusMessage(`Error: ${result.error || 'Something went wrong. Please try again later.'}`);
            }
        } catch (error) {
            console.error(error);
            setStatusMessage('Something went wrong. Please try again later.');
        }
    };


    return (
        <div className="bg-gradient-to-b from-blue-50 via-purple-50 to-teal-50 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="text-center mb-10">
                    <div className=""> {/* Must be relative and have height */}
                        <Image
                            src="/images/bulk/bulk1.png"
                            alt="Bulk Order"
                            fill // This is correct
                            height={500}
                            width={900}
                            className="object-cover rounded-xl shadow"
                            priority
                        />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mt-8">
                        Bulk Orders – Bringing the Mountains to You, in Bulk
                    </h2>
                    <p className="text-md sm:text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
                        Whether you‘re a business, event planner, NGO, or government body — Apneehatti offers curated bulk ordering options that support artisans, farmers, and mountain communities.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2 text-green-700 font-sans">
                                <FaUsers className="text-green-500" />
                                Who Is This For?
                            </h3>
                            <ul className="list-disc list-inside text-gray-800 mt-2">
                                <li>Retailers & Resellers</li>
                                <li>Corporates (for gifting or employee hampers)</li>
                                <li>Wedding & Event Planners</li>
                                <li>NGOs & CSR Initiatives</li>
                                <li>Government Departments</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2 text-green-700 font-sans">
                                <FaBoxOpen className="text-green-500" />
                                Need Custom Packaging or Labeling?
                            </h3>
                            <ul className="list-disc list-inside text-gray-800 mt-2">
                                <li>Organic Spices & Pulses from mountain farms</li>
                                <li>Herbal Teas & Natural Beverages</li>
                                <li>Woolen Handicrafts & Knitwear</li>
                                <li>Bamboo & Wood Crafts</li>
                                <li>Handwoven Textiles</li>
                                <li>Customized Eco-Friendly Gift Boxes</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2 text-green-700 font-sans">
                                <FaMountain className="text-green-500" />
                                Why Order from Apneehatti?
                            </h3>
                            <ul className="list-disc list-inside text-gray-800 mt-2">
                                <li>Special Bulk Pricing</li>
                                <li>Customization Options</li>
                                <li>Eco-friendly & Sustainable Products</li>
                                <li>Pan-India Shipping</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2 text-green-700 font-sans">
                                <FaGift className="text-green-500" />
                                Impact with Every Order
                            </h3>
                            <p className="text-gray-700 mt-2">
                                Every bulk order directly empowers mountain livelihoods and helps preserve traditional crafts and sustainable practices.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-green-700 font-sans">
                        How to Place a Bulk Order
                    </h3>
                    <p className="text-gray-700 mt-2">
                        Fill out the form below and our team will get in touch within 24–48 hours.
                    </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="mt-8 bg-green-100 p-6 md:p-8 rounded-xl space-y-6 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        />
                        <input
                            type="text"
                            name="organization"
                            placeholder="Company / Organization"
                            value={formData.organization || ''}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Estimated Quantity"
                            value={formData.quantity || ''}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        />
                        <select
                            name="productInterest"
                            value={formData.productInterest || ''}
                            onChange={handleChange}
                            className="p-3 border border-gray-300 rounded-md text-sm w-full"
                        >
                            <option value="">Interested In</option>
                            <option value="organic">Organic Spices / Pulses</option>
                            <option value="teas">Herbal Teas & Natural Beverages</option>
                            <option value="handicrafts">Woolen HandCrafts / Textiles</option>
                            <option value="eco-boxes">Eco-Friendly Gift Boxes</option>
                            <option value="international">International Order</option> {/* ✅ New option */}
                            <option value="custom">Custom Requirement</option>
                            <option value="other">Other</option> {/* ✅ New option */}
                        </select>

                    </div>

                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Tell us more about your requirements..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    />

                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-md transition-all duration-200"
                    >
                        Submit Bulk Order Inquiry
                    </button>

                    {statusMessage && (
                        <p className="text-sm text-green-700 mt-2">
                            {statusMessage}
                        </p>
                    )}
                </form>

            </div>
        </div>
    );
};

export default BulkOrder;
