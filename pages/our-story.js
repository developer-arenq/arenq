'use client';

import Link from 'next/link';

const values = [
  {
    icon: "🔋",
    title: "Innovation",
    desc:
      "We continuously innovate advanced lithium battery technology to deliver efficient and reliable energy solutions.",
  },
  {
    icon: "⚡",
    title: "Performance",
    desc:
      "Our batteries are designed for high efficiency, longer life cycles and powerful energy delivery.",
  },
  {
    icon: "🛡️",
    title: "Quality & Safety",
    desc:
      "Every ARENQ solution follows strict quality standards ensuring safe and dependable performance.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    desc:
      "We are committed to clean energy adoption and creating a sustainable future through smart energy storage.",
  },
];

export default function OurStoryPage() {
  return (
    <main>
      {/* Hero with Mountain Image */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <img
          src="https://arenq.co.in/wp-content/uploads/2025/06/energy-storage-system-with-wind-turbine-scaled.jpg"
          alt="ARENQ Energy Storage Solutions"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,17,10,0.3) 0%, rgba(26,17,10,0.7) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '64px',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.8)',
                marginBottom: '16px',
              }}
            >
              OUR STORY
            </div>
            <h1
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: '800',
                color: '#F5F0E8',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
              }}
            >
              Powering The Future With Innovation
            </h1>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Discovery */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#7A3020',
              marginBottom: '16px',
            }}
          >
            The Beginning of Energy Innovation
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: '800',
              color: '#1A110A',
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            A Spoonful That Changed Everything
          </h2>

          <div style={{ fontSize: '18px', color: '#4A3728', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p>
              ARENQ was founded with a vision to transform the future of
              energy through advanced lithium battery technology and
              sustainable power solutions.
            </p>

            <p>
              With expertise in energy storage systems, electric mobility
              and renewable power applications, ARENQ started building
              solutions that help businesses move towards cleaner energy.
            </p>

            <p>
              Our journey began with one goal — making reliable,
              efficient and future-ready energy solutions accessible
              for everyone.
            </p>
          </div>

          {/* Pull quote */}
          <div
            style={{
              margin: '48px 0',
              padding: '32px 40px',
              borderLeft: '4px solid #7A3020',
              background: 'hsl(38 40% 97%)',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <p
              style={{
                fontSize: '24px',
                fontStyle: 'italic',
                fontWeight: '600',
                color: '#7A3020',
                lineHeight: '1.5',
                margin: 0,
              }}
            >
              "Energy innovation today creates a cleaner tomorrow."
            </p>
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#9B8B7E', fontWeight: '600' }}>
              — ARENQ
            </p>
          </div>

          <div style={{ fontSize: '18px', color: '#4A3728', lineHeight: '1.8' }}>
            <p>
              Anubhav walked away from that conversation with a single question in his
              head: What if there were a direct path between the beekeeper and the
              people who would pay good money for something this extraordinary?
            </p>
          </div>
        </div>
      </section>

      {/* Mountain image break */}
      <section style={{ height: '460px', overflow: 'hidden' }}>
        <img
          src="https://arenq.co.in/wp-content/uploads/2025/06/energy-storage-system-with-wind-turbine-scaled.jpg"

          alt="EV Battery Technology"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </section>

      {/* Chapter 2: Building Arenq */}
      <section style={{ padding: '80px 24px', background: '#F5F0E8' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#7A3020', marginBottom: '16px',
            }}
          >
            CHAPTER TWO
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800',
              color: '#1A110A', letterSpacing: '-0.02em', marginBottom: '32px',
            }}
          >
            Building Advanced Energy Solutions
          </h2>

          <div style={{ fontSize: '18px', color: '#4A3728', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p>
              ARENQ focuses on next-generation lithium battery solutions
              for electric vehicles, solar energy storage, telecom,
              industrial backup and custom applications.
            </p>

            <p>
              Through research, engineering excellence and advanced
              manufacturing practices, we create reliable battery systems
              for modern energy needs.
            </p>

            <p>
              Our products are designed to deliver performance,
              safety and sustainability across multiple industries.
            </p>
          </div>

          {/* Pull quote */}
          <div
            style={{
              margin: '48px 0',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            <p
              style={{
                fontSize: '28px',
                fontStyle: 'italic',
                fontWeight: '700',
                color: '#7A3020',
                lineHeight: '1.4',
                margin: 0,
              }}
            >
              "ARENQ — Forward To Future"
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: Where We Are Now */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#7A3020', marginBottom: '16px',
            }}
          >
            CHAPTER THREE
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800',
              color: '#1A110A', letterSpacing: '-0.02em', marginBottom: '32px',
            }}
          >
            Growing Towards A Sustainable Future
          </h2>

          <div style={{ fontSize: '18px', color: '#4A3728', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p>
              Today ARENQ is trusted for innovative battery technology,
              energy storage systems and reliable power solutions.
            </p>

            <p>
              Our lithium batteries support EV mobility, renewable
              energy projects and industrial applications.
            </p>

            <p>
              With continuous innovation, ARENQ is building smarter,
              cleaner and more efficient energy solutions for tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: 'hsl(145 20% 14%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#C96A28', marginBottom: '12px',
              }}
            >
              WHAT WE STAND FOR
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
              Our Values
            </h2>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
            className="values-grid"
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '32px 24px',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{ fontWeight: '700', fontSize: '18px', color: '#F5F0E8', marginBottom: '12px' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(245,240,232,0.7)', lineHeight: '1.7' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 768px) {
              .values-grid { grid-template-columns: repeat(2,1fr) !important; }
            }
            @media (max-width: 480px) {
              .values-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 24px',
          background: '#F5F0E8',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#1A110A', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Power The Future With ARENQ
          </h2>
          <p style={{ fontSize: '18px', color: '#4A3728', lineHeight: '1.7', marginBottom: '40px' }}>
            Choose ARENQ for advanced lithium batteries,
            EV solutions, solar energy storage and reliable
            power technology.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#7A3020',
                color: '#fff',
                padding: '18px 36px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              Explore Solutions →
            </Link>
            <Link
              href="/about-us"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#7A3020',
                padding: '18px 36px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
                border: '2px solid #7A3020',
              }}
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
