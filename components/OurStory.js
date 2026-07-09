import { useRouter } from 'next/router';
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


const OurStory = () => {

    const router = useRouter();


    return (
        <>

            <section className="py-12 sm:py-16">

                <div className="max-w-5xl mx-auto px-4 sm:px-6">

                    <div className="grid md:grid-cols-2 gap-10 items-center">


                        <div className="relative fade-up">

                            <img
                                src="https://arenq.co.in/wp-content/uploads/2025/08/BESS-Hero-Image1_page-0001-2048x1152.jpg"
                                alt="ARENQ Energy Solutions"
                                className="rounded-3xl object-cover w-full shadow-xl"
                                style={{
                                    height: 360
                                }}
                            />


                            <div
                                className="absolute -bottom-4 -right-4 rounded-2xl p-4 shadow-lg"
                                style={{
                                    background:
                                        'hsl(12 55% 38%)',
                                    color:
                                        'white'
                                }}
                            >

                                <div
                                    style={{
                                        fontFamily:
                                            'var(--font-display)',
                                        fontSize:
                                            '1.6rem',
                                        fontWeight:
                                            700
                                    }}
                                >
                                    2021
                                </div>

                                <div className="text-xs opacity-80">
                                    Forward To Future
                                </div>

                            </div>

                        </div>



                        <div className="fade-up">


                            <p className="label-tag mb-3">
                                Our Story
                            </p>


                            <h2 className="section-heading mb-4">
                                Powering The Future Of Energy
                            </h2>


                            <p
                                className="text-sm leading-relaxed"
                                style={{
                                    color:
                                        'hsl(30 12% 38%)'
                                }}
                            >

                                ARENQ is committed to transforming the future
                                of electricity storage through advanced
                                lithium battery technology.

                                We provide reliable energy backup solutions
                                for industries including Agriculture,
                                Defence, Petrochemical, EV, Solar and
                                Industrial applications.

                            </p>



                            <div className="flex flex-wrap gap-3 mt-5">

                                <span className="badge-pill badge-green">
                                    🔋 Lithium Technology
                                </span>


                                <span className="badge-pill">
                                    ⚡ Energy Innovation
                                </span>


                                <span className="badge-pill badge-green">
                                    🌱 Sustainable Future
                                </span>

                            </div>



                            <button
                                onClick={() =>
                                    router.push('/our-story')
                                }
                                className="btn-outline mt-5 px-6 py-3 text-sm"
                            >

                                Read Our Full Story

                            </button>


                        </div>


                    </div>

                </div>

            </section>



            <MountainDivider
                bg="hsl(36 28% 96%)"
                nextBg="hsl(38 25% 93%)"
            />

        </>
    )
}


export default OurStory