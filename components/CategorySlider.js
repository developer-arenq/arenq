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
    img: "https://arenq.co.in/wp-content/uploads/2025/08/49266.jpg",
    icon: "🏭",
  },
  {
    name: "Electric Vehicle Battery",
    sub: "EV Mobility Power",
    category: "ev-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/06/11-1.jpeg",
    icon: "🚗",
  },
  {
    name: "Engine Cranking Battery",
    sub: "High Starting Power",
    category: "engine-cranking-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/08/969.jpg",
    icon: "⚙️",
  },
  {
    name: "Golf Cart & Buggy Battery",
    sub: "Smart Mobility Energy",
    category: "golf-cart-and-buggy-battery", // ✅ Fixed
    img: "https://arenq.co.in/wp-content/uploads/2025/07/2429.jpg",
    icon: "⛳",
  },
  {
    name: "Marine Battery",
    sub: "Marine Power Solutions",
    category: "marine-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/18789.jpg",
    icon: "🚢",
  },
  {
    name: "Robotics Battery",
    sub: "Automation Energy",
    category: "robotics-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/7297.jpg",
    icon: "🤖",
  },
  {
    name: "MHE Battery",
    sub: "Material Handling Equipment",
    category: "mhe-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/57189.jpg",
    icon: "🏗️",
  },
  {
    name: "Power Sector Battery",
    sub: "Grid & Power Solutions",
    category: "power-sector-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/08/8350.jpg",
    icon: "⚡",
  },
  {
    name: "Electromagnetic Crane Battery",
    sub: "Heavy Duty Industrial Power",
    category: "electromagnetic-crane-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/08/12624.jpg",
    icon: "🏭",
  },
  {
    name: "BESS Battery",
    sub: "Battery Energy Storage System",
    category: "bess-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/Bess.jpg",
    icon: "🔋",
  },
  {
    name: "Telecom Battery",
    sub: "Telecom Backup Power",
    category: "telecom-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/45509.jpg",
    icon: "📡",
  },
  {
    name: "Medical Battery",
    sub: "Healthcare Power Solutions",
    category: "medical-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/8389.jpg",
    icon: "🏥",
  },
  {
    name: "Inverter Battery",
    sub: "Home & Business Backup",
    category: "inverter-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/New-Project-50.png",
    icon: "🔌",
  },
  {
    name: "Agricultural Battery",
    sub: "Smart Farming Energy",
    category: "agricultural-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/08/259.jpg",
    icon: "🚜",
  },
  {
    name: "Solar Street Light Battery",
    sub: "Renewable Lighting Power",
    category: "solar-street-light-battery",
    img: "https://arenq.co.in/wp-content/uploads/2025/07/13634.jpg",
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
                  href={`/search?q=${cat.category}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}

                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        cat.img.startsWith("http")
                          ? cat.img
                          : `/images/pictures/category/${cat.img}`
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