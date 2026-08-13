"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    ChevronRight,
    FlaskConical,
    Zap,
    ShieldCheck,
    Repeat,
    Cpu,
    Thermometer,
    Settings2,
    ShieldAlert,
    MonitorCog,
    BatteryCharging,
    FileDown,
    ArrowRight,
} from "lucide-react";

const heroSlides = [
    "/images/products/Products-Shoot-15-scaled.webp",
    "/images/products/Powe-Sector-Batter-1-scaled.webp",
    "/images/products/8350.webp",
];

const features = [
    {
        icon: FlaskConical,
        title: "Tested in NABL-Accredited Labs",
        text: "All battery models undergo rigorous performance and safety validation from government-recognized test facilities.",
    },
    {
        icon: Zap,
        title: "Instant Power Backup",
        text: "Ensures continuous operation of critical substation equipment like relays, SCADA systems, and emergency lighting.",
    },
    {
        icon: ShieldCheck,
        title: "High Reliability & Low Maintenance",
        text: "No electrolyte checks or water topping — designed for long unattended service.",
    },
    {
        icon: Repeat,
        title: "Long Cycle Life",
        text: "Over 3000–5000 cycles even under demanding usage profiles.",
    },
    {
        icon: Cpu,
        title: "Smart Battery Management System (BMS)",
        text: "Monitors voltage, temperature, current, and provides advanced protection with CAN/RS485 communication.",
    },
    {
        icon: Thermometer,
        title: "Wider Temperature Tolerance",
        text: "Performs reliably in harsh environments — from remote substations to high-heat zones.",
    },
];

const integration = [
    "Rack-mounted or cabinet-integrated battery systems",
    "Built-in DC output breakers, alarms, and indicators",
    "Remote monitoring & diagnostics",
    "Field support & service packages",
];

const applications = [
    { icon: Zap, title: "11kV / 33kV / 66kV / 132kV Substations" },
    { icon: Settings2, title: "Control Panels and Switchgear" },
    { icon: ShieldAlert, title: "Protection Relays" },
    { icon: MonitorCog, title: "SCADA and Automation Systems" },
    { icon: BatteryCharging, title: "Battery Banks for Emergency Systems" },
];

const specs = [
    { param: "Chemistry", value: "Lithium Iron Phosphate (LiFePO₄)" },
    { param: "Voltage Range", value: "24V / 48V / 72V / 96V / 120V / 384V / 480V" },
    { param: "Capacity Range", value: "50Ah to 400Ah+" },
    { param: "Cycle Life", value: "3000 – 5000+ Cycles" },
    { param: "Communication", value: "CAN, RS485, Modbus" },
    { param: "Certifications", value: "ISO 9001, ISO 14001, NABL-Accredited Labs test certificate" },
    { param: "Warranty", value: "Up to 5 Years*" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
};

export default function PowerSectorBattery() {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((prev) => (prev + 1) % heroSlides.length);
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="bg-white overflow-x-hidden">
               {/* Hero + Breadcrumb */}
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
                      <span>Product</span>
                      <ChevronRight size={16} />
                      <span className="text-[#FFB600] font-semibold">Power Sector Battery</span>
                    </motion.div>
          
                    <motion.h1
                      initial="hidden"
                      animate="show"
                      custom={1}
                      variants={fadeUp}
                      className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
                    >
                      Arenq Lithium Batteries for {" "}
                      <span className="text-[#FFB600]">Power Sector Battery</span>
                    </motion.h1>
          
          
                  </div>
                </section>
            {/* Hero */}
            <section className="py-16 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image slider */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-50"
                    >
                        <AnimatePresence mode="sync">
                            <motion.div
                                key={heroSlides[slide]}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={heroSlides[slide]}
                                    alt="Arenq Power Sector Battery"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
                            {heroSlides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSlide(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === slide
                                            ? "w-6 bg-[#FFAF00]"
                                            : "w-1.5 bg-white/70 hover:bg-white"
                                    }`}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Home size={14} />
                            <span>Home</span>
                            <ChevronRight size={14} />
                            <span>Products</span>
                            <ChevronRight size={14} />
                            <span className="text-[#0A528F] font-semibold">
                                Power Sector Battery
                            </span>
                        </div>

                        <span className="mt-5 inline-block text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Power Sector Battery
                        </span>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
                            Arenq Lithium Batteries for Substation Backup
                            Applications
                        </h1>

                        <p className="mt-5 text-[#0A528F] font-semibold">
                            Reliable Power for Critical Infrastructure
                        </p>
                        <p className="mt-3 text-gray-600 leading-8">
                            <strong>Arenq</strong>, a trusted brand by{" "}
                            <strong>Sunlit Power Pvt. Ltd.</strong>, offers
                            advanced{" "}
                            <strong>
                                Lithium Iron Phosphate (LiFePO₄) battery
                                solutions
                            </strong>{" "}
                            specially engineered for{" "}
                            <strong>power substations</strong> and{" "}
                            <strong>switchgear backup systems</strong>. These
                            batteries are designed to ensure{" "}
                            <strong>uninterrupted DC power</strong> to
                            protection relays, breakers, and automation
                            systems — guaranteeing operational safety and grid
                            reliability.
                        </p>
                        <p className="mt-4 text-gray-600 leading-8">
                            Tested in <strong>NABL-accredited laboratories</strong>{" "}
                            standards, Arenq batteries deliver trusted
                            performance for substations, control panels, and
                            grid automation systems across India.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-6">
                            <motion.a
                                href="/contact-us/"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-2 rounded-full font-semibold text-white shadow-lg"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to right, #104B8C 0%, #0370DF 51%, #FFAF00 100%)",
                                    backgroundSize: "200% auto",
                                }}
                            >
                                Enquire Now
                                <ArrowRight size={18} />
                            </motion.a>

                            <a
                                href="/images/brochure/Power-Sector-Batteries.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#0A528F] font-semibold hover:text-[#FFAF00] transition-colors"
                            >
                                <FileDown size={20} />
                                Download Brochure
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-xl mx-auto"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Grid-Grade Reliability
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Features
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl bg-white border border-gray-100 shadow-lg p-6"
                            >
                                <div className="h-12 w-12 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">
                                    <f.icon className="text-[#0A528F]" size={22} />
                                </div>
                                <h3 className="mt-4 font-bold text-[#0A528F]">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-gray-500 text-sm leading-6">
                                    {f.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customization & Integration */}
            <section className="py-16 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Complete Solutions
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#0A528F]">
                            Customization & Integration
                        </h2>
                        <p className="mt-4 text-gray-500">
                            We provide complete battery solutions including:
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-10">
                        {integration.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                            >
                                <span className="mt-1.5 h-2 w-2 rounded-full bg-[#FFAF00] flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications */}
            <section className="py-16 sm:py-24 bg-[#0A528F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-xl mx-auto"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Where It's Used
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
                            Applications in Power & Utility Sector
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
                        {applications.map((a, i) => (
                            <motion.div
                                key={a.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-center"
                            >
                                <div className="mx-auto h-14 w-14 rounded-2xl bg-[#FFAF00]/20 flex items-center justify-center">
                                    <a.icon className="text-[#FFAF00]" size={26} />
                                </div>
                                <p className="mt-4 text-white font-semibold text-sm leading-6">
                                    {a.title}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specifications */}
            <section className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            Tech Specs
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Specifications
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-10 overflow-hidden rounded-2xl border border-gray-200 shadow-lg"
                    >
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#0A528F]">
                                    <th className="text-white font-semibold px-5 py-4 text-sm sm:text-base">
                                        Parameter
                                    </th>
                                    <th className="text-white font-semibold px-5 py-4 text-sm sm:text-base">
                                        Specification
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {specs.map((row, i) => (
                                    <tr
                                        key={row.param}
                                        className={
                                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }
                                    >
                                        <td className="px-5 py-4 text-gray-700 font-medium text-sm sm:text-base border-t border-gray-100">
                                            {row.param}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 text-sm sm:text-base border-t border-gray-100">
                                            {row.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-24 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A528F]">
                        Securing critical infrastructure power?
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Talk to our team about voltage, capacity, and
                        integration options for your substation or control
                        room.
                    </p>
                    <motion.a
                        href="/contact-us/"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-8 inline-flex items-center gap-2 px-8 py-2 rounded-full font-semibold text-white shadow-lg"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, #104B8C 0%, #0370DF 51%, #FFAF00 100%)",
                            backgroundSize: "200% auto",
                        }}
                    >
                        Enquire Now
                        <ArrowRight size={18} />
                    </motion.a>
                </motion.div>
            </section>
        </main>
    );
}