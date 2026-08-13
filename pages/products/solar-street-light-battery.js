"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  Zap,
  ShieldCheck,
  Sun,
  BatteryCharging,
  Wrench,
  Clock,
  CloudSun,
  Lightbulb,
  Factory,
  Route,
  TreePine,
  CarFront,
  FileDown,
  ArrowRight,
} from "lucide-react";

const heroSlides = [
  "/images/products/Solar-Stree-5.webp",
  "/images/products/Solar-Stree-4.webp",
  "/images/products/13634.webp",
];

const features = [
  {
    icon: Zap,
    title: "High Efficiency Storage",
    text: "Charges quickly during the day and powers lights for 12–16 hours reliably.",
  },
  {
    icon: Sun,
    title: "Solar-Compatible",
    text: "Works seamlessly with standard solar panels and charge controllers (PWM/MPPT).",
  },
  {
    icon: Wrench,
    title: "Zero Maintenance",
    text: "No electrolyte checks, acid leaks, or topping up required.",
  },
  {
    icon: Clock,
    title: "Longer Life",
    text: "Delivers 2000–3000+ charge cycles, outlasting lead-acid by 3–5x.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in BMS",
    text: "Protects against overcharging, deep discharge, short circuits, and thermal faults.",
  },
  {
    icon: CloudSun,
    title: "Weatherproof & Durable",
    text: "Performs in rain, heat, and freezing temperatures—ideal for outdoor conditions.",
  },
];

const applications = [
  {
    icon: Lightbulb,
    title: "Solar LED Street Lights",
  },
  {
    icon: Factory,
    title: "Campus & Industrial Lighting",
  },
  {
    icon: Route,
    title: "Highway & Rural Road Illumination",
  },
  {
    icon: TreePine,
    title: "Solar Garden & Pathway Lighting",
  },
  {
    icon: CarFront,
    title: "Parking Lot & Fence Lighting",
  },
];

const specs = [
  {
    param: "Battery Type",
    value: "LiFePO₄ (Lithium Iron Phosphate)",
  },
  {
    param: "Voltage Options",
    value: "12.8V / 25.6V",
  },
  {
    param: "Capacity Range",
    value: "6Ah – 100Ah",
  },
  {
    param: "Backup Duration",
    value: "12 to 16 hours (based on load & rating)",
  },
  {
    param: "Cycle Life",
    value: "2000–3000+ cycles",
  },
  {
    param: "Protection",
    value: "BMS (OVP, UVP, SCP, OTP, etc.)",
  },
  {
    param: "Enclosure Rating",
    value: "IP65 / IP67 (optional)",
  },
  {
    param: "Warranty",
    value: "Up to 3 Years*",
  },
];

export default function SolarStreetLightBattery() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A528F] via-[#0A528F] to-[#083f6e]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,182,0,0.25),transparent_50%)]" />

        <motion.div
          className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#FFB600]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-white/80 text-sm"
          >
            <Home size={16} />
            <span>Home</span>

            <ChevronRight size={16} />

            <span>Products</span>

            <ChevronRight size={16} />

            <span className="text-[#FFB600] font-semibold">
              Solar Street Light Battery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Arenq Lithium Batteries for{" "}
            <span className="text-[#FFB600]">
              Solar Street Lights
            </span>
          </motion.h1>

        </div>
      </section>


      {/* =====================================================
          PRODUCT SECTION
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE SLIDER */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gray-50"
          >

            <AnimatePresence mode="sync">

              <motion.div
                key={heroSlides[slide]}
                initial={{
                  opacity: 0,
                  scale: 1.05,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >

                <Image
                  src={heroSlides[slide]}
                  alt="Arenq Solar Street Light Battery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

              </motion.div>

            </AnimatePresence>


            {/* Dots */}

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


          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >

            <div className="flex items-center gap-2 text-gray-400 text-sm">

              <Home size={14} />

              <span>Home</span>

              <ChevronRight size={14} />

              <span>Products</span>

              <ChevronRight size={14} />

              <span className="text-[#0A528F] font-semibold">
                Solar Street Light Battery
              </span>

            </div>


            <span className="mt-5 inline-block text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Solar Street Light Battery
            </span>


            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
              Arenq Lithium Batteries for Solar Street Lights
            </h2>


            <p className="mt-5 text-gray-600 leading-8">

              <strong>Arenq</strong>, from{" "}
              <strong>Sunlit Power Pvt. Ltd.</strong>, offers high-efficiency{" "}
              <strong>
                Lithium Iron Phosphate (LiFePO₄) batteries
              </strong>{" "}
              specially developed for{" "}
              <strong>solar street lighting systems</strong>.

            </p>

            <p className="mt-4 text-gray-600 leading-8">

              These batteries are designed to store solar energy during the
              day and provide consistent, reliable lighting through the night—
              ensuring safety, visibility, and sustainability in urban, rural,
              and remote areas.

            </p>

            <p className="mt-4 text-gray-600 leading-8">

              Compact, lightweight, and{" "}
              <strong>maintenance-free</strong>, Arenq solar batteries are the
              ideal replacement for bulky lead-acid systems and are fully
              compatible with modern MPPT and PWM solar charge controllers.

            </p>


            {/* BUTTONS */}

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
                href="/images/brochure/Solar-Street-Light.pdf"
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


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Built For Outdoor Solar Lighting
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Features
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

            {features.map((feature, i) => {

              const Icon = feature.icon;

              return (

                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl bg-white border border-gray-100 shadow-lg p-6"
                >

                  <div className="h-12 w-12 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">

                    <Icon
                      size={23}
                      className="text-[#0A528F]"
                    />

                  </div>

                  <h3 className="mt-4 font-bold text-[#0A528F]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-gray-500 text-sm leading-6">
                    {feature.text}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY ARENQ
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Reliable Solar Storage
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Why Choose Arenq?
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">

            {[
              {
                icon: BatteryCharging,
                title: "High Efficiency",
                text: "Efficiently stores solar energy during the day for dependable night-time lighting.",
              },
              {
                icon: Sun,
                title: "Solar Ready",
                text: "Compatible with PWM and MPPT solar charge controllers.",
              },
              {
                icon: Wrench,
                title: "Maintenance-Free",
                text: "No electrolyte checks, acid leaks, or topping up required.",
              },
              {
                icon: Clock,
                title: "Long Life",
                text: "2000–3000+ charge cycles for long-term outdoor lighting applications.",
              },
              {
                icon: ShieldCheck,
                title: "Smart Protection",
                text: "Built-in BMS protects against OVP, UVP, SCP and OTP.",
              },
              {
                icon: CloudSun,
                title: "Outdoor Ready",
                text: "Designed for demanding outdoor weather conditions.",
              },
            ].map((item, i) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-2xl border border-gray-100 bg-white shadow-md p-6"
                >

                  <div className="h-11 w-11 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">

                    <Icon
                      size={21}
                      className="text-[#0A528F]"
                    />

                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#0A528F]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 leading-6">
                    {item.text}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLICATIONS
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-[#0A528F]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Applications
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Solar Lighting Applications
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-14">

            {applications.map((application, i) => {

              const Icon = application.icon;

              return (

                <motion.div
                  key={application.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md p-6 text-center"
                >

                  <div className="mx-auto h-14 w-14 rounded-2xl bg-[#FFAF00]/20 flex items-center justify-center">

                    <Icon
                      size={26}
                      className="text-[#FFAF00]"
                    />

                  </div>

                  <h3 className="mt-5 text-white font-semibold text-sm leading-6">
                    {application.title}
                  </h3>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          SPECIFICATIONS
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Technical Data
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Technical Specifications
            </h2>

          </motion.div>


          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg"
          >

            <table className="w-full min-w-[650px] border-collapse">

              <thead>

                <tr className="bg-[#0370DF]">

                  <th className="px-6 py-4 text-left text-white font-semibold border border-white/20">
                    Parameter
                  </th>

                  <th className="px-6 py-4 text-left text-white font-semibold border border-white/20">
                    Specification
                  </th>

                </tr>

              </thead>


              <tbody>

                {specs.map((spec, i) => (

                  <tr
                    key={spec.param}
                    className={
                      i % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >

                    <td className="px-6 py-4 font-semibold text-gray-700 border border-gray-200">
                      {spec.param}
                    </td>

                    <td className="px-6 py-4 text-gray-600 border border-gray-200">
                      {spec.value}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-gray-50">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >

          <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
            Smart Solar Lighting
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#0A528F]">
            Power Your Solar Street Lights with Arenq
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            Reliable LiFePO₄ energy storage designed for efficient,
            maintenance-free outdoor lighting.
          </p>


          <motion.a
            href="/contact-us/"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
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