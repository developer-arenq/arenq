"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronRight,
  ChevronDown,
  Building2,
  Battery,
  Wrench,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   FAQ DATA
========================================================= */

const faqSections = [
  {
    id: "company",
    title: "Company Related FAQs",
    icon: Building2,

    faqs: [
      {
        question: "What does Sunlit Power Private Ltd. do?",
        answer: (
          <>
            We are a clean energy solutions company based in Maharashtra,
            India. We specialize in{" "}
            <strong>lithium-ion and LiFePO4 batteries</strong>,{" "}
            <strong>solar hybrid inverters</strong>,{" "}
            <strong>energy storage systems</strong>, and smart BMS-integrated
            power products.
          </>
        ),
      },

      {
        question: "Where is your manufacturing unit located?",
        answer: (
          <>
            Our manufacturing and R&amp;D facility is located in Shahada,
            Nandurbar District of Maharashtra. And our Corporate Office is
            Located in Pune.
          </>
        ),
      },

      {
        question:
          "Do you cater to individual customers or only businesses?",
        answer: (
          <>
            We serve <strong>both individual customers</strong> and{" "}
            <strong>commercial/industrial clients</strong> across India and
            abroad.
          </>
        ),
      },

      {
        question: "Can I become a Sunlit Power dealer or partner?",
        answer: (
          <>
            Yes! We welcome inquiries for dealership and distribution. Please
            fill out the partnership form on our website or contact our sales
            team.
          </>
        ),
      },
    ],
  },

  {
    id: "products",
    title: "Product-Related FAQs",
    icon: Battery,

    faqs: [
      {
        question: "What types of batteries do you offer?",
        answer: (
          <>
            We manufacture <strong>Lithium-ion</strong>,{" "}
            <strong>LiFePO4</strong>, and{" "}
            <strong>custom battery packs</strong> for various applications
            like solar storage, EV, MHE, inverter, backup systems, and
            telecom.
          </>
        ),
      },

      {
        question: "What’s special about your ARENQ battery brand?",
        answer: (
          <>
            ARENQ is our premium range, built with high-quality cells, smart
            BMS, and rugged enclosures, offering{" "}
            <strong>
              longer lifecycle, fast charging, and enhanced safety
            </strong>
            .
          </>
        ),
      },

      {
        question: "Do you offer solar inverters?",
        answer: (
          <>
            Yes, we offer <strong>hybrid solar inverters</strong> with high
            efficiency, intelligent charging algorithms, and BMS compatibility.
          </>
        ),
      },

      {
        question: "Are your products BIS or CE certified?",
        answer: (
          <>
            Yes, all our products meet relevant{" "}
            <strong>BIS, CE, IEC Standard for Sale</strong>, and{" "}
            <strong>RoHS for BMS</strong> certifications.
          </>
        ),
      },
    ],
  },

  {
    id: "installation",
    title: "Product Assembly/Installation FAQs",
    icon: Wrench,

    faqs: [
      {
        question: "Can I install the battery myself?",
        answer: (
          <>
            We strongly recommend installation by a{" "}
            <strong>
              certified electrician or Sunlit-authorized technician
            </strong>{" "}
            to ensure safety and warranty validity.
          </>
        ),
      },

      {
        question: "Does installation support available?",
        answer: (
          <>
            Yes. We offer <strong>remote technical assistance</strong>,
            detailed <strong>user manuals</strong>, and onsite support through
            our dealer network.
          </>
        ),
      },

      {
        question: "What precautions should I take during installation?",
        answer: (
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-[#FFB600]">•</span>
              <span>Never reverse polarity</span>
            </li>

            <li className="flex gap-2">
              <span className="text-[#FFB600]">•</span>
              <span>Avoid exposure to moisture</span>
            </li>

            <li className="flex gap-2">
              <span className="text-[#FFB600]">•</span>
              <span>Ensure proper ventilation</span>
            </li>

            <li className="flex gap-2">
              <span className="text-[#FFB600]">•</span>
              <span>
                Use compatible inverters and charge controllers
              </span>
            </li>
          </ul>
        ),
      },

      {
        question: "Do your products come with installation manuals?",
        answer: (
          <>
            Yes, every product comes with a{" "}
            <strong>step-by-step user and installation manual</strong> in
            English (others available upon request).
          </>
        ),
      },
    ],
  },

  {
    id: "warranty",
    title: "Warranty & Support FAQs",
    icon: ShieldCheck,

    faqs: [
      {
        question: "What is the warranty period for your batteries?",
        answer: (
          <>
            Our standard lithium battery warranty ranges from{" "}
            <strong>3 to 5 years</strong>, depending on product type and usage.
          </>
        ),
      },

      {
        question: "What is covered under warranty?",
        answer: (
          <>
            We cover <strong>manufacturing defects</strong>,{" "}
            <strong>internal BMS failure</strong>, and{" "}
            <strong>
              capacity drop below threshold within warranty period
            </strong>
            . Physical damage or misuse is not covered.
          </>
        ),
      },

      {
        question: "How do I claim warranty?",
        answer: (
          <>
            Please contact our service team or your nearest Sunlit dealer with
            the product serial number, invoice, and issue details. We’ll guide
            you through the claim process.
          </>
        ),
      },

      {
        question: "Is there AMC (Annual Maintenance Contract) available?",
        answer: (
          <>
            Yes, we offer AMC options for bulk/commercial installations. Please
            contact us for custom plans.
          </>
        ),
      },
    ],
  },
];

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
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
        duration: 0.35,
        delay: index * 0.04,
      }}
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-[#0A528F]/30 bg-white shadow-lg"
          : "border-gray-200 bg-white hover:border-[#0A528F]/20 hover:shadow-md"
      }`}
    >
      {/* Question */}

      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 sm:px-7 sm:py-6 text-left"
      >
        <span
          className={`text-sm sm:text-base font-semibold leading-6 transition-colors ${
            isOpen ? "text-[#0A528F]" : "text-gray-800"
          }`}
        >
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-[#0A528F] text-white rotate-180"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      {/* Answer */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="border-t border-gray-100 px-5 pb-6 pt-5 sm:px-7">
              <div className="text-sm sm:text-base leading-7 text-gray-600">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================================================
   FAQ SECTION
========================================================= */

function FAQSection({
  section,
  sectionIndex,
  openItem,
  setOpenItem,
}) {
  const Icon = section.icon;

  return (
    <motion.section
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
        amount: 0.1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="scroll-mt-24"
      id={section.id}
    >
      {/* Section heading */}

      <div className="mb-7 flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A528F]/10">
          <Icon
            size={23}
            className="text-[#0A528F]"
          />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A528F]">
            {section.title}
          </h2>

          <div className="mt-2 h-1 w-12 rounded-full bg-[#FFB600]" />
        </div>

      </div>


      {/* FAQ list */}

      <div className="space-y-3">

        {section.faqs.map((faq, index) => {

          const key = `${sectionIndex}-${index}`;

          return (
            <FAQItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openItem === key}
              onClick={() =>
                setOpenItem(
                  openItem === key ? null : key
                )
              }
            />
          );
        })}

      </div>
    </motion.section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function FAQPage() {
  const [openItem, setOpenItem] = useState("0-0");

  return (
    <main className="min-h-screen overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0A528F]">

        {/* Background shapes */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FFB600]/10 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-white/5 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0370DF]/20 blur-3xl" />

        </div>


        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <motion.nav
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
            aria-label="Breadcrumb"
            className="flex items-center gap-2 pt-6 sm:pt-8 text-sm"
          >

            <a
              href="/"
              className="flex items-center gap-1.5 text-white/70 transition hover:text-white"
            >
              <Home size={15} />

              <span>
                Home
              </span>
            </a>


            <ChevronRight
              size={15}
              className="text-white/40"
            />


            <span className="font-medium text-[#FFB600]">
              FAQ’s
            </span>

          </motion.nav>


          {/* Hero */}

          <div className="py-16 sm:py-20 lg:py-24">

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
              className="mx-auto max-w-4xl text-center"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFB600] shadow-lg">

                <span className="text-2xl font-black text-[#0A528F]">
                  ?
                </span>

              </div>


              <h1 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

                Frequently Asked{" "}

                <span className="text-[#FFB600]">
                  Questions
                </span>

              </h1>


              <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#FFB600]" />


              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">

                Find answers about our company, batteries, solar inverters,
                installation, warranty and support services.

              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK NAVIGATION
      ===================================================== */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

            {faqSections.map((section) => {

              const Icon = section.icon;

              return (

                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-[#0A528F] hover:bg-[#0A528F] hover:text-white"
                >

                  <Icon size={16} />

                  {section.title}

                </a>

              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ CONTENT
      ===================================================== */}

      <section className="py-14 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="space-y-16 lg:space-y-20">

            {faqSections.map((section, sectionIndex) => (

              <FAQSection
                key={section.id}
                section={section}
                sectionIndex={sectionIndex}
                openItem={openItem}
                setOpenItem={setOpenItem}
              />

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section className="pb-16 sm:pb-24">

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

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
            className="relative overflow-hidden rounded-3xl bg-[#0A528F] px-6 py-10 text-center sm:px-10 sm:py-14"
          >

            {/* Decoration */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FFB600]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />


            <div className="relative">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFB600]">

                <span className="text-xl font-black text-[#0A528F]">
                  ?
                </span>

              </div>


              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Still have questions?
              </h2>


              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">

                Our team is ready to help you with product selection,
                technical support, installation and commercial requirements.

              </p>


              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full bg-[#FFB600] px-7 py-3.5 text-sm font-bold text-[#0A528F] transition hover:bg-white"
                >
                  Contact Us
                </a>


                <a
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#0A528F]"
                >
                  Explore Products
                </a>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}