"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ChevronRight, X, Phone, Mail } from "lucide-react";

const founder = {
    name: "Shyam Manohar Nayak",
    role: "Founder & Chairman",
    tagline: "Visionary And Dynamic Leadership",
    image: "/images/Visionaries/Shyam-Manohar-Nayak.webp",
    bio: [
        "Shyam Manohar Nayak, a visionary entrepreneur and industry pioneer, has been instrumental in transforming Maharashtra's electrical landscape. With a deep-rooted passion for sustainable energy and innovation, he laid the foundation for Sunlit Power, a company committed to delivering next-generation energy solutions that empower businesses and communities alike.",
        "Under his leadership, Sunlit Power has grown into a symbol of quality, trust, and progress — pushing boundaries in battery technology, solar integration, and green infrastructure. Beyond his business ventures, Mr. Nayak is a dedicated mentor, guiding young professionals and startups in the energy space.",
        "His journey reflects a perfect blend of entrepreneurial spirit, technological foresight, and community commitment.",
    ],
};


const directors = [
    {
        name: "Jitendra Patil",
        role: "Managing Director",
        image: "/images/Visionaries/team-01.webp",
        bio: "Jitendra Patil transitioned from engineer to Sunlit Power's visionary leader, pioneering in lithium batteries and the EV market under his mentor, Mr. Nayak, with a strong focus on sustainability, collaboration, and community enrichment.",
    },
    {
        name: "Akash Kumar Nayak",
        role: "Director",
        image: "/images/Visionaries/team-07.webp",
        bio: "Akash Kumar Nayak, inheriting his father's legacy, leads Sunlit Power with a blend of technical innovation and strategic insight, driving product excellence and brand growth while fostering a collaborative culture and personal development within the team.",
    },
];

const coreLeadership = [
    {
        name: "Avnish Arora",
        role: "Consultant Project",
        image: "/images/Visionaries/staf-19.webp",
        bio: "A seasoned Engineering professional with 25 years of experience in the battery industry, covering all electrochemistries like lead acid, lithium-ion, and silver zinc. Awarded the ARCH of Excellence Telecom Award at the All India Achievers Conference in 2008 for outstanding contribution.",
    },
    {
        name: "Mangesh Mhaskar",
        role: "Business Head",
        image: "/images/Visionaries/team-04.webp",
        bio: "Mangesh Mhaskar, Business Head at Sunlit Power, embodies the power of combining technical proficiency with sales acumen. An electrical engineer by profession, he leverages his 22 years of experience in the industry to spearhead Sunlit's sales growth and customer satisfaction.",
    },
    {
        name: "Vinayak Mahajan",
        role: "HR & Accounts Head",
        image: "/images/Visionaries/team-06.webp",
        bio: "Vinayak Mahajan, HR & Accounts Head at Sunlit Power, embodies the strategic expertise and dedication that drive a company's most valuable asset: its people. With a powerful combination of HR and accounts expertise, he stands as a pillar of strength in building a high-performing and engaged workforce for Sunlit Power.",
    },
    {
        name: "Sandip Sonawane",
        role: "Plant Head",
        image: "/images/Visionaries/team-02.webp",
        bio: "A results-driven Operations Leader with hands-on expertise in Lead Acid Battery, Lithium Battery, and EV Manufacturing. An Electrical Engineer overseeing end-to-end plant functions, driving quality, productivity, and safety through lean practices like QCC, Kaizen, 5S, and JIT — with 22 years of experience.",
    },
    // {
    //     name: "Naresh Arora",
    //     role: "Marketing Director",
    //     image: "/images/Visionaries/team-02.webp",
    //     bio: "A results-driven Operations Leader and Electrical Engineer with 22 years of experience across Lead Acid Battery, Lithium Battery, and EV Manufacturing. Experienced in overseeing end-to-end plant operations, driving quality, productivity, and safety through lean manufacturing practices including QCC, Kaizen, 5S, and JIT."
    // },
    // {
    //     name: "Amol Chaudhary",
    //     role: "Production Manager",
    //     image: "/images/Visionaries/team-03.webp",
    //     bio: "Amol Chaudhary, the Production Manager at Sunlit Power, embodies the power of blending technical expertise with strong leadership. An electrical and electronics engineer with 14 years of experience, he brings invaluable knowledge and hands-on skills to the forefront of Sunlit's manufacturing operations.",
    // },
    // {
    //     name: "Manoj Sundaram",
    //     role: "Vice President of Sales & Marketing",
    //     image: "/images/Visionaries/tean-05.webp",
    //     bio: "Manoj Sundaram, Vice President of Sales and Marketing at Sunlit Power, embodies the power of blending global experience, technical expertise, and visionary leadership. With 20 years at leading multinationals like Enertec, Alfa, and Outback, he has honed his skills across diverse geographical markets and complex industry landscapes.",
    // },
    // {
    //     name: "Pankaj Bagadi",
    //     role: "Digital Marketing Manager",
    //     image: "/images/Visionaries/team-08.webp",
    //     bio: "Pankaj Bagadi is a seasoned Digital Marketing Expert known for driving brand visibility and online growth. His creative vision and technical know-how help build powerful digital experiences that reflect Sunlit's commitment to innovation and sustainability.",
    // },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
};

function ProfileCard({ person, index, onClick }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={onClick}
            className="group cursor-pointer text-center"
        >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <img
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A528F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-semibold tracking-wide">
                        View Profile
                    </span>
                </div>
            </div>
            <h3 className="mt-4 font-bold text-[#0A528F]">{person.name}</h3>
            <p className="text-gray-500 text-sm">{person.role}</p>
        </motion.div>
    );
}

export default function Leadership() {
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
                            Our Leadership
                        </span>
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="show"
                        custom={1}
                        variants={fadeUp}
                        className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
                    >
                        The Visionaries Behind{" "}
                        <span className="text-[#FFAF00]">Sunlit Power</span>
                    </motion.h1>
                </div>
            </section>

            {/* Founder Spotlight */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[380px_1fr] gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative aspect-[331/425] rounded-3xl overflow-hidden shadow-2xl mx-auto lg:mx-0 w-full max-w-sm"
                    >
                        <div className="relative w-full h-[520px] overflow-hidden rounded-[30px]">
                            <img
                                src={founder.image}
                                alt={founder.name}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0A528F]">
                            {founder.name}
                        </h2>
                        <p className="mt-1 text-[#FFAF00] font-semibold">
                            {founder.role}
                        </p>
                        <p className="mt-1 text-gray-500 italic">{founder.tagline}</p>

                        <div className="mt-6 space-y-4">
                            {founder.bio.map((p, i) => (
                                <p key={i} className="text-gray-600 leading-8">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Directors */}
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
                            Leading The Way
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Directors
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-14 max-w-3xl mx-auto">
                        {directors.map((d, i) => (
                            <ProfileCard
                                key={d.name}
                                person={d}
                                index={i}
                                onClick={() => setSelected(d)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Leadership */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-xl mx-auto"
                    >
                        <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
                            The Team
                        </span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
                            Core Leadership
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-14">
                        {coreLeadership.map((p, i) => (
                            <ProfileCard
                                key={p.name}
                                person={p}
                                index={i}
                                onClick={() => setSelected(p)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Profile Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:p-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#0A528F] shadow-md z-10"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                                <img
                                    src={selected.image}
                                    alt={selected.name}
                                    fill
                                    sizes="90vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                <h3 className="text-2xl font-bold text-[#0A528F]">
                                    {selected.name}
                                </h3>
                                <p className="text-[#FFAF00] font-semibold mt-1">
                                    {selected.role}
                                </p>
                                <p className="mt-4 text-gray-600 leading-7">
                                    {selected.bio}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500 border-t border-gray-100 pt-5">
                                    <span className="flex items-center gap-2">
                                        <Phone size={16} className="text-[#0A528F]" />
                                        Not available
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Mail size={16} className="text-[#0A528F]" />
                                        Not available
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}