import React from 'react'

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


const Process = () => {

    const processSteps = [
        {
            emoji: '🔋',
            label: 'Battery Design',
            desc:
                'Advanced lithium battery solutions designed for EV, solar and industrial applications'
        },
        {
            emoji: '⚙️',
            label: 'Manufacturing',
            desc:
                'Precision manufacturing with advanced technology and engineering standards'
        },
        {
            emoji: '🛡️',
            label: 'Quality Testing',
            desc:
                'Every battery undergoes strict safety, performance and reliability testing'
        },
        {
            emoji: '🚀',
            label: 'Power Delivered',
            desc:
                'Reliable energy solutions delivered for businesses and future mobility'
        },
    ];


    return (
        <>

            <section
                className="py-12 sm:py-16"
                style={{ background: 'hsl(38 25% 93%)' }}
            >

                <div className="max-w-5xl mx-auto px-4 sm:px-6">

                    <div className="text-center mb-12 fade-up">

                        <p className="label-tag mb-2">
                            Our Process
                        </p>

                        <h2 className="section-heading">
                            From Innovation To Energy Solutions
                        </h2>

                    </div>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 relative">

                        {/* Connecting line */}
                        <div
                            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 opacity-30"
                            style={{
                                background: 'hsl(12 55% 38%)'
                            }}
                        />


                        {processSteps.map((step, i) => (

                            <div
                                key={i}
                                className="process-step fade-up"
                            >

                                <div className="process-icon text-3xl">
                                    {step.emoji}
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
                                    className="text-xs leading-relaxed"
                                    style={{
                                        color: 'hsl(30 12% 48%)'
                                    }}
                                >
                                    {step.desc}
                                </p>

                            </div>

                        ))}

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