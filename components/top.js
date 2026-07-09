/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { WhatsappIcon } from "react-share";

const Whatsapp = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fixed bottom-4 right-0 z-20 flex flex-col items-end space-y-4">
        {/* <div className="relative group flex items-center">
          <span className="absolute right-full mr-2 hidden group-hover:flex w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md">
            Click for help and support
          </span>

          <Link
            href="https://api.whatsapp.com/send/?phone=918956225134&text&type=phone_number&app_absent=0"
            className="bg-white p-2 rounded-md border border-black shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon size={22} round />
          </Link>
        </div> */}

        {showScroll && (
          <div className="relative group flex items-center">
            <span className="absolute right-full mr-2 hidden group-hover:flex w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md">
              Back to Top
            </span>

            <button
              className="bg-white p-2 rounded-md border border-black shadow-md"
              onClick={handleScrollToTop}
            >
              <FaArrowUp className="text-black" size={21} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Whatsapp;