import React, { useState } from 'react';
import {
  Factory, MapPin, Award, ShieldCheck, Users, Package,
  Building2, Zap, Clock, Globe2, BadgeCheck, ChevronRight
} from 'lucide-react';

const milestones = [
  { year: '2021', title: 'SUNLIT established at Shahada, Nandurbar', tag: 'Origin' },
  { year: '2022', title: 'Corporate office opens in Pune', tag: 'Expansion' },
  { year: '2022', title: 'Tie-up with LUCAS TVS to develop an EV power train', tag: 'Partnership' },
  { year: '2022', title: 'Association with KAL for batteries and vehicles', tag: 'Partnership' },
  { year: '2023', title: 'Construction begins on a new plant in Khed City', tag: 'Capacity' },
  { year: '2023', title: 'Battery supply begins to Jindal Steel', tag: 'Client' },
  { year: '2024', title: 'OEM business launched with UNIK', tag: 'Partnership' },
  { year: '2024', title: 'Cummins becomes a marketing partner', tag: 'Partnership' },
  { year: '2024', title: 'ARENQ head office expands in Pune', tag: 'Expansion' },
  { year: '2025', title: 'Pan-India distribution network launched', tag: 'Expansion' },
  { year: '2025', title: 'Agreement signed with Hayasa E-Mobility for 2-wheeler batteries', tag: 'Partnership' },
  { year: '2025', title: 'Battery supply begins to Tata Power', tag: 'Client' },
  { year: '2025', title: 'Construction begins on the second plant', tag: 'Capacity' },
  { year: '2026', title: 'Second plant, Shahada, becomes operational', tag: 'Capacity' },
  { year: '2026', title: 'New corporate office opens at the North location', tag: 'Expansion' },
  { year: '2026', title: 'Third plant, Khed City, scheduled for December', tag: 'Capacity', future: true },
  { year: '2026', title: 'Association with KOEL', tag: 'Partnership' },
];

const facilities = {
  factory: ['Nandurbar', 'Pune', 'Khed City, Pune (upcoming)'],
  offices: ['Pune', 'Gurugram'],
};

const stats = [
  { value: '20+', label: 'Years of industry experience' },
  { value: '2 GWh', label: 'Current manufacturing capacity' },
  { value: '1000+', label: 'Domestic clients' },
  { value: '1 Lac+', label: 'Happy customers' },
  { value: '1 Lac+', label: 'Products delivered' },
  { value: '500+', label: 'Projects completed' },
];

const certifications = [
  'ISO 45001:2018', 'ISO 14001:2015', 'ISO 9001:2015', 'CE Conformity',
  'DGFT-India', 'ARAI', 'BSNL', 'BIS', 'ERDA (multiple ratings)', 'Trade Marks Registry',
];

const productLines = [
  'EV Battery', 'MHE Battery', 'Industrial Battery', 'Home Inverter Battery',
  'Telecom Battery', 'Robotic Battery', 'Golf Cart Battery', 'Cranking Battery',
  'Solar Battery', 'Agriculture Battery', 'Energy Storage System', 'BESS',
];

const tagColors = {
  Origin: '#F5A623',
  Expansion: '#1E5FA8',
  Partnership: '#0B2A4A',
  Capacity: '#0E7C7B',
  Client: '#C1440E',
};

function Stat({ value, label, light }) {
  return (
    <div style={{ minWidth: 132 }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 30,
        fontWeight: 600,
        color: light ? '#FFFFFF' : '#0B2A4A',
        lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 12.5,
        color: light ? 'rgba(255,255,255,0.72)' : '#52616F',
        marginTop: 6,
        maxWidth: 140,
      }}>{label}</div>
    </div>
  );
}

function SectionLabel({ n, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 26 }}>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 15,
        color: '#F5A623',
        fontWeight: 600,
      }}>{n}</span>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 28,
        fontWeight: 600,
        color: '#0B2A4A',
        margin: 0,
      }}>{children}</h2>
    </div>
  );
}

export default function CompanyProfile() {
  const [activeTag, setActiveTag] = useState('All');
  const tags = ['All', 'Origin', 'Expansion', 'Partnership', 'Capacity', 'Client'];
  const visibleMilestones = activeTag === 'All'
    ? milestones
    : milestones.filter(m => m.tag === activeTag);

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      background: '#F4F7FA',
      color: '#0E1B2A',
      width: '100%',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .arenq-scope * { box-sizing: border-box; }
        .arenq-hairline { border-top: 1px solid rgba(11,42,74,0.12); }
        .arenq-tagbtn {
          border: 1px solid rgba(11,42,74,0.2);
          background: transparent;
          color: #0B2A4A;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 12.5px;
          padding: 6px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .arenq-tagbtn.active { background: #0B2A4A; color: #fff; border-color: #0B2A4A; }
        .arenq-fac-list { list-style: none; margin: 0; padding: 0; }
        .arenq-fac-list li { padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.12); font-size: 14px; }
        @media (max-width: 760px) {
          .arenq-grid-2 { grid-template-columns: 1fr !important; }
          .arenq-stat-strip { flex-wrap: wrap !important; row-gap: 22px; }
        }
      `}</style>

      <div className="arenq-scope">

        {/* HERO */}
        <div style={{
          background: 'linear-gradient(160deg, #0B2A4A 0%, #123A63 55%, #0E2C4C 100%)',
          padding: '56px 40px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 260, height: 260,
            borderRadius: '50%', background: 'rgba(245,166,35,0.08)',
          }} />
       

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(34px, 5vw, 52px)',
            color: '#fff',
            lineHeight: 1.05,
            margin: '0 0 18px',
            maxWidth: 620,
          }}>
            Forward to future,<br />built one cell at a time.
          </h1>
          <p style={{
            fontSize: 15.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)',
            maxWidth: 520, margin: '0 0 40px',
          }}>
            ARENQ (Sunlit Power Pvt. Ltd.) manufactures and distributes lithium and
            EV battery systems across agriculture, defence, petrochemical and
            refining industries — backed by 20+ years of energy storage experience.
          </p>

          <div className="arenq-stat-strip" style={{ display: 'flex', gap: 34, flexWrap: 'wrap' }}>
            {stats.slice(0, 4).map(s => <Stat key={s.label} {...s} light />)}
          </div>
        </div>

        {/* ABOUT */}
        <div style={{ padding: '56px 40px 44px', maxWidth: 1080, margin: '0 auto' }}>
          <SectionLabel n="01">About the company</SectionLabel>
          <div className="arenq-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48 }}>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#33414D', maxWidth: 62 + 'ch', margin: '0 0 16px' }}>
                ARENQ is a trusted energy storage brand serving agriculture, defence,
                petrochemical and refining industries across India. Its lithium and EV
                battery systems power everything from electric vehicles and industrial
                equipment to smart homes and telecom infrastructure.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#33414D', maxWidth: 62 + 'ch', margin: 0 }}>
                Manufacturing capacity scales up to 4.5 GWh, giving the company room
                to grow speed, quality and consistency together as demand for
                domestic battery production rises — in step with the Make in India
                initiative it manufactures under.
              </p>

              <div style={{ display: 'flex', gap: 40, marginTop: 32 }}>
                {stats.slice(4).map(s => <Stat key={s.label} {...s} />)}
              </div>
            </div>

            <div style={{
              background: '#0B2A4A', borderRadius: 4, padding: '26px 26px 30px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Factory size={16} color="#F5A623" />
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Factories</span>
              </div>
              <ul className="arenq-fac-list">
                {facilities.factory.map(f => <li key={f} style={{ color: 'rgba(255,255,255,0.85)' }}>{f}</li>)}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '22px 0 14px' }}>
                <Building2 size={16} color="#F5A623" />
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>Offices</span>
              </div>
              <ul className="arenq-fac-list">
                {facilities.offices.map(f => <li key={f} style={{ color: 'rgba(255,255,255,0.85)' }}>{f}</li>)}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                <Globe2 size={16} color="#F5A623" />
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>Pan-India distributor &amp; service network</span>
              </div>
            </div>
          </div>
        </div>

        <div className="arenq-hairline" style={{ maxWidth: 1080, margin: '0 auto' }} />

        {/* MANUFACTURING & QUALITY */}
        <div style={{ padding: '48px 40px 44px', maxWidth: 1080, margin: '0 auto' }}>
          <SectionLabel n="02">Manufacturing &amp; quality</SectionLabel>

          <div className="arenq-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 30 }}>
            {[
              { icon: ShieldCheck, title: 'Advanced BMS technology', body: 'In-house battery management systems built for reliability under load.' },
              { icon: Factory, title: 'Automated in-house manufacturing', body: 'TRUMPF (Germany) laser welding on an automated production line.' },
              { icon: BadgeCheck, title: 'Built for global standards', body: 'Cell sorting, OCVIR testing and quality checks at every stage.' },
              { icon: Package, title: 'Customized energy solutions', body: 'UPS, solar, telecom, EV and BESS applications, engineered to spec.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ display: 'flex', gap: 14 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(11,42,74,0.06)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="#0B2A4A" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14.5, color: '#0B2A4A', marginBottom: 3 }}>{title}</div>
                  <div style={{ fontSize: 13.5, color: '#52616F', lineHeight: 1.55 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12.5, color: '#8A97A3', marginBottom: 10, fontWeight: 500 }}>CERTIFICATIONS &amp; COMPLIANCE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {certifications.map(c => (
              <span key={c} style={{
                fontSize: 12.5, padding: '6px 12px', borderRadius: 999,
                border: '1px solid rgba(11,42,74,0.18)', color: '#0B2A4A',
                background: '#fff',
              }}>{c}</span>
            ))}
          </div>
        </div>

        <div className="arenq-hairline" style={{ maxWidth: 1080, margin: '0 auto' }} />

        {/* PRODUCT PORTFOLIO */}
        <div style={{ padding: '48px 40px 44px', maxWidth: 1080, margin: '0 auto' }}>
          <SectionLabel n="03">Product portfolio</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {productLines.map(p => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13.5, color: '#0B2A4A', padding: '8px 14px',
                background: '#fff', border: '1px solid rgba(11,42,74,0.1)', borderRadius: 4,
              }}>
                <ChevronRight size={13} color="#F5A623" />
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="arenq-hairline" style={{ maxWidth: 1080, margin: '0 auto' }} />

        {/* ROADMAP */}
        <div style={{ padding: '48px 40px 60px', maxWidth: 1080, margin: '0 auto' }}>
          <SectionLabel n="04">Roadmap &amp; milestones</SectionLabel>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 34 }}>
            {tags.map(t => (
              <button
                key={t}
                className={`arenq-tagbtn ${activeTag === t ? 'active' : ''}`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{
              position: 'absolute', left: 5, top: 6, bottom: 6, width: 2,
              background: 'rgba(11,42,74,0.14)',
            }} />
            {visibleMilestones.map((m, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: i === visibleMilestones.length - 1 ? 0 : 26 }}>
                <div style={{
                  position: 'absolute', left: -28, top: 4, width: 11, height: 11,
                  borderRadius: '50%', background: tagColors[m.tag],
                  border: '2px solid #F4F7FA',
                }} />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                    fontSize: 15, color: '#0B2A4A', minWidth: 46,
                  }}>{m.year}</span>
                  <span style={{ fontSize: 14.5, color: '#33414D', lineHeight: 1.5 }}>
                    {m.title}{m.future && <em style={{ color: '#8A97A3', fontStyle: 'normal' }}> — planned</em>}
                  </span>
                  <span style={{
                    fontSize: 11, color: tagColors[m.tag], border: `1px solid ${tagColors[m.tag]}55`,
                    padding: '2px 8px', borderRadius: 999, marginLeft: 'auto',
                  }}>{m.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

   

      </div>
    </div>
  );
}