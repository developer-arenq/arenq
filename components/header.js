'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Package,
  Store,
  Coffee,
  TrendingUp,
  Star,
  Info,
  BookOpen,
  Newspaper,
  Phone,
  Droplets,
  GlassWater,
  Candy,
  HeartPulse,
  Menu,
  ChevronDown,
  User,
  ShoppingCart,
  Search,
  X,
  Leaf,
  Home,
  Gift,
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
    desc: "Know more about Arenq",
    href: "/about-us",
    accent: "hsl(205 90% 40%)",
  },
  {
    icon: BookOpen,
    label: "Our Journey",
    desc: "Innovation & milestones",
    href: "/our-story",
    accent: "hsl(45 95% 50%)",
  },
  {
    icon: BookOpen,
    label: "Blogs",
    desc: "Battery technology insights",
    href: "/blog",
    accent: "hsl(205 90% 40%)",
  },
  {
    icon: Newspaper,
    label: "Media & News",
    desc: "Latest company updates",
    href: "/media-press",
    accent: "hsl(200 70% 45%)",
  },
  {
    icon: Phone,
    label: "Contact Us",
    desc: "Connect with Arenq team",
    href: "/contact-us",
    accent: "hsl(40 90% 50%)",
  },
];

const b2bLinks = [
  {
    icon: Building2,
    label: "OEM Partnerships",
    desc: "Battery manufacturing solutions",
    href: "/wholesale"
  },
  {
    icon: TrendingUp,
    label: "Become Distributor",
    desc: "Join Arenq distribution network",
    href: "/wholesale"
  },
  {
    icon: Store,
    label: "Industrial Solutions",
    desc: "Power solutions for industries",
    href: "/wholesale"
  },
  {
    icon: Package,
    label: "Bulk Battery Inquiry",
    desc: "Custom energy storage requirements",
    href: "/wholesale"
  },
];


const productLinks = [
  {
    icon: Package,
    label: "EV Batteries",
    desc: "E-Rickshaw & Electric Vehicle Batteries",
    href: "/search?q=ev-battery",
    accent: "hsl(205 90% 40%)",
  },
  {
    icon: Package,
    label: "Solar Batteries",
    desc: "Renewable energy storage solutions",
    href: "/search?q=solar",
    accent: "hsl(45 95% 50%)",
  },
  {
    icon: Package,
    label: "Industrial Batteries",
    desc: "UPS & Industrial power backup",
    href: "/search?q=industrial",
    accent: "hsl(200 80% 45%)",
  },
  {
    icon: Package,
    label: "Telecom Batteries",
    desc: "Reliable telecom power solutions",
    href: "/search?q=telecom",
    accent: "hsl(180 70% 40%)",
  },
  {
    icon: Package,
    label: "Golf Cart Batteries",
    desc: "High performance mobility batteries",
    href: "/search?q=golf",
    accent: "hsl(120 60% 40%)",
  },
  {
    icon: Package,
    label: "Energy Storage System",
    desc: "BESS & smart energy solutions",
    href: "/search?q=energy-storage",
    accent: "hsl(220 80% 45%)",
  },
];



export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const [showLogin, setShowLogin] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);
  const b2bRef = useRef(null);
  const router = useRouter();
  const { cartItems = [] } = useSelector((state) => state.cart || {});
  const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
  const [searchHistory, setSearchHistory] = useState([]);
  const dispatch = useDispatch();
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef(null);
  const [himalayanOpen, setHimalayanOpen] = useState(false);
  const himalayanRef = useRef(null);

  const [homeDecorOpen, setHomeDecorOpen] = useState(false);
  const homeDecorRef = useRef(null);

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );

    setSearchHistory(history);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close B2B dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (b2bRef.current && !b2bRef.current.contains(e.target)) {
        setB2bOpen(false);
      }
    }
    if (b2bOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [b2bOpen]);

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


  useEffect(() => {
    function handleClick(e) {

      if (
        himalayanRef.current &&
        !himalayanRef.current.contains(e.target)
      ) {
        setHimalayanOpen(false);
      }

      if (
        homeDecorRef.current &&
        !homeDecorRef.current.contains(e.target)
      ) {
        setHomeDecorOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );

  }, []);


  const navLinks = [
    {
      label: "Shop",
      href: "/shop"
    },

  ];

  const runSearch = useRef(
    debounce(async (value) => {
      if (!value?.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axios.get(
          "/api/products/searchbyname",
          {
            params: {
              product_name: value,
            },
          }
        );

        setSearchResults(res.data || []);
      } catch (err) {
        console.log(err);
        setSearchResults([]);
      }

      setSearchLoading(false);
    }, 500)
  ).current;

  useEffect(() => {
    if (searchText?.trim()) {
      setSearchLoading(true);
      runSearch(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText]);





  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background:
          "linear-gradient(90deg,hsl(218 55% 12%),hsl(145 70% 42%))",

        color: "white"
      }}
        className="relative overflow-hidden py-2">
        <div className="flex items-center gap-0">
          <div className="announcement-ticker">
            {
              [
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
                <span key={i} className="px-6 text-xs font-medium tracking-wide">{msg}</span>
              ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? "hsl(210 30% 98% / .95)"
            : "white",

          borderBottom: scrolled
            ? "1px solid hsl(210 20% 86%)"
            : "1px solid transparent",

          boxShadow: scrolled
            ? "0 8px 30px hsl(218 55% 12% / .08)"
            : "none"
        }}
      >
        <div className="relative mx-auto w-[100%] lg:w-[95%] max-w-[1400px] px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-black/5"
              data-testid="button-hamburger"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center  flex-shrink-0"
              data-testid="link-logo"
            >

              <Image
                src="/images/logo/Arenq_light.png"
                width={70}
                height={70}
                alt="Logo"
                priority
              />

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: "hsl(145 70% 42%)", lineHeight: 1.1 }}>ARENQ</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'hsl(215 15% 45%)', textTransform: 'uppercase', fontWeight: 500 }}>Forward To Future</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">



              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-black/5"
                  style={{ color: 'hsl(218 55% 12%)', fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </button>
              ))}





              {/* Himalayan Dropdown */}

              <div ref={himalayanRef} className="relative">

                <button
                  onClick={() => setHimalayanOpen(!himalayanOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/5"
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
                    className="absolute top-full left-0 mt-2 rounded-2xl shadow-2xl overflow-hidden bg-white"
                    style={{
                      width: "340px",
                      border: "1px solid hsl(35 15% 85%)",
                      zIndex: 100
                    }}
                  >

                    <div
                      className="p-3 border-b"
                      style={{
                        background: "hsl(218 55% 16%)"
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
                        Lithium Batteries & Energy Storage
                      </p>

                    </div>


                    {productLinks.map(item => {

                      const Icon = item.icon;

                      return (

                        <button

                          key={item.label}

                          onClick={() => {
                            router.push(item.href);
                            setHimalayanOpen(false);
                          }}

                          className="w-full flex items-start gap-3 px-4 py-3 hover:bg-black/5 text-left"

                          style={{
                            borderBottom: "1px solid hsl(35 15% 93%)"
                          }}

                        >


                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${item.accent}15`,
                              color: item.accent
                            }}
                          >

                            <Icon size={15} />

                          </div>


                          <div>

                            <div
                              className="text-xs font-semibold"
                              style={{
                                color: "hsl(218 55% 12%)"
                              }}
                            >
                              {item.label}
                            </div>

                            <div
                              className="text-xs"
                              style={{
                                color: "hsl(30 12% 55%)"
                              }}
                            >
                              {item.desc}
                            </div>

                          </div>


                        </button>

                      )

                    })}


                  </div>

                )}

              </div>




              {/* About Dropdown */}
              <div ref={aboutRef} className="relative">
                <button
                  onClick={() => setAboutOpen(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-black/5"
                  style={{
                    color: aboutOpen ? "hsl(145 70% 42%)" : "hsl(218 55% 12%)",
                    fontFamily: "var(--font-body)",
                  }}
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
                        background: "hsl(145 70% 42%)",
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
                          className="w-full flex items-start gap-3 px-4 py-3 hover:bg-black/5 text-left"
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



              {/* B2B Dropdown */}
              <div ref={b2bRef} className="relative">
                <button
                  onClick={() => setB2bOpen(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-black/5"
                  style={{ color: b2bOpen ? 'hsl(145 70% 42%)' : 'hsl(218 55% 12%)', fontFamily: 'var(--font-body)' }}
                  aria-label="B2B & Wholesale"
                  aria-expanded={b2bOpen}
                >
                  <Building2 size={15} />
                  B2B
                  <ChevronDown size={12} style={{ transform: b2bOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>

                {b2bOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                      width: '340px',
                      background: 'white',
                      border: '1px solid hsl(35 15% 85%)',
                      zIndex: 100,
                    }}
                  >
                    <div className="p-3 border-b" style={{ borderColor: 'hsl(35 15% 90%)', background: 'hsl(218 55% 16%)' }}>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'hsl(145 20% 72%)' }}>Business Partnerships</p>
                      <p className="text-xs mt-0.5" style={{ color: 'hsl(145 20% 60%)' }}>Wholesale, distribution & hospitality</p>
                    </div>
                    {b2bLinks.map(item => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => { router.push(item.href); setB2bOpen(false); }}
                          className="w-full flex items-start gap-3 px-4 py-3 transition-colors hover:bg-black/4 text-left"
                          style={{ borderBottom: '1px solid hsl(35 15% 93%)' }}
                        >
                          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${item.accent}15`, color: item.accent }}>
                            <Icon size={15} />
                          </div>
                          <div>
                            <div className="text-xs font-semibold" style={{ color: 'hsl(218 55% 12%)' }}>{item.label}</div>
                            <div className="text-xs" style={{ color: 'hsl(30 12% 55%)' }}>{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                    <div className="p-3" style={{ background: 'hsl(38 25% 95%)' }}>
                      <button
                        onClick={() => { router.push('/wholesale'); setB2bOpen(false); }}
                        className="w-full py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{ background: 'hsl(145 70% 42%)', color: 'white' }}
                      >
                        View All B2B Programs →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Reward points badge */}
              {/* <button
                onClick={() => router.push('/loyalty')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-black/5"
                style={{ color: 'hsl(28 65% 44%)' }}
                title="Loyalty & Rewards"
              >
                <Star size={14} fill="hsl(28 65% 52%)" stroke="hsl(28 65% 52%)" />
                <span className="hidden lg:inline">Rewards</span>
              </button> */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg transition-colors hover:bg-black/5"
                data-testid="button-search"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => {
                  if (session) {
                    router.push("/myprofile");
                  } else {
                    setShowLogin(true);
                  }
                }}
                className="p-2 rounded-lg transition-colors hover:bg-black/5 hidden sm:flex"
              >
                <User size={18} />
              </button>
              <button
                onClick={() => router.push('/cart')}
                className="relative p-2 rounded-lg transition-colors hover:bg-black/5"
                data-testid="button-cart"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {cartItems.length > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      background: "hsl(145 70% 42%)",
                      color: "white",
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 px-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'hsl(215 15% 45%)' }} />
                <input
                  type="search"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  placeholder="Search products..."
                  autoFocus
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                  style={{ background: 'hsl(36 28% 96%)', border: '1.5px solid hsl(210 20% 86%)', fontFamily: 'var(--font-body)' }}
                  onFocus={e => (e.target.style.borderColor = 'hsl(145 70% 42%)')}
                  onBlur={e => (e.target.style.borderColor = 'hsl(210 20% 86%)')}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      const value = searchText.trim();

                      if (!value) return;

                      const history = JSON.parse(
                        localStorage.getItem("searchHistory") || "[]"
                      );

                      const updatedHistory = [
                        value,
                        ...history.filter(
                          (item) =>
                            item.toLowerCase() !== value.toLowerCase()
                        ),
                      ].slice(0, 10);

                      localStorage.setItem(
                        "searchHistory",
                        JSON.stringify(updatedHistory)
                      );

                      setSearchHistory(updatedHistory);

                      router.push(
                        `/search?q=${encodeURIComponent(value)}`
                      );

                      setSearchOpen(false);
                      setSearchText("");
                    }

                    if (e.key === "Escape") {
                      setSearchOpen(false);
                    }
                  }}
                />
                {searchText && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">

                    {searchLoading ? (
                      <div className="p-6 text-center text-gray-500">
                        Searching Products...
                      </div>
                    ) : searchResults.length > 0 ? (

                      searchResults.map((item) => {

                        const price = Number(item.price || 0);
                        const mrp = Number(item.MRP || item.mrp || price);

                        const discount =
                          mrp > price
                            ? Math.round(
                              ((mrp - price) / mrp) * 100
                            )
                            : 0;

                        return (
                          <button
                            key={item._id}
                            onClick={() => {
                              router.push(
                                `/products/${item.slug}`
                              );

                              setSearchText("");
                              setSearchOpen(false);
                            }}
                            className="w-full p-4 flex gap-4 text-left hover:bg-gray-50 border-b border-gray-100 transition"
                          >

                            {/* Product Image */}
                            <div className="w-20 h-20 rounded-xl overflow-hidden border flex-shrink-0 bg-white">
                              <img
                                src={
                                  item.main_image ||
                                  item.images?.[0] ||
                                  "/placeholder.png"
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">

                              <h4 className="font-semibold text-gray-800 line-clamp-2">
                                {item.name}
                              </h4>

                              <div className="flex items-center gap-2 mt-2">

                                <span className="text-lg font-bold text-green-600">
                                  ₹{price}
                                </span>

                                {mrp > price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{mrp}
                                  </span>
                                )}

                                {discount >= 1 && (
                                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
                                    {discount}% OFF
                                  </span>
                                )}

                              </div>

                              <div className="mt-1 text-xs text-gray-500">
                                Click to view product
                              </div>

                            </div>
                          </button>
                        );
                      })

                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
                {!searchText && searchHistory.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border z-50">

                    <div className='flex justify-between'>

                      <div className="p-3 border-b font-semibold">
                        Recent Searches
                      </div>

                      <button
                        onClick={() => {
                          localStorage.removeItem(
                            "searchHistory"
                          );

                          setSearchHistory([]);
                        }}
                        className="text-red-500 text-xs pr-4"
                      >
                        Clear History
                      </button>
                    </div>

                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchText(item);

                          router.push(
                            `/search?q=${encodeURIComponent(item)}`
                          );
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50"
                      >
                        🔍 {item}
                      </button>
                    ))}


                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 h-full flex flex-col shadow-2xl" style={{ background: 'hsl(210 30% 98%)' }}>
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'hsl(210 20% 86%)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'hsl(145 70% 42%)' }}>ARENQ</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-black/5" aria-label="Close menu"><X size={20} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => { router.push(link.href); setMobileOpen(false); }}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-black/5"
                  style={{ fontFamily: 'var(--font-body)', color: 'hsl(218 55% 12%)' }}
                >
                  {link.label}
                </button>
              ))}

              {/* B2B section in mobile */}
              <div className="mt-2 pt-2 border-t" style={{ borderColor: 'hsl(210 20% 86%)' }}>
                <p className="text-xs font-bold uppercase tracking-widest px-4 py-2" style={{ color: 'hsl(145 35% 30%)' }}>Business</p>
                {b2bLinks.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      onClick={() => { router.push(item.href); setMobileOpen(false); }}
                      className="text-left w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-black/5"
                    >
                      <Icon size={14} style={{ color: item.accent }} />
                      <div>
                        <div className="text-xs font-medium" style={{ color: 'hsl(218 55% 12%)' }}>{item.label}</div>
                        <div className="text-xs" style={{ color: 'hsl(30 12% 55%)' }}>{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-2 pt-2 border-t" style={{ borderColor: 'hsl(210 20% 86%)' }}>
                {[
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Our Story', href: '/our-story' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Gifting & Hampers', href: '/gifting' },
                  { label: 'Media & Press', href: '/media-press' },
                  { label: 'Loyalty & Rewards', href: '/loyalty' },
                  { label: 'Contact Us', href: '/contact-us' },
                ].map(({ label, href }) => (
                  <button key={label} onClick={() => { router.push(href); setMobileOpen(false); }} className="text-left w-full px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-black/5" style={{ fontFamily: 'var(--font-body)' }}>{label}</button>
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
