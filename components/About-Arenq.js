'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ── brand tokens ──
  --blue   #0A528F   primary brand blue
  --blue-l #1B6FB8   lighter blue (gradients, hover)
  --gold   #FFB600   brand gold / accent
  --ink    #0A1F33   headings
  --ink-2  #45566B   body copy
  --mute   #8B98A8   captions / labels
  --bg     #F6F9FC   page background
  --line   #E3EAF1   hairline borders
*/




/* ── tiny hook: fires when element enters viewport ── */
function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, visible]
}

/* ── animated counter ── */
function Counter({ target, suffix = '', duration = 1800 }) {
    const [count, setCount] = useState(0)
    const [ref, visible] = useInView(0.3)
    useEffect(() => {
        if (!visible) return
        let start = 0
        const end = parseInt(target)
        const step = Math.ceil(end / (duration / 16))
        const timer = setInterval(() => {
            start = Math.min(start + step, end)
            setCount(start)
            if (start >= end) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [visible, target, duration])
    return <span ref={ref}>{count}{suffix}</span>
}

/* ── chip SVG with animated traces — light theme ── */
function ChipAnimation() {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`
        @keyframes traceFlow {
          0%   { stroke-dashoffset: 400; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes chipPulse {
          0%,100% { filter: drop-shadow(0 0 6px rgba(10,82,143,0.15)); }
          50%      { filter: drop-shadow(0 0 16px rgba(10,82,143,0.30)) drop-shadow(0 0 28px rgba(255,182,0,0.20)); }
        }
        @keyframes dotBlink {
          0%,100% { opacity:0.25; } 50% { opacity:1; }
        }
        @keyframes orbitRing {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        @keyframes orbitRingRev {
          from { transform: rotate(0deg); } to { transform: rotate(-360deg); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); }
        }
        .chip-group { animation: float 4s ease-in-out infinite; }
        .chip-body  { animation: chipPulse 3s ease-in-out infinite; }
        .trace-bg  { fill:none; stroke:#DCE6F0; stroke-width:2; stroke-linecap:round; }
        .trace-flow { fill:none; stroke-width:2; stroke-linecap:round; stroke-dasharray:400; animation: traceFlow 3s linear infinite; }
        .t-blue   { stroke:#0A528F; }
        .t-blue-l { stroke:#1B6FB8; }
        .t-gold   { stroke:#FFB600; }
        .dot-blink { animation: dotBlink 1.5s ease-in-out infinite; }
        .orbit1 { transform-origin: 250px 250px; animation: orbitRing 12s linear infinite; }
        .orbit2 { transform-origin: 250px 250px; animation: orbitRingRev 8s linear infinite; }
      `}</style>
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', maxWidth: 480, height: 'auto' }}>
                <defs>
                    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0A528F" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="chipGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#EEF3F8" />
                    </linearGradient>
                    <linearGradient id="pinGrad" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stopColor="#0A528F" />
                        <stop offset="50%" stopColor="#9FB3C6" />
                        <stop offset="100%" stopColor="#0A528F" />
                    </linearGradient>
                    <linearGradient id="labelGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0A528F" />
                        <stop offset="100%" stopColor="#1B6FB8" />
                    </linearGradient>
                    <filter id="glowFilter">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* bg glow */}
                <circle cx="250" cy="250" r="240" fill="url(#bgGlow)" />

                {/* orbit rings */}
                <g className="orbit1">
                    <circle cx="250" cy="250" r="180" fill="none" stroke="#0A528F" strokeWidth="0.5" strokeDasharray="4 8" strokeOpacity="0.25" />
                    <circle cx="250" cy="70" r="5" fill="#0A528F" fillOpacity="0.85" filter="url(#glowFilter)" />
                    <circle cx="430" cy="250" r="4" fill="#FFB600" fillOpacity="0.9" filter="url(#glowFilter)" />
                </g>
                <g className="orbit2">
                    <circle cx="250" cy="250" r="215" fill="none" stroke="#1B6FB8" strokeWidth="0.5" strokeDasharray="2 12" strokeOpacity="0.2" />
                    <circle cx="250" cy="35" r="3.5" fill="#FFB600" fillOpacity="0.9" filter="url(#glowFilter)" />
                    <circle cx="35" cy="250" r="3" fill="#0A528F" fillOpacity="0.7" filter="url(#glowFilter)" />
                </g>

                {/* traces LEFT */}
                {[
                    { d: "M40 160 H130 V220 H183", t: "t-blue", delay: "0s" },
                    { d: "M30 230 H120 V240 H183", t: "t-blue-l", delay: "0.6s" },
                    { d: "M40 300 H130 V260 H183", t: "t-gold", delay: "1.2s" },
                    { d: "M55 190 H140 V280 H183", t: "t-blue", delay: "1.8s" },
                ].map((tr, i) => (
                    <g key={i}>
                        <path d={tr.d} className="trace-bg" />
                        <path d={tr.d} className={`trace-flow ${tr.t}`} style={{ animationDelay: tr.delay }} />
                    </g>
                ))}

                {/* traces RIGHT */}
                {[
                    { d: "M460 160 H370 V220 H317", t: "t-blue-l", delay: "0.3s" },
                    { d: "M470 230 H380 V240 H317", t: "t-blue", delay: "0.9s" },
                    { d: "M460 300 H370 V260 H317", t: "t-gold", delay: "1.5s" },
                    { d: "M445 190 H360 V280 H317", t: "t-blue-l", delay: "2.1s" },
                ].map((tr, i) => (
                    <g key={i}>
                        <path d={tr.d} className="trace-bg" />
                        <path d={tr.d} className={`trace-flow ${tr.t}`} style={{ animationDelay: tr.delay }} />
                    </g>
                ))}

                {/* endpoint dots LEFT */}
                {[[40, 160], [30, 230], [40, 300], [55, 190]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="#0A528F" className="dot-blink"
                        style={{ animationDelay: `${i * 0.4}s` }} filter="url(#glowFilter)" />
                ))}
                {/* endpoint dots RIGHT */}
                {[[460, 160], [470, 230], [460, 300], [445, 190]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="#FFB600" className="dot-blink"
                        style={{ animationDelay: `${i * 0.4 + 0.2}s` }} filter="url(#glowFilter)" />
                ))}

                {/* chip body */}
                <g className="chip-group">
                    {/* outer glow pad */}
                    <rect x="168" y="175" width="164" height="150" rx="24" fill="#0A528F" fillOpacity="0.06" />

                    {/* chip */}
                    <rect x="183" y="190" width="134" height="120" rx="18" fill="url(#chipGrad)"
                        stroke="#CFDCE9" strokeWidth="1.5" className="chip-body" />

                    {/* inner grid lines */}
                    {[210, 230, 250, 270, 290].map(x => (
                        <line key={x} x1={x} y1="200" x2={x} y2="300" stroke="#0A528F" strokeOpacity="0.04" strokeWidth="1" />
                    ))}
                    {[210, 230, 250, 270, 280].map(y => (
                        <line key={y} x1="193" y1={y} x2="307" y2={y} stroke="#0A528F" strokeOpacity="0.04" strokeWidth="1" />
                    ))}

                    {/* inner die */}
                    <rect x="210" y="213" width="80" height="74" rx="8" fill="#FBFDFF" stroke="#CFDCE9" strokeWidth="1" />

                    {/* die circuit marks */}
                    <rect x="218" y="220" width="12" height="12" rx="2" fill="#0A528F" fillOpacity="0.55" />
                    <rect x="234" y="220" width="12" height="12" rx="2" fill="#1B6FB8" fillOpacity="0.55" />
                    <rect x="250" y="220" width="12" height="12" rx="2" fill="#FFB600" fillOpacity="0.55" />
                    <rect x="218" y="260" width="20" height="8" rx="2" fill="#0A528F" fillOpacity="0.35" />
                    <rect x="242" y="260" width="20" height="8" rx="2" fill="#1B6FB8" fillOpacity="0.35" />
                    <rect x="266" y="260" width="18" height="8" rx="2" fill="#FFB600" fillOpacity="0.35" />

                    {/* label */}
                    <text x="250" y="252" fontFamily="'DM Mono', monospace" fontSize="9.5"
                        fill="url(#labelGrad)" textAnchor="middle" fontWeight="600" letterSpacing="1" >ARENQ BMS</text>

                    {/* pins LEFT */}
                    {[208, 224, 240, 256, 272, 288].map((y, i) => (
                        <rect key={i} x="175" y={y} width="10" height="7" rx="2" fill="url(#pinGrad)" />
                    ))}
                    {/* pins RIGHT */}
                    {[208, 224, 240, 256, 272, 288].map((y, i) => (
                        <rect key={i} x="315" y={y} width="10" height="7" rx="2" fill="url(#pinGrad)" />
                    ))}
                    {/* pins TOP */}
                    {[210, 226, 242, 258, 274, 290].map((x, i) => (
                        <rect key={i} x={x} y="182" width="7" height="10" rx="2" fill="url(#pinGrad)" />
                    ))}
                    {/* pins BOTTOM */}
                    {[210, 226, 242, 258, 274, 290].map((x, i) => (
                        <rect key={i} x={x} y="308" width="7" height="10" rx="2" fill="url(#pinGrad)" />
                    ))}
                </g>
            </svg>
        </div>
    )
}

/* ── feature card ── */
function FeatureCard({ icon, title, desc, accent, index }) {
    const [ref, visible] = useInView(0.1)
    const [hovered, setHovered] = useState(false)
    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                background: hovered ? '#FFFFFF' : '#FBFDFF',
                border: `1px solid ${hovered ? accent + '55' : '#E3EAF1'}`,
                borderRadius: 16,
                padding: '22px 22px 24px',
                cursor: 'default',
                boxShadow: hovered ? `0 12px 32px ${accent}22` : '0 1px 2px rgba(10,31,51,0.03)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* top bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: hovered ? `linear-gradient(90deg, ${accent}, transparent)` : 'transparent',
                transition: 'background 0.3s ease',
            }} />
            <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: hovered ? accent + '1c' : '#EEF3F8',
                border: `1px solid ${hovered ? accent + '55' : '#DCE6F0'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14, color: accent,
                transition: 'all 0.3s ease', fontSize: 18,
            }}>
                {icon}
            </div>
            <div style={{
                fontSize: 14, fontWeight: 700, color: '#0A1F33',
                marginBottom: 6, letterSpacing: '-0.01em',
                fontFamily: "'DM Sans', sans-serif",
            }}>{title}</div>
            <div style={{
                fontSize: 12.5, color: '#5A6B7E', lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif",
            }}>{desc}</div>
        </div>
    )
}

/* ── stat pill ── */
function StatPill({ value, suffix, label, delay }) {
    const [ref, visible] = useInView(0.3)
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.5s ease ${delay}, transform 0.5s ease ${delay}`,
            textAlign: 'center',
        }}>
            <div style={{
                fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#0A1F33',
                letterSpacing: '-0.04em', lineHeight: 1, fontFamily: "'DM Sans', sans-serif",
                background: 'linear-gradient(135deg, #0A528F 0%, #1B6FB8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
                {visible ? <Counter target={value} suffix={suffix} /> : `0${suffix}`}
            </div>
            <div style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#8B98A8', marginTop: 5, fontFamily: "'DM Sans', sans-serif",
            }}>{label}</div>
        </div>
    )
}

const FEATURES = [
    {
        icon: "⚡",
        title: "High Performance",
        desc: "Advanced Lithium-ion and LiFePO₄ batteries engineered for superior efficiency and long service life.",
        accent: "#0A528F",
    },
    {
        icon: "🔋",
        title: "Reliable Power",
        desc: "Designed for EVs, Solar Energy Storage, Industrial UPS and Telecom applications.",
        accent: "#FFB600",
    },
    {
        icon: "🛡️",
        title: "Safety & Quality",
        desc: "Every battery undergoes rigorous quality testing to ensure maximum safety and dependable performance.",
        accent: "#0A528F",
    },
    {
        icon: "🌱",
        title: "Sustainable Future",
        desc: "Supporting clean energy adoption with eco-friendly and innovative battery technologies.",
        accent: "#FFB600",
    },
];

const STATS = [
    {
        value: '10',
        suffix: '+',
        label: 'Battery Models',
        delay: '0s',
    },
    {
        value: '25',
        suffix: '+',
        label: 'Business Partners',
        delay: '0.1s',
    },
    {
        value: '100',
        suffix: '+',
        label: 'Projects Supported',
        delay: '0.2s',
    },
    {
        value: '100',
        suffix: '%',
        label: 'Quality Tested',
        delay: '0.3s',
    },
];

const About = () => {
    const [headerRef, headerVisible] = useInView(0.1)

    useEffect(() => {
        if (!document.getElementById('dm-sans-about')) {
            const l = document.createElement('link')
            l.id = 'dm-sans-about'
            l.rel = 'stylesheet'
            l.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap'
            document.head.appendChild(l)
        }
    }, [])

    return (
        <section id="about" style={{
            background: '#F6F9FC',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: "'DM Sans', sans-serif",
        }}>
            {/* background grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(10,82,143,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(10,82,143,0.025) 1px, transparent 1px)',
                backgroundSize: '52px 52px',
            }} />
            {/* orbs */}
            <div style={{ position: 'absolute', top: -200, left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(10,82,143,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -200, right: -200, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,182,0,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* horizontal divider line top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #0A528F33, transparent)' }} />

            <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '100px 24px 80px' }}>

                {/* ── HEADER ── */}
                <div
                    ref={headerRef}
                    style={{
                        textAlign: "center",
                        marginBottom: 72,
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                >
                    {/* Badge */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "rgba(255,182,0,0.12)",
                            border: "1px solid rgba(255,182,0,0.35)",
                            borderRadius: 100,
                            padding: "6px 18px",
                            marginBottom: 22,
                        }}
                    >
                        <div
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "#FFB600",
                            }}
                        />
                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "#8A6400",
                            }}
                        >
                            Powering Tomorrow
                        </span>
                    </div>

                    {/* Heading */}
                    <h2
                        style={{
                            fontSize: "clamp(30px,5vw,54px)",
                            fontWeight: 700,
                            color: "#0A1F33",
                            margin: "0 0 18px",
                            lineHeight: 1.1,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        About{" "}
                        <span
                            style={{
                                color: "#0A528F",
                            }}
                        >
                            ARENQ
                        </span>
                    </h2>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: "clamp(15px,2vw,18px)",
                            color: "#5A6B7E",
                            maxWidth: 760,
                            margin: "0 auto",
                            lineHeight: 1.8,
                        }}
                    >
                        <strong style={{ color: "#0A528F" }}>ARENQ</strong> is a leading
                        manufacturer of advanced{" "}
                        <strong style={{ color: "#0A528F" }}>
                            Lithium-ion & LiFePO₄ Battery Solutions
                        </strong>{" "}
                        for Electric Vehicles, Solar Energy Storage Systems, Industrial UPS,
                        Telecom, and customized energy storage applications. 
                    </p>
                </div>

                {/* ── TWO-COLUMN ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
                    gap: 56,
                    alignItems: 'center',
                    marginBottom: 64,
                }}>

                    {/* LEFT — chip */}
                    <div style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translateX(0)' : 'translateX(-30px)',
                        transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                    }}>
                        {/* chip container */}
                        <div style={{
                            background: '#FFFFFF',
                            border: '1px solid #E3EAF1',
                            borderRadius: 24,
                            padding: '32px 16px',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(10,82,143,0.08)',
                        }}>
                            {/* corner marks */}
                            {[
                                { top: 12, left: 12 },
                                { top: 12, right: 12 },
                                { bottom: 12, left: 12 },
                                { bottom: 12, right: 12 },
                            ].map((pos, i) => (
                                <div key={i} style={{
                                    position: 'absolute', width: 12, height: 12,
                                    borderTop: (pos.top !== undefined) ? '1.5px solid #0A528F55' : 'none',
                                    borderBottom: (pos.bottom !== undefined) ? '1.5px solid #0A528F55' : 'none',
                                    borderLeft: (pos.left !== undefined) ? '1.5px solid #0A528F55' : 'none',
                                    borderRight: (pos.right !== undefined) ? '1.5px solid #0A528F55' : 'none',
                                    ...pos,
                                }} />
                            ))}
                            <ChipAnimation />
                            {/* label under chip */}
                            <div style={{ textAlign: 'center', marginTop: 8 }}>
                                <span style={{
                                    fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                                    color: '#8B98A8', fontFamily: "'DM Mono', monospace",
                                }}>ARENQ-CORE · REV 2.4.1 · SHAHADA</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — text + features */}
                    <div
                        style={{
                            opacity: headerVisible ? 1 : 0,
                            transform: headerVisible ? "translateX(0)" : "translateX(30px)",
                            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                        }}
                    >
                        {/* Eyebrow */}
                        <div
                            style={{
                                display: "inline-block",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#0A528F",
                                marginBottom: 14,
                            }}
                        >
                            Advanced Energy Storage Solutions
                        </div>

                        {/* Heading */}
                        <h3
                            style={{
                                fontSize: "clamp(22px,3.5vw,34px)",
                                fontWeight: 700,
                                color: "#0A1F33",
                                margin: "0 0 18px",
                                lineHeight: 1.2,
                                letterSpacing: "-0.025em",
                            }}
                        >
                            Driving Innovation in{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg,#0A528F,#FFB600)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Lithium Battery Technology
                            </span>
                        </h3>

                        {/* Description */}
                        <p
                            style={{
                                fontSize: "clamp(14px,1.5vw,16px)",
                                color: "#5A6B7E",
                                lineHeight: 1.8,
                                marginBottom: 32,
                            }}
                        >
                            <strong style={{ color: "#0A528F" }}>ARENQ</strong> specializes in the
                            design and manufacturing of high-performance{" "}
                            <strong style={{ color: "#0A528F" }}>
                                Lithium-ion and LiFePO₄ Battery Solutions
                            </strong>{" "}
                            for Electric Vehicles, Solar Energy Storage Systems, Industrial UPS,
                            Telecom Infrastructure, and customized energy storage applications. 
                        </p>

                        {/* Feature Cards */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
                                gap: 14,
                            }}
                        >
                            {FEATURES.map((f, i) => (
                                <FeatureCard key={f.title} {...f} index={i} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── STATS ROW ── */}
                <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E3EAF1',
                    borderRadius: 20,
                    padding: '32px 24px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
                    gap: 24,
                    boxShadow: '0 12px 32px rgba(10,82,143,0.06)',
                }}>
                    {STATS.map((s) => <StatPill key={s.label} {...s} />)}
                </div>

            </div>

            {/* horizontal divider line bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #FFB60055, transparent)' }} />
        </section>
    )
}

export default About