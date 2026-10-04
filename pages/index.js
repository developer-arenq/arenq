import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useRef } from "react";

import CategorySlider from "../components/CategorySlider";
import WhyChooseUs from "../components/WhyChooseUs";
import Slider from "../components/Slider";
import Heading from "../components/Heading";
import Sourcing from "../components/Sourcing";
import Process from "../components/Process";
import Quality from "../components/Quality";
import CustomersSay from "../components/Customers-Say";
import OurStory from "../components/OurStory";
import Occasion from "../components/Occasion";
import Videosec from "../components/Videosec";
import About from "../components/About-Arenq";
import HeroPowerAnimation from "../components/Power";
import HomePage from "../components/Home";
import OurClients from "../components/OurClients";

/* ---------------------------
   Intersection Lazy Wrapper
---------------------------- */

function LazyLoad({ children, height = 200 }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        children
      ) : (
        <div
          style={{ height }}
          className="bg-gray-200 animate-pulse rounded-2xl"
        />
      )}
    </div>
  );
}

/* ---------------------------
   Dynamic Imports
---------------------------- */

const FreshStock = dynamic(
  () => import("../components/FreshStock"),
  { ssr: false }
);

const ProductList = dynamic(
  () => import("../components/HomeProduct"),
  { ssr: false }
);

const BestSeller = dynamic(
  () => import("../components/BestSeller"),
  { ssr: false }
);

const TeaSpecial = dynamic(
  () => import("../components/TeaSpecial"),
  { ssr: false }
);

const Certification = dynamic(
  () => import("../components/Certification"),
  { ssr: false }
);

/* ---------------------------
   HOME PAGE
---------------------------- */

export default function Home() {
  return (
    <>
      <Head>

        {/* =====================================================
            PRIMARY SEO
        ====================================================== */}

        <title>
          ARENQ | Lithium Battery, BESS & Energy Storage Solutions
        </title>

        <meta
          name="description"
          content="ARENQ provides advanced lithium battery solutions, Battery Energy Storage Systems (BESS), EV batteries, solar energy storage and industrial power solutions for reliable and sustainable energy."
        />

        <meta
          name="keywords"
          content="ARENQ, lithium battery, lithium battery manufacturer India, lithium ion battery India, LiFePO4 battery, BESS, battery energy storage system, energy storage system, EV battery, solar battery, industrial battery, energy storage solutions, battery backup solutions, renewable energy storage"
        />

        <meta
          name="author"
          content="ARENQ"
        />

        <meta
          name="publisher"
          content="ARENQ"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <meta
          name="googlebot"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* =====================================================
            CANONICAL
        ====================================================== */}

        <link
          rel="canonical"
          href="https://arenq.co.in/"
        />

        {/* =====================================================
            LANGUAGE / REGION
        ====================================================== */}

        <meta
          httpEquiv="content-language"
          content="en-IN"
        />

        <meta
          name="geo.region"
          content="IN"
        />

        <meta
          name="geo.placename"
          content="India"
        />

        {/* =====================================================
            MOBILE
        ====================================================== */}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#ffffff"
        />

        {/* =====================================================
            FAVICON
        ====================================================== */}

        <link
          rel="icon"
          href="/images/logo/Arenq_light.png"
        />

        <link
          rel="apple-touch-icon"
          href="/images/logo/Arenq_light.png"
        />

        {/* =====================================================
            OPEN GRAPH / FACEBOOK / LINKEDIN
        ====================================================== */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:site_name"
          content="ARENQ"
        />

        <meta
          property="og:locale"
          content="en_IN"
        />

        <meta
          property="og:title"
          content="ARENQ | Lithium Battery & Energy Storage Solutions"
        />

        <meta
          property="og:description"
          content="Advanced lithium batteries, BESS, EV batteries and energy storage solutions engineered for reliable, efficient and sustainable power."
        />

        <meta
          property="og:url"
          content="https://arenq.co.in/"
        />

        <meta
          property="og:image"
          content="https://arenq.s3.ap-south-1.amazonaws.com/logo.png"
        />

        <meta
          property="og:image:alt"
          content="ARENQ Lithium Battery and Energy Storage Solutions"
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="630"
        />

        {/* =====================================================
            TWITTER / X
        ====================================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="ARENQ | Lithium Battery & Energy Storage Solutions"
        />

        <meta
          name="twitter:description"
          content="Explore ARENQ lithium batteries, BESS, EV battery solutions and advanced energy storage technology."
        />

        <meta
          name="twitter:image"
          content="https://arenq.s3.ap-south-1.amazonaws.com/logo.png"
        />

        <meta
          name="twitter:image:alt"
          content="ARENQ Energy Storage Solutions"
        />

        {/* =====================================================
            ORGANIZATION SCHEMA
        ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",

              "@id": "https://arenq.co.in/#organization",

              name: "ARENQ",

              url: "https://arenq.co.in/",

              logo: {
                "@type": "ImageObject",
                url: "https://arenq.s3.ap-south-1.amazonaws.com/logo.png"
              },

              image:
                "https://arenq.s3.ap-south-1.amazonaws.com/logo.png",

              description:
                "ARENQ provides advanced lithium battery solutions, Battery Energy Storage Systems (BESS), EV batteries, solar energy storage and industrial power solutions.",

              areaServed: {
                "@type": "Country",
                name: "India"
              },

              knowsAbout: [
                "Lithium Ion Batteries",
                "LiFePO4 Batteries",
                "Battery Energy Storage Systems",
                "BESS",
                "EV Batteries",
                "Energy Storage",
                "Solar Energy Storage",
                "Industrial Battery Solutions",
                "Renewable Energy Storage"
              ],

              sameAs: [
                "https://arenq.co.in/"
              ]
            })
          }}
        />

        {/* =====================================================
            WEBSITE SCHEMA
        ====================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",

              "@id": "https://arenq.co.in/#website",

              url: "https://arenq.co.in/",

              name: "ARENQ",

              description:
                "Lithium battery, BESS and energy storage solutions by ARENQ.",

              publisher: {
                "@id": "https://arenq.co.in/#organization"
              },

              inLanguage: "en-IN"
            })
          }}
        />

        {/* =====================================================
            SITE VERIFICATION
        ====================================================== */}

        <meta
          name="google-site-verification"
          content="RFi1c7hBBAGrx9xQfHji7xFArADz4UQbTUN-f1_qaMo"
        />

      </Head>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        style={{
          background:
            "linear-gradient(180deg,#f8fbff,#eef5f8)"
        }}
      >

        <HomePage />

        <CategorySlider />

        <About />

        <FreshStock />

        <HeroPowerAnimation />

        <Sourcing />

        <WhyChooseUs />

        <Process />

        <Videosec />

        {/* <Quality /> */}

        {/* <CustomersSay /> */}

        <OurStory />

        {/* <Occasion /> */}

        <Certification />

        <OurClients />

      </main>
    </>
  );
}