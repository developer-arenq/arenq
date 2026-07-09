"use client";

import Image from 'next/image';
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from 'react';
import "keen-slider/keen-slider.min.css";
import { AiOutlineSearch } from "react-icons/ai";
import MagnifierImage from './MapLence';

export default function ProductMap() {
     const products = [
        {
            category: "Handloom & Textiles",
            examples: ["Kinnauri Shawl", "Chamba Rumal (Embroidered Cloth)", "Kullu Shawl & Stole"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Kinnaur", "Chamba", "Kullu"]
        },
        {
            category: "Handicrafts & Woodwork",
            examples: ["Kangra/Kinnauri Pula (Wool Cap/Topi)", "Walnut/Deodar Wood Carving"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Kangra", "Chamba"]
        },
        {
            category: "Metals & Ritual Items",
            examples: ["Gaddi/Chamba Metalware (Utensils, Bells)"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Chamba", "Churah"]
        },
        {
            category: "Food & Beverages",
            examples: ["Kangra Tea (Orthodox)", "Chilgoza Pine Nuts", "Himalayan Honey (Multiflora/Acacia)", "Apple & Apricot Preserves/Chutneys"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Kangra", "Palampur", "Kinnaur", "Mandi", "Kullu", "Sirmaur", "Shimla"]
        },
        {
            category: "Wellness & Herbal",
            examples: ["Wild Rosehip/Jamun/Amla Herbal Products"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Kullu", "Mandi"]
        },
        {
            category: "Art & Souvenirs",
            examples: ["Pahari Miniature Painting (Kangra Style)"],
            origin: "Himachal Pradesh",
            specificOrigin: ["Kangra"]
        },
        {
            category: "Handloom & Textiles",
            examples: ["Pashmina (Changthangi) Shawl/Stole", "Ladakhi Wool Carpets (Gabi/Thick Rugs)"],
            origin: "Leh (Ladakh)",
            specificOrigin: ["Changthang", "Leh"]
        },
        {
            category: "Food & Beverages",
            examples: ["Sea Buckthorn Juice & Jam", "Apricot (Khubani) Kernels, Oil & Jam", "Tsampa (Roasted Barley Flour)"],
            origin: "Leh (Ladakh)",
            specificOrigin: ["Leh", "Nubra", "Sham Valley"]
        },
        {
            category: "Dairy & Protein",
            examples: ["Chhurpi (Dried Yak/Cow Cheese)"],
            origin: "Leh (Ladakh)",
            specificOrigin: ["Leh"]
        },
        {
            category: "Handicrafts & Ritual",
            examples: ["Thangka Painting", "Prayer Wheels/Flags, Metal & Wood Craft"],
            origin: "Leh (Ladakh)",
            specificOrigin: ["Leh"]
        },
        {
            category: "Wellness & Herbal",
            examples: ["Amchi (Tibetan) Herbal Blends"],
            origin: "Leh (Ladakh)",
            specificOrigin: ["Leh"]
        },
        {
            category: "Handloom & Textiles",
            examples: ["Kani Shawl", "Kashmiri Pashmina Shawl"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Srinagar", "Budgam"]
        },
        {
            category: "Home & Living",
            examples: ["Namda Felt Rugs"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Srinagar", "Anantnag"]
        },
        {
            category: "Handicrafts & Woodwork",
            examples: ["Walnut Wood Carving (Furniture/Decor)"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Srinagar"]
        },
        {
            category: "Handicrafts & Papier-Mâché",
            examples: ["Naqashi Papier-Mâché Decorware"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Srinagar"]
        },
        {
            category: "Food & Beverages",
            examples: ["Saffron (Kesar)", "Kehwa Mix (Green Tea, Spices)"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Pampore", "Pulwama", "Srinagar"]
        },
        {
            category: "Dry Fruits & Nuts",
            examples: ["Walnuts/Almonds/Dried Morels"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Kupwara", "Shopian", "Anantnag"]
        },
        {
            category: "Embroidery & Apparel",
            examples: ["Aari Work/Sozni Embroidery Apparel"],
            origin: "Srinagar (J&K)",
            specificOrigin: ["Srinagar"]
        },
        {
            category: "Millets & Grains",
            examples: ["Mandua (Ragi/Finger Millet) Flour", "Jhangora (Barnyard Millet)"],
            origin: "Uttarakhand",
            specificOrigin: ["Almora", "Pithoragarh", "Bageshwar", "Chamoli"]
        },
        {
            category: "Pulses & Staples",
            examples: ["Bhatt (Black Soybean)"],
            origin: "Uttarakhand",
            specificOrigin: ["Pithoragarh", "Bageshwar"]
        },
        {
            category: "Spices & Aromatics",
            examples: ["Jakhiya (Wild Mustard Seeds)", "Bhangjeera (Perilla) & Jambu Herb"],
            origin: "Uttarakhand",
            specificOrigin: ["Pauri Garhwal", "Chamoli", "Rudraprayag"]
        },
        {
            category: "Food & Beverages",
            examples: ["Himalayan Ghee & Cheeses", "Herbal Teas (Buransh/Rhododendron, Tulsi)"],
            origin: "Uttarakhand",
            specificOrigin: ["Almora", "Uttarkashi", "Nainital", "Chamoli"]
        },
        {
            category: "Honey & Natural",
            examples: ["Pahadi Honey (Multiflora/Buransh)"],
            origin: "Uttarakhand",
            specificOrigin: ["Almora", "Tehri Garhwal"]
        },
        {
            category: "Handicrafts & Bamboo",
            examples: ["Ringaal Bamboo Craft (Baskets, Utility)"],
            origin: "Uttarakhand",
            specificOrigin: ["Pithoragarh", "Chamoli"]
        },
        {
            category: "Handloom & Textiles",
            examples: ["Pankhi/Shawl (Wool), Panchachuli Weaves"],
            origin: "Uttarakhand",
            specificOrigin: ["Munsiyari", "Almora"]
        },
        {
            category: "Metal Craft",
            examples: ["Tamta Copperware (Utensils/Decor)"],
            origin: "Uttarakhand",
            specificOrigin: ["Almora"]
        },
        {
            category: "Folk Art",
            examples: ["Aipan Art (Home Decor/Stationery)"],
            origin: "Uttarakhand",
            specificOrigin: ["Kumaon Region"]
        }
    ];

    const [sliderRef, instanceRef] = useKeenSlider({
        slides: {
            perView: 1,
            spacing: 15,
        },
        loop: true,
        duration: 1000,
        easing: (t) => t,
    });

    useEffect(() => {
        if (!instanceRef.current) return;
        const interval = setInterval(() => {
            instanceRef.current.next();
        }, 3000);
        return () => clearInterval(interval);
    }, [instanceRef]);

    return (
        <div className="bg-transparent ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                    {/* Left content */}
                    <div className="w-full md:w-1/2 text-white space-y-6 flex flex-col justify-center">

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-800">
                            Explore Our <span className="text-green-600">Products</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold text-green-600">
                            We offer a wide range of authentic regional products crafted with tradition and care.
                        </p>

                        {/* Additional details above the slider */}
                        <div className="bg-gradient-to-b from-green-950 to-black p-4 rounded-lg space-y-3">
                            <h3 className="text-lg font-bold text-green-800 font-sans">Why Choose Our Products?</h3>
                            <p className="text-sm text-slate-300">
                                All products are sourced directly from trusted local artisans and farmers.
                            </p>
                            <p className="text-sm text-slate-300">
                                Enjoy the rich flavors and natural goodness with every purchase.
                            </p>
                            <p className="text-sm text-slate-300">
                                We ensure sustainable and ethical sourcing practices for a better tomorrow.
                            </p>
                        </div>

                        {/* Slider with product details */}
                        <div ref={sliderRef} className="keen-slider w-full">
                            {products.map((product, index) => (
                                <div key={index} className="keen-slider__slide">
                                    <div className="bg-gradient-to-b from-green-950 to-black p-4 rounded-lg space-y-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-green-800 font-sans">{product.category}</h3>
                                        <p className="text-xs sm:text-sm text-slate-300">
                                            <span className="font-semibold">Examples:</span> {product.examples.join(", ")}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-300">
                                            <span className="font-semibold">Origin:</span> {product.origin}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-300">
                                            <span className="font-semibold">Specific Origin:</span> {product.specificOrigin.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right image with hover lens */}
                    <div className="w-full md:w-1/2 flex justify-center items-center relative group">
                        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg overflow-hidden relative">
                           <MagnifierImage src="/images/home/map.webp" alt="Regional Products Map" width={400} height={600} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
