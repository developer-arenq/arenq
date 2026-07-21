import Link from "next/link";

export default function Custom404() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      {/* Main 404 Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Mountain / Energy Illustration */}
        <div className="mb-8">
          <svg
            width="280"
            height="160"
            viewBox="0 0 280 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Energy illustration"
            className="mx-auto"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C96A28" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFD66B" />
                <stop offset="100%" stopColor="#F7A52C" />
              </linearGradient>

              <linearGradient id="batteryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BB273" />
                <stop offset="100%" stopColor="#1F7A4C" />
              </linearGradient>
            </defs>

            <rect width="280" height="160" fill="url(#skyGrad)" />

            {/* Sun */}
            <circle cx="235" cy="30" r="15" fill="url(#sunGrad)" />

            {/* Background Mountains */}
            <path
              d="M0 120L45 75L90 95L135 55L185 90L225 65L280 100V160H0Z"
              fill="#d6c7b3"
            />

            {/* Foreground Mountains */}
            <path
              d="M0 160L0 135L35 100L75 125L115 75L150 95L180 80L220 105L250 90L280 110V160Z"
              fill="#1F4A2A"
            />

            {/* Battery */}
            <rect
              x="112"
              y="45"
              width="56"
              height="70"
              rx="6"
              fill="#ffffff"
              stroke="#7A3020"
              strokeWidth="3"
            />
            <rect
              x="128"
              y="37"
              width="24"
              height="8"
              rx="2"
              fill="#7A3020"
            />
            <rect
              x="119"
              y="52"
              width="42"
              height="56"
              rx="3"
              fill="url(#batteryGrad)"
            />

            {/* Lightning */}
            <path
              d="M142 60L132 78H140L136 96L150 74H142L146 60Z"
              fill="#ffffff"
            />

            {/* Energy Waves */}
            <path
              d="M90 65C82 70 82 90 90 95"
              stroke="#C96A28"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M190 65C198 70 198 90 190 95"
              stroke="#C96A28"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Small Stars */}
            <circle cx="30" cy="25" r="2" fill="#C96A28" />
            <circle cx="70" cy="18" r="1.5" fill="#C96A28" />
            <circle cx="200" cy="22" r="2" fill="#C96A28" />
            <circle cx="255" cy="12" r="1.5" fill="#C96A28" />
          </svg>
        </div>

        {/* 404 */}
        <div
          className="text-8xl md:text-9xl font-black leading-none mb-4 select-none"
          style={{
            color: "#7A3020",
            fontFamily: "Georgia, serif",
            textShadow: "4px 4px 0px rgba(122,48,32,0.1)",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{
            color: "#1A110A",
            fontFamily: "Georgia, serif",
          }}
        >
          Powering Your Way Back
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10"
          style={{ color: "#6B5744" }}
        >
          Oops! The page you're looking for doesn't exist or may have been
          moved. Explore Arenq's innovative energy storage and backup solutions
          designed to power homes, businesses, industries, and electric
          mobility.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="/"
            className="px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#7A3020",
              color: "#F5F0E8",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            Go Home
          </Link>

          <Link
            href="/products"
            className="px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#C96A28",
              color: "#F5F0E8",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            Explore Products
          </Link>
        </div>

        {/* Company Information */}
        <div className="max-w-xl">
          <h2
            className="text-xl font-semibold mb-2"
            style={{
              color: "#7A3020",
              fontFamily: "Georgia, serif",
            }}
          >
            Arenq – Forward To Future
          </h2>

          <p
            className="text-sm md:text-base leading-7"
            style={{ color: "#6B5744" }}
          >
            Arenq delivers advanced lithium battery and energy storage solutions
            for residential, commercial, industrial, telecom, EV, UPS, and
            renewable energy applications. We are committed to powering a
            cleaner, smarter, and more sustainable future through innovative
            energy technology.
          </p>
        </div>
      </div>
    </div>
  );
}