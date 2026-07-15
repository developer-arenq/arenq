import React, { useEffect, useRef, useState } from 'react'
import { BatteryCharging, Cog, ShieldCheck, Rocket } from 'lucide-react'

function MountainDivider({
    bg = 'hsl(36 28% 96%)',
    nextBg = 'hsl(38 25% 93%)'
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
                    fill: nextBg
                }}
            >
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}

const BLUE = '#0A528F'
const GOLD = '#FFB600'

const processSteps = [
    {
        stage: '01',
        Icon: BatteryCharging,
        label: 'Battery Design',
        desc: 'Advanced lithium battery solutions designed for EV, solar and industrial applications'
    },
    {
        stage: '02',
        Icon: Cog,
        label: 'Manufacturing',
        desc: 'Precision manufacturing with advanced technology and engineering standards'
    },
    {
        stage: '03',
        Icon: ShieldCheck,
        label: 'Quality Testing',
        desc: 'Every battery undergoes strict safety, performance and reliability testing'
    },
    {
        stage: '04',
        Icon: Rocket,
        label: 'Power Delivered',
        desc: 'Reliable energy solutions delivered for businesses and future mobility'
    },
]

const Process = () => {
    const sectionRef = useRef(null)
    const [inView, setInView] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduceMotion(mq.matches)
        const onChange = (e) => setReduceMotion(e.matches)
        mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)

        const el = sectionRef.current
        if (!el) return () => {}

        if (mq.matches) {
            setInView(true)
            return () => {}
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true)
                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.25 }
        )
        observer.observe(el)

        return () => {
            observer.disconnect()
            mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <style>{`
                @keyframes stepRise {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes ringPulse {
                    0%   { box-shadow: 0 0 0 0 rgba(255, 182, 0, 0.55); }
                    70%  { box-shadow: 0 0 0 12px rgba(255, 182, 0, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(255, 182, 0, 0); }
                }
                @keyframes charge {
                    0%   { background: ${BLUE}; }
                    55%  { background: ${GOLD}; }
                    100% { background: ${BLUE}; }
                }
                @keyframes currentFlow {
                    0%   { stroke-dashoffset: 40; }
                    100% { stroke-dashoffset: 0; }
                }
                .proc-step {
                    opacity: 0;
                    transform: translateY(22px);
                    transition: transform 0.5s ease, box-shadow 0.3s ease;
                }
                .proc-step.in-view {
                    animation: stepRise 0.6s ease forwards;
                    animation-delay: var(--reveal-delay, 0ms);
                }
                .proc-step:hover {
                    transform: translateY(-4px);
                }
                .proc-icon-wrap {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    border-radius: 9999px;
                    background: ${BLUE};
                    border: 1.5px solid transparent;
                    transition: transform 0.35s ease, background 0.3s ease;
                }
                .proc-step.in-view .proc-icon-wrap {
                    animation: ringPulse 1.6s ease-out, charge 1.1s ease-out;
                    animation-delay: var(--reveal-delay, 0ms);
                }
                .proc-step:hover .proc-icon-wrap {
                    background: ${GOLD};
                    transform: rotate(-6deg) scale(1.08);
                }
                .proc-step:hover .proc-icon-wrap svg {
                    color: ${BLUE};
                }
                .proc-stage {
                    letter-spacing: 0.12em;
                    font-size: 10px;
                    font-weight: 700;
                    color: ${GOLD};
                    -webkit-text-stroke: 0.2px rgba(10, 82, 143, 0.35);
                }
                .proc-line-flow {
                    stroke-dasharray: 6 6;
                }
                .proc-line-flow.animate {
                    animation: currentFlow 1.1s linear infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .proc-step, .proc-step.in-view {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                    .proc-icon-wrap {
                        animation: none !important;
                    }
                    .proc-line-flow.animate {
                        animation: none !important;
                    }
                }
            `}</style>

            <section
                ref={sectionRef}
                className="py-12 sm:py-16"
                style={{ background: 'hsl(205 30% 97%)' }}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6">

                    <div className="text-center mb-12">
                        <p className="label-tag mb-2" style={{ color: GOLD }}>
                            Our Process
                        </p>
                        <h2 className="section-heading" style={{ color: BLUE }}>
                            From Innovation To Energy Solutions
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 relative">

                        {/* Connecting power line */}
                        <svg
                            className="hidden md:block absolute pointer-events-none"
                            style={{ top: 28, left: '12.5%', width: '75%', height: 4, overflow: 'visible' }}
                            viewBox="0 0 100 4"
                            preserveAspectRatio="none"
                        >
                            <line
                                x1="0" y1="2" x2="100" y2="2"
                                stroke={BLUE}
                                strokeWidth="1.5"
                                opacity="0.25"
                            />
                            <line
                                x1="0" y1="2" x2={inView ? '100' : '0'} y2="2"
                                stroke={GOLD}
                                strokeWidth="1.5"
                                className={`proc-line-flow ${inView && !reduceMotion ? 'animate' : ''}`}
                                opacity="0.9"
                                style={{
                                    transition: 'x2 1.1s ease',
                                }}
                            />
                        </svg>

                        {processSteps.map((step, i) => {
                            const { Icon } = step
                            return (
                                <div
                                    key={step.stage}
                                    className={`process-step proc-step ${inView ? 'in-view' : ''}`}
                                    style={{ '--reveal-delay': `${i * 160}ms` }}
                                >
                                    <div className="proc-stage mb-1">
                                        STAGE {step.stage}
                                    </div>

                                    <div className="proc-icon-wrap mb-2">
                                        <Icon
                                            size={24}
                                            strokeWidth={1.8}
                                            style={{ color: 'hsl(20 25% 12%)', transition: 'color 0.3s ease' }}
                                        />
                                    </div>

                                    <div
                                        className="text-sm font-bold"
                                        style={{
                                            color: 'hsl(20 25% 12%)',
                                            fontFamily: 'var(--font-body)'
                                        }}
                                    >
                                        {step.label}
                                    </div>

                                    <p
                                        className="text-xs leading-relaxed mt-1"
                                        style={{
                                            color: 'hsl(30 12% 48%)'
                                        }}
                                    >
                                        {step.desc}
                                    </p>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </section>

            <MountainDivider
                bg="hsl(38 25% 93%)"
                nextBg="hsl(145 20% 14%)"
            />
        </>
    )
}

export default Process