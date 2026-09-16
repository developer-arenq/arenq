"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  Zap,
  ShieldCheck,
  Radio,
  Settings2,
  Building2,
  Store,
  House,
  Factory,
  Sun,
  BatteryCharging,
  FileDown,
  ArrowRight,
} from "lucide-react";

const heroSlides = [
  "https://arenq.s3.ap-south-1.amazonaws.com/1kva.png",
  "https://arenq.s3.ap-south-1.amazonaws.com/2kva.png",
  "/images/products/invert-1.webp",
  "/images/products/Invert-2.webp",
  "/images/products/New-Project-50.webp",
];

const features = [
  {
    icon: Zap,
    title: "Wide Inverter Compatibility",
    text: "Compatible with hybrid inverters including Growatt, Livguard, Delta, Luminous Solar, etc.",
  },
  {
    icon: Radio,
    title: "Smart Communication Protocols",
    text: "Communicates with inverter via CAN / RS485.",
  },
  {
    icon: Settings2,
    title: "Flexible Operation Modes",
    text: "Supports on-grid, off-grid, and solar-first modes.",
  },
  {
    icon: House,
    title: "Perfect for Modern Homes",
    text: "Ideal for solar homes, farmhouses, and smart villas.",
  },
  {
    icon: BatteryCharging,
    title: "Modular & Scalable Design",
    text: "Scalable design with expandable capacity.",
  },
];

const applications = [
  {
    icon: Building2,
    title: "Urban Homes with Frequent Power Cuts",
  },
  {
    icon: Store,
    title: "Shops, Clinics & Small Offices",
  },
  {
    icon: Sun,
    title: "Solar Homes with Hybrid Inverters",
  },
  {
    icon: Factory,
    title: "Remote Farmhouses & Off-Grid Cabins",
  },
];

const specs = [
  {
    param: "Battery Type",
    home: "LiFePO₄",
    hybrid: "LiFePO₄",
  },
  {
    param: "Voltage Options",
    home: "12.8V / 25.6V / 48V",
    hybrid: "48V / 51.2V / 96V / 120V",
  },
  {
    param: "Capacity Range",
    home: "50Ah – 200Ah",
    hybrid: "50Ah – 400Ah",
  },
  {
    param: "Range Per Charge",
    home: "4 – 10 Hours (Load Dependent)",
    hybrid: "4 – 12 Hours (Customizable)",
  },
  {
    param: "Cycle Life",
    home: "3000 – 5000+ Cycles",
    hybrid: "3000 – 5000+ Cycles",
  },
  {
    param: "Communication",
    home: "Bluetooth",
    hybrid: "Yes (CAN / RS485 / Modbus)",
  },
  {
    param: "Charging",
    home: "Grid / Inverter",
    hybrid: "Solar + Grid + Generator",
  },
  {
    param: "Warranty",
    home: "Up to 5 Years*",
    hybrid: "Up to 5 Years*",
  },
];

export default function InverterBattery() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className="bg-white overflow-x-hidden">

      {/* =====================================================
          HERO / BREADCRUMB
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A528F] via-[#0A528F] to-[#083f6e]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,182,0,0.25),transparent_50%)]" />

        {/* Animated Glow */}
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
            delay: 1,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">

          {/* Breadcrumb */}
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

            <span className="text-[#FFB600] font-semibold">
              Inverter Battery
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-6 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
          >
            Arenq Lithium Batteries for{" "}
            <span className="text-[#FFB600]">
              Home & Hybrid Inverter Systems
            </span>
          </motion.h1>

        </div>
      </section>


      {/* =====================================================
          PRODUCT HERO
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE SLIDER */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
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
                  alt="Arenq Inverter Battery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

              </motion.div>

            </AnimatePresence>


            {/* Slider Dots */}

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


          {/* PRODUCT CONTENT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.1,
            }}
          >

            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-gray-400 text-sm">

              <Home size={14} />

              <span>Home</span>

              <ChevronRight size={14} />

              <span>Products</span>

              <ChevronRight size={14} />

              <span className="text-[#0A528F] font-semibold">
                Inverter Battery
              </span>

            </div>


            {/* Category */}

            <span className="mt-5 inline-block text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Inverter Battery
            </span>


            {/* Heading */}

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
              Smart Power for Modern Homes
            </h1>


            {/* Description */}

            <p className="mt-5 text-gray-600 leading-8">

              <strong>Arenq</strong>, from{" "}
              <strong>Sunlit Power Pvt. Ltd.</strong>, offers advanced{" "}
              <strong>
                Lithium Iron Phosphate (LiFePO₄) battery solutions
              </strong>{" "}
              designed for both{" "}
              <strong>Home Inverter</strong> and{" "}
              <strong>Hybrid Inverter</strong> applications.

            </p>

            <p className="mt-4 text-gray-600 leading-8">

              Whether you&#39;re dealing with frequent power cuts or integrating
              solar energy at home, Arenq batteries provide{" "}
              <strong>
                uninterrupted power, faster charging, and longer life
              </strong>{" "}
              with zero maintenance.

            </p>

            <p className="mt-4 text-gray-600 leading-8">

              Arenq batteries ensure safe and reliable performance for urban,
              rural, and smart homes alike.

            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-wrap items-center gap-6">

              <motion.a
                href="/contact-us/"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
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
                href="/images/brochure/Inverter-Batteries.pdf"
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
              duration: 0.6,
            }}
            className="text-center max-w-2xl mx-auto"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Built For Modern Power
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Features
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

            {features.map((f, i) => {

              const Icon = f.icon;

              return (

                <motion.div
                  key={f.title}
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
                      className="text-[#0A528F]"
                      size={22}
                    />

                  </div>

                  <h3 className="mt-4 font-bold text-[#0A528F]">
                    {f.title}
                  </h3>

                  <p className="mt-2 text-gray-500 text-sm leading-6">
                    {f.text}
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
              Why Arenq
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Why Switch to Arenq Lithium Batteries?
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">

            {[
              {
                icon: Zap,
                title: "Fast Charging",
                text: "Saves power, time, and improves inverter performance.",
              },
              {
                icon: BatteryCharging,
                title: "Space Saving",
                text: "Compact design fits easily into different spaces.",
              },
              {
                icon: ShieldCheck,
                title: "Maintenance-Free",
                text: "No acid, corrosion, or water filling.",
              },
              {
                icon: Zap,
                title: "Long Life",
                text: "Lasts 4–5x longer than lead-acid batteries.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & Smart",
                text: "Built-in BMS with thermal and electrical protection.",
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
                    delay: i * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-2xl border border-gray-100 bg-white shadow-md p-5 text-center"
                >

                  <div className="mx-auto h-11 w-11 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">

                    <Icon
                      size={21}
                      className="text-[#0A528F]"
                    />

                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#0A528F]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 leading-5">
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center max-w-2xl mx-auto"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Where It's Used
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Applications
            </h2>

          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            {applications.map((a, i) => {

              const Icon = a.icon;

              return (

                <motion.div
                  key={a.title}
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
                    delay: i * 0.1,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-center"
                >

                  <div className="mx-auto h-14 w-14 rounded-2xl bg-[#FFAF00]/20 flex items-center justify-center">

                    <Icon
                      className="text-[#FFAF00]"
                      size={26}
                    />

                  </div>

                  <p className="mt-4 text-white font-semibold text-sm leading-6">
                    {a.title}
                  </p>

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
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center"
          >

            <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
              Tech Specs
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Inverter Battery Specifications
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg"
          >

            <table className="w-full min-w-[750px] text-center border-collapse">

              <thead>

                <tr className="bg-[#0370DF]">

                  <th className="text-white font-semibold px-5 py-4 text-sm sm:text-base border border-white/20">
                    Feature
                  </th>

                  <th className="text-white font-semibold px-5 py-4 text-sm sm:text-base border border-white/20">
                    Home Inverter Battery
                  </th>

                  <th className="text-white font-semibold px-5 py-4 text-sm sm:text-base border border-white/20">
                    Hybrid Inverter Battery
                  </th>

                </tr>

              </thead>


              <tbody>

                {specs.map((row, i) => (

                  <tr
                    key={row.param}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >

                    <td className="px-5 py-4 text-gray-700 font-semibold text-sm sm:text-base border border-gray-200">
                      {row.param}
                    </td>

                    <td className="px-5 py-4 text-gray-600 text-sm sm:text-base border border-gray-200">
                      {row.home}
                    </td>

                    <td className="px-5 py-4 text-gray-600 text-sm sm:text-base border border-gray-200">
                      {row.hybrid}
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >

          <span className="text-[#FFAF00] font-semibold uppercase tracking-[3px]">
            Power Your Home
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#0A528F]">
            Upgrade to Arenq Lithium Inverter Batteries
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            Talk to our team about home inverter, hybrid inverter,
            voltage, capacity and communication options.
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