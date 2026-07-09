import { Download, ExternalLink, Award, Newspaper, Megaphone } from 'lucide-react';

const pressReleases = [
  {
    date: "June 2026",
    title:
      "ARENQ Expands Advanced Lithium Battery Solutions Across India",
    excerpt:
      "ARENQ continues its mission of delivering innovative lithium battery technology, EV power solutions and energy storage systems for industries and businesses.",
    tag: "Growth",
  },
  {
    date: "March 2026",
    title:
      "ARENQ Strengthens EV Battery & Energy Storage Innovation",
    excerpt:
      "ARENQ focuses on next-generation LiFePO4 battery technology supporting electric mobility, renewable energy and industrial applications.",
    tag: "Innovation",
  },
  {
    date: "January 2026",
    title:
      "ARENQ Advances Sustainable Energy Solutions",
    excerpt:
      "With advanced battery engineering and reliable energy storage products, ARENQ continues building cleaner power solutions for the future.",
    tag: "Technology",
  },
  {
    date: "November 2025",
    title:
      "ARENQ Expands OEM & Industrial Energy Partnerships",
    excerpt:
      "ARENQ partners with businesses and industries to provide customized battery systems and advanced energy solutions.",
    tag: "Partnership",
  },
];

const newsCoverage = [
  {
    outlet: "Energy Industry",
    title: "ARENQ driving innovation in lithium battery technology",
    date: "May 2026",
    type: "Feature",
    url: "#",
    logo: "🔋"
  },
  {
    outlet: "EV Sector",
    title: "Advanced EV battery solutions powering electric mobility",
    date: "April 2026",
    type: "Technology",
    url: "#",
    logo: "⚡"
  },
  {
    outlet: "Renewable Energy",
    title: "Smart energy storage solutions for sustainable future",
    date: "March 2026",
    type: "Innovation",
    url: "#",
    logo: "🌱"
  }
];

const awards = [
  {
    year: "2026",
    award: "Energy Innovation Excellence",
    body: "Advanced Battery Technology",
    icon: "🏆",
    desc:
      "Recognised for innovation in lithium battery and clean energy solutions.",
  },

  {
    year: "2025",
    award: "EV Battery Technology Recognition",
    body: "Electric Mobility Solutions",
    icon: "🔋",
    desc:
      "For developing reliable battery systems supporting electric vehicles.",
  },

  {
    year: "2025",
    award: "Sustainable Energy Achievement",
    body: "Renewable Energy Sector",
    icon: "🌱",
    desc:
      "Committed towards sustainable energy storage and green technology.",
  }
];

export default function MediaPressPage() {
  return (
    <div style={{ background: 'hsl(36 28% 96%)' }}>
      {/* Hero */}
      <section className="py-16 sm:py-20 text-center" style={{ background: 'linear-gradient(135deg, hsl(20 25% 10%), hsl(12 55% 32%))' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="label-tag mb-4" style={{ background: 'hsl(28 65% 52% / 0.2)', color: 'hsl(28 65% 72%)' }}>Media & Press</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'hsl(36 28% 96%)', lineHeight: 1.15 }}>
            ARENQ<br />in the News
          </h1>
          <p className="mt-5 text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'hsl(36 28% 78%)' }}>
            Press releases, news coverage, and awards. For media enquiries, contact us at{' '}
            <a href="mailto:info@arenq.co.in" className="underline hover:no-underline" style={{ color: 'hsl(28 65% 72%)' }}>info@arenq.co.in</a>
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-sm mx-auto">
            {[['15+', 'Press Features'], ['5', 'Industry Awards'], ['3', 'Certifications']].map(([n, l]) => (
              <div key={l} className="rounded-2xl p-4" style={{ background: 'hsl(36 28% 96% / 0.08)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, color: 'hsl(28 65% 62%)' }}>{n}</div>
                <div className="text-xs mt-0.5" style={{ color: 'hsl(36 28% 75%)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: 'hsl(145 35% 22%)', color: 'white' }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Download size={18} style={{ color: 'hsl(28 65% 62%)' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'hsl(28 65% 62%)' }}>Press Kit</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>Download Our Media Kit</h3>
              <p className="text-sm mt-1" style={{ color: 'hsl(145 20% 72%)' }}>Brand assets, product information, technology details and company profile — everything a journalist needs.</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/918956225134?text=Hello%2C%20I%20am%20a%20journalist%20and%20would%20like%20the%20ARENQ%20press%20kit" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'hsl(28 65% 52%)', color: 'white' }}>
                <Download size={15} />
                Request Press Kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Megaphone size={20} style={{ color: 'hsl(12 55% 38%)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'hsl(20 25% 12%)' }}>Press Releases</h2>
          </div>
          <div className="space-y-4">
            {pressReleases.map((pr, i) => (
              <div key={i} className="rounded-2xl p-6 hover-lift" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'hsl(12 55% 38% / 0.1)', color: 'hsl(12 55% 38%)' }}>{pr.tag}</span>
                      <span className="text-xs" style={{ color: 'hsl(30 12% 55%)' }}>{pr.date}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-2" style={{ fontFamily: 'var(--font-body)', color: 'hsl(20 25% 12%)' }}>{pr.title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'hsl(30 12% 45%)' }}>{pr.excerpt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Coverage */}
      <section className="py-12 sm:py-16" style={{ background: 'hsl(38 25% 93%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper size={20} style={{ color: 'hsl(12 55% 38%)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'hsl(20 25% 12%)' }}>News Coverage</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsCoverage.map((item, i) => (
              <div key={i} className="rounded-2xl p-5 hover-lift" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl">{item.logo}</div>
                  <div>
                    <div className="font-bold text-xs" style={{ color: 'hsl(20 25% 12%)' }}>{item.outlet}</div>
                    <div className="text-xs" style={{ color: 'hsl(30 12% 55%)' }}>{item.date} · {item.type}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed font-medium mb-3" style={{ color: 'hsl(20 25% 22%)', fontStyle: 'italic' }}>{item.title}</p>
                <a href={item.url} className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: 'hsl(12 55% 38%)' }}>
                  Read Article <ExternalLink size={11} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Award size={20} style={{ color: 'hsl(12 55% 38%)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'hsl(20 25% 12%)' }}>Awards & Recognition</h2>
          </div>
          <div className="space-y-4">
            {awards.map((award, i) => (
              <div key={i} className="rounded-2xl p-6 flex gap-5 hover-lift" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                <div className="text-3xl flex-shrink-0">{award.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'hsl(28 65% 52% / 0.1)', color: 'hsl(28 65% 44%)' }}>{award.year}</span>
                    <span className="text-xs" style={{ color: 'hsl(30 12% 55%)' }}>{award.body}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-body)', color: 'hsl(20 25% 12%)' }}>{award.award}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(30 12% 48%)' }}>{award.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-12 sm:py-16" style={{ background: 'hsl(12 55% 38%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: 'white' }} className="mb-3">
            Media Enquiries
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(12 55% 88%)' }}>
            For press requests, technology information, partnerships, or media kit, reach out directly. We respond to all media enquiries within 24 hours.
          </p>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a href="mailto:info@arenq.co.in?subject=Media Enquiry — ARENQ" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'white', color: 'hsl(12 55% 38%)' }}>
              <Newspaper size={15} />
              info@arenq.co.in
            </a>
            <a href="https://wa.me/918956225134?text=Hello%2C%20I%20am%20a%20journalist%20and%20have%20a%20media%20enquiry%20about%20ARENQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border" style={{ borderColor: 'hsl(12 55% 75%)', color: 'white' }}>
              +91 78767 52516
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
