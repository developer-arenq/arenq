'use client';

import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  {
    name: 'Pahadi',
    range: '0 – 999 pts',
    color: '#1F4A2A',
    bgLight: 'rgba(31,74,42,0.08)',
    icon: '🌿',
    discount: '5%',
    perks: [
      'Birthday bonus — 100 points',
      'Early sale access',
      'Monthly Himalayan newsletter',
      'Member-only recipe cards',
    ],
    description: 'Your journey with the mountains begins here.',
  },
  {
    name: 'Himalayan',
    range: '1,000 – 4,999 pts',
    color: '#7A3020',
    bgLight: 'rgba(122,48,32,0.08)',
    icon: '⛰️',
    discount: '10%',
    perks: [
      'Everything in Pahadi',
      'Free shipping on every order',
      'Early access to new launches',
      'Priority customer support',
      'Exclusive seasonal bundles',
    ],
    description: 'The mountains reward those who stay the course.',
    popular: true,
  },
  {
    name: 'Summit',
    range: '5,000+ pts',
    color: '#C96A28',
    bgLight: 'rgba(201,106,40,0.08)',
    icon: '🏔️',
    discount: '15%',
    perks: [
      'Everything in Himalayan',
      'Personal shopper access',
      'Exclusive summit-only products',
      'Annual gift hamper (₹1,500 value)',
      'Invitations to farm visits',
      'Co-brand your hampers',
    ],
    description: 'For those who have truly embraced the Himalayan way.',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Join Free', desc: 'Create your Arenq account — takes 30 seconds. No fees, no subscriptions.', icon: '✨' },
  { step: '02', title: 'Shop', desc: 'Browse 200+ Himalayan products. Every purchase earns points automatically.', icon: '🛒' },
  { step: '03', title: 'Earn Points', desc: '₹1 spent = 1 point. Bonus points on birthdays, referrals, and reviews.', icon: '⭐' },
  { step: '04', title: 'Redeem', desc: 'Use points for discounts, free products, or exclusive mountain experiences.', icon: '🎁' },
];

const REDEEM_OPTIONS = [
  { title: 'Discounts on Orders', desc: '100 pts = ₹10 off your next order. Apply at checkout.', icon: '💰', min: '100 pts' },
  { title: 'Free Products', desc: 'Redeem 500 pts for a free sample pack. 1,000 pts for a full-size product.', icon: '📦', min: '500 pts' },
  { title: 'Exclusive Experiences', desc: 'Himalayan farm visits, artisan workshops, tea estate tours — for Summit members.', icon: '🌄', min: '2,500 pts' },
  { title: 'Gift Someone', desc: 'Transfer points to a friend or donate them to support Himalayan farmers.', icon: '🎁', min: '200 pts' },
];

export default function LoyaltyPage() {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [referralCode] = useState('PAHADI-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  const pointsEarned = purchaseAmount ? Math.floor(parseFloat(purchaseAmount) || 0) : 0;
  const tierReached = pointsEarned >= 5000 ? 'Summit' : pointsEarned >= 1000 ? 'Himalayan' : 'Pahadi';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4" style={{ background: 'linear-gradient(135deg, #1F4A2A 0%, #7A3020 60%, #C96A28 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: '#F5F0E8', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: '#F5F0E8', transform: 'translate(-30%, 30%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-semibold" style={{ backgroundColor: 'rgba(245,240,232,0.15)', color: '#F5F0E8', border: '1px solid rgba(245,240,232,0.3)' }}>
            <span>✦</span> Loyalty Program
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}>
            Apnee Rewards
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-3" style={{ color: 'rgba(245,240,232,0.9)' }}>Earn with Every Purchase</p>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(245,240,232,0.8)' }}>
            Every rupee you spend earns points. Climb from Pahadi to Summit and unlock exclusive Himalayan rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/account/register"
              className="px-8 py-4 rounded-xl font-semibold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#F5F0E8', color: '#7A3020' }}
            >
              Join for Free
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl font-semibold text-base transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'transparent', color: '#F5F0E8', border: '1.5px solid rgba(245,240,232,0.4)' }}
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#C96A28' }}>Membership Tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#7A3020', fontFamily: 'Georgia, serif' }}>Your Journey to the Summit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map(tier => (
              <div
                key={tier.name}
                className="relative rounded-2xl p-7 transition-shadow hover:shadow-xl"
                style={{
                  backgroundColor: '#fff',
                  border: tier.popular ? `2px solid ${tier.color}` : '1px solid #e8ddd0',
                  transform: tier.popular ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: tier.color, color: '#F5F0E8' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{tier.icon}</div>
                <h3 className="text-2xl font-bold mb-1" style={{ color: tier.color, fontFamily: 'Georgia, serif' }}>{tier.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: '#8B7355' }}>{tier.range}</p>
                <p className="text-sm mb-5" style={{ color: '#6B5744' }}>{tier.description}</p>

                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-lg font-bold mb-6" style={{ backgroundColor: tier.bgLight, color: tier.color }}>
                  {tier.discount} off every order
                </div>

                <div className="space-y-2.5">
                  {tier.perks.map(perk => (
                    <div key={perk} className="flex items-start gap-2.5">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5" style={{ stroke: tier.color }}>
                        <path strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm" style={{ color: '#3D2B1F' }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-20 px-4" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#C96A28' }}>Getting Started</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#7A3020', fontFamily: 'Georgia, serif' }}>How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="text-center relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-md" style={{ backgroundColor: '#F5F0E8', border: '2px solid #e8ddd0' }}>
                  {step.icon}
                </div>
                <div className="text-sm font-bold mb-2 tracking-widest" style={{ color: '#C96A28' }}>{step.step}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A110A', fontFamily: 'Georgia, serif' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B5744' }}>{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 -translate-y-1/2" style={{ backgroundColor: '#e8ddd0', width: 'calc(100% - 80px)', left: 'calc(50% + 40px)' }}>
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 24 24" fill="#d4c5b0">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="#d4c5b0" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points Calculator */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#C96A28' }}>Points Calculator</p>
            <h2 className="text-3xl font-bold" style={{ color: '#7A3020', fontFamily: 'Georgia, serif' }}>See What You&apos;ll Earn</h2>
          </div>
          <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#fff', border: '1px solid #e8ddd0' }}>
            <label className="block text-sm font-semibold mb-3" style={{ color: '#1A110A' }}>Enter your purchase amount (₹)</label>
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold" style={{ color: '#8B7355' }}>₹</span>
              <input
                type="number"
                min="0"
                value={purchaseAmount}
                onChange={e => setPurchaseAmount(e.target.value)}
                placeholder="500"
                className="w-full pl-10 pr-4 py-4 rounded-xl text-xl font-bold outline-none transition-shadow focus:shadow-md"
                style={{ border: '2px solid #d4c5b0', backgroundColor: '#F5F0E8', color: '#1A110A' }}
              />
            </div>

            {purchaseAmount && parseFloat(purchaseAmount) > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-xl" style={{ backgroundColor: '#F5F0E8', border: '1.5px solid #d4c5b0' }}>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#6B5744' }}>Points Earned</p>
                    <p className="text-3xl font-bold" style={{ color: '#7A3020' }}>{pointsEarned.toLocaleString()} pts</p>
                  </div>
                  <div className="text-4xl">⭐</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'rgba(31,74,42,0.08)', border: '1px solid rgba(31,74,42,0.15)' }}>
                  <p className="text-sm font-medium" style={{ color: '#1F4A2A' }}>Tier after this purchase</p>
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#1F4A2A', color: '#F5F0E8' }}>{tierReached}</span>
                </div>
                <p className="text-xs text-center" style={{ color: '#8B7355' }}>
                  Points = ₹{pointsEarned / 100} in reward value ({(pointsEarned / parseFloat(purchaseAmount) * 100).toFixed(1)}% back)
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm" style={{ color: '#8B7355' }}>Enter an amount above to see your points</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16 md:py-20 px-4" style={{ backgroundColor: '#1F4A2A' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#C96A28' }}>Referral Program</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}>Share the Mountains</h2>
              <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>
                Share Arenq with friends and family. When they make their first purchase, they get ₹100 off — and you earn 200 bonus points.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.2)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: 'rgba(201,106,40,0.3)' }}>🎁</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#F5F0E8' }}>Your friend gets ₹100 off</p>
                    <p className="text-xs" style={{ color: 'rgba(245,240,232,0.7)' }}>Applied automatically at checkout</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.2)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: 'rgba(201,106,40,0.3)' }}>⭐</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#F5F0E8' }}>You earn 200 bonus points</p>
                    <p className="text-xs" style={{ color: 'rgba(245,240,232,0.7)' }}>Credited when your friend&apos;s order ships</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: 'rgba(245,240,232,0.1)', border: '1px solid rgba(245,240,232,0.2)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(245,240,232,0.8)' }}>Your Referral Code</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 p-3 rounded-xl font-bold text-lg tracking-wider" style={{ backgroundColor: 'rgba(245,240,232,0.15)', color: '#F5F0E8' }}>
                    {referralCode}
                  </div>
                  <button className="px-4 py-3 rounded-xl text-sm font-semibold flex-shrink-0" style={{ backgroundColor: '#C96A28', color: '#F5F0E8' }}>
                    Copy
                  </button>
                </div>
                <p className="text-xs mb-4" style={{ color: 'rgba(245,240,232,0.6)' }}>Share this code or use the link below</p>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/?text=Use%20my%20Arenq%20referral%20code%20for%20₹100%20off!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: '#25D366', color: '#fff' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <button
                    className="flex-1 py-3 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: 'rgba(245,240,232,0.15)', color: '#F5F0E8', border: '1px solid rgba(245,240,232,0.3)' }}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redeem Options */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#C96A28' }}>Redeem Your Points</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#7A3020', fontFamily: 'Georgia, serif' }}>What You Can Get</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REDEEM_OPTIONS.map(opt => (
              <div key={opt.title} className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#fff', border: '1px solid #e8ddd0' }}>
                <div className="text-4xl mb-4">{opt.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#1A110A' }}>{opt.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#6B5744' }}>{opt.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F5F0E8', color: '#7A3020', border: '1px solid #d4c5b0' }}>
                  From {opt.min}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="rounded-3xl p-10 md:p-14 shadow-xl" style={{ background: 'linear-gradient(135deg, #7A3020, #C96A28)' }}>
            <div className="text-5xl mb-5">🏔️</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif' }}>
              Start Your Himalayan Journey
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'rgba(245,240,232,0.85)' }}>
              Join thousands of Himalayan enthusiasts who earn rewards with every order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F5F0E8', color: '#7A3020' }}
              >
                Create Free Account
              </Link>
              <Link
                href="/search?category=all"
                className="px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'transparent', color: '#F5F0E8', border: '1.5px solid rgba(245,240,232,0.5)' }}
              >
                Start Shopping
              </Link>
            </div>
            <p className="text-xs mt-5" style={{ color: 'rgba(245,240,232,0.6)' }}>No fees. No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
