
'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (!email.trim()) {
        setStatus('Please enter a valid email');
        return;
      }

      try {
        setLoading(true);

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setStatus('✅ Subscribed successfully!');
          setEmail('');
        } else {
          setStatus('❌ Subscription failed');
        }

        setTimeout(() => {
          setStatus('');
        }, 3000);
      } catch (error) {
        setStatus('❌ Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <footer
      style={{
        background:
          'linear-gradient(135deg,hsl(218 55% 10%),hsl(218 50% 16%))',
        color: 'hsl(36 20% 82%)',
      }}
    >
      {/* Mountain silhouette divider */}
      <div className="w-full" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: 50,
            display: 'block',
            fill:'hsl(210 30% 98%)',
          }}
        >
          <path d="M0,30 L160,10 L320,45 L480,5 L640,38 L800,8 L960,42 L1120,12 L1280,35 L1440,15 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-12 text-center"
          style={{
            background:
              'linear-gradient(135deg,hsl(145 70% 35%),hsl(198 90% 42%))',
            color: 'white',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
            }}
            className="mb-2"
          >
            Stay Connected With ARENQ
          </h3>

          <p className="text-sm mb-5 opacity-80">
            Get latest updates on lithium batteries, energy solutions,
            EV technology and innovations.
          </p>

          <form
            onSubmit={submitHandler}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
              style={{
                background: 'white',
                color: 'hsl(218 55% 12%)',
                fontFamily: 'var(--font-body)',
              }}
            />

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: 'hsl(218 55% 12%)',
                color: 'white',
                fontFamily: 'var(--font-body)',
              }}
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </button>
          </form>

          {status && (
            <p className="mt-3 text-sm">
              {status}
            </p>
          )}
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'hsl(145 70% 50%)',
              }}
              className="mb-3"
            >
              ARENQ
            </div>

            <p className="text-sm opacity-70 mb-4 leading-relaxed">
              The Future Of Electricity Storage Solutions.

              Arenq is your go-to partner for all energy backup
              solutions. We cater to multiple industries including
              Agriculture, Defence, Petrochemical and Refineries.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/arenq",
                  label: "Facebook",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/arenq",
                  label: "Instagram",
                },
                {
                  icon: Youtube,
                  href: "https://www.linkedin.com/company/arenq",
                  label: "Linkedin",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full transition-colors hover:opacity-80"
                  style={{
                    background: 'hsl(218 40% 22%)',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: 'hsl(145 70% 50%)' }}
            >
              Products
            </h4>

            <ul className="flex flex-col gap-2">
              {[
                ["EV Batteries", "/search?q=ev-battery"],
                ["Solar Batteries", "/search?q=solar-battery"],
                ["Lithium Batteries", "/search?q=lithium"],
                ["Industrial Batteries", "/search?q=industrial"],
                ["Energy Storage System", "/search?q=ess"],
                ["Battery Accessories", "/search?q=accessories"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: 'hsl(145 70% 50%)' }}
            >
              Company
            </h4>

            <ul className="flex flex-col gap-2">
              {[
                ["Home", "/"],
                ["About Us", "/about-us"],
                ["Products", "/search"],
                ["Privacy Policy", "/privacy-policy"],

                ["Blogs", "/blog"],
                ["Contact Us", "/contact-us"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: 'hsl(145 70% 50%)' }}
            >
              Contact
            </h4>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/3aJaaeAADkJem91Y6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Factory:

                  No. 327/2,
                  Mohida TS,
                  Dondaicha Road,
                  Shahada Nandurbar,
                  Maharashtra - 425409, India
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/3aJaaeAADkJem91Y6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Corporate Office:

                  Sunlit Power Pvt Ltd,
                  Laxmi Avenue Commercial Building - B,
                  Office No. B-503 & 504,
                  Near Edenn Tower,
                  Wakad, Pune,
                  Maharashtra - 411057, India
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/3aJaaeAADkJem91Y6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  South Zone Office:

                  Near Kerala Automobiles,
                  Ground Floor,
                  NMC No 2/398,
                  Puthanamblam Ward,
                  Athiyannur,
                  Thiruvananthapuram,
                  Kerala - 695123, India
                </a>
              </li>

              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Phone size={15} />
                <a href="tel:+918956225134">
                  +91 8956225134
                </a>
              </li>

              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Mail size={15} />
                <a href="mailto:info@arenq.co.in">
                  info@arenq.co.in
                </a>
              </li>
            </ul>

            <div className="mt-4 text-xs opacity-60">
              <div>Mon–Sat: 8 AM – 10 PM</div>
              <div>Sun: 10 AM – 7 PM</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderColor: 'hsl(20 25% 20%)',
          }}
        >
          <p className="text-xs opacity-50 text-center sm:text-left">
            © {new Date().getFullYear()} Arenq.
            All Rights Reserved.
            {" "}
            Developed By{" "}

            <a
              href="https://kirant.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:opacity-100 transition-opacity"
              style={{
                color: "hsl(145 70% 50%)",
              }}
            >
              Kiran Tirmale
            </a>
          </p>

          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'UPI', 'COD', 'GPay'].map((p) => (
              <span
                key={p}
                className="px-2 py-1 rounded text-xs font-bold"
                style={{
                  background: 'hsl(218 40% 22%)',
                  color: 'hsl(36 20% 70%)',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
