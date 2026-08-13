"use client";

import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  ArrowRight,
  BatteryCharging,
  Sun,
  Atom,
  Gauge,
  CheckCircle2,
} from "lucide-react";

/* Brand
   Blue   #0A528F   C98 M64 Y4 K18
   Amber  #FFB600   C0 M34 Y100 K0
*/

const TECHS = [
  {
    id: "bess",
    num: "01",
    icon: BatteryCharging,
    title: "Battery Energy Storage Systems (BESS)",
    short:
      "Efficient solutions that store electrical energy for later use, helping manage power demand, improve reliability, and support renewable energy integration.",
    image: "/images/research/bess.webp",
    intro:
      "Battery Energy Storage Systems are crucial to balancing Variable Renewable Energy (VRE) like solar and wind. Our R&D team is building scalable BESS for both grid-level and commercial-scale deployment.",
    label: "ARENQ BESS Innovations",
    points: [
      "Modular lithium-based storage racks (Li-ion, LiFePO₄, LTO)",
      "AI-powered Energy Management Systems (EMS)",
      "Peak load shifting, frequency regulation & grid stability",
      "Cloud-based diagnostics and real-time monitoring",
    ],
    closing:
      "These systems ensure seamless energy supply, especially in areas with unstable grids or high VRE penetration.",
  },
  {
    id: "shps",
    num: "02",
    icon: Sun,
    title: "Solar Hybrid Power Systems",
    short:
      "Integrated systems that combine solar energy with batteries and/or grid power to ensure uninterrupted, efficient, and sustainable electricity supply.",
    image: "/images/research/solar-hybrid.webp",
    intro:
      "We are designing next-gen solar hybrid systems that combine solar PV, batteries, grid, and genset for reliable, around-the-clock power.",
    label: "Our R&D is focused on",
    points: [
      "Smart hybrid inverters with dynamic source switching",
      "Off-grid & on-grid solar + battery combinations",
      "AI-integrated controllers with consumption analytics",
      "Compact solutions for MSMEs, homes, and rural electrification",
    ],
    closing:
      "This makes solar power more dependable and usable even at night or during outages.",
  },
  {
    id: "Naion",
    num: "03",
    icon: Atom,
    title: "Sodium-ion Technology (Na-ion)",
    short:
      "An emerging battery innovation that uses sodium instead of lithium, offering a cost-effective, eco-friendly alternative for large-scale energy storage.",
    image: "/images/research/sodium-ion.webp",
    intro:
      "As lithium prices and resource constraints grow, sodium-ion batteries are emerging as a powerful alternative. Our R&D team is working on commercializing sodium-ion cells for affordable, large-scale energy storage.",
    label: "Key R&D Benefits",
    points: [
      "Abundant raw material (sodium) = lower cost",
      "Suitable for stationary energy storage",
      "Improved safety and thermal performance",
      "Comparable lifecycle for non-EV use cases",
    ],
    closing:
      "We see sodium as a game-changer for rural grids, telecom towers, and backup systems.",
  },
  {
    id: "LTO",
    num: "04",
    icon: Gauge,
    title: "Lithium Titanate (LTO) Technology",
    short:
      "A fast-charging, ultra-safe battery technology known for its exceptional cycle life, thermal stability, and performance in extreme conditions.",
    image: "/images/research/sodium-ion.webp",
    intro:
      "LTO batteries are known for ultra-fast charging, extreme safety, and high cycle life. ARENQ is integrating LTO into systems where speed and longevity are mission-critical.",
    label: "Our R&D is exploring",
    points: [
      "LTO for electric 2W/3W and hybrid EVs",
      "Industrial equipment with high-frequency charge cycles",
      "Public transport and military-grade power systems",
      "Life cycles beyond 15,000+ charges",
    ],
    closing:
      "With near-zero thermal runaway risk, LTO is ideal for fast-charging applications in hot Indian conditions.",
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

function OverviewCard({ tech, index }) {
  const Icon = tech.icon;
  return (
    <motion.a
      href={`#${tech.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-white flex flex-col"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={tech.image}
          alt={tech.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A528F]/70 via-[#0A528F]/10 to-transparent" />
        <span className="absolute top-4 left-4 text-2xl font-extrabold text-white/90">
          {tech.num}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="h-10 w-10 rounded-xl bg-[#0A528F]/10 flex items-center justify-center mb-4 group-hover:bg-[#FFB600]/15 transition-colors">
          <Icon size={18} className="text-[#0A528F]" strokeWidth={1.75} />
        </div>
        <h3 className="font-bold text-[#0A528F] leading-snug mb-2">{tech.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{tech.short}</p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0A528F]">
          <span>Learn more</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45"
          />
        </div>
      </div>
    </motion.a>
  );
}

function TechSection({ tech, index }) {
  const Icon = tech.icon;
  const reversed = index % 2 === 1;

  return (
    <section
      id={tech.id}
      className={`py-16 sm:py-24 scroll-mt-24 ${
        index % 2 === 1 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <img src={tech.image} alt={tech.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A528F]/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-6 text-5xl font-extrabold text-white/90">
              {tech.num}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="h-12 w-12 rounded-2xl bg-[#0A528F]/10 flex items-center justify-center mb-5">
              <Icon size={22} className="text-[#0A528F]" strokeWidth={1.75} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A528F] mb-4">
              {tech.title}
            </h2>
            <p className="text-gray-600 leading-7 mb-6">{tech.intro}</p>

            <p className="font-semibold text-[#0A528F] text-sm uppercase tracking-wide mb-3">
              {tech.label}
            </p>
            <ul className="space-y-3 mb-6">
              {tech.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[#FFB600] mt-0.5 shrink-0"
                    strokeWidth={2}
                  />
                  <span className="text-gray-600 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 leading-7 text-sm border-l-2 border-[#FFB600] pl-4">
              {tech.closing}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ResearchDevelopment() {
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
            <span className="text-[#FFB600] font-semibold">Research &amp; Development</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Research &amp; Development{" "}
            <span className="text-[#FFB600]">at ARENQ</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-5 max-w-xl text-white/85 leading-relaxed"
          >
            At ARENQ, we don't just build batteries — we engineer energy intelligence.
            Our R&amp;D division is at the forefront of next-generation energy
            storage, actively developing advanced solutions in:
          </motion.p>
        </div>
      </section>

      {/* Overview cards */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHS.map((tech, i) => (
              <OverviewCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed sections */}
      {TECHS.map((tech, i) => (
        <TechSection key={tech.id} tech={tech} index={i} />
      ))}

      {/* Closing CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-xl p-10 sm:p-14 bg-gradient-to-br from-[#0A528F] to-[#083f6e] text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,182,0,0.25),transparent_50%)]" />
            <div className="relative max-w-2xl mx-auto">
              <p className="text-white text-xl sm:text-2xl font-semibold leading-snug mb-6">
                Building the next generation of energy storage takes the right
                partner. Let's talk about where ARENQ's R&amp;D can plug into your
                project.
              </p>
              <button className="px-7 py-3 rounded-full bg-[#FFB600] text-[#0A528F] font-bold text-sm hover:opacity-90 transition-opacity">
                Get in touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}