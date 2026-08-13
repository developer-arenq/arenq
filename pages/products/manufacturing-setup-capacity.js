"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Factory,
  Settings,
  Thermometer,
  Cpu,
  FlaskConical,
  ScanLine,
  ShieldCheck,
  Gauge,
  ClipboardCheck,
  Activity,
  Battery,
  TestTube2,
  Building2,
  Sun,
  Car,
  Cog,
  Truck,
  Globe2,
  PackageCheck,
  Boxes,
  Microscope,
  Zap,
  CheckCircle2,
} from "lucide-react";

/* =========================================================
   FACILITY HIGHLIGHTS
========================================================= */

const facilityHighlights = [
  {
    icon: Settings,
    title: "Automated Assembly Lines",
    description:
      "Automated assembly lines for precision cell-to-pack integration.",
  },
  {
    icon: Thermometer,
    title: "Controlled Manufacturing Environment",
    description:
      "Dust-free, temperature-controlled environments for sensitive components.",
  },
  {
    icon: Cpu,
    title: "In-house BMS Development",
    description:
      "In-house Battery Management System (BMS) development and testing.",
  },
  {
    icon: ScanLine,
    title: "Advanced Production Technology",
    description:
      "Robotic laser welding, laser coding, and cell grading stations.",
  },
  {
    icon: Microscope,
    title: "Dedicated R&D Lab",
    description:
      "Dedicated R&D lab for prototyping and pilot-scale production runs.",
  },
];

/* =========================================================
   PRODUCTION CAPACITY
========================================================= */

const productionCapacity = [
  {
    value: "25,000+",
    unit: "Units / Month",
    title: "Lithium-ion & LiFePO₄ Battery Packs",
    icon: Battery,
  },
  {
    value: "15,000+",
    unit: "Units / Month",
    title: "Solar + Hybrid Inverter Batteries",
    icon: Sun,
  },
  {
    value: "500+",
    unit: "MWh / Year",
    title: "Rack-mounted & Industrial BESS",
    icon: Zap,
  },
  {
    value: "5,000+",
    unit: "Units / Month",
    title: "OEM / EV Power Solutions",
    icon: Car,
  },
];

/* =========================================================
   QUALITY ASSURANCE
========================================================= */

const qualitySteps = [
  {
    icon: ClipboardCheck,
    title: "Incoming Raw Material QC",
    description:
      "Ensures only high-quality materials enter the production process, reducing defects from the start.",
  },
  {
    icon: Gauge,
    title: "Cell-level Voltage and Capacity Grading",
    description:
      "Each cell is evaluated for performance consistency to ensure pack reliability and balance.",
  },
  {
    icon: ShieldCheck,
    title: "Thermal & Drop Testing",
    description:
      "Verifies battery safety and durability under heat stress and physical impact conditions.",
  },
  {
    icon: Activity,
    title: "Vibration & Short Circuit Simulation",
    description:
      "Tests structural integrity and electrical safety in real-world operating scenarios.",
  },
  {
    icon: TestTube2,
    title: "100% End-of-line QC",
    description:
      "Every finished battery is fully tested before dispatch to ensure performance and safety compliance.",
  },
  {
    icon: Settings,
    title: "Incoming BMS Testing Machine",
    description:
      "Evaluates BMS components before integration to prevent system-level faults.",
  },
  {
    icon: Battery,
    title: "Battery Testing Machine",
    description:
      "Performs complete functional checks under load to verify battery output and behavior.",
  },
];

/* =========================================================
   MARKET / SUPPLY SUPPORT
========================================================= */

const supplyMarkets = [
  {
    icon: Building2,
    title: "Government Electrification Projects",
  },
  {
    icon: Sun,
    title: "Solar EPCs and Energy Contractors",
  },
  {
    icon: Car,
    title: "EV 2W / 3W Manufacturers",
  },
  {
    icon: Cog,
    title: "Industrial Users and Automation Systems",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function ManufacturingSetupCapacity() {
  return (
    <main className="w-full overflow-hidden bg-white text-gray-800">

      {/* =====================================================
          HERO / BREADCRUMB
      ===================================================== */}

      <section className="relative bg-[#0A528F] overflow-hidden">

        {/* Background decoration */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#FFB600]/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />

          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-[#0370DF]/20 blur-3xl" />

        </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="pt-6 sm:pt-8"
          >

            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-sm"
            >

              <a
                href="/"
                className="flex items-center gap-1.5 text-white/75 hover:text-white transition-colors"
              >
                <Home size={15} />

                <span>Home</span>
              </a>


              <ChevronRight
                size={15}
                className="text-white/40"
              />


              <span className="text-[#FFB600] font-medium">
                Manufacturing Setup & Capacity
              </span>

            </nav>

          </motion.div>


          {/* Hero content */}

          <div className="py-6 sm:py-6 lg:py-6">

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="max-w-4xl"
            >

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#FFB600]">

                <Factory size={17} />

                Manufacturing Infrastructure

              </div>


              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-white">

                Manufacturing Setup{" "}

                <span className="text-[#FFB600]">
                  & Capacity
                </span>

              </h1>


              <div className="mt-6 h-1 w-24 rounded-full bg-[#FFB600]" />


              <p className="mt-7 max-w-3xl text-base sm:text-lg leading-8 text-white/80">

                At{" "}

                <strong className="text-white">
                  ARENQ
                </strong>
                , our manufacturing ecosystem is the backbone of our
                commitment to delivering{" "}

                <strong className="text-white">
                  smart, safe, and scalable energy solutions
                </strong>
                .

              </p>


              <p className="mt-4 max-w-3xl text-base sm:text-lg leading-8 text-white/70">

                With state-of-the-art infrastructure and a process-driven
                production model, we ensure high-volume output without
                compromising on quality or innovation.

              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ADVANCED INFRASTRUCTURE
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">

            {/* Heading */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
              className="lg:sticky lg:top-28"
            >

              <span className="text-[#FFB600] text-sm font-bold uppercase tracking-[3px]">
                Infrastructure
              </span>


              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A528F]">

                Advanced Infrastructure,
                <br />

                <span className="text-gray-800">
                  Designed for Scale
                </span>

              </h2>


              <div className="mt-6 h-1 w-20 rounded-full bg-[#FFB600]" />


              <div className="mt-8 rounded-3xl bg-[#0A528F] p-7 sm:p-8">

                <Factory
                  size={38}
                  className="text-[#FFB600]"
                />

                <p className="mt-5 text-sm sm:text-base leading-7 text-white/80">

                  Our state-of-the-art manufacturing facility in Shahada,
                  Nandurbar spans over{" "}

                  <strong className="text-white">
                    4 acres
                  </strong>{" "}

                  of land and is dedicated to the production of advanced
                  battery technologies.

                </p>


                <p className="mt-4 text-sm sm:text-base leading-7 text-white/80">

                  To expand our capabilities, we have recently acquired an
                  additional{" "}

                  <strong className="text-white">
                    4 acres
                  </strong>{" "}

                  of land in Khed District, Pune.

                </p>


                <div className="mt-6 flex items-center gap-3">

                  <div className="h-2 w-2 rounded-full bg-[#FFB600]" />

                  <span className="text-sm font-semibold text-white">
                    8 acres across current and expansion facilities
                  </span>

                </div>

              </div>

            </motion.div>


            {/* Infrastructure description */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-7 sm:p-9">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A528F]/10">

                    <Building2
                      size={24}
                      className="text-[#0A528F]"
                    />

                  </div>


                  <div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0A528F]">
                      Next-generation manufacturing
                    </h3>

                    <p className="mt-2 text-gray-500 leading-7">
                      Built around automation, quality control and advanced
                      battery technologies.
                    </p>

                  </div>

                </div>


                <p className="mt-8 text-gray-600 leading-8">

                  The new facility is being developed with next-generation
                  automation systems and stringent quality control processes
                  to cater to the growing demand for{" "}

                  <strong className="text-gray-800">
                    Lithium-ion, LiFePO₄, LTO, and Sodium-ion
                  </strong>{" "}

                  battery solutions across various industries.

                </p>


                <div className="mt-8 grid sm:grid-cols-2 gap-4">

                  {[
                    {
                      icon: Battery,
                      title: "Lithium-ion",
                    },
                    {
                      icon: Battery,
                      title: "LiFePO₄",
                    },
                    {
                      icon: Zap,
                      title: "LTO",
                    },
                    {
                      icon: Activity,
                      title: "Sodium-ion",
                    },
                  ].map((item) => {

                    const Icon = item.icon;

                    return (

                      <div
                        key={item.title}
                        className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-4"
                      >

                        <div className="h-10 w-10 rounded-xl bg-[#FFB600]/10 flex items-center justify-center">

                          <Icon
                            size={19}
                            className="text-[#0A528F]"
                          />

                        </div>

                        <span className="font-semibold text-gray-700">
                          {item.title}
                        </span>

                      </div>

                    );

                  })}

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FACILITY HIGHLIGHTS
      ===================================================== */}

      <section className="bg-gray-50 py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
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
              duration: 0.6,
            }}
            className="text-center max-w-3xl mx-auto"
          >

            <span className="text-[#FFB600] text-sm font-bold uppercase tracking-[3px]">
              Facility Highlights
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Built for Precision & Reliability
            </h2>


            <p className="mt-4 text-gray-500 leading-7">
              Our infrastructure combines automation, environmental control,
              battery intelligence and dedicated R&D capabilities.
            </p>

          </motion.div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {facilityHighlights.map((item, index) => {

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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A528F]/10">

                    <Icon
                      size={27}
                      className="text-[#0A528F]"
                    />

                  </div>


                  <h3 className="mt-6 text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>


                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCTION CAPACITY
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0A528F] py-16 sm:py-24">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#FFB600]/10 blur-3xl" />

          <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
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
              duration: 0.6,
            }}
            className="text-center"
          >

            <span className="text-[#FFB600] text-sm font-bold uppercase tracking-[3px]">
              Production Capacity
            </span>


            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Production Capacity at a Glance
            </h2>

          </motion.div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {productionCapacity.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 sm:p-7 backdrop-blur-sm"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFB600]">

                      <Icon
                        size={24}
                        className="text-black"
                      />

                    </div>


                    <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      ARENQ
                    </span>

                  </div>


                  <div className="mt-7">

                    <p className="text-4xl sm:text-5xl font-extrabold text-white">
                      {item.value}
                    </p>


                    <p className="mt-2 text-sm font-semibold text-[#FFB600]">
                      {item.unit}
                    </p>

                  </div>


                  <div className="mt-5 h-px bg-white/10" />


                  <p className="mt-5 text-sm leading-6 text-white/70">
                    {item.title}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          QUALITY ASSURANCE
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 lg:gap-20">

            {/* Heading */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="lg:sticky lg:top-28 h-fit"
            >

              <span className="text-[#FFB600] text-sm font-bold uppercase tracking-[3px]">
                Quality Assurance
              </span>


              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A528F]">

                End-to-End Testing &

                <span className="block text-gray-800">
                  Quality Assurance
                </span>

              </h2>


              <div className="mt-6 h-1 w-20 rounded-full bg-[#FFB600]" />


              <p className="mt-7 text-gray-500 leading-8">

                Every stage of the manufacturing process is supported by
                structured inspection, testing and validation to maintain
                battery quality and reliability.

              </p>


              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-[#0A528F] p-5">

                <ShieldCheck
                  size={28}
                  className="shrink-0 text-[#FFB600]"
                />

                <div>

                  <p className="font-bold text-white">
                    Quality-first production
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/65">
                    Testing from incoming material to finished battery.
                  </p>

                </div>

              </div>

            </motion.div>


            {/* Timeline */}

            <div className="relative">

              {/* vertical line */}

              <div className="absolute left-[27px] top-6 bottom-6 hidden sm:block w-px bg-gray-200" />


              <div className="space-y-5">

                {qualitySteps.map((item, index) => {

                  const Icon = item.icon;

                  return (

                    <motion.div
                      key={item.title}
                      initial={{
                        opacity: 0,
                        x: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.06,
                      }}
                      className="relative flex gap-5"
                    >

                      {/* Icon */}

                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[#0A528F] shadow-md">

                        <Icon
                          size={22}
                          className="text-[#FFB600]"
                        />

                      </div>


                      {/* Content */}

                      <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:p-6">

                        <div className="flex items-start gap-3">

                          <span className="mt-1 text-xs font-bold text-[#FFB600]">
                            {String(index + 1).padStart(2, "0")}
                          </span>


                          <div>

                            <h3 className="text-lg font-bold text-gray-800">
                              {item.title}
                            </h3>


                            <p className="mt-2 text-sm leading-6 text-gray-500">
                              {item.description}
                            </p>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PAN INDIA / GLOBAL READINESS
      ===================================================== */}

      <section className="bg-gray-50 py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">

            {/* Heading */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <span className="text-[#FFB600] text-sm font-bold uppercase tracking-[3px]">
                Supply & Distribution
              </span>


              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A528F]">

                PAN-India Supply &

                <span className="block text-gray-800">
                  Global Readiness
                </span>

              </h2>


              <div className="mt-6 h-1 w-20 rounded-full bg-[#FFB600]" />


              <div className="mt-8 rounded-3xl bg-white border border-gray-100 p-7 shadow-sm">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A528F]/10">

                  <Globe2
                    size={28}
                    className="text-[#0A528F]"
                  />

                </div>


                <p className="mt-5 text-gray-600 leading-8">

                  With robust logistics and warehousing support, our
                  manufacturing is capable of{" "}

                  <strong className="text-gray-800">
                    bulk order fulfillment, private labeling, OEM
                    partnerships, and export-ready packaging.
                  </strong>

                </p>

              </div>

            </motion.div>


            {/* Markets */}

            <div className="grid sm:grid-cols-2 gap-5">

              {supplyMarkets.map((item, index) => {

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
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="rounded-3xl bg-white border border-gray-100 p-7 shadow-sm"
                  >

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFB600]/10">

                      <Icon
                        size={27}
                        className="text-[#0A528F]"
                      />

                    </div>


                    <h3 className="mt-6 text-lg font-bold leading-7 text-gray-800">
                      {item.title}
                    </h3>


                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#0A528F]">

                      <CheckCircle2 size={15} />

                      Supported application segment

                    </div>

                  </motion.div>

                );

              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL INFORMATION STRIP
      ===================================================== */}

      <section className="py-14 sm:py-20">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
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
              duration: 0.6,
            }}
            className="rounded-3xl bg-[#0A528F] p-8 sm:p-12 text-center"
          >

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFB600]">

              <Factory
                size={31}
                className="text-black"
              />

            </div>


            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white">
              Smart. Safe. Scalable.
            </h2>


            <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base leading-7 text-white/70">

              ARENQ's manufacturing ecosystem combines advanced
              infrastructure, automated production, in-house battery
              intelligence and end-to-end quality testing to support
              diverse energy storage requirements.

            </p>

          </motion.div>

        </div>

      </section>

    </main>
  );
}