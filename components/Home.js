import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const desktopPoints = [
  {
    id: 1,
    name: "Agriculture Battery",
    top: "74%",
    left: "89%",
    href: "/products/agricultural-battery",
  },
  {
    id: 2,
    name: "EV Battery",
    top: "61%",
    left: "35%",
    href: "/products/ev-battery",
  },
  {
    id: 3,
    name: "Substation Battery",
    top: "14%",
    left: "70%",
    href: "/products/substation-battery",
  },
  {
    id: 4,
    name: "Home Inverter Battery",
    top: "50%",
    left: "87%",
    href: "/products/home-inverter-battery",
  },
  {
    id: 5,
    name: "Telecom Battery",
    top: "11%",
    left: "27%",
    href: "/products/telecom-battery",
  },
  {
    id: 6,
    name: "LiFePO4 & LTO Battery",
    top: "32%",
    left: "91%",
    href: "/products/lifepo4-lto-battery",
  },
  {
    id: 7,
    name: "Solar Street Light Battery",
    top: "49%",
    left: "50%",
    href: "/products/solar-street-light-battery",
  },
  {
    id: 8,
    name: "BESS",
    top: "46%",
    left: "65%",
    href: "/products/battery-energy-storage-system-bess",
  },
  {
    id: 9,
    name: "Electromagnetic Crane Battery",
    top: "75%",
    left: "52%",
    href: "/products/electromagnetic-crane-battery",
  },
  {
    id: 10,
    name: "MHE Battery",
    top: "86%",
    left: "35%",
    href: "/products/mhe-battery",
  },
  {
    id: 11,
    name: "Company Profile",
    top: "25%",
    left: "44%",
    href: "/company-profile",
  },
];

const mobilePoints = [
  {
    id: 1,
    name: "Agriculture Battery",
    top: "76%",
    left: "83%",
    href: "/products/agricultural-battery",
  },
  {
    id: 2,
    name: "EV Battery",
    top: "48%",
    left: "23%",
    href: "/products/ev-battery",
  },
  {
    id: 3,
    name: "Substation Battery",
    top: "21%",
    left: "78%",
    href: "/products/substation-battery",
  },
  {
    id: 4,
    name: "Home Inverter Battery",
    top: "60%",
    left: "79%",
    href: "/products/home-inverter-battery",
  },
  {
    id: 5,
    name: "Telecom Battery",
    top: "19%",
    left: "25%",
    href: "/products/telecom-battery",
  },
  // {
  //   id: 6,
  //   name: "LiFePO4 Battery",
  //   top: "38%",
  //   left: "88%",
  //   href: "/products/lifepo4-lto-battery",
  // },
  {
    id: 7,
    name: "Solar Street Light Battery",
    top: "43%",
    left: "47%",
    href: "/products/solar-street-light-battery",
  },
  {
    id: 8,
    name: "BESS",
    top: "45%",
    left: "73%",
    href: "/products/battery-energy-storage-system-bess",
  },
  {
    id: 9,
    name: "Electromagnetic Crane Battery",
    top: "60%",
    left: "52%",
    href: "/products/electromagnetic-crane-battery",
  },
  {
    id: 10,
    name: "MHE Battery",
    top: "70%",
    left: "35%",
    href: "/products/mhe-battery",
  },
  {
    id: 11,
    name: "Company Profile",
    top: "30%",
    left: "45%",
    href: "/company-profile",
  },
];

const AUTO_INTERVAL = 3000;

export default function HomePage() {
  const router = useRouter();

  /* ----------------------------------
     Detect Initial Day / Night
     
     7:00 AM - 6:59 PM = DAY
     7:00 PM - 6:59 AM = NIGHT
  ---------------------------------- */
  const [isNight, setIsNight] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const hour = new Date().getHours();

    return hour >= 19 || hour < 7;
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeId, setActiveId] = useState(1);

  /* ----------------------------------
     Detect Mobile / Desktop
  ---------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ----------------------------------
     Detect Day / Night
     
     7:00 AM - 6:59 PM = DAY
     7:00 PM - 6:59 AM = NIGHT
     
     Check every 10 seconds
  ---------------------------------- */
  useEffect(() => {
    const updateDayNight = () => {
      const now = new Date();
      const hour = now.getHours();

      const night = hour >= 19 || hour < 7;

      setIsNight(night);
    };

    // Check immediately
    updateDayNight();

    // Check every 10 seconds
    const timer = setInterval(updateDayNight, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* ----------------------------------
     Select Points
  ---------------------------------- */
  const points = useMemo(() => {
    return isMobile ? mobilePoints : desktopPoints;
  }, [isMobile]);

  /* ----------------------------------
     Select Day / Night Image
     
     Desktop:
       Day   = dd.png
       Night = dn.png

     Mobile:
       Day   = md.png
       Night = mn.png
  ---------------------------------- */
  const homeImage = useMemo(() => {
    if (isMobile) {
      return isNight
        ? "/images/home/mn.png"
        : "/images/home/md.png";
    }

    return isNight
      ? "/images/home/dn.png"
      : "/images/home/dd.png";
  }, [isMobile, isNight]);

  /* ----------------------------------
     Reset Active Point When Device
     Type Changes
  ---------------------------------- */
  useEffect(() => {
    setActiveId(1);
    setIsPaused(false);
  }, [isMobile]);

  /* ----------------------------------
     Auto Rotate Hotspots
  ---------------------------------- */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = points.findIndex(
          (point) => point.id === currentId
        );

        const nextIndex =
          currentIndex === -1
            ? 0
            : (currentIndex + 1) % points.length;

        return points[nextIndex].id;
      });
    }, AUTO_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [points, isPaused]);

  return (
    <>
      {/* =========================================
          HERO / HOTSPOT SECTION
      ========================================= */}
      <section className="relative w-full">

        {/* =========================================
            DAY / NIGHT HOME IMAGE
        ========================================= */}
        <Image
          key={homeImage}
          src={homeImage}
          alt="ARENQ Energy Storage Solutions"
          width={isMobile ? 1080 : 2048}
          height={isMobile ? 1920 : 950}
          priority
          sizes="100vw"
          className="block w-full h-auto object-contain select-none"
        />

        {/* =========================================
            HOTSPOTS
        ========================================= */}
        {points.map((item) => {
          const active = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              onClick={() => router.push(item.href)}
              onMouseEnter={() => {
                if (!isMobile) {
                  setActiveId(item.id);
                  setIsPaused(true);
                }
              }}
              onMouseLeave={() => {
                if (!isMobile) {
                  setIsPaused(false);
                }
              }}
              style={{
                top: item.top,
                left: item.left,
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 z-30 ${
                active ? "hotspot-active" : ""
              }`}
            >
              <span className="hotspot-dot" />

              <span
                className={`hotspot-tooltip ${
                  isMobile
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

        {/* =========================================
            ANNOUNCEMENT BAR
        ========================================= */}
        <div
          className="relative overflow-hidden py-2 shadow-md"
          style={{
            background:
              "linear-gradient(90deg, #0A528F 0%, #0D6BB8 50%, #FFB600 100%)",
            color: "#ffffff",
            borderBottom: "2px solid #FFB600",
          }}
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
              ].map((message, index) => (
                <span
                  key={index}
                  className="px-6 text-xs md:text-sm font-semibold tracking-wider whitespace-nowrap"
                >
                  {message}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}