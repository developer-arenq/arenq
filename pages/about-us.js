"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Home,
    ChevronRight,
    Lightbulb,
    Target,
    Heart,
    Zap,
    ShieldCheck,
    Users,
    Handshake,
    Sparkles,
} from "lucide-react";

const journey = [
    {
        year: "2021",
        title: "SUNLIT Established at Shahada (Nandurbar)",
        image: "/images/about/factory.webp",
    },
    {
        year: "2022",
        title: "Started Our Corporate Office In Pune",
        image: "/images/about/Old-pune-office.webp",
    },
    {
        year: "2022",
        title: "Tie up with LUCAS TVS & Developed Power Train For EV",
        image: "/images/about/Lucas-tvs-03.webp",
    },
    {
        year: "2022",
        title: "Association with KAL for Batteries and Vehicle",
        image: "/images/about/Kal-04.webp",
    },
    {
        year: "2023",
        title: "Joined Indigo for Batteries and Developed IOT",
        image: "/images/about/indigo-02.webp",
    },
    {
        year: "2023",
        title: "New Plant in Khed City Pune",
        image: "/images/about/2023-khed-plant.gif",
    },
    {
        year: "2024",
        title: "Expansion Arenq Head Office in Pune",
        image: "/images/about/2024-head-office.webp",
    },
    {
        year: "2024",
        title: "Cummins become a Marketing Partner",
        image: "/images/about/cummins-06-1.webp",
    },
    {
        year: "2024",
        title: "Started OEM Business with UNIK",
        image: "/images/about/unik-07.webp",
    },
    {
        year: "2025",
        title: "Signed Agreement with Hyasa E mobility for making of 70L vehicles",
        image: "/images/about/2025-Hayasa.webp",
    },
    {
        year: "2025",
        title: "Pan India Distribution Network Started",
        image: "/images/about/pan.jpg",
    },
    {
        year: "2025",
        title: "Second Plant Construction Started",
        image: "/images/about/165.webp",
    },
];

const achievements2024 = [
    "Partnering with MARU for Hybrid System",
    "Start supplying to MPEB",
    "OEM business started with AVIO",
    "Started sales of E cart in Kerala",
    "State approvals — Rajasthan, MH, MP, Chhattisgarh, Haryana — taken for KAL E-vehicles",
    "New distributor appointed in Churu, Rajasthan for E-rickshaw business",
];

const achievements2025 = [
    "Achievement of cracking Tata Power",
    "Signed Agreement with UDAN BMS Manufacturer for High-voltage systems",
];

const pillars = [
    {
        icon: Lightbulb,
        title: "Vision",
        text: "With the most advanced R&D facility, we look forward to coming up with innovative solutions to serve the world. Our young, passionate product development team — qualified from India's leading institutes — helps us deliver high-quality products for the global market, while our marketing team takes ARENQ to customers across the globe.",
    },
    {
        icon: Target,
        title: "Mission",
        text: "To become India's No.1 battery manufacturer and the most trusted exporter of energy storage solutions across the globe. Through continuous innovation, a skilled team, and a strong commitment to quality, we aim to power every industry — from mobility and infrastructure to homes and businesses.",
    },
    {
        icon: Heart,
        title: "Values",
        text: "Our values define who we are and guide everything we do — from product innovation to customer service. Every team member upholds the trust our clients place in us. We don't just create products — we build long-term partnerships based on reliability and shared progress.",
    },
];

const coreValues = [
    {
        num: "01",
        icon: Zap,
        title: "Innovation Driven",
        text: "We lead with R&D and invest in technologies that shape the future of energy storage.",
    },
    {
        num: "02",
        icon: ShieldCheck,
        title: "Quality First",
        text: "Every battery is built to meet the highest standards of safety, durability, and performance.",
    },
    {
        num: "03",
        icon: Users,
        title: "Customer-Centric Approach",
        text: "We design flexible, reliable solutions that meet real-world needs and exceed expectations.",
    },
    {
        num: "04",
        icon: Handshake,
        title: "Integrity & Trust",
        text: "We build strong, transparent relationships with our clients, partners, and team.",
    },
    {
        num: "05",
        icon: Sparkles,
        title: "Team Empowerment",
        text: "We grow together by nurturing talent, encouraging ownership, and working with passion.",
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

export default function About() {
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
                        <span className="text-[#FFAF00] font-semibold">About Us</span>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="show"
                        custom={1}
                        variants={fadeUp}
                        className="mt-6 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
                    >
                        We Are The Future Of{" "}
                        <span className="text-[#FFAF00]">
                            Electricity Storage Solutions
                        </span>
                    </motion.h1>
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="\images\about\person-using-ar-technology-perform-their-occupation-scaled.webp"
                            alt="Who we are at ARENQ"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Our Story
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Who We Are
                        </h2>
                        <p className="mt-5 text-gray-600 leading-8">
                            ARENQ is a trusted brand for all your energy storage
                            requirements. We bring 20 years of industry experience and
                            innovative technology to the table. ARENQ is your go-to
                            partner for all energy backup solutions, catering to
                            multiple industries including Agriculture, Defence,
                            Petrochemical and Refineries.
                        </p>
                        <p className="mt-4 text-gray-600 leading-8">
                            We manufacture and distribute the most efficient storage
                            batteries for all industries — your trusted brand for even
                            the most basic and the most sophisticated energy storage
                            solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Journey Timeline */}
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
                            Milestones
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Our Journey
                        </h2>
                    </motion.div>

                    <div className="relative mt-16">
                        {/* Vertical line */}
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#0A528F]/15 sm:-translate-x-1/2" />

                        <div className="space-y-10 sm:space-y-14">
                            {journey.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{
                                            opacity: 0,
                                            x: isEven ? -40 : 40,
                                        }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className={`relative flex flex-col sm:flex-row items-start gap-5 pl-12 sm:pl-0 ${isEven
                                                ? "sm:flex-row"
                                                : "sm:flex-row-reverse"
                                            }`}
                                    >
                                        {/* Dot */}
                                        <span className="absolute left-4 sm:left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[#FFAF00] ring-4 ring-white" />

                                        {/* Card */}
                                        <div className="sm:w-1/2 sm:px-8 w-full">
                                            <div
                                                className={`rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-100 ${isEven
                                                        ? "sm:ml-auto sm:mr-0"
                                                        : "sm:mr-auto sm:ml-0"
                                                    }`}
                                                style={{ maxWidth: "420px" }}
                                            >
                                                <div className="relative w-full aspect-video">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, 420px"
                                                        className="object-cover"
                                                        unoptimized={item.image.endsWith(".gif")}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <span className="inline-block bg-[#0A528F] text-white text-xs font-bold px-3 py-1 rounded-full">
                                                        {item.year}
                                                    </span>
                                                    <p className="mt-3 text-gray-700 font-medium leading-6">
                                                        {item.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Spacer for the other half on desktop */}
                                        <div className="hidden sm:block sm:w-1/2" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Achievements */}
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
                            Along The Way
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Similar Achievements in Our Journey
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mt-14">
                        {/* 2024 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="rounded-3xl border border-gray-100 shadow-lg p-8"
                        >
                            <span className="text-5xl font-bold text-[#0A528F]">
                                2024
                            </span>
                            <ul className="mt-6 space-y-4">
                                {achievements2024.map((a, i) => (
                                    <motion.li
                                        key={a}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        className="flex items-start gap-3 text-gray-600 leading-6"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FFAF00] flex-shrink-0" />
                                        {a}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 2025 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="rounded-3xl border border-gray-100 shadow-lg p-8"
                        >
                            <span className="text-5xl font-bold text-[#0A528F]">
                                2025
                            </span>
                            <ul className="mt-6 space-y-4">
                                {achievements2025.map((a, i) => (
                                    <motion.li
                                        key={a}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        className="flex items-start gap-3 text-gray-600 leading-6"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FFAF00] flex-shrink-0" />
                                        {a}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision / Mission / Values */}
            <section className="py-16 sm:py-24 bg-[#0A528F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((p, i) => (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8"
                            >
                                <div className="h-14 w-14 rounded-2xl bg-[#FFAF00]/20 flex items-center justify-center">
                                    <p.icon className="text-[#FFAF00]" size={26} />
                                </div>
                                <h3 className="mt-5 text-2xl font-bold text-white">
                                    {p.title}
                                </h3>
                                <p className="mt-3 text-white/75 leading-7">{p.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
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
                            What Drives Us
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Our Core Values
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
                        {coreValues.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl border border-gray-100 shadow-lg p-6 relative overflow-hidden"
                            >
                                <span className="absolute top-3 right-4 text-4xl font-extrabold text-gray-100">
                                    {v.num}
                                </span>
                                <div className="relative h-12 w-12 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">
                                    <v.icon className="text-[#0A528F]" size={22} />
                                </div>
                                <h3 className="relative mt-4 text-lg font-bold text-[#0A528F]">
                                    {v.title}
                                </h3>
                                <p className="relative mt-2 text-gray-500 text-sm leading-6">
                                    {v.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}