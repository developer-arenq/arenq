"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    ChevronRight,
    Camera,
    ImageIcon,
    Building2,
    X,
    ZoomIn,
    Factory,
    Award,
    Users,
    Quote,
} from "lucide-react";

const galleryData = [
    {
        id: 1,
        category: "Factory",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/16-4.jpeg",
        title: "Battery Manufacturing",
        description:
            "Automated cell assembly line producing high-density lithium battery packs under strict quality control.",
    },
    {
        id: 7,
        category: "Factory",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/11-2.jpeg",
        title: "Battery Manufacturing",
        description:
            "Automated cell assembly line producing high-density lithium battery packs under strict quality control.",
    },
    {
        id: 2,
        category: "Factory",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/13-3.jpeg",
        title: "Production Line",
        description:
            "Precision testing stations ensuring every battery pack meets safety and performance standards.",
    },
    {
        id: 3,
        category: "Expo",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/Expo.jpeg",
        title: "Industrial Expo",
        description:
            "ARENQ showcasing next-gen lithium technology to industry leaders and partners.",
    },
    {
        id: 5,
        category: "Products",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/E-Kart.jpeg",
        title: "Golf Cart Battery",
        description:
            "Compact, high-cycle-life battery designed for golf carts and utility electric vehicles.",
    },
    {
        id: 9,
        category: "Products",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/Expo-1.jpeg",
        title: "EV Battery",
        description:
            "Purpose-built lithium battery pack engineered for e-auto and light electric vehicles.",
    },
    {
        id: 4,
        category: "Products",
        image: "https://arenq.co.in/wp-content/uploads/2025/06/DSC07669-copy-1-scaled-1.jpg",
        title: "EV Battery",
        description:
            "Purpose-built lithium battery pack engineered for e-auto and light electric vehicles.",
    },
    {
        id: 6,
        category: "Events",
        image:
            "https://arenq.co.in/wp-content/uploads/2025/06/DSC07679-copy-4.jpg",
        title: "Corporate Event",
        description:
            "Team and leadership coming together to celebrate milestones in ARENQ's growth story.",
    },
    {
        id: 8,
        category: "Events",
        image:
            "https://arenq.co.in/wp-content/uploads/2025/06/WhatsApp-Image-2023-12-05-at-16.34.29-1-3.jpeg",
        title: "Corporate Event",
        description:
            "Team and leadership coming together to celebrate milestones in ARENQ's growth story.",
    },
    {
        id: 10,
        category: "Events",
        image:
            "https://arenq.co.in/wp-content/uploads/2025/06/Expo-0-1.jpeg",
        title: "Corporate Event",
        description:
            "Team and leadership coming together to celebrate milestones in ARENQ's growth story.",
    },
];

const stats = [
    { icon: ImageIcon, value: "500+", label: "Project Images", color: "text-[#0A528F]" },
    { icon: Building2, value: "75+", label: "Industrial Projects", color: "text-[#FFB600]" },
    { icon: Camera, value: "25+", label: "Events Covered", color: "text-[#0A528F]" },
    { icon: Award, value: "20+", label: "Years of Excellence", color: "text-[#FFB600]" },
];

const highlights = [
    {
        icon: Factory,
        title: "State-of-the-Art Facility",
        text: "A fully automated manufacturing plant built for precision, safety and scale.",
    },
    {
        icon: Users,
        title: "Skilled Engineering Team",
        text: "Experienced engineers and technicians driving innovation in every battery pack.",
    },
    {
        icon: Award,
        title: "Certified Quality",
        text: "Every product passes rigorous testing to meet international safety standards.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
};

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [heroIndex, setHeroIndex] = useState(0);
    const router = useRouter();
    // Auto-rotate the featured hero image
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % galleryData.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
            const handleKey = (e) => e.key === "Escape" && setSelectedImage(null);
            window.addEventListener("keydown", handleKey);
            return () => {
                document.body.style.overflow = "auto";
                window.removeEventListener("keydown", handleKey);
            };
        }
    }, [selectedImage]);

    return (
        <main className="bg-white overflow-x-hidden">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A528F] via-[#0A528F] to-[#083f6e]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,182,0,0.25),transparent_50%)]" />

                <motion.div
                    className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#FFB600]/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md"
                        >
                            <Camera className="mr-2 h-4 w-4 text-[#FFB600]" />
                            <span className="text-sm text-white">Explore Our Journey</span>
                        </motion.div>

                        <motion.h1
                            initial="hidden"
                            animate="show"
                            custom={1}
                            variants={fadeUp}
                            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
                        >
                            Gallery
                        </motion.h1>

                        <motion.p
                            initial="hidden"
                            animate="show"
                            custom={2}
                            variants={fadeUp}
                            className="mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-white/80"
                        >
                            Discover our battery manufacturing facilities, innovation,
                            exhibitions, products and memorable moments that define the
                            ARENQ journey — from raw cells to finished, road-ready power.
                        </motion.p>

                        <motion.div
                            initial="hidden"
                            animate="show"
                            custom={3}
                            variants={fadeUp}
                            className="mt-8 flex items-center gap-2 text-white flex-wrap"
                        >
                            <span className="font-medium">Home</span>
                            <ChevronRight size={18} />
                            <span className="text-[#FFB600] font-semibold">Gallery</span>
                        </motion.div>
                    </div>

                    {/* Featured hero image — auto-rotates through the gallery */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                            <AnimatePresence mode="sync">
                                <motion.div
                                    key={galleryData[heroIndex].id}
                                    initial={{ opacity: 0, scale: 1.08 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={galleryData[heroIndex].image}
                                        alt={galleryData[heroIndex].title}
                                        fill
                                        sizes="50vw"
                                        priority
                                        className="object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>



                            {/* Progress dots */}
                            <div className="absolute top-5 right-5 flex gap-1.5">
                                {galleryData.map((item, i) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setHeroIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === heroIndex
                                            ? "w-6 bg-[#FFB600]"
                                            : "w-1.5 bg-white/50 hover:bg-white/80"
                                            }`}
                                        aria-label={`Show ${item.title}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4">
                            <p className="text-3xl font-bold text-[#0A528F]">500+</p>
                            <p className="text-gray-500 text-sm">Moments Captured</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Statistics */}
            <section className="-mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl bg-white shadow-xl p-6 sm:p-8 border border-gray-100"
                            >
                                <stat.icon className={stat.color} size={32} />
                                <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                                    {stat.value}
                                </h2>
                                <p className="text-gray-500 mt-2 text-sm sm:text-base">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Our Gallery / Highlights */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <span className="text-[#FFB600] font-semibold uppercase tracking-[3px]">
                            Behind The Scenes
                        </span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            What Goes Into Every Frame
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Every photo in this gallery tells part of the ARENQ story —
                            from precision manufacturing to the people who make it happen.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-3 gap-6 mt-12">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl border border-gray-100 shadow-lg p-8 bg-white"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-[#0A528F]/10 flex items-center justify-center">
                                    <h.icon className="text-[#0A528F]" size={26} />
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-[#0A528F]">
                                    {h.title}
                                </h3>
                                <p className="mt-2 text-gray-500 leading-7">{h.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Video */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <span className="text-[#FFB600] font-semibold uppercase tracking-[3px]">
                            Featured Video
                        </span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Experience ARENQ
                        </h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                            Watch our latest manufacturing process, innovations and
                            advanced lithium battery technology.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative mt-12 overflow-hidden rounded-3xl shadow-2xl aspect-video bg-black"
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            controls
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                        >
                            <source
                                src="https://arenq.co.in/wp-content/uploads/2025/06/1-KAL-E-Cart-AD-2K-MP4.mp4"
                                type="video/mp4"
                            />
                        </video>

                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#0A528F] text-white rounded-full px-4 sm:px-5 py-2 flex items-center gap-2 text-sm sm:text-base">
                            <Play size={18} fill="white" />
                            Featured Video
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="pb-16 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center pt-16 sm:pt-24"
                    >
                        <span className="uppercase tracking-[4px] text-[#FFB600] font-semibold">
                            Our Collection
                        </span>
                        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A528F]">
                            Photo Gallery
                        </h2>
                        <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-7 sm:leading-8">
                            Browse our manufacturing facility, exhibitions, innovative
                            products and company events. Click any photo to view it in
                            full size.
                        </p>

                    </motion.div>

                    {/* Gallery Grid */}
                    <motion.div
                        layout
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16"
                    >
                        <AnimatePresence mode="popLayout">
                            {galleryData.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                                    onClick={() => setSelectedImage(item)}
                                    className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
                                >
                                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}


                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A528F]/90 via-[#0A528F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                                            <div className="p-5 sm:p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="inline-block bg-[#FFB600] text-black text-xs font-bold px-3 py-1 rounded-full">
                                                    {item.category}
                                                </span>
                                                <h3 className="mt-4 text-white text-xl sm:text-2xl font-bold">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ZoomIn size={18} className="text-[#0A528F]" />
                                        </div>
                                    </div>

                                    {/* <div className="p-5">
                                        <p className="text-gray-500 text-sm leading-6 line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div> */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="pb-16 sm:pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl bg-gray-50 border border-gray-100 p-8 sm:p-12 text-center relative"
                    >
                        <Quote className="mx-auto text-[#FFB600]" size={36} />
                        <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-8 italic">
                            Touring the ARENQ facility gave us complete confidence in
                            their manufacturing quality — every step, from cell assembly
                            to final testing, is handled with real precision.
                        </p>
                        <p className="mt-6 font-semibold text-[#0A528F]">
                            Partner, EV Fleet Operator
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="py-16 sm:py-24 bg-[#0A528F]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto px-4 sm:px-6 text-center"
                >
                    <span className="uppercase tracking-[4px] text-[#FFB600] font-semibold">
                        Explore More
                    </span>
                    <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        Innovation Through Every Frame
                    </h2>
                    <p className="mt-6 text-white/80 max-w-3xl mx-auto leading-7 sm:leading-8">
                        Every image reflects our commitment towards advanced battery
                        technology, quality manufacturing and sustainable energy
                        solutions.
                    </p>

                    <div className="mt-10 sm:mt-12 flex justify-center gap-4 sm:gap-5 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push("/contact-us")}
                            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FFB600] font-semibold text-black"
                        >
                            Contact Us
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => router.push("/search")}
                            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#0A528F] transition-colors duration-300"
                        >
                            Explore Products
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-5 right-5 sm:top-8 sm:right-8 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <X size={22} />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-4xl w-full"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black">
                                <img
                                    src={selectedImage.image}
                                    alt={selectedImage.title}

                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* <div className="mt-5 text-center">
                                <span className="inline-block bg-[#FFB600] text-black text-xs font-bold px-3 py-1 rounded-full">
                                    {selectedImage.category}
                                </span>
                                <h3 className="mt-3 text-white text-2xl font-bold">
                                    {selectedImage.title}
                                </h3>
                                <p className="mt-2 text-white/70 max-w-xl mx-auto">
                                    {selectedImage.description}
                                </p>
                            </div> */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}