import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F0E8' }}>

      {/* Main 404 Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">

        {/* Mountain SVG Illustration */}
        <div className="mb-8">
          <svg
            width="280"
            height="160"
            viewBox="0 0 280 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Mountain illustration"
            className="mx-auto"
          >
            {/* Sky gradient background */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C96A28" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#e8ddd0" />
              </linearGradient>
            </defs>
            <rect width="280" height="160" fill="url(#skyGrad)" />

            {/* Far background mountains */}
            <path d="M0 110 L50 60 L100 85 L140 45 L185 75 L220 55 L260 80 L280 70 L280 160 L0 160 Z" fill="#d4c5b0" opacity="0.4" />

            {/* Mid mountains */}
            <path d="M0 140 L40 85 L80 110 L120 65 L155 90 L190 70 L225 95 L255 75 L280 95 L280 160 L0 160 Z" fill="#8B7355" opacity="0.5" />

            {/* Main front mountains — terracotta/forest */}
            <path d="M0 160 L0 145 L35 100 L70 125 L105 80 L130 95 L140 72 L155 85 L175 100 L215 75 L245 100 L270 85 L280 95 L280 160 Z" fill="#1F4A2A" opacity="0.7" />

            {/* Left foreground mountain */}
            <path d="M0 160 L0 148 L35 105 L70 130 L95 160 Z" fill="#1F4A2A" />

            {/* Main center peak */}
            <path d="M90 160 L90 110 L130 95 L140 72 L150 85 L175 100 L180 160 Z" fill="#7A3020" />

            {/* Snow cap on main peak */}
            <path d="M130 95 L140 72 L150 85 L145 88 L140 80 L135 90 Z" fill="url(#snowGrad)" opacity="0.9" />

            {/* Right mountain */}
            <path d="M185 160 L195 100 L215 75 L235 95 L255 100 L270 85 L280 95 L280 160 Z" fill="#1F4A2A" />

            {/* Snow on right peak */}
            <path d="M208 90 L215 75 L222 85 L218 88 L215 80 L211 87 Z" fill="url(#snowGrad)" opacity="0.9" />

            {/* Pine trees silhouette */}
            <g fill="#1A110A" opacity="0.5">
              <polygon points="20,155 25,140 30,155" />
              <polygon points="27,158 33,142 39,158" />
              <polygon points="245,158 250,143 255,158" />
              <polygon points="252,155 257,140 262,155" />
              <polygon points="60,158 65,144 70,158" />
            </g>

            {/* Stars / sparkles in sky */}
            <g fill="#C96A28" opacity="0.6">
              <circle cx="30" cy="20" r="1.5" />
              <circle cx="80" cy="12" r="1" />
              <circle cx="200" cy="18" r="1.5" />
              <circle cx="250" cy="8" r="1" />
              <circle cx="145" cy="15" r="1" />
            </g>

            {/* Moon */}
            <circle cx="240" cy="25" r="10" fill="#F5F0E8" opacity="0.7" />
            <circle cx="244" cy="22" r="8" fill="#F5F0E8" opacity="0.3" />
          </svg>
        </div>

        {/* 404 Number */}
        <div
          className="text-8xl md:text-9xl font-black leading-none mb-4 select-none"
          style={{ color: '#7A3020', fontFamily: 'Georgia, serif', textShadow: '4px 4px 0px rgba(122,48,32,0.1)' }}
        >
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: '#1A110A', fontFamily: 'Georgia, serif' }}>
          Lost in the Mountains?
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg max-w-md mx-auto mb-10" style={{ color: '#6B5744' }}>
          The page you're looking for has wandered off the trail. Don't worry — the best Himalayan products are still just a click away.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/"
            className="px-8 py-4 rounded-xl font-semibold text-base transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#7A3020', color: '#F5F0E8' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/search?category=all/search?category=all"
            className="px-8 py-4 rounded-xl font-semibold text-base transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#C96A28', color: '#F5F0E8' }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            Browse Products
          </Link>
        </div>

      </div>

     

    </div>
  );
}
