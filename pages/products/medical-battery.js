"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
  BatteryCharging,
  Thermometer,
  Stethoscope,
  Wind,
  Syringe,
  Monitor,
  ArrowRight,
  FileDown,
  Cable,
  Factory,
  Zap,
} from "lucide-react";

const heroSlides = [
  "/images/products/Telecom-Batteries-scaled.webp",
  "/images/products/8389.webp",
];

const features = [
  {
    icon: Zap,
    title: "Nominal Voltage",
    text: "12.8V",
  },
  {
    icon: BatteryCharging,
    title: "Capacity",
    text: "6Ah (76.8Wh)",
  },
  {
    icon: BatteryCharging,
    title: "Long Cycle Life",
    text: "2000+ cycles @ 80% DoD",
  },
  {
    icon: ShieldCheck,
    title: "Built-in BMS",
    text: "Full protection (OVP, UVP, OCP, Temp)",
  },
  {
    icon: Thermometer,
    title: "Wide Temperature Range",
    text: "-20°C to 60°C",
  },
  {
    icon: HeartPulse,
    title: "Medical-Ready",
    text: "Designed to meet medical safety and reliability standards",
  },
];

const whyChoose = [
  {
    icon: HeartPulse,
    title: "Medical-Grade Safety",
    text: "Designed for critical care devices with reliable, stable power output.",
  },
  {
    icon: ShieldCheck,
    title: "Smart BMS Protection",
    text: "Built-in over-voltage, current, temperature, and short-circuit protection.",
  },
  {
    icon: Factory,
    title: "Made in India",
    text: "Locally manufactured with Tier-1 cells and BIS certification.",
  },
  {
    icon: Cable,
    title: "OEM/ODM Support",
    text: "Custom connectors, enclosures, and communication options to fit your device.",
  },
  {
    icon: Zap,
    title: "Easy Integration",
    text: "Supports RS485, CAN, and UART for seamless device connectivity.",
  },
  {
    icon: Stethoscope,
    title: "Proven in Healthcare",
    text: "Trusted by hospitals and emergency service providers across India.",
  },
];

const applications = [
  {
    icon: HeartPulse,
    title: "Portable Ventilators",
  },
  {
    icon: Syringe,
    title: "Infusion Pumps",
  },
  {
    icon: Wind,
    title: "CPAP & BiPAP Machines",
  },
  {
    icon: Monitor,
    title: "Patient Monitoring Devices",
  },
  {
    icon: HeartPulse,
    title: "Portable Emergency Equipment",
  },
];

const specifications = [
  {
    specification: "Battery Type",
    details: "LiFePO₄ (Lithium Iron Phosphate)",
  },
  {
    specification: "Nominal Voltage",
    details: "12.8V",
  },
  {
    specification: "Capacity",
    details: "6Ah (76.8Wh)",
  },
  {
    specification: "Cycle Life",
    details: "2000+ cycles @ 80% DoD",
  },
  {
    specification: "Weight",
    details: "~1 kg (approx.)",
  },
  {
    specification: "Dimensions",
    details: "Compact / Customizable",
  },
  {
    specification: "Communication",
    details: "Optional: RS485 / UART / CAN",
  },
];

export default function MedicalBattery() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A528F] via-[#0A528F] to-[#083F6E]" />

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
              Medical Battery
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Stable, Safe & Smart Power for{" "}
            <span className="text-[#FFB600]">
              Critical Healthcare Devices
            </span>
          </motion.h1>

        </div>
      </section>


      {/* =====================================================
          PRODUCT INTRO
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}

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
                  alt="Arenq Medical Battery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

              </motion.div>

            </AnimatePresence>


            {/* DOTS */}

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
                Medical Battery
              </span>

            </div>


            <span className="mt-5 inline-block text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Medical Battery
            </span>


            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
              Stable, Safe & Smart Power for Critical Healthcare Devices
            </h2>


            <p className="mt-5 text-gray-600 leading-8">

              The{" "}
              <strong>
                Arenq 12.8V 6Ah LiFePO₄ battery
              </strong>{" "}
              is engineered for mission-critical medical devices such as
              ventilators, patient monitors, infusion pumps, and portable
              emergency equipment.

            </p>


            <p className="mt-4 text-gray-600 leading-8">

              With reliable power delivery, advanced safety features, and long
              cycle life, it ensures uninterrupted performance—when every
              second counts.

            </p>


            {/* BUTTON */}

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
                href="#specifications"
                className="inline-flex items-center gap-2 text-[#0A528F] font-semibold hover:text-[#FFAF00] transition-colors"
              >
                <FileDown size={20} />
                View Specifications
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
              Medical Battery
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
          WHY SWITCH
      ===================================================== */}

      <section className="py-16 sm:py-24">

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
            className="text-center max-w-3xl mx-auto"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Arenq Advantage
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Why Switch to Arenq Lithium Batteries?
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

            {whyChoose.map((item, i) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
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
                    y: -6,
                  }}
                  className="rounded-3xl border border-gray-100 bg-white shadow-lg p-7"
                >

                  <div className="h-12 w-12 rounded-xl bg-[#FFAF00]/15 flex items-center justify-center">

                    <Icon
                      size={23}
                      className="text-[#FFAF00]"
                    />

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#0A528F]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-gray-500 text-sm leading-7">
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
              Healthcare Applications
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Applications in Power & Utility Sector
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

      <section
        id="specifications"
        className="py-16 sm:py-24"
      >

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

                  <th className="px-6 py-4 text-center text-white font-semibold border border-white/20">
                    Specification
                  </th>

                  <th className="px-6 py-4 text-center text-white font-semibold border border-white/20">
                    Details
                  </th>

                </tr>

              </thead>


              <tbody>

                {specifications.map((item, i) => (

                  <tr
                    key={item.specification}
                    className={
                      i % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >

                    <td className="px-6 py-4 text-center font-semibold text-gray-700 border border-gray-200">
                      {item.specification}
                    </td>

                    <td className="px-6 py-4 text-center text-gray-600 border border-gray-200">
                      {item.details}
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
            Critical Power
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#0A528F]">
            Reliable Power When Every Second Counts
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            Arenq LiFePO₄ medical batteries deliver stable, safe and
            dependable power for critical healthcare equipment.
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