import React, { } from 'react';

function MountainDivider({ bg = 'hsl(36 28% 96%)', nextBg = 'hsl(38 25% 93%)' }) {
    return (
        <div style={{ background: bg, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 50, display: 'block', fill: nextBg }}>
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}

const Certification = () => {



    return (
        < >
            <section className="py-12 sm:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 fade-up">
                        <p className="label-tag mb-2">  ARENQ Excellence</p>
                        <h2 className="section-heading">  Trusted Energy Technology & Innovation</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-5 fade-up">
                        {[
                            {
                                icon: "🔋",
                                name: "Advanced Battery Technology",
                                what: "Lithium & LiFePO4 Energy Solutions",
                                benefit:
                                    "ARENQ develops high-performance battery systems designed for EV, solar and industrial energy applications.",
                            },

                            {
                                icon: "🛡️",
                                name: "Quality & Safety Tested",
                                what: "Reliable Battery Performance Standards",
                                benefit:
                                    "Every battery solution undergoes strict quality checks for safety, durability and long life performance.",
                            },

                            {
                                icon: "⚡",
                                name: "Energy Innovation",
                                what: "Future Ready Power Solutions",
                                benefit:
                                    "Smart and sustainable energy storage solutions built to support modern industries and clean technology.",
                            },
                        ].map(cert => (
                            <div key={cert.name} className="cert-card fade-up text-center">
                                <div className="text-3xl mx-auto">{cert.icon}</div>
                                <h3 className="font-bold text-sm" style={{ color: 'hsl(20 25% 12%)' }}>{cert.name}</h3>
                                <p className="text-xs font-medium" style={{ color: 'hsl(12 55% 38%)' }}>{cert.what}</p>
                                <p className="text-xs leading-relaxed" style={{ color: 'hsl(30 12% 48%)' }}>{cert.benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <MountainDivider bg="hsl(36 28% 96%)" nextBg="hsl(38 25% 93%)" />
        </>
    );
};

export default Certification;
