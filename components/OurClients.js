
"use client";

import React from "react";
import { motion } from "framer-motion";

const clientLogos = [
    "/images/Clients/bl-1.webp",
    "/images/Clients/bl-2.webp",
    "/images/Clients/bl-3.webp",
    "/images/Clients/bl-4.webp",
    "/images/Clients/bl-5.webp",
    "/images/Clients/bl-6.webp",
    "/images/Clients/bl-7.webp",
    "/images/Clients/bl-8.webp",
    "/images/Clients/bl-9.webp",
    "/images/Clients/bl-10.webp",
    "/images/Clients/bl-11.webp",
    "/images/Clients/bl-20.webp",
    "/images/Clients/bl-13.webp",
    "/images/Clients/bl-14.webp",
    "/images/Clients/bl-15.webp",
    "/images/Clients/bl-16.webp",
    "/images/Clients/bl-17.webp",
    "/images/Clients/bl-18.webp",
    "/images/Clients/bl-19.webp",
];

const rowOne = [...clientLogos.slice(0, 10), ...clientLogos.slice(0, 10)];

const rowTwo = [...clientLogos.slice(10), ...clientLogos.slice(10)];

export default function OurClients() {
    return (
        <section className="arenq-clients">

            {/* Decorative elements */}
            <div className="yellow-orb yellow-orb-one" />
            <div className="yellow-orb yellow-orb-two" />

            <div className="blue-orb blue-orb-one" />

            <div className="clients-container">

                {/* ================= HEADER ================= */}

                <motion.div
                    className="clients-header"
                    initial={{
                        opacity: 0,
                        y: 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >

                    <div className="section-tag">
                        <span className="tag-dot" />
                        OUR CLIENTS
                    </div>

                    <h2>
                        Trusted by{" "}
                        <span>Great Brands</span>
                    </h2>

                    <p>
                        Building long-term partnerships through reliable,
                        efficient and future-ready energy solutions.
                    </p>

                </motion.div>

                

                {/* ================= LOGOS ================= */}

                <motion.div
                    className="logos-section"
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.15,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.25,
                    }}
                >

                    {/* ROW ONE */}

                    <div className="logo-mask">

                        <div className="logo-track move-left">

                            {rowOne.map((logo, index) => (

                                <div
                                    className="logo-card"
                                    key={`one-${index}`}
                                >

                                    <div className="logo-inner">

                                        <img
                                            src={logo}
                                            alt={`Arenq client ${index + 1}`}
                                            loading="lazy"
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* ROW TWO */}

                    <div className="logo-mask second-row">

                        <div className="logo-track move-right">

                            {rowTwo.map((logo, index) => (

                                <div
                                    className="logo-card"
                                    key={`two-${index}`}
                                >

                                    <div className="logo-inner">

                                        <img
                                            src={logo}
                                            alt={`Arenq partner ${index + 1}`}
                                            loading="lazy"
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </motion.div>

                {/* ================= BOTTOM ================= */}

                <motion.div
                    className="clients-footer"
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                    }}
                >

                    <div className="footer-line" />

                    <p>
                        Powering partnerships.
                        <span> Powering the future.</span>
                    </p>

                    <div className="footer-line reverse" />

                </motion.div>

            </div>

         

        </section>
    );
}

