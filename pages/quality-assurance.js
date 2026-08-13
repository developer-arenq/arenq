"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  PackageCheck,
  Factory,
  Gauge,
  BadgeCheck,
  Headphones,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* Brand
   Blue   #0A528F   C98 M64 Y4 K18
   Amber  #FFB600   C0 M34 Y100 K0
*/

const STAGES = [
  {
    code: "01",
    icon: PackageCheck,
    title: "Rigorous Component Sourcing",
    body: "We source only certified and verified components from trusted suppliers. Every part goes through material inspection, compliance validation, and electrical performance tests before it enters our production line.",
  },
  {
    code: "02",
    icon: Factory,
    title: "State-of-the-Art Manufacturing",
    body: "Our Pune facility runs on precision testing equipment and ISO-compliant protocol — visual and functional inspection, voltage and current flow tests, thermal stress and durability testing, BMS and firmware validation.",
  },
  {
    code: "03",
    icon: Gauge,
    title: "100% Product Testing",
    body: "Zero compromise. Every battery and inverter we manufacture is individually tested under real-world load — not batch sampled — for consistent performance and reduced risk of failure.",
  },
  {
    code: "04",
    icon: BadgeCheck,
    title: "Compliance with Global Standards",
    body: "Our products meet or exceed key national and international certifications, including BIS, CE, IEC standards, and MSDS/RoHS compliance.",
  },
  {
    code: "05",
    icon: Headphones,
    title: "After-Sales Quality Support",
    body: "Quality assurance doesn't end at delivery. Our team provides technical support for installation, performance monitoring where applicable, and responsive post-sale service and warranty handling.",
  },
  {
    code: "06",
    icon: ShieldCheck,
    title: "Why It Matters to You",
    body: "Reliability that never falters, durability built for Indian conditions, protection against overcharging, heating, and short circuits — backed by a company that puts quality before quantity.",
  },
];

const CERTS = ["BIS", "CE", "IEC", "RoHS / MSDS"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

function StageCard({ stage, index }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl border border-gray-100 bg-white shadow-lg p-7 overflow-hidden"
    >
      <span className="absolute top-6 right-7 text-4xl font-extrabold text-gray-50 group-hover:text-[#FFB600]/15 transition-colors select-none">
        {stage.code}
      </span>

      <div className="relative h-12 w-12 rounded-2xl bg-[#0A528F]/10 flex items-center justify-center mb-5 group-hover:bg-[#FFB600]/15 transition-colors">
        <Icon size={22} className="text-[#0A528F]" strokeWidth={1.75} />
      </div>

      <h3 className="relative font-bold text-[#0A528F] text-lg leading-snug mb-2">
        {stage.title}
      </h3>
      <p className="relative text-gray-600 text-sm leading-relaxed">{stage.body}</p>

      <div className="relative mt-5 h-1 w-10 rounded-full bg-[#FFB600] group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

export default function QualityAssurance() {
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
            <span className="text-[#FFB600] font-semibold">Quality Assurance</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Every unit, tested to{" "}
            <span className="text-[#FFB600]">never falter.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-5 max-w-xl text-white/85 leading-relaxed"
          >
            Arenq is a trusted brand for all your energy storage requirements, backed
            by 20 years of industry experience across Agriculture, Defence, and
            Petrochemical &amp; Refining.
          </motion.p>
        </div>
      </section>

      {/* Why Quality Matters */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_340px] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Why it matters
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Quality in clean energy
            </h2>
            <p className="mt-6 text-gray-600 leading-8">
              Sunlit Power manufactures and distributes the most efficient storage
              batteries across industries. We're the go-to partner for energy backup
              solutions — from the most basic requirement to the most sophisticated
              deployment — and we treat quality assurance as part of every stage of
              the product lifecycle, from design and sourcing to assembly, testing,
              and delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="rounded-3xl border border-gray-100 shadow-lg p-8 grid grid-cols-2 gap-x-8 gap-y-6"
          >
            {[
              ["20", "years experience"],
              ["100%", "units tested"],
              ["3+", "core industries"],
              ["4", "standards met"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-[#0A528F]">{value}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach + Stages */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Our approach
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Six checkpoints, one standard
            </h2>
            <p className="mt-4 text-gray-600 leading-7">
              QA is not an isolated department at Sunlit Power — it's built into
              every stage of our product lifecycle.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {STAGES.map((stage, i) => (
              <StageCard key={stage.code} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <span className="text-[#0A528F] font-semibold uppercase tracking-[3px] text-sm shrink-0">
            Certified to
          </span>
          <div className="flex flex-wrap gap-3">
            {CERTS.map((c) => (
              <span
                key={c}
                className="text-sm font-semibold px-5 py-2 rounded-full border border-[#0A528F]/20 text-[#0A528F] bg-[#0A528F]/5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters To You / CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Peace of mind
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F] mb-6">
              Choosing Sunlit Power means choosing
            </h2>
            <ul className="space-y-4">
              {[
                ["Reliability", "Your power never falters."],
                ["Durability", "Built to last, even in Indian conditions."],
                ["Safety", "Protected against overcharging, heating, and short circuits."],
                ["Peace of Mind", "Backed by a company that puts quality before quantity."],
              ].map(([label, desc]) => (
                <li key={label} className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-[#FFB600] mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-gray-600">
                    <strong className="text-[#0A528F]">{label}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-xl p-10 bg-gradient-to-br from-[#0A528F] to-[#083f6e]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,182,0,0.25),transparent_50%)]" />
            <div className="relative">
              <p className="text-white text-xl font-semibold leading-snug mb-6">
                Have a project that can't afford downtime? Let's talk about the
                right storage solution for it.
              </p>
              <button className="px-6 py-3 rounded-full bg-[#FFB600] text-[#0A528F] font-bold text-sm hover:opacity-90 transition-opacity">
                Get in touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}