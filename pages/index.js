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
const FreshStock = dynamic(() => import("../components/FreshStock"), { ssr: false });
const ProductList = dynamic(() => import("../components/HomeProduct"), { ssr: false });
const BestSeller = dynamic(() => import("../components/BestSeller"), { ssr: false });
const TeaSpecial = dynamic(() => import("../components/TeaSpecial"), { ssr: false });
const Certification = dynamic(() => import("../components/Certification"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        {/* 🔥 PRIMARY SEO */}
        <title>
          Arenq | Advanced Energy Storage Solutions & Lithium Battery Manufacturer
        </title>

        <meta
          name="description"
          content="Arenq provides advanced lithium battery solutions, energy storage systems, EV batteries, solar batteries and innovative power solutions for a sustainable future."
        />

        <meta
          name="keywords"
          content="Arenq, lithium battery manufacturer India, energy storage solutions, EV batteries, solar battery, lithium ion battery, renewable energy solutions"
        />

        <meta name="robots" content="index, follow" />

        {/* 🔗 CANONICAL */}
        <link rel="canonical" href="https://arenq.co.in/" />

        {/* 📱 MOBILE */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🎨 ICON */}
        <link rel="icon" href="/images/logo/Arenq_light.png" />

        {/* 🌍 GEO SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="India" />

        {/* 📢 OPEN GRAPH */}
        <meta
          property="og:title"
          content="Arenq - Advanced Lithium Battery & Energy Solutions"
        />

        <meta
          property="og:description"
          content="Powering the future with reliable lithium batteries, EV energy solutions and sustainable storage technology."
        />

        <meta property="og:url" content="https://arenq.co.in/" />

        <meta
          property="og:image"
          content="https://arenq.s3.ap-south-1.amazonaws.com/Arenq_light.png"
        />

        <meta property="og:type" content="website" />

        {/* 🐦 TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="Arenq - Lithium Battery & Energy Storage Solutions"
        />

        <meta
          name="twitter:description"
          content="Explore Arenq's advanced lithium batteries, EV power solutions and sustainable energy technology."
        />

        {/* 🔥 STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arenq",
              image:
                "https://arenq.s3.ap-south-1.amazonaws.com/Arenq_light.png",
              url: "https://arenq.co.in",
              description:
                "Arenq provides lithium battery technology, energy storage systems, EV battery solutions and renewable energy innovations.",
              sameAs: [
                "https://arenq.co.in"
              ],
              areaServed: {
                "@type": "Country",
                name: "India"
              },
              industry: "Energy Storage and Lithium Battery Technology"
            }),
          }}
        />
      </Head>

      {/* 🔥 HERO */}


      <main className="">
        <Slider />
        {/* <Heading /> */}
        <CategorySlider />
        <FreshStock />
        {/* <ProductList />
        <BestSeller />
        <TeaSpecial /> */}
        <Sourcing />
        <WhyChooseUs />
        <Process />
        <Videosec />
        {/* <Quality/> */}
        {/* <CustomersSay /> */}
        <OurStory />
        {/* <Occasion /> */}
        <Certification />
      </main>
    </>
  );
}