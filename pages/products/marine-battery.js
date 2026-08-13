"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Droplets,
  Lightbulb,
  Usb,
  Navigation,
  Smartphone,
  Fish,
  Sailboat,
  Ship,
  LifeBuoy,
  ArrowRight,
  FileDown,
} from "lucide-react";

const heroSlides = [
  "/images/products/Marine-scaled.webp",
  "/images/products/18789.webp",
];

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Long-Lasting Power",
    text: "Built using LiFePO₄ chemistry for superior safety, longer cycle life (3000+), and deep discharge support.",
  },
  {
    icon: Droplets,
    title: "Waterproof & Marine-Grade",
    text: "IP67-rated enclosure ideal for boats, ferries, and small marine crafts.",
  },
  {
    icon: Lightbulb,
    title: "Integrated Lighting",
    text: "Includes two 12W LED luminaries with IP67 waterproof protection, providing enhanced night visibility on the water.",
  },
  {
    icon: Usb,
    title: "Smart Charging Ports",
    text: "Comes with 2x Micro USB and 1x Small Pin port for easy charging of mobile phones, GPS units, and other portable devices.",
  },
  {
    icon: Navigation,
    title: "Advanced GPS with Geo-Fencing",
    text: "Features built-in GPS tracking and Geo-Fencing, compliant with AIS 140 navigation standards, ensuring traceability and security on the water.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Integration",
    text: "Access complete battery diagnostics via ARENQ's Bluetooth-enabled mobile app.",
  },
];

const whyChoose = [
  {
    title: "Built for the Water",
    text: "Designed with IP67-rated marine-grade enclosures, our batteries withstand splashes, humidity, and harsh offshore environments.",
  },
  {
    title: "Unmatched Safety & Longevity",
    text: "Using premium LiFePO₄ cells, ARENQ ensures over 3000+ charge cycles, deep discharge support, and zero fire risk — making it the safest choice for marine use.",
  },
  {
    title: "Smart, Connected, and Easy to Use",
    text: "Bluetooth-enabled diagnostics, GPS tracking, and real-time cloud sync let you monitor and manage your battery effortlessly from your mobile app.",
  },
  {
    title: "Multi-Utility Power Hub",
    text: "Beyond boat propulsion, it powers LED lights, charges mobile devices, and runs essential gear — ideal for all-in-one onboard use.",
  },
  {
    title: "Trusted Compliance",
    text: "Engineered to meet AIS 140 standards for marine navigation and geo-fencing, giving you regulatory confidence and security.",
  },
];

const applications = [
  { icon: Fish, title: "Fishing Boats" },
  { icon: Sailboat, title: "Small Marine Crafts" },
  { icon: Ship, title: "Ferries & Passenger Boats" },
  { icon: LifeBuoy, title: "Rescue & Patrol Units" },
];

const specs = [
  { param: "Battery Type", value: "LiFePO₄ (Lithium Iron Phosphate)" },
  { param: "Nominal Voltage", value: "12.8V" },
  { param: "Capacity", value: "42Ah" },
  { param: "Total Energy", value: "~537 Wh" },
  { param: "Cycle Life", value: "3000+ @ 80% DOD" },
  { param: "Enclosure Rating", value: "IP67 (marine-grade casing)" },
  { param: "LED Luminary", value: "2 × 12W (IP67 waterproof)" },
  { param: "USB Ports", value: "2 × Micro USB + 1 × Small Pin" },
  { param: "Connectivity", value: "Bluetooth, GPS, Cloud Sync" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function MarineBattery() {
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
            <span className="text-[#FFB600] font-semibold">Marine Battery</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Arenq Lithium Batteries for {" "}
            <span className="text-[#FFB600]">Marine Battery</span>
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
                  alt="Arenq Marine Battery"
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === slide
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
                Marine Battery
              </span>
            </div>

            <span className="mt-5 inline-block text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Marine Battery
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
              Reliable Power for Every Marine Journey
            </h1>

            <p className="mt-5 text-gray-600 leading-8">
              ARENQ offers a specialized{" "}
              <strong>12.8V 42Ah LiFePO₄ battery system</strong>,
              engineered for{" "}
              <strong>
                boats, marine vessels, and water-based operations
              </strong>
              . Designed for <strong>efficiency</strong>,{" "}
              <strong>safety</strong>, and{" "}
              <strong>connectivity</strong>, this package ensures
              uninterrupted performance — even in harsh marine
              environments.
            </p>

            <div className="mt-8">
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
                href="/images/brochure/Marine-Application.pdf"
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
              Built For The Water
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

      {/* Why Choose ARENQ */}
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
              The Advantage
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#0A528F]">
              Why Choose ARENQ Marine Batteries?
            </h2>
          </motion.div>

          <div className="space-y-4 mt-10">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[#FFAF00] flex-shrink-0" />
                <p className="text-gray-600 leading-7">
                  <span className="font-semibold text-[#0A528F]">
                    {item.title} –{" "}
                  </span>
                  {item.text}
                </p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
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
                    Value
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
            Ready to power your next voyage?
          </h2>
          <p className="mt-4 text-gray-500">
            Talk to our team about capacity, mounting, and
            connectivity options for your marine vessel.
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