"use client";

import {
  ShieldCheck,
  FlaskConical,
  Truck,
  Users,
  Package,
  Zap,
} from "lucide-react";


function MountainDivider({
  bg = "hsl(36 28% 96%)",
  nextBg = "hsl(38 25% 93%)",
}) {
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: 50,
          display: "block",
          fill: nextBg,
        }}
      >
        <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
      </svg>
    </div>
  );
}


export default function WhyChooseUs() {


  const trustItems = [
    {
      icon: Zap,
      title: "Advanced Technology",
      desc:
        "High-performance lithium battery solutions powered by modern energy technology.",
    },

    {
      icon: FlaskConical,
      title: "Quality Tested",
      desc:
        "Every battery undergoes strict performance, safety and reliability testing.",
    },

    {
      icon: Package,
      title: "Custom Solutions",
      desc:
        "Customized battery packs designed for EV, solar and industrial applications.",
    },

    {
      icon: ShieldCheck,
      title: "Safety Assured",
      desc:
        "Reliable LiFePO4 battery systems built with advanced safety standards.",
    },

    {
      icon: Users,
      title: "Trusted Partnership",
      desc:
        "Supporting OEMs, businesses and industries with sustainable energy solutions.",
    },

    {
      icon: Truck,
      title: "Pan India Support",
      desc:
        "Efficient service and product support across multiple industries in India.",
    },
  ];


  return (
    <>

      <section className="py-12 sm:py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">


          <div className="text-center mb-12">

            <p className="label-tag mb-2">
              Our Promise
            </p>

            <h2 className="section-heading">
              Why Businesses Trust
              <br />
              ARENQ Energy Solutions
            </h2>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">

            {trustItems.map((item, i) => {

              const Icon = item.icon;

              return (

                <div key={i} className="trust-badge">

                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "hsl(12 55% 38% / 0.1)",
                      color:
                        "hsl(12 55% 38%)",
                    }}
                  >

                    <Icon
                      size={22}
                      strokeWidth={1.5}
                    />

                  </div>


                  <div>

                    <h3
                      className="font-bold text-sm mb-1"
                      style={{
                        fontFamily:
                          "var(--font-body)",
                        color:
                          "hsl(20 25% 12%)",
                      }}
                    >
                      {item.title}
                    </h3>


                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color:
                          "hsl(30 12% 48%)",
                      }}
                    >
                      {item.desc}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>


          {/* Counter */}
          <div
            className="mt-12 rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            style={{
              background: "hsl(12 55% 38%)",
              color: "white",
            }}
          >

            {[
              ["150+", "Domestic Clients"],
              ["125+", "Happy Customers"],
              ["150+", "Projects Completed"],
              ["35000+", "Products Delivered"],
            ].map(([n, l]) => (

              <div key={l}>

                <div
                  style={{
                    fontFamily:
                      "var(--font-display)",
                    fontSize:
                      "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: 700,
                  }}
                >
                  {n}
                </div>

                <div className="text-xs mt-0.5 opacity-80">
                  {l}
                </div>

              </div>

            ))}

          </div>


        </div>

      </section>


      <MountainDivider
        bg="hsl(36 28% 96%)"
        nextBg="hsl(38 25% 93%)"
      />

    </>
  );
}