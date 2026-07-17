import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const desktopPoints = [
  {
    id: 1,
    name: "Agriculture Battery",
    top: "14%",
    left: "28%",
    href: "/products/agriculture-battery",
  },
  {
    id: 2,
    name: "EV Battery",
    top: "22%",
    left: "35%",
    href: "/products/ev-battery",
  },
  {
    id: 3,
    name: "Substation Battery",
    top: "50%",
    left: "13%",
    href: "/products/substation-battery",
  },
  {
    id: 4,
    name: "Home Inverter Battery",
    top: "60%",
    left: "36%",
    href: "/products/home-inverter-battery",
  },
  {
    id: 5,
    name: "Telecom Battery",
    top: "65%",
    left: "23%",
    href: "/products/telecom-battery",
  },
  {
    id: 6,
    name: "LiFePO4 & LTO Battery",
    top: "18%",
    left: "82%",
    href: "/products/lifepo4-lto-battery",
  },
  {
    id: 7,
    name: "Solar Street Light Battery",
    top: "69%",
    left: "52%",
    href: "/products/solar-street-light-battery",
  },
];

const mobilePoints = [
  {
    id: 1,
    name: "Agriculture Battery",
    top: "15%",
    left: "16%",
    href: "/products/agriculture-battery",
  },
  {
    id: 2,
    name: "EV Battery",
    top: "30%",
    left: "22%",
    href: "/products/ev-battery",
  },
  {
    id: 3,
    name: "Substation Battery",
    top: "67%",
    left: "16%",
    href: "/products/substation-battery",
  },
  {
    id: 4,
    name: "Home Inverter Battery",
    top: "54%",
    left: "40%",
    href: "/products/home-inverter-battery",
  },
  {
    id: 5,
    name: "Telecom Battery",
    top: "82%",
    left: "15%",
    href: "/products/telecom-battery",
  },
  {
    id: 6,
    name: "LiFePO4 Battery",
    top: "19%",
    left: "89%",
    href: "/products/lifepo4-lto-battery",
  },
  {
    id: 7,
    name: "Solar Street Light Battery",
    top: "84%",
    left: "52%",
    href: "/products/solar-street-light-battery",
  },
];

const AUTO_INTERVAL = 3000;

export default function HomePage() {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const points = isMobile ? mobilePoints : desktopPoints;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveId((prev) => {
        const index = points.findIndex((p) => p.id === prev);
        return points[(index + 1) % points.length].id;
      });
    }, AUTO_INTERVAL);

    return () => clearInterval(timer);
  }, [points, isPaused]);

  return (
    <>
      <section className="relative w-full overflow-hidden">

        <Image
          src={
            isMobile
              ? "/images/home/mobile.png"
              : "/images/home/home.png"
          }
          alt="ARENQ"
          width={isMobile ? 1080 : 2048}
          height={isMobile ? 1920 : 950}
          priority
          className="w-full h-auto object-contain select-none"
        />

        {points.map((item) => {
          const active = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              onMouseEnter={() => {
                setActiveId(item.id);
                setIsPaused(true);
              }}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                top: item.top,
                left: item.left,
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 z-30 ${active ? "hotspot-active" : ""
                }`}
            >
              <span className="hotspot-dot"></span>

              <span
                className={`hotspot-tooltip ${isMobile
                    ? active
                      ? "opacity-100"
                      : "opacity-0"
                    : ""
                  }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}


      </section>


      {/* Announcement Bar */}
      <div
        style={{
          background: "linear-gradient(90deg, #0A528F 0%, #0D6BB8 50%, #FFB600 100%)",
          color: "#ffffff",
          borderBottom: "2px solid #FFB600",
        }}
        className="relative overflow-hidden py-2 shadow-md"
      >
        <div className="flex items-center">
          <div className="announcement-ticker">
            {[
              "🔋 Advanced Lithium Battery Solutions",
              "⚡ Powering EV, Solar & Industrial Applications",
              "🌱 Clean Energy • Reliable Storage • Sustainable Future",
              "🚀 High Performance LiFePO4 Battery Technology",
              "🔧 Custom Battery Solutions For Every Industry",
              "🌍 ARENQ — Forward To Future",

              "🔋 Advanced Lithium Battery Solutions",
              "⚡ Powering EV, Solar & Industrial Applications",
              "🌱 Clean Energy • Reliable Storage • Sustainable Future",
              "🚀 High Performance LiFePO4 Battery Technology",
              "🔧 Custom Battery Solutions For Every Industry",
              "🌍 ARENQ — Forward To Future",
            ].map((msg, i) => (
              <span
                key={i}
                className="px-6 text-xs md:text-sm font-semibold tracking-wider"
              >
                {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}