import { useRouter } from 'next/router';
import React from 'react';

function MountainDivider({
  bg = 'hsl(36 28% 96%)',
  nextBg = 'hsl(38 25% 93%)',
}) {
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: 50,
          display: 'block',
          fill: nextBg,
        }}
      >
        <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
      </svg>
    </div>
  );
}

const hampers = [
  {
    name: "EV Lithium Battery Solution",
    price: "Custom",
    mrp: "",
    tag: "EV Power",
    img: "/images/products/ev-battery.webp",
    link: "/search?q=ev-battery",
  },

  {
    name: "Solar Energy Storage Battery",
    price: "Custom",
    mrp: "",
    tag: "Solar",
    img: "/images/products/solar-battery.webp",
    link: "/search?q=solar-battery",
  },

  {
    name: "Industrial Power Backup System",
    price: "Custom",
    mrp: "",
    tag: "Industrial",
    img: "/images/products/industrial-battery.webp",
    link: "/search?q=industrial-battery",
  },

  {
    name: "LiFePO4 Battery Pack",
    price: "Custom",
    mrp: "",
    tag: "Bestseller",
    img: "/images/products/lifepo4-battery.webp",
    link: "/search?q=lithium-battery",
  },
];

const Occasion = () => {
  const router = useRouter();

  return (
    <>
      <section
        className="py-12 sm:py-16"
        style={{ background: 'hsl(38 25% 93%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 fade-up">
            <p className="label-tag mb-2"> ARENQ Products</p>

            <h2 className="section-heading">
              Advanced Energy Solutions
            </h2>

            <p className="section-subheading mx-auto mt-2">
              Explore advanced lithium battery solutions built for EV,
              solar, industrial and energy storage applications.
            </p>
          </div>

          <div className="scroll-x sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 fade-up">
            {hampers.map((h, i) => (
              <div
                key={i}
                className="gift-card flex-shrink-0 w-56 sm:w-auto cursor-pointer"
                onClick={() => router.push(h.link)}
              >
                <div
                  style={{
                    aspectRatio: '3/4',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={h.img}
                    alt={h.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-108"
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                    }}
                  />

                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'hsl(12 55% 38%)',
                      color: 'white',
                    }}
                  >
                    {h.tag}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '16px',
                    }}
                  >
                    <div className="text-sm font-bold text-white mb-1">
                      {h.name}
                    </div>

                      
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() =>
                router.push('/search')
              }
              className="btn-primary px-8 py-3.5"
            >
              Explore All Solutions
            </button>
          </div>
        </div>
      </section>

      <MountainDivider
        bg="hsl(38 25% 93%)"
        nextBg="hsl(36 28% 96%)"
      />
    </>
  );
};

export default Occasion;