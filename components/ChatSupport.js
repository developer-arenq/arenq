'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FAQS = [
  {
    q: "Battery Solutions",
    a:
      "ARENQ provides advanced lithium battery solutions including EV batteries, Industrial UPS batteries, Solar batteries, Telecom batteries, BESS and custom energy storage systems.",
  },

  {
    q: "Custom Battery Requirement",
    a:
      "Yes, ARENQ develops customized lithium battery packs based on voltage, capacity and application requirements.",
  },

  {
    q: "Industries We Serve",
    a:
      "ARENQ provides energy solutions for Agriculture, Defence, Petrochemical, EV, Solar, Telecom, Medical and Industrial sectors.",
  },

  {
    q: "Quality & Safety",
    a:
      "Our batteries are designed with advanced technology and undergo strict quality checks for safety, reliability and long life performance.",
  },

  {
    q: "Partnership",
    a:
      "We support OEM partnerships, distributors and businesses looking for reliable energy storage solutions.",
  },

  {
    q: "Contact ARENQ",
    a:
      "You can reach ARENQ on WhatsApp +91 89562 25134 or email info@arenq.co.in.",
  },
];

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function ChatSupport() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hello! 👋 Welcome to ARENQ.\n\n" +
        "The Future Of Electricity Storage Solutions 🔋\n\n" +
        "How can I help you today?\n\n" +
        "You can ask about:\n" +
        "🚗 Electric Vehicle Batteries\n" +
        "🏭 Industrial UPS Batteries\n" +
        "☀️ Solar Energy Solutions\n" +
        "⚡ BESS & Energy Storage\n" +
        "🔋 Custom Lithium Battery Solutions",
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  function addUserMessage(text) {
    const userMsg = { from: 'user', text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const response = getBotResponse(text);
      setMessages(prev => [...prev, { from: 'bot', text: response, time: now() }]);
    }, 900 + Math.random() * 400);
  }

  function getBotResponse(msg) {

    const lower = msg.toLowerCase();


    if (
      lower.includes("battery") ||
      lower.includes("solution")
    )
      return FAQS[0].a;


    if (
      lower.includes("custom") ||
      lower.includes("capacity") ||
      lower.includes("voltage")
    )
      return FAQS[1].a;


    if (
      lower.includes("industry") ||
      lower.includes("sector")
    )
      return FAQS[2].a;


    if (
      lower.includes("quality") ||
      lower.includes("safe") ||
      lower.includes("test")
    )
      return FAQS[3].a;


    if (
      lower.includes("partner") ||
      lower.includes("dealer") ||
      lower.includes("distributor")
    )
      return FAQS[4].a;


    if (
      lower.includes("ev")
    )
      return "ARENQ EV batteries deliver powerful, safe and efficient energy solutions for electric mobility applications.";


    if (
      lower.includes("solar")
    )
      return "ARENQ solar battery solutions provide reliable renewable energy storage for homes and industries.";


    if (
      lower.includes("ups")
    )
      return "ARENQ Industrial UPS batteries provide dependable backup power solutions.";


    if (
      lower.includes("contact") ||
      lower.includes("whatsapp")
    )
      return FAQS[5].a;


    if (
      lower.includes("hi") ||
      lower.includes("hello")
    )
      return "Hello 👋 Welcome to ARENQ. How can we help you with your energy requirement?";


    return `
Thank you for contacting ARENQ.

Our energy experts will help you with:
🔋 Lithium Batteries
🚗 EV Solutions
☀️ Solar Storage
🏭 Industrial Applications

WhatsApp:
+91 89562 25134
`;

  }

  function handleSend() {
    if (!input.trim()) return;
    addUserMessage(input.trim());
  }

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen(v => !v)}
        className="chat-float"
        aria-label="Open chat support"
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '20px',
          zIndex: 999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#0A528F',
          color: 'white',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px hsl(145 35% 22% / 0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {!open && messages.length > 0 && (
          <span style={{ position: 'absolute', top: '0px', right: '0px', width: '16px', height: '16px', borderRadius: '50%', background: 'hsl(28 65% 52%)', fontSize: '0.55rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            1
          </span>
        )}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed z-50 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          style={{
            bottom: '150px',
            right: '20px',
            width: '340px',
            maxWidth: 'calc(100vw - 32px)',
            height: '480px',
            maxHeight: 'calc(100vh - 180px)',
            background: 'white',
            border: '1px solid hsl(35 15% 85%)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ background: '#0A528F', color: 'white' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#FFB600' }}>
                <span>🔋</span>
              </div>
              <div>
                <div className="text-sm font-bold">ARENQ Support</div>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'hsl(145 20% 72%)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online · Responds in minutes
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors"><X size={16} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: 'hsl(38 20% 98%)' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'bot' && (
                  <div className="w-6 h-6 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-sm" style={{ background: '#FFB600', marginTop: '2px' }}>
                    <span style={{ fontSize: '0.65rem' }}>🏔️</span>
                  </div>
                )}
                <div>
                  <div
                    className="rounded-2xl px-3 py-2 text-xs leading-relaxed max-w-xs"
                    style={{
                      background: msg.from === 'bot' ? 'white' : '#FFB600',
                      color: msg.from === 'bot' ? 'hsl(20 25% 15%)' : 'white',
                      border: msg.from === 'bot' ? '1px solid hsl(35 15% 88%)' : 'none',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {msg.text}
                  </div>
                  <div className="text-xs mt-0.5 px-1" style={{ color: 'hsl(30 12% 60%)' }}>{msg.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ background: 'hsl(145 35% 22%)' }}>
                  <span style={{ fontSize: '0.65rem' }}>🏔️</span>
                </div>
                <div className="rounded-2xl px-3 py-2" style={{ background: 'white', border: '1px solid hsl(35 15% 88%)' }}>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(30 12% 60%)', animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick FAQs */}
          <div className="px-3 py-2 overflow-x-auto" style={{ borderTop: '1px solid hsl(35 15% 90%)', background: 'hsl(38 20% 97%)' }}>
            <div className="flex gap-2" style={{ scrollbarWidth: 'none' }}>
              {FAQS.slice(0, 4).map(faq => (
                <button
                  key={faq.q}
                  onClick={() => addUserMessage(faq.q)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                  style={{ background: 'hsl(145 35% 22% / 0.08)', color: 'hsl(145 35% 22%)', border: '1px solid hsl(145 35% 22% / 0.2)' }}
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: '1px solid hsl(35 15% 88%)', background: 'white' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
              style={{ background: 'hsl(38 20% 97%)', border: '1.5px solid hsl(35 15% 88%)', fontFamily: 'var(--font-body)' }}
              onFocus={e => (e.target.style.borderColor = 'hsl(145 35% 30%)')}
              onBlur={e => (e.target.style.borderColor = 'hsl(35 15% 88%)')}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: input.trim() ? '#FFB600' : 'hsl(35 15% 88%)', color: 'white' }}
            >
              <Send size={14} />
            </button>
          </div>

          {/* WhatsApp fallback */}
          <div className="px-4 py-2.5 text-center text-xs" style={{ background: '#0A528F', color: 'hsl(145 20% 72%)' }}>
            Need energy solution assistance?{' '}
            <a href="https://wa.me/918956225134" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: 'hsl(28 65% 70%)' }}>
              WhatsApp us
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
