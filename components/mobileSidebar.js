"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ShoppingBag,
  Phone,
  UserRound,
  X,
  Plus,
  Minus,
  Package2,
} from "lucide-react";
import { iconMap, staticCategories } from "../public/data/categories";

export default function MobileSidebar({ setCloseSidebar, closeSidebar }) {
  const sidebarRef = useRef(null);
  const [openStates, setOpenStates] = useState({});

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = closeSidebar ? "auto" : "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [closeSidebar]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setCloseSidebar(true);
      }
    };
    if (!closeSidebar) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeSidebar, setCloseSidebar]);

  const toggleDropdown = useCallback(
    (i, hasSub) => {
      if (!hasSub) return setCloseSidebar(true);
      setOpenStates((p) => ({ ...p, [i]: !p[i] }));
    },
    [setCloseSidebar]
  );

  return (
    <div
      className={`fixed inset-0 z-40 flex bg-gray-700/40 dark:bg-gray-900/70 backdrop-blur-sm transition-transform duration-300 ${
        closeSidebar ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <aside
        ref={sidebarRef}
        className="relative w-11/12 sm:w-96 max-w-sm bg-white dark:bg-gray-800 shadow-2xl rounded-r-2xl overflow-y-auto"
      >
        {/* Header */}
        <header className="flex justify-between items-center border-b px-3 dark:border-gray-700">
          <Image
            src="/images/logo/Arenq_light.png"
            alt="logo"
            width={90}
            height={90}
            className="object-contain rounded-lg"
            priority
          />
          <button
            onClick={() => setCloseSidebar(true)}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </header>

        <nav className="p-4 space-y-5">
          {/* Welcome */}
          <section>
            <h6 className="uppercase mb-3 font-bold tracking-wide text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
              WELCOME
            </h6>

            {[
              { href: "/", label: "HOME", Icon: Home },
              { href: "/shop", label: "SHOP", Icon: ShoppingBag },
            ].map(({ href, label, Icon }) => (
              <Link key={href} href={href} onClick={() => setCloseSidebar(true)}>
                <div className="flex items-center gap-3 p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg sm:text-xl uppercase font-semibold tracking-wide">
                  <Icon size={20} /> {label}
                </div>
              </Link>
            ))}
          </section>

          {/* Categories */}
          <section>
            <h6 className="uppercase mb-3 font-bold tracking-wide text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
              CATEGORIES
            </h6>

            {staticCategories.map((item, i) => {
              const open = openStates[i];
              return (
                <div key={i} className="mb-2">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                    onClick={() =>
                      toggleDropdown(i, item.subcategories.length > 0)
                    }
                  >
                    <Link
                      href={{
                        pathname: "/search",
                        query: { category: item.category },
                      }}
                      className="text-gray-700 dark:text-gray-200 text-lg sm:text-xl uppercase font-semibold tracking-wide"
                    >
                      {item.name}
                    </Link>

                    {item.subcategories.length > 0 && (
                      <span>
                        {open ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    )}
                  </div>

                  {open && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subcategories.map((sub, j) => (
                        <Link
                          key={j}
                          href={{ pathname: "/search", query: { q: sub } }}
                          onClick={() => setCloseSidebar(true)}
                        >
                          <div className="flex items-center gap-2 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-base sm:text-lg uppercase tracking-wide">
                            {iconMap[sub] || <Package2 size={16} />}
                            {sub}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>

          {/* Help */}
          <section>
            <h6 className="uppercase mb-3 font-bold tracking-wide text-gray-700 dark:text-gray-300 text-lg sm:text-xl">
              HELP
            </h6>

            {[
              { href: "/blog", label: "BLOGS" },
              { href: "/about-us", label: "ABOUT US" },
              { href: "/contact-us", label: "CONTACT US" },
              { href: "/bulk-order", label: "BULK ORDER" },
              { href: "/policies/shipping-policy", label: "SHIPPING POLICY" },
              { href: "/FAQs", label: "FAQ" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setCloseSidebar(true)}>
                <div className="block p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg uppercase font-semibold tracking-wide">
                  {label}
                </div>
              </Link>
            ))}
          </section>

          {/* Support */}
          <section className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-bold mb-2 text-lg sm:text-xl uppercase tracking-wide">
              <UserRound size={20} /> CUSTOMER CARE
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 uppercase">
              NEED HELP? CALL US AT
            </p>

            <div className="flex justify-center items-center text-green-600 dark:text-green-400 font-bold gap-2 text-lg sm:text-xl">
              <Phone size={18} /> +91 78767 52516
            </div>

            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 uppercase">
              MON–SAT: 8 AM – 10 PM <br /> SUN: 10 AM – 7 PM
            </p>
          </section>
        </nav>
      </aside>
    </div>
  );
}