'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Info,
  BookOpen,
  Newspaper,
  Phone,
  Menu,
  ChevronDown,
  X,
  Award,
  Users,
  ShieldCheck,
  FlaskRound,
  Battery,
  Factory,
  Truck,
  Tractor,
  Heart,
  RadioTower,
  Construction,
  Leaf,
  Cpu,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import axios from "axios";
import debounce from "lodash.debounce";
import Image from "next/image";

const Login = dynamic(() => import("./login"), {
  ssr: false,
});


const aboutLinks = [
  {
    icon: Info,
    label: "About Us",
    desc: "Know more about ARENQ",
    href: "/about-us",
    accent: "#0A528F",
  },

  {
    icon: Award,
    label: "Our Certifications",
    desc: "Industry certifications & standards",
    href: "/certifications",
    accent: "#0A528F",
  },
  {
    icon: Users,
    label: "Our Leadership",
    desc: "Meet our leadership team",
    href: "/our-leadership",
    accent: "#FFB600",
  },
  {
    icon: ShieldCheck,
    label: "Quality Assurance",
    desc: "Ensuring quality at every stage",
    href: "/quality-assurance",
    accent: "#0A528F",
  },
  {
    icon: FlaskRound,
    label: "Research & Development",
    desc: "Driving innovation through R&D",
    href: "/research-development",
    accent: "#FFB600",
  },
];
const productLinks = [
  {
    icon: Battery,
    label: "Industrial UPS Battery",
    desc: "Reliable industrial backup power",
    href: "/products/industrial-ups-battery",
    accent: "#0A528F",
  },
  {
    icon: Factory,
    label: "Electric Vehicle Battery",
    desc: "Advanced lithium EV batteries",
    href: "/products/electric-vehicle-battery",
    accent: "#FFB600",
  },
  {
    icon: Factory,
    label: "Engine Cranking Battery",
    desc: "High starting performance",
    href: "/products/engine-cranking-battery",
    accent: "#0A528F",
  },
  {
    icon: Truck,
    label: "Golf Cart & Buggy Battery",
    desc: "Long-life mobility batteries",
    href: "/products/golf-cart-buggy-battery",
    accent: "#FFB600",
  },
  {
    icon: Package,
    label: "Marine Battery",
    desc: "Reliable marine power",
    href: "/products/marine-battery",
    accent: "#0A528F",
  },
  {
    icon: Cpu,
    label: "Robotics Battery",
    desc: "High-performance robotics solutions",
    href: "/products/robotics-battery",
    accent: "#FFB600",
  },
  {
    icon: Factory,
    label: "MHE Battery",
    desc: "Material handling equipment",
    href: "/products/mhe-battery",
    accent: "#0A528F",
  },
  {
    icon: Factory,
    label: "Power Sector Battery",
    desc: "Power grid applications",
    href: "/products/power-sector-battery",
    accent: "#FFB600",
  },
  {
    icon: Construction,
    label: "Electromagnetic Crane Battery",
    desc: "Industrial crane batteries",
    href: "/products/electromagnetic-crane-battery",
    accent: "#0A528F",
  },
  {
    icon: Factory,
    label: "BESS Battery",
    desc: "Battery Energy Storage System",
    href: "/products/battery-energy-storage-system-bess",
    accent: "#FFB600",
  },
  {
    icon: RadioTower,
    label: "Telecom Battery",
    desc: "Telecommunication backup",
    href: "/products/telecom-battery",
    accent: "#0A528F",
  },
  {
    icon: Heart,
    label: "Medical Battery",
    desc: "Healthcare power solutions",
    href: "/products/medical-battery",
    accent: "#FFB600",
  },
  {
    icon: Factory,
    label: "Inverter Battery",
    desc: "Residential & commercial backup",
    href: "/products/inverter-battery",
    accent: "#0A528F",
  },
  {
    icon: Tractor,
    label: "Agricultural Battery",
    desc: "Farming & irrigation solutions",
    href: "/products/agricultural-battery",
    accent: "#FFB600",
  },
  {
    icon: Leaf,
    label: "Solar Street Light Battery",
    desc: "Solar lighting storage",
    href: "/products/solar-street-light-battery",
    accent: "#0A528F",
  },
  {
    icon: ShieldCheck,
    label: "Lead Acid vs Lithium",
    desc: "Technology comparison",
    href: "/products/lead-acid-vs-lithium-battery",
    accent: "#FFB600",
  },
  {
    icon: Factory,
    label: "Manufacturing Setup & Capacity",
    desc: "Production facilities",
    href: "/products/manufacturing-setup-capacity",
    accent: "#0A528F",
  },
];



export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef(null);
  const [himalayanOpen, setHimalayanOpen] = useState(false);
  const himalayanRef = useRef(null);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  useEffect(() => {
    // const threshold = pathname === "/" ? 750 : 30;
    const threshold = pathname === "/" ? window.innerHeight : 0;
    setIsScrolled(window.scrollY >= threshold);
    const handler = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handler);

    // Page load झाल्यावर current scroll position check करा
    handler();

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    }

    if (aboutOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [aboutOpen]);

  const navLinks = [
    {
      label: "Home",
      href: "/"
    },


  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setAboutOpen(false);
        setHimalayanOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);









  return (
    <>

      {/* Main Header r*/}
      <header
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 
          ${isScrolled || isNavHovered
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-transparent"
          }`}
        ref={headerRef}
      >
        <div className="relative mx-auto w-[100%] lg:w-[90%] max-w-[1400px] px-4 sm:px-6 py-2">

          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Hamburger (mobile) */}


            {/* Logo */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center  flex-shrink-0"
              data-testid="link-logo"
            >

              <Image
                src="/images/logo/Arenq-logo-animation.2.gif"
                width={170}
                height={70}
                alt="Logo"
                priority
              />


            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors bg-white"
              data-testid="button-hamburger"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">



              <nav className="hidden md:flex items-center gap-1">

                {/* Home */}
                <button
                  onClick={() => router.push("/")}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
  ${isScrolled || isNavHovered
                      ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                      : "text-white hover:text-white"
                    }`}
                >
                  Home
                </button>

                {/* About Dropdown */}
                <div ref={aboutRef} className="relative">
                  <button
                    onClick={() => {
                      setHimalayanOpen(false);
                      setAboutOpen((prev) => !prev);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
  ${isScrolled || isNavHovered
                        ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                        : "text-white hover:text-white"
                      }`}
                  >
                    About
                    <ChevronDown
                      size={12}
                      style={{
                        transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform .2s",
                      }}
                    />
                  </button>

                  {aboutOpen && (
                    <div
                      className="absolute top-full right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden"
                      style={{
                        width: "340px",
                        background: "white",
                        border: "1px solid hsl(35 15% 85%)",
                        zIndex: 100,
                      }}
                    >
                      <div
                        className="p-3 border-b"
                        style={{
                          borderColor: "hsl(35 15% 90%)",
                          background: "#0A528F",
                        }}
                      >
                        <p
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: "#fff" }}
                        >
                          About Arenq
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "rgba(255,255,255,.75)" }}
                        >
                          Innovating Energy Storage Solutions
                        </p>
                      </div>

                      {aboutLinks.map(item => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.label}
                            onClick={() => {
                              router.push(item.href);
                              setAboutOpen(false);
                            }}
                            className="w-full flex items-start gap-3 px-4 py-3  text-left"
                            style={{
                              borderBottom: "1px solid hsl(35 15% 93%)",
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                background: `${item.accent}15`,
                                color: item.accent,
                              }}
                            >
                              <Icon size={15} />
                            </div>

                            <div>
                              <div
                                className="text-xs font-semibold"
                                style={{ color: "hsl(218 55% 12%)" }}
                              >
                                {item.label}
                              </div>

                              <div
                                className="text-xs"
                                style={{ color: "hsl(30 12% 55%)" }}
                              >
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div ref={himalayanRef} className="relative">

                  <button
                    onClick={() => {
                      setAboutOpen(false);
                      setHimalayanOpen((prev) => !prev);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
  ${isScrolled || isNavHovered
                        ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                        : "text-white hover:text-white"
                      }`}
                  >
                    Products

                    <ChevronDown
                      size={12}
                      style={{
                        transform: himalayanOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "0.2s"
                      }}
                    />

                  </button>


                  {himalayanOpen && (

                    <div
                      className="fixed top-[80px] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                      style={{
                        width: "min(1400px, calc(100vw - 40px))",
                        zIndex: 9999,
                      }}
                    >

                      <div
                        className="p-3 border-b"
                        style={{
                          background: "#0A528F"
                        }}
                      >

                        <p className="text-xs font-bold uppercase tracking-widest text-white">
                          ARENQ Solutions

                        </p>

                        <p
                          className="text-xs mt-0.5"
                          style={{
                            color: "rgba(255,255,255,.7)"
                          }}
                        >
                          Our Best Products
                        </p>

                      </div>


                      <div className="grid grid-cols-4 gap-2 p-3">
                        {productLinks.map((item) => {
                          const Icon = item.icon;

                          return (
                            <button
                              key={item.label}
                              onClick={() => {
                                router.push(item.href);
                                setHimalayanOpen(false);
                              }}
                              className="group flex items-start gap-3 rounded-xl p-4 text-left
             transition-all duration-300 ease-out
             hover:-translate-y-2
             hover:bg-gradient-to-br hover:from-white hover:to-[#F8FAFC]
             hover:shadow-xl"
                            >
                              {/* Icon */}
                              <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
               transition-all duration-300
               group-hover:scale-110
               group-hover:rotate-6"
                                style={{
                                  background: `${item.accent}15`,
                                  color: item.accent,
                                }}
                              >
                                <Icon size={20} />
                              </div>

                              {/* Content */}
                              <div>
                                <h4
                                  className="text-sm font-semibold text-[#0A528F]
                 transition-colors duration-300
                 group-hover:text-[#FFB600]"
                                >
                                  {item.label}
                                </h4>

                                <p
                                  className="text-xs text-gray-500 mt-1 leading-5
                 transition-colors duration-300
                 group-hover:text-gray-700"
                                >
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>


                    </div>

                  )}

                </div>


                {/* <button
                  onClick={() => router.push("/gallery")}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 hover:bg-white 
                    ${isScrolled || isNavHovered
                      ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                      : "text-white hover:text-white"
                    }`}
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Gallery
                </button> */}

                {/* Blogs */}
                <button
                  onClick={() => router.push("/blog")}

                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
                   ${isScrolled || isNavHovered
                      ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                      : "text-white hover:text-white"
                    }`}
                >
                  Blogs
                </button>

                {/* Contact Us */}
                <button
                  onClick={() => router.push("/contact-us")}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
                   ${isScrolled || isNavHovered
                      ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                      : "text-white hover:text-white"
                    }`}
                >
                  Contact Us
                </button>

                {/* FAQs */}
                <button
                  onClick={() => router.push("/faqs")}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors duration-200 
                    ${isScrolled || isNavHovered
                      ? "text-[hsl(218_55%_12%)] hover:text-[#0A528F]"
                      : "text-white hover:text-white"
                    }`}
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  FAQs
                </button>

              </nav>


            </nav>


          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 h-full flex flex-col shadow-2xl" style={{ background: 'hsl(210 30% 98%)' }}>
            <div className="flex items-center justify-between p-2 border-b" style={{ borderColor: 'hsl(210 20% 86%)' }}>
              <button
                onClick={() => router.push('/')}
                className="flex items-center  flex-shrink-0"
                data-testid="link-logo"
              >

                <Image
                  src="/images/logo/Arenq-logo-animation.2.gif"
                  width={170}
                  height={70}
                  alt="Logo"
                  priority
                />


              </button>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-white" aria-label="Close menu"><X size={20} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => { router.push(link.href); setMobileOpen(false); }}
                  className="text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors hover:bg-white"
                  style={{ fontFamily: 'var(--font-body)', color: 'hsl(218 55% 12%)' }}
                >
                  {link.label}
                </button>
              ))}

              {/* About */}
              <div>
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold hover:bg-white"
                >
                  <span>About</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {mobileAboutOpen && (
                  <div className="ml-4 mt-1 flex flex-col">
                    {aboutLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.href);
                          setMobileOpen(false);
                        }}
                        className="text-left px-4 py-2 text-sm hover:bg-white rounded-lg"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Products */}
              <div>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold hover:bg-white"
                >
                  <span>Products</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {mobileProductsOpen && (
                  <div className="ml-4 mt-1 flex flex-col">
                    {productLinks.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.href);
                          setMobileOpen(false);
                        }}
                        className="text-left px-4 py-2 text-sm hover:bg-white rounded-lg"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-2 pt-2 font-bold border-t" style={{ borderColor: 'hsl(210 20% 86%)' }}>
                {[


                  { label: 'Blog', href: '/blog' },

                  { label: 'Contact Us', href: '/contact-us' },
                ].map(({ label, href }) => (
                  <button key={label} onClick={() => { router.push(href); setMobileOpen(false); }} className="text-left w-full px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-white" style={{ fontFamily: 'var(--font-body)' }}>{label}</button>
                ))}
              </div>
            </nav>
            <div className="p-4 border-t" style={{ borderColor: 'hsl(210 20% 86%)' }}>
              <div className="text-xs" style={{ color: 'hsl(215 15% 45%)' }}>📞 +91 8956225134</div>
              <div className="text-xs mt-1" style={{ color: 'hsl(215 15% 45%)' }}>📍 Factory : No. 327/2, Mohida TS, Dondaicha Road, Shahada Nandurbar, Maharashtra, Pincode - 425409, India.</div>
            </div>
          </div>
        </div>
      )}
      {!session && showLogin && (
        <Login
          onClose={() =>
            setShowLogin(false)
          }
        />
      )}
    </>
  );
}
