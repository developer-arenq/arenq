import React from 'react'

function MountainDivider({ bg = 'hsl(36 28% 96%)', nextBg = 'hsl(38 25% 93%)' }) {
    return (
        <div style={{ background: bg, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 50, display: 'block', fill: nextBg }}>
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}
const Quality = () => {
    return (
        <>
            {/* ── LAB TESTING ── */}
            <section className="py-12 sm:py-16" style={{ background: 'hsl(145 20% 14%)', color: 'hsl(36 20% 90%)' }}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="fade-up">
                            <p className="label-tag mb-3" style={{ color: 'hsl(28 65% 62%)' }}>Quality Assurance</p>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'white', lineHeight: 1.15 }} className="mb-4">
                                Every Product Rigorously Lab Tested
                            </h2>
                            <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(36 15% 72%)' }}>
                                We don't just claim purity — we prove it. Every batch is independently tested at NABL-certified laboratories for ingredient authenticity, contaminant absence, and nutritional accuracy.
                            </p>
                            <ul className="flex flex-col gap-2 mb-6">
                                {['Heavy metal testing', 'Microbial analysis', 'Pesticide residue check', 'Nutritional verification'].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'hsl(36 15% 72%)' }}>
                                        <span style={{ color: 'hsl(28 65% 62%)' }}>✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                            {/* <div className="flex flex-wrap gap-3">
                                <button className="btn-primary px-6 py-3" style={{ background: 'hsl(28 65% 52%)', color: 'white' }}>View Lab Reports</button>
                                <button className="btn-outline px-6 py-3" style={{ borderColor: 'hsl(36 15% 55%)', color: 'hsl(36 15% 80%)' }}>See Testing Process</button>
                            </div> */}
                        </div>
                        <div className="fade-up grid grid-cols-2 gap-4">
                            {[{ l: 'NABL Certified', d: 'Independent lab under National Accreditation Board', icon: '🔬' },
                            { l: 'Batch Tested', d: 'Every production batch quality verified', icon: '✅' },
                            { l: 'Transparent', d: 'Full lab reports available on request', icon: '📋' },
                            { l: '100% Natural', d: 'Zero artificial additives confirmed by lab', icon: '🌿' }].map(c => (
                                <div key={c.l} className="cert-card" style={{ background: 'hsl(145 20% 20%)', borderColor: 'hsl(145 20% 28%)' }}>
                                    <div className="text-2xl">{c.icon}</div>
                                    <div className="text-sm font-bold text-white">{c.l}</div>
                                    <div className="text-xs" style={{ color: 'hsl(36 15% 62%)' }}>{c.d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <MountainDivider bg="hsl(145 20% 14%)" nextBg="hsl(36 28% 96%)" />
        </>
    )
}

export default Quality
