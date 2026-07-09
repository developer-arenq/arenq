/* eslint-disable react/no-unknown-property */
"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── WRAPPER ── */
  .sl-wrap {
    width: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    background: #f0ede4;
  }

  /* ── SKELETON ── */
  .sl-skeleton {
    width: 100%;
    background: linear-gradient(90deg, #e8e4dc 25%, #f0ede4 50%, #e8e4dc 75%);
    background-size: 200% 100%;
    animation: sl-shimmer 1.5s ease-in-out infinite;
    border-radius: 0;
  }
  .sl-skeleton-mobile  { aspect-ratio: 4 / 5; display: block; }
  .sl-skeleton-desktop { aspect-ratio: 24 / 7; display: none; }
  @media (min-width: 641px) {
    .sl-skeleton-mobile  { display: none; }
    .sl-skeleton-desktop { display: block; }
  }
  @keyframes sl-shimmer {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }

  /* ── TRACK ── */
  .sl-track-outer {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 0;
    cursor: grab;
    user-select: none;
  }
  .sl-track-outer:active { cursor: grabbing; }

  .sl-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  /* ── SLIDE ── */
  .sl-slide {
    flex-shrink: 0;
    width: 100%;
    position: relative;
  }

  /* Image container — correct aspect ratios */
  .sl-img-wrap {
    position: relative;
    width: 100%;
    overflow: hidden;
  }


  /* Image fill */
  .sl-img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.8s ease;
  }
  .sl-slide.active .sl-img { transform: scale(1.02); }

/* WRAPPER */

.sl-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
}

/* TRACK */
.sl-track-outer {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.sl-track {
  display: flex;
  transition: transform 0.6s ease-in-out;
}

.sl-slide {
  flex: 0 0 100%;
  width: 100%;
}

/* MOBILE */
.sl-img-wrap-mobile {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  display: block;
  overflow: hidden;
}

/* DESKTOP */
.sl-img-wrap-desktop {
  position: relative;
  width: 100%;
  height: 300px;
  display: none;
  overflow: hidden;
}

@media (min-width: 641px) {
.sl-img-wrap-mobile {
    display: none;
  }
  .sl-img-wrap-desktop {
    display: block;
    height: 420px;
  }
}

@media (min-width:1200px){
  .sl-img-wrap-desktop{
    height:520px;
  }
}

.sl-img-wrap{
  position:relative;
  width:100%;
  height:300px;
}

@media(min-width:768px){
 .sl-img-wrap{
   height:520px;
 }
}

@media(max-width:640px){
 .sl-img-wrap{
   height:auto;
   aspect-ratio:4/5;
 }
}
/* IMAGE */
.sl-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform .5s ease;
}

.sl-slide.active .sl-img {
  transform: scale(1.02);
}

/* VIDEO */
.sl-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ARROWS */
.sl-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,.9);
  cursor: pointer;
  z-index: 20;
  font-size: 24px;
  font-weight: bold;
  transition: .3s;
}

.sl-arrow:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.1);
}

.sl-arrow-prev {
  left: 20px;
}

.sl-arrow-next {
  right: 20px;
}

@media (max-width:640px) {
  .sl-arrow {
    display: none;
  }
}

/* DOTS */
.sl-dots {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 20;
}

.sl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,.5);
  cursor: pointer;
  transition: .3s;
}

.sl-dot.active {
  width: 24px;
  border-radius: 20px;
  background: #fff;
}

/* COUNTER */
.sl-count {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,.4);
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  z-index: 20;
}

/* PROGRESS */
.sl-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,.2);
}

.sl-progress-fill {
  height: 100%;
  background: #fff;
  transition: width .1s linear;
}
  /* ── ARROWS ── */
  .sl-arrow {
    position: absolute;
    top: 50%; transform: translateY(-50%);
    z-index: 10;
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.6);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: #1a1a1a;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
  }
  .sl-arrow:hover {
    background: #fff;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 6px 24px rgba(0,0,0,0.16);
  }
  .sl-arrow-prev { left: 16px; }
  .sl-arrow-next { right: 16px; }

  /* Hide arrows on mobile */
  @media (max-width: 640px) { .sl-arrow { display: none; } }

  /* ── DOTS ── */
  .sl-dots {
    position: absolute;
    bottom: 14px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: 7px; align-items: center;
    z-index: 10;
  }
  @media (max-width: 640px) { .sl-dots { bottom: 10px; gap: 5px; } }

  .sl-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    border: none; padding: 0; cursor: pointer;
    transition: all 0.25s ease;
  }
  .sl-dot.active {
    width: 22px; border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  @media (max-width: 640px) {
    .sl-dot { width: 5px; height: 5px; }
    .sl-dot.active { width: 16px; }
  }

  /* ── PROGRESS BAR ── */
  .sl-progress {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(255,255,255,0.15);
    z-index: 10;
    overflow: hidden;
  }
  .sl-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));
    transition: width 0.1s linear;
  }

  /* ── SLIDE COUNT ── */
  .sl-count {
    position: absolute;
    top: 14px; right: 16px;
    z-index: 10;
    font-size: 11px; font-weight: 600;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.75);
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 4px 10px;
    backdrop-filter: blur(8px);
  }
  @media (max-width: 640px) { .sl-count { top: 10px; right: 10px; font-size: 10px; padding: 3px 8px; } }
`;

/* ─────────────────── */
const AUTO_INTERVAL = 8000; // ms

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [device, setDevice] = useState(null);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const progressStart = useRef(null);

  /* ── Device detection ── */
  useEffect(() => {
    const detect = () => (window.innerWidth <= 640 ? "mobile" : "desktop");
    setDevice(detect());
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setDevice(detect()), 200); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Fetch slides ── */
  useEffect(() => {
    if (!device) return;
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const res = await fetch(device === "mobile" ? "/api/slider/mobile" : "/api/slider/desktop");
        const data = await res.json();
        setSlides(Array.isArray(data) ? data.sort((a, b) => a.order - b.order) : []);
      } catch (e) { console.error("Slider error:", e); }
      finally { setLoading(false); }
    };
    fetchSlides();
  }, [device]);

  /* ── Navigation ── */
  const goTo = useCallback((idx) => {
    const len = slides.length;
    setCurrent(((idx % len) + len) % len);
    setProgress(0);
    progressStart.current = Date.now();
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ── Progress bar + autoplay ── */
  useEffect(() => {
    if (!slides.length) return;
    progressStart.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - progressStart.current;
      const pct = Math.min((elapsed / AUTO_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct >= 100) { next(); }
      progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [slides.length, current, next]);

  /* ── Touch / drag ── */
  const onDragStart = (clientX) => { setIsDragging(true); setDragStart(clientX); };
  const onDragEnd = (clientX) => {
    if (!isDragging) return;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setIsDragging(false);
  };

  if (!device) return null;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="sl-wrap">
          <div className="sl-skeleton sl-skeleton-mobile" />
          <div className="sl-skeleton sl-skeleton-desktop" />
        </div>
      </>
    );
  }

  if (!slides.length) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="sl-wrap">
        <div
          className="sl-track-outer"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {/* Track */}
          <div
            className="sl-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className={`sl-slide ${i === current ? "active" : ""}`}>
                <Link href={slide.link || "#"} draggable={false}>

                  {/* ── MOBILE IMAGE ── */}
                  <div className="sl-img-wrap sl-img-wrap-mobile">
                    {slide.imageUrl?.endsWith(".mp4") ? (
                      <video
                        src={slide.imageUrl}
                        className="sl-video"
                        loop muted playsInline autoPlay
                      />
                    ) : (
                      <img
                        src={slide.desktopImageUrl || slide.imageUrl}
                        alt={slide.alt || `Banner ${i + 1}`}
                        
                        className="sl-img"
                        priority={i === 0}
                        sizes="100vw"
                        quality={100}
                      />
                    )}
                  </div>

                  {/* ── DESKTOP IMAGE ── */}
                  <div className="sl-img-wrap sl-img-wrap-desktop">
                    {slide.imageUrl?.endsWith(".mp4") ? (
                      <video
                        src={slide.imageUrl}
                        className="sl-video"
                        loop muted playsInline autoPlay
                      />
                    ) : (
                      <img
                        src={slide.desktopImageUrl || slide.imageUrl}
                        alt={slide.alt || `Banner ${i + 1}`}
                        
                        className="sl-img"
                        priority={i === 0}
                        sizes="100vw"
                        quality={100}
                      />
                    )}
                  </div>

                </Link>
              </div>
            ))}
          </div>

          {/* ── ARROWS ── */}
          {slides.length > 1 && (
            <>
              <button className="sl-arrow sl-arrow-prev" onClick={prev} aria-label="Previous">‹</button>
              <button className="sl-arrow sl-arrow-next" onClick={next} aria-label="Next">›</button>
            </>
          )}

          {/* ── SLIDE COUNT ── */}
          {slides.length > 1 && (
            <div className="sl-count">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          )}

          {/* ── DOTS ── */}
          {slides.length > 1 && (
            <div className="sl-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`sl-dot ${i === current ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* ── PROGRESS BAR ── */}
          <div className="sl-progress">
            <div className="sl-progress-fill" style={{ width: `${progress}%` }} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Slider;