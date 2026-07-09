'use client';

import Link from 'next/link';

const timeline = [
  {
    year: "2021",
    event: "Company Established",
    desc:
      "SUNLIT Power Pvt Ltd established ARENQ with a vision to deliver advanced energy storage and lithium battery solutions."
  },
  {
    year: "2022",
    event: "EV Innovation",
    desc:
      "Developed advanced powertrain solutions for electric vehicles and expanded EV battery technology."
  },
  {
    year: "2023",
    event: "Manufacturing Expansion",
    desc:
      "Started expansion towards advanced lithium battery manufacturing and industrial solutions."
  },
  {
    year: "2024",
    event: "OEM Partnerships",
    desc:
      "Partnered with leading companies for battery solutions and energy storage applications."
  },
  {
    year: "2025",
    event: "Future Growth",
    desc:
      "Expanding clean energy solutions with advanced battery technologies across industries."
  },
];

const impactStats = [
  {
    value: "150+",
    label: "Domestic Clients",
    desc: "Trusted partners"
  },
  {
    value: "125+",
    label: "Happy Customers",
    desc: "Energy solutions delivered"
  },
  {
    value: "150+",
    label: "Projects Completed",
    desc: "Across industries"
  },
  {
    value: "35000+",
    label: "Products Delivered",
    desc: "Reliable batteries supplied"
  },
];

const partners = [
  "EV Industry",
  "Solar Energy",
  "Industrial Sector",
  "Telecom Sector",
  "OEM Partners",
];

const certifications = [
  {
    icon: "🔋",
    name: "Advanced Lithium Technology",
    desc: "High performance LiFePO4 battery solutions."
  },

  {
    icon: "⚡",
    name: "Energy Innovation",
    desc: "Smart power solutions for EV and industries."
  },

  {
    icon: "🌱",
    name: "Clean Energy Future",
    desc: "Supporting renewable and sustainable energy."
  },

  {
    icon: "🏭",
    name: "Manufacturing Excellence",
    desc: "Reliable battery manufacturing standards."
  },

  {
    icon: "🛡️",
    name: "Quality & Safety",
    desc: "Safe and efficient battery systems."
  },

  {
    icon: "🌍",
    name: "Forward To Future",
    desc: "Building tomorrow's energy ecosystem."
  },
];

export default function AboutUs() {
  return (
    <main>
      {/* Page Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, hsl(38 40% 95%) 0%, hsl(36 35% 92%) 50%, hsl(145 18% 91%) 100%)',
          padding: '100px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(122, 48, 32, 0.1)',
              color: '#7A3020',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            ⚡ Advanced Energy Solutions • Forward To Future
          </div>
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '800',
              color: '#1A110A',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              marginBottom: '20px',
            }}
          >
            About <span style={{ color: '#7A3020' }}>ARENQ</span>
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#4A3728',
              lineHeight: '1.7',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            ARENQ is a trusted energy storage brand delivering advanced lithium batteries,
            EV battery solutions and sustainable power technologies for industries worldwide.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
          className="story-grid"
        >
          <div>
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
              OUR STORY
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: '800',
                color: '#1A110A',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              Powering The Future With Energy Innovation
            </h2>
            <div style={{ fontSize: '16px', color: '#4A3728', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                At ARENQ, we believe in transforming the future of energy storage.
              </p>

              <p>
                Our advanced lithium and EV battery solutions are designed to power everything
                from electric vehicles and industrial systems to renewable energy applications.
              </p>

              <p>
                With innovation, quality and reliability at our core, ARENQ is creating cleaner
                and smarter energy solutions for tomorrow.
              </p>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(122,48,32,0.18)',
              }}
            >
              <img
                src="/images/aboutus/person.webp"
                alt="ARENQ lithium battery and energy solutions"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: '#7A3020',
                color: '#fff',
                padding: '20px 24px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(122,48,32,0.3)',
              }}
            >
              <div style={{ fontWeight: '800', fontSize: '28px' }}>
                35000+
              </div>

              <div style={{ fontSize: '13px', opacity: 0.85 }}>
                Batteries Delivered
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '80px 24px', background: '#F5F0E8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#1A110A', letterSpacing: '-0.02em' }}>
              Vision & Mission
            </h2>
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}
            className="vm-grid"
          >
            <div
              style={{
                background: '#7A3020',
                color: '#fff',
                padding: '40px',
                borderRadius: '20px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔭</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', opacity: 0.9 }}>
                To become a global leader in advanced energy storage technology by delivering
                safe, reliable and sustainable lithium battery solutions.
              </p>
            </div>
            <div
              style={{
                background: '#1F4A2A',
                color: '#fff',
                padding: '40px',
                borderRadius: '20px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Our Mission</h3>
              <ul style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.9 }}>
                <li>Develop advanced lithium battery technology.</li>
                <li>Deliver EV and industrial energy solutions.</li>
                <li>Support renewable energy transformation.</li>
                <li>Create reliable and sustainable power systems.</li>
                <li>Build a cleaner energy future.</li>
              </ul>
            </div>
          </div>
          <style>{`
            @media (max-width: 600px) {
              .vm-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#7A3020', marginBottom: '12px',
              }}
            >
              OUR JOURNEY
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#1A110A', letterSpacing: '-0.02em' }}>
              How We Got Here
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '60px',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'rgba(122,48,32,0.15)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: '80px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#7A3020',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '11px',
                        zIndex: 1,
                        flexShrink: 0,
                      }}
                    >
                      {item.year.slice(2)}
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: '800',
                        color: '#7A3020',
                        marginTop: '4px',
                      }}
                    >
                      {item.year}
                    </div>
                  </div>
                  <div style={{ paddingTop: '8px', flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '18px', color: '#1A110A', marginBottom: '6px' }}>
                      {item.event}
                    </div>
                    <div style={{ fontSize: '15px', color: '#6B5A4E', lineHeight: '1.7' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ padding: '80px 24px', background: 'hsl(145 20% 14%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#C96A28', marginBottom: '12px',
              }}
            >
              ARENQ IMPACT
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
              Numbers That Matter
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
            className="impact-grid"
          >
            {impactStats.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '800', color: '#C96A28', lineHeight: '1', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#F5F0E8', marginBottom: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(245,240,232,0.5)' }}>
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 600px) {
              .impact-grid { grid-template-columns: repeat(2,1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Team / Founder */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#7A3020', marginBottom: '12px',
              }}
            >
              THE PEOPLE
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '800', color: '#1A110A', letterSpacing: '-0.02em' }}>
              Who Makes ARENQ
            </h2>
          </div>

          {/* Founder & Chairman */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '40px',
              alignItems: 'center',
              background: '#F5F0E8',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px',
            }}
            className="founder-grid"
          >
            <div>
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7A3020 0%, #C96A28 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '56px',
                  fontWeight: '700',
                  margin: '0 auto',
                }}
              >
                SN
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1A110A', marginBottom: '4px' }}>
                Shyam Manohar Nayak

              </h3>
              <div style={{ fontSize: '14px', color: '#7A3020', fontWeight: '600', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Founder & Chairman
              </div>
              <p style={{ fontSize: '16px', color: '#4A3728', lineHeight: '1.7' }}>
                Shyam Manohar Nayak, a visionary entrepreneur and industry pioneer, has been instrumental in transforming Maharashtra’s electrical landscape. With a deep-rooted passion for sustainable energy and innovation, he laid the foundation for Sunlit Power, a company committed to delivering next-generation energy solutions that empower businesses and communities alike.


              </p>
            </div>
          </div>

          {/* Managing Director */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '40px',
              alignItems: 'center',
              background: '#F5F0E8',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px',
            }}
            className="founder-grid"
          >
            <div>
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7A3020 0%, #C96A28 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '56px',
                  fontWeight: '700',
                  margin: '0 auto',
                }}
              >
                JP
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1A110A', marginBottom: '4px' }}>
                Jitendra Patil
              </h3>
              <div style={{ fontSize: '14px', color: '#7A3020', fontWeight: '600', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Managing Director
              </div>
              <p style={{ fontSize: '16px', color: '#4A3728', lineHeight: '1.7' }}>
                Behind ARENQ is a team of engineers, innovators and energy experts working
                towards advanced battery technologies and sustainable power solutions.
              </p>
            </div>
          </div>

          {/*  Director */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '40px',
              alignItems: 'center',
              background: '#F5F0E8',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '40px',
            }}
            className="founder-grid"
          >
            <div>
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7A3020 0%, #C96A28 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '56px',
                  fontWeight: '700',
                  margin: '0 auto',
                }}
              >
                AN
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1A110A', marginBottom: '4px' }}>
                Akash Kumar Nayak
              </h3>
              <div style={{ fontSize: '14px', color: '#7A3020', fontWeight: '600', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Director
              </div>
              <p style={{ fontSize: '16px', color: '#4A3728', lineHeight: '1.7' }}>
                ARENQ is a team of engineers, innovators and energy experts working
                towards advanced battery technologies and sustainable power solutions.
              </p>
            </div>
          </div>



          {/* Founder Quote */}
          <blockquote
            style={{
              borderLeft: '4px solid #7A3020',
              paddingLeft: '32px',
              margin: '56px 0 0',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '80px', color: 'rgba(122,48,32,0.15)', lineHeight: '0.5', marginBottom: '16px' }}>"</div>
            <p
              style={{
                fontSize: '22px',
                fontStyle: 'italic',
                color: '#1A110A',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}
            >
              Innovation and sustainable energy are the foundation of tomorrow.
              At ARENQ, we are committed to building advanced power solutions
              that create a cleaner and smarter future.
            </p>
            <footer style={{ fontSize: '15px', color: '#7A3020', fontWeight: '700' }}>
              — Shyam Manohar Nayak
              , Founder & Chairman
            </footer>
          </blockquote>
          <style>{`
            @media (max-width: 600px) {
              .founder-grid { grid-template-columns: 1fr !important; text-align: center; }
            }
          `}</style>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: '64px 24px', background: '#F5F0E8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '800', color: '#1A110A', marginBottom: '40px' }}>
            Certifications & Standards
          </h2>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
            className="cert-grid"
          >
            {certifications.map((cert) => (
              <div
                key={cert.name}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{cert.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#1A110A', marginBottom: '8px' }}>
                  {cert.name}
                </div>
                <div style={{ fontSize: '14px', color: '#6B5A4E', lineHeight: '1.6' }}>
                  {cert.desc}
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 600px) {
              .cert-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>



      {/* CTA */}
      <section style={{ padding: '64px 24px', background: '#F5F0E8', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1A110A', marginBottom: '16px' }}>
            Powering A Sustainable Tomorrow
          </h2>
          <p style={{ fontSize: '16px', color: '#4A3728', lineHeight: '1.7', marginBottom: '32px' }}>
            Choose ARENQ for advanced lithium batteries, EV power solutions,
            solar applications and reliable energy storage technologies.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/category/all"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#7A3020',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
              }}
            >
              Explore Products →
            </Link>
            <Link
              href="/our-story"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#7A3020',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
                border: '2px solid #7A3020',
              }}
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
