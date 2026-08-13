/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

/* ---------------- AUTOPLAY ---------------- */

function AutoplayPlugin(slider) {
  let timeout;

  const clearNextTimeout = () => {
    clearTimeout(timeout);
  };

  const nextTimeout = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      slider.next();
    }, 2800);
  };

  slider.on("created", () => {
    nextTimeout();

    slider.container.addEventListener(
      "mouseover",
      clearNextTimeout
    );

    slider.container.addEventListener(
      "mouseout",
      nextTimeout
    );
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

/* ---------------- DATA ---------------- */

const categories = [
  {
    name: "Industrial UPS Battery",
    sub: "Reliable Backup Solutions",
    category: "industrial-ups-battery",
    href: "/products/industrial-ups-battery",
    img: "/images/products/49266.webp",
    icon: "🏭",
  },
  {
    name: "Electric Vehicle Battery",
    sub: "EV Mobility Power",
    category: "electric-vehicle-battery",
    href: "/products/electric-vehicle-battery",
    img: "/images/products/11-1.webp",
    icon: "🚗",
  },
  {
    name: "Engine Cranking Battery",
    sub: "High Starting Power",
    category: "engine-cranking-battery",
    href: "/products/engine-cranking-battery",
    img: "/images/products/969.webp",
    icon: "⚙️",
  },
  {
    name: "Golf Cart & Buggy Battery",
    sub: "Smart Mobility Energy",
    category: "golf-cart-buggy-battery",
    href: "/products/golf-cart-buggy-battery",
    img: "/images/products/2429.webp",
    icon: "⛳",
  },
  {
    name: "Marine Battery",
    sub: "Marine Power Solutions",
    category: "marine-battery",
    href: "/products/marine-battery",
    img: "/images/products/18789.webp",
    icon: "🚢",
  },
  {
    name: "Robotics Battery",
    sub: "Automation Energy",
    category: "agv-battery",
    href: "/products/robotics-battery",
    img: "/images/products/7297.webp",
    icon: "🤖",
  },
  {
    name: "MHE Battery",
    sub: "Material Handling Equipment",
    category: "mhe-battery",
    href: "/products/mhe-battery",
    img: "/images/products/57189.webp",
    icon: "🏗️",
  },
  {
    name: "Power Sector Battery",
    sub: "Grid & Power Solutions",
    category: "power-sector-battery",
    href: "/products/power-sector-battery",
    img: "/images/products/8350.webp",
    icon: "⚡",
  },
  {
    name: "Electromagnetic Crane Battery",
    sub: "Heavy Duty Industrial Power",
    category: "electromagnetic-crane-battery",
    href: "/products/electromagnetic-crane-battery",
    img: "/images/products/12624.webp",
    icon: "🏭",
  },
  {
    name: "BESS Battery",
    sub: "Battery Energy Storage System",
    category: "battery-energy-storage-system-bess",
    href: "/products/battery-energy-storage-system-bess",
    img: "/images/products/Bess.webp",
    icon: "🔋",
  },
  {
    name: "Telecom Battery",
    sub: "Telecom Backup Power",
    category: "telecom-battery",
    href: "/products/telecom-battery",
    img: "/images/products/45509.webp",
    icon: "📡",
  },
  {
    name: "Inverter Battery",
    sub: "Home & Business Backup",
    category: "inverter-battery",
    href: "/products/inverter-battery",
    img: "/images/products/New-Project-50.webp",
    icon: "🔌",
  },
  {
    name: "Agricultural Battery",
    sub: "Smart Farming Energy",
    category: "agricultural-battery",
    href: "/products/agricultural-battery",
    img: "/images/products/259.webp",
    icon: "🚜",
  },
  {
    name: "Solar Street Light Battery",
    sub: "Renewable Lighting Power",
    category: "solar-street-light-battery",
    href: "/products/solar-street-light-battery",
    img: "/images/products/13634.webp",
    icon: "☀️",
  },
];
/* ---------------- ICON ---------------- */

const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ---------------- COMPONENT ---------------- */

export default function CategorySlider() {
  const navRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,

      slides: {
        perView: 2.2,
        spacing: 12,
      },

      breakpoints: {
        "(min-width: 480px)": {
          slides: {
            perView: 2.8,
            spacing: 12,
          },
        },

        "(min-width: 640px)": {
          slides: {
            perView: 3.5,
            spacing: 14,
          },
        },

        "(min-width: 900px)": {
          slides: {
            perView: 5,
            spacing: 16,
          },
        },

        "(min-width: 1200px)": {
          slides: {
            perView: 5,
            spacing: 18,
          },
        },
      },
    },
    [AutoplayPlugin]
  );

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg,#f8fbff,#eef5f8)"
      }}
    >

      <div className="
relative mx-auto 
w-[100%] lg:w-[95%]
max-w-[1400px]
px-2 py-8
">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <p
              className="
uppercase tracking-[3px]
text-xs font-semibold
"
              style={{
                color: "#FFB600"
              }}
            >              Explore Solutions
            </p>

            <h2
              className="
text-3xl md:text-4xl
font-bold mt-2
"
              style={{
                color: "hsl(218 55% 12%)"
              }}
            >
              Discover ARENQ Energy Solutions            </h2>
          </div>

          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 text-sm font-semibold  hover:text-black transition"
            style={{
              color: "hsl(198 90% 40%)"
            }}
          >
            View All →
          </Link>
        </div>

        {/* Slider */}

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">

            {categories.map((cat, index) => (
              <div
                key={index}
                className="keen-slider__slide"
              >
                <Link
                  href={`/products/${cat.category}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        cat.img.startsWith("http")
                          ? cat.img
                          : `${cat.img}`
                      }
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Overlay Content */}

                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center pb-4 px-3">
                      {/* <span className="text-3xl mb-1">
                        {cat.icon}
                      </span> */}

                      <h3 className="text-white font-bold text-sm">
                        {cat.name}
                      </h3>

                      <p className="text-white/80 text-xs mt-1">
                        {cat.sub}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Next Button */}

          <button
            ref={navRef}
            onClick={() => instanceRef.current?.next()}
            className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg items-center justify-center hover:scale-105 transition z-20"
            aria-label="Next Slide"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Mobile View All */}

        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/search"
            className="font-semibold "
            style={{
              color: "hsl(198 90% 40%)"
            }}
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}