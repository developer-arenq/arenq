'use client';
import { useRouter } from 'next/navigation';
import { Building2, Package, Store, Coffee, TrendingUp, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';

const programs = [
  {
    icon: Building2,
    title: "OEM Partnership",
    subtitle: "Battery Manufacturing Solutions",

    desc:
      "Partner with ARENQ for advanced lithium battery manufacturing solutions. We provide reliable energy storage products for EV, industrial, solar and commercial applications.",

    features: [
      "Custom lithium battery solutions",
      "EV & industrial battery support",
      "Advanced LiFePO4 technology",
      "Quality tested battery systems",
      "Dedicated technical assistance",
    ],

    cta: "Become OEM Partner",
    color: "hsl(205 90% 40%)",
  },

  {
    icon: TrendingUp,
    title: "Become a Distributor",

    subtitle: "Join ARENQ Network",

    desc:
      "Expand your business with ARENQ's growing energy solutions network. Partner with us to distribute next-generation batteries across India.",

    features: [
      "Regional distribution opportunities",
      "Sales & product training",
      "Marketing support",
      "Strong product portfolio",
      "Business growth assistance",
    ],

    cta: "Apply For Distribution",

    color: "hsl(45 95% 50%)",
  },

  {
    icon: Store,

    title: "Industrial Solutions",

    subtitle: "Energy Solutions For Industries",

    desc:
      "ARENQ provides high-performance lithium battery solutions for industries, telecom, UPS, material handling and energy backup requirements.",

    features: [
      "Industrial battery solutions",
      "UPS & backup power",
      "Telecom applications",
      "Long life performance",
      "Reliable energy storage",
    ],

    cta: "Request Industrial Solution",

    color: "hsl(200 80% 45%)",
  },

  {
    icon: Package,

    title: "Bulk Battery Requirement",

    subtitle: "Custom Energy Storage",

    desc:
      "Get customized battery packs and energy storage systems designed according to your business and application requirements.",

    features: [
      "Custom battery packs",
      "BESS solutions",
      "Solar energy storage",
      "EV battery solutions",
      "Technical consultation",
    ],

    cta: "Send Requirement",

    color: "hsl(180 70% 40%)",
  },
];

const currentPartners = [
  {
    name: "EV Industry",
    type: "Battery Solutions",
    location: "India"
  },
  {
    name: "Solar Sector",
    type: "Energy Storage",
    location: "India"
  },
  {
    name: "Industrial Sector",
    type: "UPS Batteries",
    location: "India"
  },
  {
    name: "Telecom Industry",
    type: "Power Backup",
    location: "India"
  },
  {
    name: "OEM Partners",
    type: "Manufacturing",
    location: "India"
  },
];

const faqB2B = [
  {
    q: "What battery solutions does ARENQ provide?",
    a: "ARENQ provides EV batteries, solar batteries, UPS batteries, industrial batteries and energy storage systems."
  },

  {
    q: "Do you provide custom battery solutions?",
    a: "Yes, ARENQ develops customized lithium battery solutions based on application requirements."
  },

  {
    q: "Can industries partner with ARENQ?",
    a: "Yes, we support OEMs, distributors, industries and businesses with advanced energy solutions."
  },

  {
    q: "Which battery technology does ARENQ use?",
    a: "ARENQ specializes in advanced Lithium LiFePO4 battery technology."
  },

  {
    q: "Do you provide bulk battery supply?",
    a: "Yes, ARENQ supports bulk requirements and business partnerships."
  },
];

export default function WholesalePage() {
  const router = useRouter();

  return (
    <div style={{ background: 'hsl(36 28% 96%)' }}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, hsl(145 20% 14%), hsl(20 25% 10%))' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, hsl(12 55% 38% / 0.18) 0%, transparent 60%)',
        }} />
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full" style={{ opacity: 0.1 }}>
          <path d="M0 120 L360 30 L720 80 L1080 20 L1440 70 L1440 120Z" fill="hsl(36 28% 96%)" />
        </svg>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <p className="label-tag mb-4" style={{ background: 'hsl(28 65% 52% / 0.2)', color: 'hsl(28 65% 72%)' }}>Business Partnerships</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, color: 'hsl(36 28% 96%)', lineHeight: 1.15 }}>
            Power Your Future<br />With ARENQ
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: 'hsl(36 28% 75%)' }}>
            ARENQ delivers advanced lithium battery technology,
            EV battery systems and energy storage solutions
            for businesses, industries and a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="https://wa.me/918956225134?text=Hello%2C%20I%20am%20interested%20in%20a%20wholesale%20partnership%20with%20ApneeHatti" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3 inline-flex items-center gap-2 justify-center">
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
            <a href="mailto:info@arenq.co.in?subject=B2B Wholesale Enquiry" className="btn-outline px-8 py-3 inline-flex items-center gap-2 justify-center" style={{ borderColor: 'hsl(36 28% 60%)', color: 'hsl(36 28% 90%)' }}>
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="label-tag mb-3">Partnership Programs</p>
            <h2 className="section-heading">Find the Right<br />Partnership for You</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <div key={i} className="rounded-3xl overflow-hidden hover-lift" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                  <div className="h-2" style={{ background: prog.color }} />
                  <div className="p-7">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${prog.color}15`, color: prog.color }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'hsl(20 25% 12%)' }}>{prog.title}</h3>
                    <p className="text-xs font-medium mt-0.5 mb-3" style={{ color: prog.color }}>{prog.subtitle}</p>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(30 12% 40%)' }}>{prog.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {prog.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs">
                          <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: prog.color }} />
                          <span style={{ color: 'hsl(30 12% 38%)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/918956225134?text=Hello%2C%20I%20am%20interested%20in%3A%20${encodeURIComponent(prog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all"
                      style={{ background: prog.color, color: 'white' }}
                    >
                      {prog.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bulk Pricing */}
      <section className="py-16 sm:py-20" style={{ background: 'hsl(38 25% 93%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="label-tag mb-3">Bulk Pricing</p>
            <h2 className="section-heading">Pricing Tiers</h2>
            <p className="mt-3 text-sm" style={{ color: 'hsl(30 12% 48%)' }}>The larger you order, the better the price. Simple.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: 'hsl(145 35% 22%)', color: 'white' }}>
                  {['Order Value', 'Discount', 'Lead Time', 'Account Manager', 'Credit Terms'].map((h, i) => (
                    <th key={h} className={`px-4 py-3 font-semibold text-left text-xs ${i === 0 ? 'rounded-tl-xl' : ''} ${i === 4 ? 'rounded-tr-xl' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['₹8,000 – ₹25,000', '20–25%', '3–5 days', '—', 'Advance'],
                  ['₹25,000 – ₹75,000', '30–35%', '3–4 days', 'Dedicated', 'Advance'],
                  ['₹75,000 – ₹2,00,000', '37–40%', '2–3 days', 'Dedicated', '15-day net'],
                  ['₹2,00,000+', 'Custom', '1–2 days', 'Priority', '30-day net'],
                ].map(([val, disc, lead, mgr, terms], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : 'hsl(38 20% 97%)' }}>
                    {[val, disc, lead, mgr, terms].map((cell, j) => (
                      <td key={j} className="px-4 py-3 border-b text-xs" style={{ borderColor: 'hsl(35 15% 88%)', fontWeight: j === 1 ? 700 : 400, color: j === 1 ? 'hsl(12 55% 38%)' : 'hsl(30 12% 35%)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs mt-4" style={{ color: 'hsl(30 12% 55%)' }}>All prices exclude GST and shipping. Shipping is free for orders above ₹50,000.</p>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="label-tag mb-3">Trusted By</p>
            <h2 className="section-heading">Our Current Partners</h2>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentPartners.map((p, i) => (
              <div key={i} className="rounded-2xl p-4 text-center hover-lift" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'hsl(12 55% 38% / 0.1)' }}>
                  <Building2 size={18} style={{ color: 'hsl(12 55% 38%)' }} />
                </div>
                <div className="font-semibold text-xs" style={{ color: 'hsl(20 25% 12%)' }}>{p.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'hsl(12 55% 48%)' }}>{p.type}</div>
                <div className="text-xs mt-0.5" style={{ color: 'hsl(30 12% 55%)' }}>{p.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ B2B */}
      <section className="py-16 sm:py-20" style={{ background: 'hsl(38 25% 93%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="label-tag mb-3">Common Questions</p>
            <h2 className="section-heading">B2B FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqB2B.map((item, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                <div className="font-semibold text-sm mb-2" style={{ color: 'hsl(20 25% 12%)' }}>{item.q}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(30 12% 45%)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 sm:py-18" style={{ background: 'hsl(12 55% 38%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'white' }} className="mb-3">
            Build The Future With ARENQ
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'hsl(12 55% 90%)' }}>
            Our B2B team is available Monday–Saturday, 9AM–7PM. We typically respond to all partnership enquiries within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/918956225134?text=Hello%2C%20I%20am%20interested%20in%20a%20business%20partnership%20with%20ApneeHatti" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm" style={{ background: 'white', color: 'hsl(12 55% 38%)' }}>
              <MessageCircle size={16} />
              WhatsApp: +91 78767 52516
            </a>
            <a href="mailto:info@arenq.co.in?subject=B2B Partnership Enquiry" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: 'hsl(12 55% 75%)', color: 'white' }}>
              <Mail size={16} />
              info@arenq.co.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
