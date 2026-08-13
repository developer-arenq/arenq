"use client";

import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Battery,
  BatteryCharging,
  Zap,
  Clock,
  Weight,
  Wrench,
  ShieldCheck,
  Gauge,
  Leaf,
  CircleDollarSign,
  Car,
  Sun,
  Forklift,
  CheckCircle2,
  XCircle,
  Factory,
  BarChart3,
  Thermometer,
  RefreshCw,
  Settings2,
} from "lucide-react";

const comparisonData = [
  {
    category: "Battery Type & Chemistry",
    parameter: "Common Types",
    leadAcid: "Flooded, AGM, Gel",
    lithium: "LiFePO₄",
  },
  {
    category: "Battery Type & Chemistry",
    parameter: "Chemistry Stability",
    leadAcid: "Stable but prone to sulfation",
    lithium: "More stable",
  },
  {
    category: "Battery Type & Chemistry",
    parameter: "Environmental Impact",
    leadAcid: "Contains lead and acid (toxic)",
    lithium: "Comparatively cleaner; recyclable",
  },

  {
    category: "Performance & Efficiency",
    parameter: "Energy Density (Wh/kg)",
    leadAcid: "30–50",
    lithium: "100–250",
  },
  {
    category: "Performance & Efficiency",
    parameter: "Depth of Discharge (DoD)",
    leadAcid: "~50% usable",
    lithium: "80–100% usable capacity",
  },
  {
    category: "Performance & Efficiency",
    parameter: "Charge Efficiency",
    leadAcid: "~70–80%",
    lithium: "~95–99%",
  },
  {
    category: "Performance & Efficiency",
    parameter: "Charging Time",
    leadAcid: "6–12 hours",
    lithium: "1–3 hours",
  },
  {
    category: "Performance & Efficiency",
    parameter: "Self-Discharge Rate",
    leadAcid: "5–15% per month",
    lithium: "2–5% per month",
  },
  {
    category: "Performance & Efficiency",
    parameter: "Cold Temperature Impact",
    leadAcid: "Reduced performance",
    lithium: "Better cold performance",
  },

  {
    category: "Lifespan & Maintenance",
    parameter: "Cycle Life",
    leadAcid: "300–500 cycles",
    lithium: "2000–6000 cycles",
  },
  {
    category: "Lifespan & Maintenance",
    parameter: "Maintenance",
    leadAcid: "Regular water top-up (flooded)",
    lithium: "Maintenance-free",
  },
  {
    category: "Lifespan & Maintenance",
    parameter: "Memory Effect",
    leadAcid: "No significant",
    lithium: "No memory effect",
  },
  {
    category: "Lifespan & Maintenance",
    parameter: "Weight",
    leadAcid: "Heavier (2–3× more for same capacity)",
    lithium: "Lightweight",
  },

  {
    category: "Safety & Risk",
    parameter: "Thermal Runaway Risk",
    leadAcid: "Low (but leaks acid)",
    lithium: "Low risk",
  },
  {
    category: "Safety & Risk",
    parameter: "Venting / Gassing",
    leadAcid: "Yes, especially in flooded",
    lithium: "No, sealed",
  },
  {
    category: "Safety & Risk",
    parameter: "Short-Circuit Protection",
    leadAcid: "External fuse",
    lithium: "Internal BMS with multiple protections",
  },

  {
    category: "Cost & ROI",
    parameter: "Initial Cost",
    leadAcid: "Lower",
    lithium: "Higher (~2–3× lead acid)",
  },
  {
    category: "Cost & ROI",
    parameter: "Total Cost of Ownership",
    leadAcid: "Higher due to short life / maintenance",
    lithium: "Lower due to longer life / no maintenance",
  },
  {
    category: "Cost & ROI",
    parameter: "ROI for High-Use Cases",
    leadAcid: "Less economical",
    lithium: "More economical long-term",
  },

  {
    category: "Applications",
    parameter: "UPS / Backup",
    leadAcid: "Widely used due to low cost",
    lithium: "Increasing use due to fast recharge",
  },
  {
    category: "Applications",
    parameter: "Electric Vehicles",
    leadAcid: "Rarely used due to weight & DoD limits",
    lithium: "Dominates the market",
  },
  {
    category: "Applications",
    parameter: "Solar / Off-grid",
    leadAcid: "Suitable for small setups",
    lithium: "Preferred for modern systems",
  },
  {
    category: "Applications",
    parameter: "Forklifts / MHE",
    leadAcid: "Still used in budget options",
    lithium: "Becoming standard due to fast charging",
  },
];

const keyDifferences = [
  {
    icon: Weight,
    title: "Weight",
    leadAcid: "Heavy",
    lithium: "Lightweight",
  },
  {
    icon: RefreshCw,
    title: "Cycle Life",
    leadAcid: "~300–500 cycles",
    lithium: "2000–6000 cycles",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    leadAcid: "Regular maintenance",
    lithium: "Maintenance-free",
  },
  {
    icon: Gauge,
    title: "Depth of Discharge",
    leadAcid: "~50%",
    lithium: "80–100%",
  },
  {
    icon: BarChart3,
    title: "Energy Density",
    leadAcid: "30–50 Wh/kg",
    lithium: "100–250 Wh/kg",
  },
  {
    icon: Zap,
    title: "Charging Time",
    leadAcid: "6–12 hours",
    lithium: "1–3 hours",
  },
  {
    icon: CircleDollarSign,
    title: "Initial Cost",
    leadAcid: "Lower",
    lithium: "Higher",
  },
  {
    icon: CircleDollarSign,
    title: "Long-Term Cost",
    leadAcid: "Higher",
    lithium: "Lower",
  },
];

const applications = [
  {
    icon: Zap,
    title: "UPS & Backup",
    description:
      "Lead acid remains common in low-cost backup systems, while lithium is increasingly used where fast recharge and long life are important.",
  },
  {
    icon: Car,
    title: "Electric Vehicles",
    description:
      "Lithium is preferred because of its higher energy density, lower weight and deeper usable capacity.",
  },
  {
    icon: Sun,
    title: "Solar & Off-grid",
    description:
      "Lead acid can work for smaller setups, while lithium is preferred for modern high-performance solar systems.",
  },
  {
    icon: Forklift,
    title: "Forklifts & MHE",
    description:
      "Lithium is increasingly becoming standard because of fast charging and longer operating life.",
  },
];

const dos = [
  "Use a proper LiFePO₄ charger with correct voltage and current settings.",
  "Install the battery in a dry, ventilated and vibration-free area.",
  "Follow rated current, voltage and temperature limits strictly.",
  "Ensure battery connections are tight, clean and properly insulated.",
  "Store the battery at 30–50% charge if unused for long periods.",
  "Use a battery with BMS protection.",
  "Monitor battery temperature and voltage during operation.",
  "Replace the battery if it shows swelling, leakage or unusual heating.",
];

const donts = [
  "Do not use chargers designed for lead-acid or other battery chemistries.",
  "Do not expose the battery to water, dust or direct heat sources.",
  "Do not exceed the specified charge or discharge current limits.",
  "Do not allow loose, corroded terminals or reverse polarity.",
  "Do not store fully charged or completely drained batteries for long periods.",
  "Do not bypass or ignore BMS alarms and faults.",
  "Do not charge below 0°C or discharge below -20°C.",
  "Do not continue using damaged or physically deformed batteries.",
];

const conclusionPoints = [
  "Lead Acid batteries generally have a lower initial purchase cost.",
  "Lithium batteries offer significantly longer cycle life.",
  "Lithium provides higher usable capacity through deeper discharge.",
  "Lithium batteries are lighter and generally more energy-dense.",
  "Lithium requires less maintenance.",
  "For frequent-use applications, lithium can offer better long-term economics.",
];

export default function LeadAcidVsLithiumBattery() {
  return (
    <main className="bg-white text-gray-800 overflow-x-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0A528F]">

        {/* Decorative shapes */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#FFB600]/15 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute top-1/2 right-[20%] h-40 w-40 rounded-full bg-[#0370DF]/30 blur-3xl" />

        </div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">

          {/* Breadcrumb */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex items-center flex-wrap gap-2 text-sm text-white/75"
          >

            <Home size={16} />

            <span>Home</span>

            <ChevronRight size={15} />

            <span>Information</span>

            <ChevronRight size={15} />

            <span className="text-[#FFB600] font-semibold">
              Lead Acid vs Lithium Battery
            </span>

          </motion.div>


          {/* Hero Content */}

          <div className="mt-8 max-w-4xl">

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
                duration: 0.6,
                delay: 0.1,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#FFB600] text-sm font-semibold"
            >

              <BarChart3 size={17} />

              Battery Technology Guide

            </motion.div>


            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08]"
            >

              Lead Acid Battery{" "}

              <span className="text-[#FFB600]">
                vs Lithium Battery
              </span>

            </motion.h1>


            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-6 max-w-3xl text-white/80 text-base sm:text-lg leading-8"
            >

              A practical comparison of Lead Acid and Lithium Ferro
              Phosphate (LiFePO₄) batteries across performance, efficiency,
              lifespan, maintenance, safety, cost and applications.

            </motion.p>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}

            <motion.div
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
                Introduction
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F] leading-tight">
                Understanding the Difference
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Lead Acid batteries have been widely used for backup power,
                UPS systems, vehicles and industrial applications because of
                their relatively low initial cost and established technology.
              </p>

              <p className="mt-4 text-gray-600 leading-8">
                Lithium Ferro Phosphate, commonly known as LiFePO₄, provides
                a different approach with higher energy density, deeper
                usable discharge, faster charging and substantially longer
                cycle life.
              </p>

              <p className="mt-4 text-gray-600 leading-8">
                The right choice depends on the application, operating
                conditions, required cycle life, available space, charging
                requirements and total cost of ownership.
              </p>

            </motion.div>


            {/* Right */}

            <motion.div
              initial={{
                opacity: 0,
                x: 35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
              }}
              className="grid sm:grid-cols-2 gap-5"
            >

              {/* Lead Acid */}

              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-7">

                <div className="h-14 w-14 rounded-2xl bg-gray-200 flex items-center justify-center">

                  <Battery
                    size={28}
                    className="text-gray-600"
                  />

                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-800">
                  Lead Acid
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-6">
                  Established battery technology with lower initial cost,
                  commonly used for backup and low-cycle applications.
                </p>

              </div>


              {/* Lithium */}

              <div className="rounded-3xl border border-[#0A528F]/15 bg-[#0A528F]/5 p-7">

                <div className="h-14 w-14 rounded-2xl bg-[#0A528F]/10 flex items-center justify-center">

                  <BatteryCharging
                    size={28}
                    className="text-[#0A528F]"
                  />

                </div>

                <h3 className="mt-5 text-xl font-bold text-[#0A528F]">
                  LiFePO₄
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  High-performance lithium chemistry designed for long life,
                  high usable capacity and efficient operation.
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          KEY COMPARISON CARDS
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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
            className="max-w-3xl mx-auto text-center"
          >

            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              At a Glance
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Key Differences
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              The major differences become clear when both technologies are
              compared across everyday operating parameters.
            </p>

          </motion.div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {keyDifferences.map((item, index) => {

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
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >

                  <div className="h-11 w-11 rounded-xl bg-[#0A528F]/10 flex items-center justify-center">

                    <Icon
                      size={21}
                      className="text-[#0A528F]"
                    />

                  </div>

                  <h3 className="mt-4 font-bold text-gray-800">
                    {item.title}
                  </h3>


                  <div className="mt-4 space-y-2">

                    <div className="flex items-start gap-2">

                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-400 shrink-0" />

                      <div>

                        <p className="text-xs text-gray-400">
                          Lead Acid
                        </p>

                        <p className="text-sm font-semibold text-gray-700">
                          {item.leadAcid}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-start gap-2">

                      <span className="mt-1 h-2 w-2 rounded-full bg-[#0A528F] shrink-0" />

                      <div>

                        <p className="text-xs text-[#0A528F]">
                          Lithium
                        </p>

                        <p className="text-sm font-semibold text-[#0A528F]">
                          {item.lithium}
                        </p>

                      </div>

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          DETAILED COMPARISON
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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

            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Detailed Information
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Lead Acid vs Lithium Comparison
            </h2>

          </motion.div>


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
              amount: 0.1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="mt-12 overflow-x-auto rounded-2xl border border-gray-200 shadow-md"
          >

            <table className="w-full min-w-[950px] border-collapse">

              <thead>

                <tr className="bg-[#0A528F]">

                  <th className="px-5 py-5 text-left text-white font-semibold border border-white/10">
                    Category
                  </th>

                  <th className="px-5 py-5 text-left text-white font-semibold border border-white/10">
                    Parameter
                  </th>

                  <th className="px-5 py-5 text-left text-white font-semibold border border-white/10">
                    Lead Acid
                  </th>

                  <th className="px-5 py-5 text-left text-white font-semibold border border-white/10">
                    Lithium LiFePO₄
                  </th>

                </tr>

              </thead>


              <tbody>

                {comparisonData.map((item, index) => {

                  const previousItem = comparisonData[index - 1];

                  const showCategory =
                    !previousItem ||
                    previousItem.category !== item.category;

                  return (

                    <tr
                      key={`${item.category}-${item.parameter}`}
                      className={
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }
                    >

                      <td className="px-5 py-4 border border-gray-200 align-top">

                        {showCategory ? (

                          <span className="inline-flex px-3 py-1.5 rounded-full bg-[#0A528F]/10 text-[#0A528F] text-xs font-bold">
                            {item.category}
                          </span>

                        ) : null}

                      </td>


                      <td className="px-5 py-4 border border-gray-200 font-semibold text-gray-700">
                        {item.parameter}
                      </td>


                      <td className="px-5 py-4 border border-gray-200 text-gray-600 leading-6">
                        {item.leadAcid}
                      </td>


                      <td className="px-5 py-4 border border-gray-200 text-[#0A528F] font-medium leading-6">
                        {item.lithium}
                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          PERFORMANCE SECTION
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-[#0A528F]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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
            className="max-w-3xl mx-auto text-center"
          >

            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Performance
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
              Why Lithium Is Preferred for High-Use Applications
            </h2>

          </motion.div>


          <div className="mt-12 grid md:grid-cols-3 gap-6">

            {/* Efficiency */}

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
                duration: 0.5,
              }}
              className="rounded-3xl bg-white/10 border border-white/15 p-7"
            >

              <Zap
                size={30}
                className="text-[#FFB600]"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                Higher Efficiency
              </h3>

              <p className="mt-3 text-white/70 leading-7">
                Lithium charge efficiency is approximately 95–99%, compared
                with approximately 70–80% for Lead Acid.
              </p>

            </motion.div>


            {/* Life */}

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
                duration: 0.5,
                delay: 0.1,
              }}
              className="rounded-3xl bg-white/10 border border-white/15 p-7"
            >

              <RefreshCw
                size={30}
                className="text-[#FFB600]"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                Longer Cycle Life
              </h3>

              <p className="mt-3 text-white/70 leading-7">
                Lithium can provide approximately 2000–6000 cycles, while
                Lead Acid is generally around 300–500 cycles.
              </p>

            </motion.div>


            {/* Charging */}

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
                duration: 0.5,
                delay: 0.2,
              }}
              className="rounded-3xl bg-white/10 border border-white/15 p-7"
            >

              <Clock
                size={30}
                className="text-[#FFB600]"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                Faster Charging
              </h3>

              <p className="mt-3 text-white/70 leading-7">
                Lithium charging time is approximately 1–3 hours compared
                with around 6–12 hours for Lead Acid.
              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLICATIONS
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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

            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Applications
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Where These Technologies Are Used
            </h2>

          </motion.div>


          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {applications.map((item, index) => {

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
                    y: -6,
                  }}
                  className="rounded-3xl border border-gray-100 bg-white shadow-md p-7"
                >

                  <div className="h-14 w-14 rounded-2xl bg-[#0A528F]/10 flex items-center justify-center">

                    <Icon
                      size={27}
                      className="text-[#0A528F]"
                    />

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#0A528F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-7">
                    {item.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          DO'S & DON'TS
      ===================================================== */}

      <section className="py-16 sm:py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

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

            <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
              Battery Care
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#0A528F]">
              Battery Do’s & Don’ts
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              Proper charging, installation, storage and protection help
              maintain battery safety and performance.
            </p>

          </motion.div>


          <div className="mt-12 grid lg:grid-cols-2 gap-6">

            {/* DO */}

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
                duration: 0.6,
              }}
              className="rounded-3xl bg-white border border-gray-100 shadow-md overflow-hidden"
            >

              <div className="px-6 py-5 bg-[#0A528F]">

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">

                    <CheckCircle2
                      size={22}
                      className="text-[#FFB600]"
                    />

                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Do’s
                  </h3>

                </div>

              </div>


              <div className="p-6">

                <div className="space-y-4">

                  {dos.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#0A528F]"
                      />

                      <p className="text-sm text-gray-600 leading-6">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>


            {/* DON'T */}

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
              }}
              transition={{
                duration: 0.6,
              }}
              className="rounded-3xl bg-white border border-gray-100 shadow-md overflow-hidden"
            >

              <div className="px-6 py-5 bg-gray-800">

                <div className="flex items-center gap-3">

                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">

                    <XCircle
                      size={22}
                      className="text-[#FFB600]"
                    />

                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Don’ts
                  </h3>

                </div>

              </div>


              <div className="p-6">

                <div className="space-y-4">

                  {donts.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <XCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-gray-500"
                      />

                      <p className="text-sm text-gray-600 leading-6">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONCLUSION
      ===================================================== */}

      <section className="py-16 sm:py-24">

        <div className="max-w-5xl mx-auto px-4 sm:px-6">

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
            className="rounded-3xl bg-[#0A528F] p-8 sm:p-12"
          >

            <div className="flex items-center gap-3">

              <Settings2
                size={28}
                className="text-[#FFB600]"
              />

              <span className="text-[#FFB600] font-semibold uppercase tracking-[3px] text-sm">
                Conclusion
              </span>

            </div>


            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Which Battery Technology Is Better?
            </h2>


            <p className="mt-5 text-white/75 leading-8">
              There is no single battery technology that is best for every
              application. Lead Acid can be suitable where initial cost is
              the primary consideration and cycling requirements are low.
            </p>


            <p className="mt-4 text-white/75 leading-8">
              Lithium LiFePO₄ becomes increasingly attractive when the
              application requires frequent cycling, faster charging,
              lighter weight, deeper discharge, lower maintenance and better
              long-term economics.
            </p>


            <div className="mt-8 grid sm:grid-cols-2 gap-4">

              {conclusionPoints.map((point, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 border border-white/10 p-4"
                >

                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#FFB600]"
                  />

                  <p className="text-sm text-white/80 leading-6">
                    {point}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          SIMPLE FOOTNOTE
      ===================================================== */}

      <section className="pb-16">

        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="border-t border-gray-200 pt-6 text-center">

            <p className="text-xs sm:text-sm text-gray-400 leading-6">
              Battery performance varies according to battery model,
              operating conditions, charging method, temperature, load
              profile and application requirements. Always follow the
              manufacturer's technical specifications and safety instructions.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}