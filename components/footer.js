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
import Image from 'next/image';

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
        background: 'linear-gradient(135deg,#062036,#0A528F)',
        color: 'hsl(36 20% 82%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 182, 0, 0.35);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 182, 0, 0);
          }
        }

        @keyframes iconPop {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.15) rotate(-6deg);
          }
          100% {
            transform: scale(1.1) rotate(0deg);
          }
        }

        .footer-fade {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .newsletter-card {
          animation: glowPulse 2.8s ease-in-out infinite;
        }

        .social-icon {
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .social-icon:hover {
          animation: iconPop 0.4s ease forwards;
          background: #ffb600 !important;
          color: #062036 !important;
        }

        .footer-link {
          position: relative;
          transition: opacity 0.25s ease, padding-left 0.25s ease;
        }
        .footer-link::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          background: #ffb600;
          transition: width 0.25s ease;
        }
        .footer-link:hover {
          padding-left: 12px;
          opacity: 1 !important;
        }
        .footer-link:hover::before {
          width: 8px;
        }

        .subscribe-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background 0.2s ease;
        }
        .subscribe-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 182, 0, 0.35);
        }
      `}</style>

      {/* Mountain silhouette divider */}
      <div className="w-full" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: 50,
            display: 'block',
            fill: 'hsl(210 30% 98%)',
          }}
        >
          <path d="M0,30 L160,10 L320,45 L480,5 L640,38 L800,8 L960,42 L1120,12 L1280,35 L1440,15 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        {/* Newsletter */}
        <div
          className="newsletter-card  rounded-2xl p-6 sm:p-8 mb-12 text-center"
          style={{
            background: 'linear-gradient(135deg,#0A528F,#063a66)',
            color: 'white',
            border: '1px solid rgba(255,182,0,0.25)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              color: '#FFB600',
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
                color: '#0A528F',
                fontFamily: 'var(--font-body)',
              }}
            />

            <button
              type="submit"
              disabled={loading}
              className="subscribe-btn px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: '#FFB600',
                color: '#062036',
                fontFamily: 'var(--font-body)',
              }}
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </button>
          </form>

          {status && <p className="mt-3 text-sm">{status}</p>}
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 footer-fade" style={{ animationDelay: '0.05s' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#FFB600',
              }}
              className="mb-3"
            >
              <button
              onClick={() => router.push('/')}
              className="flex items-center  flex-shrink-0"
              data-testid="link-logo"
            >

              <Image
                src="https://arenq.co.in/wp-content/uploads/2025/06/Arenq-logo-animation.2.gif"
                width={170}
                height={70}
                alt="Logo"
                priority
              />

             
            </button>
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
                  href: 'https://www.facebook.com/arenq',
                  label: 'Facebook',
                },
                {
                  icon: Instagram,
                  href: 'https://www.instagram.com/arenq',
                  label: 'Instagram',
                },
                {
                  icon: Youtube,
                  href: 'https://www.linkedin.com/company/arenq',
                  label: 'Linkedin',
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon p-2 rounded-full"
                  style={{
                    background: "#0A528F",
                    color: "white",
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="footer-fade" style={{ animationDelay: '0.1s' }}>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: '#FFB600' }}
            >
              Products
            </h4>

            <ul className="flex flex-col gap-2">
              {[
                ['Industrial UPS Battery', '/search?q=industrial-ups-battery'],
                ['Electric Vehicle Battery', '/search?q=ev-battery'],
                ['Engine Cranking Battery', '/search?q=engine-cranking-battery'],
                ['MHE Battery', '/search?q=mhe-battery'],
                ['Power Sector Battery', '/search?q=power-sector-battery'],
                ['Electromagnetic Crane Battery', '/search?q=electromagnetic-crane-battery'],
                ['BESS Battery', '/search?q=bess-battery'],
                ['Telecom Battery', '/search?q=telecom-battery'],
                ['Inverter Battery', '/search?q=inverter-battery'],
                ['Agricultural Battery', '/search?q=agricultural-battery'],
                ['Solar Street Light Battery', '/search?q=solar-street-light-battery'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="footer-link text-sm opacity-70 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-fade" style={{ animationDelay: '0.15s' }}>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: '#FFB600' }}
            >
              Company
            </h4>

            <ul className="flex flex-col gap-2">
              {[
                ['Home', '/'],
                ['About Us', '/about-us'],
                ['Products', '/search'],
                ['Blogs', '/blog'],
                ['Contact Us', '/contact-us'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="footer-link text-sm opacity-70 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-fade" style={{ animationDelay: '0.2s' }}>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: '#FFB600' }}
            >
              Contact
            </h4>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm opacity-70">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#FFB600' }} />

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
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#FFB600' }} />
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
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#FFB600' }} />
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
                <Phone size={15} style={{ color: '#FFB600' }} />
                <a href="tel:+918956225134">+91 8956225134</a>
              </li>

              <li className="flex items-center gap-2.5 text-sm opacity-70">
                <Mail size={15} style={{ color: '#FFB600' }} />
                <a href="mailto:info@arenq.co.in">info@arenq.co.in</a>
              </li>
            </ul>

            <div className="mt-4 text-xs opacity-60">
              <div>Mon–Sat: 8 AM – 10 PM</div>
              <div>Sun: 10 AM – 7 PM</div>
            </div>
          </div>
        </div >

        {/* Bottom Bar */}
        < div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderColor: 'rgba(255,182,0,0.2)',
          }
          }
        >
          <p className="text-xs opacity-50 text-center sm:text-left">
            © {new Date().getFullYear()} Arenq. All Rights Reserved.{' '}
            Developed By{' '}
            <a

              href="https://kirant.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:opacity-100 transition-opacity"
              style={{ color: '#FFB600' }}
            >
              Kiran Tirmale
            </a>
          </p >

          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'UPI', 'COD', 'GPay'].map((p) => (
              <span
                key={p}
                className="px-2 py-1 rounded text-xs font-bold social-icon"
                style={{
                  background: '#0A528F',
                  color: 'white',
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div >
      </div >
    </footer >
  );
}