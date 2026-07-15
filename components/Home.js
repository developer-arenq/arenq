/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

const PRODUCTS = [
    {
        name: 'EV Batteries',
        tag: 'LiFePO4 / NMC · E-Autos, E-Scooters, E-Bikes',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="4" y="7" width="14" height="10" rx="1.5" />
                <rect x="18.5" y="10" width="2" height="4" />
                <path d="M9 9.5v5M12 9.5v5" strokeOpacity="0.5" />
            </svg>
        ),
    },
    {
        name: 'Industrial UPS',
        tag: 'High discharge · Mission-critical backup',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
        ),
    },
    {
        name: 'Inverter Batteries',
        tag: '3000+ cycles · Home & office backup',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="8" width="15" height="9" rx="1.2" />
                <rect x="18.5" y="11" width="2" height="3" />
                <path d="M7 12h7" strokeOpacity="0.6" />
            </svg>
        ),
    },
    {
        name: 'MHE Battery',
        tag: 'Material handling · Rugged duty cycles',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="4" width="18" height="12" rx="1.4" />
                <path d="M8 20h8M12 16v4" strokeOpacity="0.6" />
            </svg>
        ),
    },
    {
        name: 'Engine Cranking',
        tag: 'Instant ignition · Reliable cold starts',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 12 12 7M12 12 16 14" strokeOpacity="0.7" />
            </svg>
        ),
    },
    {
        name: 'Telecom Battery',
        tag: 'BSNL approved · 24×7 connectivity',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="7" y="2" width="10" height="18" rx="2" />
                <path d="M10 6h4" strokeOpacity="0.6" />
            </svg>
        ),
    },
];

export default function HeroPowerAnimation() {
    return (
        <div className="wrap">
            <section className="hero">
                <div className="hero-copy">
                    <div className="eyebrow">Energy Storage · Made For India</div>
                    <h1>
                        One core.
                        <br />
                        Every <span>application.</span>
                    </h1>
                    <p>
                        From e-autos to fuel stations, one lithium platform — LiFePO4 and NMC —
                        is engineered to power it all. Built for heat, humidity and everyday
                        Indian terrain.
                    </p>
                    <a className="cta" href="/shop">
                        See where it powers
                        <span aria-hidden="true"> →</span>
                    </a>
                </div>

                <div className="core-stage">
                    <div className="pulse-ring" />
                    <div className="pulse-ring delay2" />
                    <div className="pulse-ring delay3" />
                    <div className="ring ring--outer" />
                    <div className="ring ring--mid" />
                    <div className="ring ring--inner" />
                    <div className="cell">
                        <div className="fill" />
                    </div>
                    <div className="core-label">CHARGE CYCLE · LIVE</div>
                </div>
            </section>

            <section className="bus-section" id="products">
                <div className="bus-head">
                    <h2>Powering every application</h2>
                    <p>One battery platform, distributed across six product lines</p>
                </div>

                <div className="bus-track">
                    <svg className="bus-line-svg" viewBox="0 0 1180 40" preserveAspectRatio="none">
                        <line className="bus-base" x1="0" y1="20" x2="1180" y2="20" strokeDasharray="4 6" />
                        <line className="bus-pulse" x1="0" y1="20" x2="1180" y2="20" />
                    </svg>

                    <div className="cards">
                        {PRODUCTS.map((p) => (
                            <div className="card" key={p.name}>
                                <div className="stub" />
                                <div className="icon">{p.icon}</div>
                                <h3>{p.name}</h3>
                                <p>{p.tag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
        </div>
    );
}