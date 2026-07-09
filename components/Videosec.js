import React from "react";

function MountainDivider({
    bg = "hsl(145 20% 14%)",
    nextBg = "hsl(36 28% 96%)",
}) {
    return (
        <div style={{ background: bg, lineHeight: 0 }}>
            <svg
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                style={{
                    width: "100%",
                    height: 50,
                    display: "block",
                    fill: nextBg,
                }}
            >
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}

const Videosec = () => {
    return (
        <>
            <section
                className="py-14 sm:py-20"
                style={{ background: "hsl(145 20% 14%)" }}
            >
                <div className="max-w-5xl mx-auto px-4">

                    {/* Heading */}
                    <div className="text-center mb-10">

                        <p
                            className="label-tag mb-3"
                            style={{ color: "hsl(28 65% 62%)" }}
                        >
                            Inside ARENQ Innovation
                        </p>

                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                            style={{
                                color: "#fff",
                                fontFamily: "var(--font-display)",
                            }}
                        >
                            Powering The Future With Advanced Energy Solutions
                        </h2>

                        <p
                            className="max-w-3xl mx-auto text-sm sm:text-base leading-7"
                            style={{ color: "hsl(36 15% 72%)" }}
                        >
                            Explore ARENQ's advanced lithium battery technology,
                            EV battery solutions and smart energy storage systems
                            designed for a cleaner and sustainable future.
                        </p>

                    </div>


                    {/* Video */}
                    <div className="flex justify-center">

                        <div className="w-full max-w-4xl aspect-video overflow-hidden rounded-2xl shadow-2xl">

                            <video
                                className="w-full h-full object-cover"
                                src="https://arenq.co.in/wp-content/uploads/2026/04/Image_to_Video_Final_Clean.mp4"
                                title="ARENQ Energy Solutions"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                            />

                        </div>

                    </div>

                </div>

            </section>


            <MountainDivider
                bg="hsl(145 20% 14%)"
                nextBg="hsl(36 28% 96%)"
            />

        </>
    );
};

export default Videosec;