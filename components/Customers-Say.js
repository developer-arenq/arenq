import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

function MountainDivider({ bg = 'hsl(36 28% 96%)', nextBg = 'hsl(38 25% 93%)' }) {
    return (
        <div style={{ background: bg, lineHeight: 0 }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 50, display: 'block', fill: nextBg }}>
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}

function Stars({ rating, size = 13 }) {
    return (
        <span className="flex gap-0.5 stars">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={size} fill={s <= Math.round(rating) ? 'currentColor' : 'none'} strokeWidth={1.5} opacity={s <= Math.round(rating) ? 1 : 0.25} />
            ))}
        </span>
    );
}

const CustomersSay = () => {
    const [reviewIdx, setReviewIdx] = useState(0);
    const [googleReviews, setGoogleReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/google-reviews")
            .then(res => res.json())
            .then(data => {
                setGoogleReviews(data.reviews || []);
                setRating(data.rating || 0);
                setTotalReviews(data.userRatingCount || 0);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);


    return (
        <>
            {/* ── REVIEWS ── */}
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10 fade-up">
                        <p className="label-tag mb-2">Real Customers, Real Stories</p>
                        <h2 className="section-heading">What Our Customers Say</h2>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <Stars rating={rating} size={16} />

                            <span className="text-sm font-semibold">
                                {Number(rating || 0).toFixed(1)} / 5
                            </span>

                            <span
                                className="text-sm"
                                style={{ color: "hsl(30 12% 48%)" }}
                            >
                                · {totalReviews}+ reviews
                            </span>

                         
                        </div>
                    </div>

                    {/* Desktop 3-col */}
                    <div className="hidden md:grid md:grid-cols-3 gap-5 fade-up">
                        {googleReviews
                            .slice(reviewIdx, reviewIdx + 3)
                            .map((r, i) => (
                                <div key={i} className="review-card shadow-lg">

                                    <div className="flex items-start justify-between mb-3">

                                        <div className="flex items-center gap-3">

                                            <img
                                                src={r.profile_photo || "/images/user.png"}
                                                alt={r.author_name}
                                                className="w-11 h-11 rounded-full object-cover"
                                            />

                                            <div>
                                                <div className="font-semibold text-sm">
                                                    {r.author_name}
                                                </div>



                                                <div
                                                    className="text-xs"
                                                    style={{
                                                        color: "hsl(30 12% 52%)",
                                                    }}
                                                >
                                                    Google Review
                                                </div>

                                            </div>

                                        </div>

                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                            style={{
                                                background:
                                                    "hsl(145 35% 22% / 0.1)",
                                                color:
                                                    "hsl(145 35% 22%)",
                                            }}
                                        >
                                            ✓ Google
                                        </span>

                                    </div>

                                    <Stars rating={r.rating} />

                                    <p
                                        className="text-sm leading-relaxed mt-2"
                                        style={{
                                            color: "hsl(30 12% 35%)",
                                        }}
                                    >
                                        "{r.text}"
                                    </p>

                                </div>
                            ))}
                    </div>

                    {/* Mobile scroll */}
                    <div className="scroll-x md:hidden gap-4 fade-up">
                        {googleReviews.map((r, i) => (

                            <div
                                key={i}
                                className="review-card"
                                style={{ width: 280 }}
                            >

                                <div className="flex items-center gap-3 mb-2">

                                    <img
                                        src={r.profile_photo || "/images/user.png"}
                                        alt={r.author_name}
                                        className="w-11 h-11 rounded-full object-cover"
                                    />
                                    <div>

                                        <div className="font-semibold text-sm">
                                            {r.author_name}
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            Google Review
                                        </div>

                                    </div>

                                    <span className="ml-auto text-xs">
                                        Verified  ✓
                                    </span>

                                </div>

                                <Stars rating={r.rating} />

                                <p className="text-xs mt-2">
                                    "{r.text}"
                                </p>


                            </div>

                        ))}
                    </div>

                    <div className="hidden md:flex justify-center gap-3 mt-8">
                        <button
                            disabled={reviewIdx === 0}
                            onClick={() =>
                                setReviewIdx(i => Math.max(0, i - 1))
                            }
                            className="p-2.5 rounded-full border transition-colors hover:bg-black/5 disabled:opacity-40"
                            style={{ borderColor: "hsl(35 15% 82%)" }}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            disabled={
                                reviewIdx >= googleReviews.length - 3
                            }
                            onClick={() =>
                                setReviewIdx(i =>
                                    Math.min(
                                        Math.max(googleReviews.length - 3, 0),
                                        i + 1
                                    )
                                )
                            }
                            className="p-2.5 rounded-full border transition-colors hover:bg-black/5 disabled:opacity-40"
                            style={{ borderColor: "hsl(35 15% 82%)" }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="flex justify-center mt-10 fade-up">
                        <a
                            href="https://g.page/r/CQl0324HXu1oEAE/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 px-7 py-3 rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background:
                                    "linear-gradient(135deg, hsl(20 25% 12%), hsl(20 25% 12%))",
                                color: "#fff",
                                boxShadow: "0 10px 25px rgba(28,79,52,.18)",
                            }}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.1 29.2 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5Z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.1 29.2 4 24 4c-7.7 0-14.3 4.3-17.7 10.7Z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.1 0 9.8-2 13.4-5.2l-6.2-5.2c-2.1 1.6-4.6 2.4-7.2 2.4-5.3 0-9.7-3.3-11.3-8H6.2C9.5 37.2 16.1 44 24 44Z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.2 5.5-6.1 7.1l6.2 5.2C39.1 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5Z"
                                />
                            </svg>

                            <div className="text-left">
                                <div className="font-semibold text-sm">
                                    Write a Google Review
                                </div>
                                <div
                                    className="text-xs"
                                    style={{ color: "rgba(255,255,255,.75)" }}
                                >
                                    Share your experience →
                                </div>
                            </div>


                            <ChevronRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>
                    </div>
                </div>
            </section>

            <MountainDivider bg="hsl(36 28% 96%)" nextBg="hsl(38 25% 93%)" />
        </>
    )
}

export default CustomersSay
