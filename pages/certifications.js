"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    ChevronRight,
    Award,
    ShieldCheck,
    Globe2,
    BadgeCheck,
    X,
    ZoomIn,
} from "lucide-react";


// NOTE: the source page only provided certificate images, no names/issuing
// bodies. Replace the "title" values below with the real certification
// names (e.g. "ISO 9001:2015", "CE Certification") when available.
const certifications = [
    {
        id: 1,
        title: "Certification 01",
        image: "/images/certificate/Certification-1.webp",
    },
    {
        id: 2,
        title: "Certification 02",
        image: "/images/certificate/Certification-2.webp",
    },
    {
        id: 3,
        title: "Certification 03",
        image: "/images/certificate/Certification-3.webp",
    },
    {
        id: 4,
        title: "Certification 04",
        image: "/images/certificate/Certification-4.webp",
    },
    {
        id: 5,
        title: "Certification 05",
        image: "/images/certificate/Certification-5.webp",
    },
    {
        id: 6,
        title: "Certification 06",
        image: "/images/certificate/Certification-6.webp",
    },
    {
        id: 7,
        title: "Certification 07",
        image: "/images/certificate/Certification-7.webp",
    },
];

const whyItMatters = [
    {
        icon: ShieldCheck,
        title: "Assured Quality",
        text: "Every certification reflects rigorous testing and consistent manufacturing standards across our product range.",
    },
    {
        icon: Globe2,
        title: "Global Standards",
        text: "Our processes align with internationally recognized benchmarks, making ARENQ products export-ready.",
    },
    {
        icon: BadgeCheck,
        title: "Verified Compliance",
        text: "Independent audits confirm our adherence to safety, environmental, and performance regulations.",
    },
    {
        icon: Award,
        title: "Industry Trust",
        text: "Certifications give our partners and customers confidence in every battery that leaves our facility.",
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

export default function Certifications() {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (selected) {
            document.body.style.overflow = "hidden";
            const handleKey = (e) => e.key === "Escape" && setSelected(null);
            window.addEventListener("keydown", handleKey);
            return () => {
                document.body.style.overflow = "auto";
                window.removeEventListener("keydown", handleKey);
            };
        }
    }, [selected]);

    // Duplicate list for a seamless marquee loop
    const marqueeItems = [...certifications, ...certifications];

    return (
        <main className="bg-white overflow-x-hidden">
            {/* Hero + Breadcrumb */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A528F] via-[#0A528F] to-[#083f6e]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,175,0,0.25),transparent_50%)]" />

                <motion.div
                    className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#FFAF00]/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeUp}
                        className="flex items-center gap-2 text-white/80 text-sm"
                    >
                        <Home size={16} />
                        <span>Home</span>
                        <ChevronRight size={16} />
                        <span className="text-[#FFAF00] font-semibold">
                            Our Certifications
                        </span>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="show"
                        custom={1}
                        variants={fadeUp}
                        className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
                    >
                        Our{" "}
                        <span className="text-[#FFAF00]">Certifications</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="show"
                        custom={2}
                        variants={fadeUp}
                        className="mt-5 max-w-xl text-base sm:text-lg text-white/80 leading-7"
                    >
                        Backed by recognized quality, safety, and compliance
                        standards — proof of the trust and precision behind every
                        ARENQ battery.
                    </motion.p>
                </div>
            </section>

            {/* Auto-scrolling marquee of certification logos */}
            <section className="py-14 sm:py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-sm uppercase tracking-[3px] text-gray-400 font-semibold mb-10"
                    >
                        Recognized & Certified
                    </motion.p>

                    <div className="relative overflow-hidden">
                        {/* Fade edges */}
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

                        <motion.div
                            className="flex gap-8 sm:gap-12 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 22,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {marqueeItems.map((cert, i) => (
                                <div
                                    key={`${cert.id}-${i}`}
                                    className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 rounded-2xl border border-gray-100 shadow-sm bg-white p-3"
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="120px"
                                        className="object-contain p-2"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Certifications Matter */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Why It Matters
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Certified Quality, Every Step
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Each certification represents a commitment we take
                            seriously — from raw material sourcing to the battery
                            that reaches your hands.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                        {whyItMatters.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl bg-white border border-gray-100 shadow-lg p-6"
                            >
                                <div className="h-12 w-12 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">
                                    <item.icon className="text-[#0A528F]" size={22} />
                                </div>
                                <h3 className="mt-4 font-bold text-[#0A528F]">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-gray-500 text-sm leading-6">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificate Grid */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            View & Verify
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Our Certificates
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Click any certificate to view it in full size.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                onClick={() => setSelected(cert)}
                                className="group cursor-pointer rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden bg-white"
                            >
                                <div className="relative aspect-square bg-gray-50">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ZoomIn size={16} className="text-[#0A528F]" />
                                    </div>
                                </div>
                                <div className="p-4 text-center border-t border-gray-100">
                                    <p className="font-semibold text-[#0A528F] text-sm">
                                        {cert.title}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <section className="py-16 sm:py-20 bg-[#0A528F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: `${certifications.length}+`, label: "Certifications" },
                            { value: "20+", label: "Years Experience" },
                            { value: "100%", label: "Compliance Focus" },
                            { value: "Global", label: "Standards Aligned" },
                        ].map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <p className="text-3xl sm:text-4xl font-bold text-[#FFAF00]">
                                    {s.value}
                                </p>
                                <p className="mt-2 text-white/80 text-sm sm:text-base">
                                    {s.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A528F]">
                        Need a copy of any certificate for compliance review?
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                        Reach out to our team and we'll share verified documentation
                        for procurement, audits, or partnership requirements.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-8 px-8 py-4 rounded-full bg-[#0A528F] font-semibold text-white"
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setSelected(null)}
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
                            className="max-w-xl w-full"
                        >
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white">
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    fill
                                    sizes="90vw"
                                    className="object-contain p-6"
                                />
                            </div>
                            <p className="mt-4 text-center text-white font-semibold">
                                {selected.title}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}