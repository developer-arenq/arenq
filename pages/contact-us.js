'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Instagram,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Youtube,
} from 'lucide-react';

const SUBJECTS = [
  "General Inquiry",
  "Battery Requirement",
  "EV Battery Solution",
  "Solar Energy Storage",
  "OEM / Partnership",
  "Technical Support",
];

const FAQS = [
  {
    q: "What battery solutions does ARENQ provide?",
    a:
      "ARENQ provides advanced lithium batteries, EV battery packs, solar energy storage systems, UPS and industrial power solutions.",
  },

  {
    q: "Do you provide customized battery solutions?",
    a:
      "Yes, ARENQ develops customized lithium battery solutions based on customer requirements including voltage, capacity and application needs.",
  },

  {
    q: "Can businesses partner with ARENQ?",
    a:
      "Yes, we work with OEM partners, distributors, industries and businesses for advanced energy solutions.",
  },
];

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function validate() {
    const errs = {};

    if (!formData.fullname.trim()) {
      errs.name = "Name is required";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = "Valid email required";
    }

    if (!formData.subject) {
      errs.subject = "Please select a subject";
    }

    if (
      !formData.message.trim() ||
      formData.message.trim().length < 10
    ) {
      errs.message = "Please write at least 10 characters";
    }



    return errs;
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        setSuccess("Your message has been sent successfully.");
        setShowToast(true);

        setFormData({
          fullname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-body transition-colors outline-none focus:ring-2 ${errors[field]
      ? 'border-red-400 bg-red-50 focus:ring-red-200'
      : 'border-stone-200 bg-white focus:border-terracotta focus:ring-terracotta/20'
    }`;

  const labelClass = 'block text-xs font-semibold uppercase tracking-wide mb-1.5 font-body';

  return (
    <div className="min-h-screen" style={{ background: 'hsl(36 28% 96%)' }}>

      {showToast && success && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50">
          {success}
        </div>
      )}
      <section className="relative overflow-hidden">
        <div
          className="relative py-20 px-4 text-center"
          style={{
            background: 'linear-gradient(155deg, hsl(145 35% 14%) 0%, hsl(145 35% 22%) 45%, hsl(12 55% 32%) 100%)',
          }}
        >
          {/* Mountain silhouette */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,300 L0,160 L160,50 L320,180 L480,30 L640,170 L800,40 L960,180 L1120,60 L1280,160 L1440,80 L1440,300 Z" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-white/60 mb-3">
              POWERING YOUR FUTURE
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              Connect With ARENQ
            </h1>
            <p className="font-body text-white/75 text-lg leading-relaxed">
              Have questions about lithium batteries, EV solutions,
              solar storage or industrial energy requirements?
              Our ARENQ team is ready to assist you.
            </p>
          </div>
        </div>
        {/* Mountain wave bottom */}
        <div className="w-full overflow-hidden leading-none" style={{ background: 'hsl(36 28% 96%)' }}>
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block -mt-px" style={{ height: 50 }}>
            <path d="M0,50 L0,25 L120,10 L240,35 L380,5 L520,30 L640,8 L760,28 L900,12 L1020,32 L1140,15 L1280,38 L1440,20 L1440,50 Z"
              fill="hsl(36 28% 96%)" />
          </svg>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 mb-16">
          {/* ─── LEFT: Contact Form ──────────────────────────── */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-100 shadow-sm">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'hsl(145 35% 93%)' }}
                >
                  <CheckCircle size={40} style={{ color: 'hsl(145 35% 28%)' }} />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'hsl(12 55% 38%)' }}>
                  Message Sent!
                </h2>
                <p className="font-body text-base" style={{ color: 'hsl(30 12% 40%)' }}>
                  We'll get back to you within{' '}
                  <span className="font-semibold" style={{ color: 'hsl(145 35% 28%)' }}>24 hours</span>.
                </p>
                <p className="font-body text-sm mt-2" style={{ color: 'hsl(30 12% 55%)' }}>
                  Explore ARENQ advanced energy solutions.
                </p>
                <Link
                  href="/category/all"
                  className="mt-6 px-6 py-3 rounded-xl text-white font-semibold font-body text-sm"
                  style={{ background: 'hsl(12 55% 38%)' }}
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'hsl(12 55% 38%)' }}>
                  Send Us a Message
                </h2>
                <p className="font-body text-sm mb-6" style={{ color: 'hsl(30 12% 50%)' }}>
                  Fill in the form and we'll be in touch soon.
                </p>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass} style={{ color: 'hsl(20 25% 28%)' }}>Your Name *</label>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={inputClass('name')}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass} style={{ color: 'hsl(20 25% 28%)' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass('email')}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: 'hsl(20 25% 28%)' }}>Phone Number (optional)</label>
                    <PhoneInput
                      country={"in"}
                      value={formData.phone}
                      onChange={(phone) =>
                        setFormData({
                          ...formData,
                          phone,
                        })
                      }
                      enableSearch
                      inputProps={{
                        name: "phone",
                        required: true,
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "52px",
                        borderRadius: "12px",
                        border: "1px solid #e7e5e4",
                        fontSize: "14px",
                      }}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: 'hsl(20 25% 28%)' }}>Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={inputClass('subject') + ' cursor-pointer'}
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass} style={{ color: 'hsl(20 25% 28%)' }}>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className={inputClass('message') + ' resize-none'}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white font-display text-base font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{
                      background: "hsl(12 55% 38%)",
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ─── RIGHT: Contact Info ──────────────────────────── */}
          <div className="space-y-4">
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
              <h2 className="font-display text-xl font-bold mb-5" style={{ color: 'hsl(12 55% 38%)' }}>
                Contact Info
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin size={18} />,
                    label: 'Address',
                    value:
                      "ARENQ / Sunlit Power Pvt Ltd\nMaharashtra, India",

                    href:
                      "https://maps.app.goo.gl/95426wchEhFCxsBG9"
                  },
                  {
                    icon: <Phone size={18} />,
                    label: 'Phone',
                    value: '+91 8956225134',
                    href: 'tel:+918956225134',
                  },
                  {
                    icon: <Mail size={18} />,
                    label: 'Email',
                    value: 'info@arenq.co.in',
                    href: 'mailto:info@arenq.co.in',
                  },
                  {
                    icon: <WhatsAppIcon size={18} />,
                    label: 'WhatsApp',
                    value: '+91 8956225134',
                    href: 'https://wa.me/918956225134',
                  },
                  {
                    icon: <Clock size={18} />,
                    label: 'Hours',
                    value: 'Mon–Sat, 9AM–6PM IST',
                    href: null,
                  },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(36 28% 93%)' }}
                    >
                      <span style={{ color: 'hsl(12 55% 38%)' }}>{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold font-body uppercase tracking-wide mb-0.5" style={{ color: 'hsl(30 12% 55%)' }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          className="text-sm font-body whitespace-pre-line hover:underline"
                          style={{ color: 'hsl(20 25% 18%)' }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-body whitespace-pre-line" style={{ color: 'hsl(20 25% 18%)' }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918956225134"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border transition-all hover:opacity-90"
              style={{ background: 'hsl(145 35% 22%)', borderColor: 'hsl(145 35% 22%)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon size={22} />
              </div>
              <div className="text-white">
                <p className="font-body font-semibold text-sm">Chat on WhatsApp</p>
                <p className="font-body text-xs text-white/70">Fastest response — usually within 1 hour</p>
              </div>
              <MessageCircle size={16} className="ml-auto text-white/50" />
            </a>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
              <h3 className="font-body text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'hsl(30 12% 45%)' }}>
                Follow Our Journey
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://www.instagram.com/arenqindia', bg: 'hsl(300 60% 55%)' },
                  { icon: <Facebook size={18} />, label: 'Facebook', href: 'https://facebook.com/arenq', bg: 'hsl(220 60% 50%)' },
                  { icon: <Youtube size={18} />, label: 'YouTube', href: 'https://youtube.com/@arenq', bg: 'hsl(0 80% 55%)' },
                 
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform hover:scale-110"
                    style={{ background: s.bg }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              className="relative rounded-2xl overflow-hidden h-44 border border-stone-100"
              style={{
                background: 'linear-gradient(135deg, hsl(145 35% 18%) 0%, hsl(145 35% 28%) 40%, hsl(200 35% 40%) 100%)',
              }}
            >
              {/* <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
                alt="Dharamshala mountains"
                fill
                className="object-cover opacity-40 mix-blend-luminosity"
              /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <MapPin size={28} className="mb-2 drop-shadow" />
                <p className="font-display font-bold text-base drop-shadow">ARENQ Energy Solutions</p>
                <p className="font-body text-sm text-white/80 drop-shadow">Maharashtra, India</p>
                <a
                  href="https://maps.app.goo.gl/95426wchEhFCxsBG9"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs font-semibold font-body px-4 py-1.5 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 transition-colors"
                >
                  View on Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <p className="font-body text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'hsl(145 35% 28%)' }}>
              Common Questions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'hsl(12 55% 38%)' }}>
              Frequently Asked
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-body font-semibold text-sm sm:text-base" style={{ color: 'hsl(20 25% 14%)' }}>
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0" style={{ color: 'hsl(12 55% 38%)' }}>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'hsl(30 12% 40%)' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="font-body text-sm" style={{ color: 'hsl(30 12% 50%)' }}>
              Still have questions?{' '}
              <a
                href="https://wa.me/918956225134"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
                style={{ color: 'hsl(145 35% 28%)' }}
              >
                Chat with us on WhatsApp
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
