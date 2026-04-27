'use client';

import Link from 'next/link';
import { SOCIETY, RESIDENT, CYCLE_LIVE } from '@/lib/data';
import { useEffect, useState } from 'react';
import CutoffTimer from '@/components/CutoffTimer';

export default function LandingPage() {
  const [societyFlats, setSocietyFlats] = useState(CYCLE_LIVE.flatsJoined);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocietyFlats(prev => Math.min(prev + (Math.random() > 0.6 ? 1 : 0), 412));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-12 md:py-20 relative overflow-hidden">
      {/* Decorative arch background */}
      <svg className="absolute -top-20 -right-32 w-[500px] h-[500px] opacity-[0.04] pointer-events-none" viewBox="0 0 500 500">
        <path d="M50 450 Q50 100 250 100 Q450 100 450 450 L450 500 L50 500 Z" fill="#C73A1F" />
      </svg>
      <svg className="absolute -bottom-32 -left-20 w-[400px] h-[400px] opacity-[0.04] pointer-events-none" viewBox="0 0 500 500">
        <path d="M50 450 Q50 100 250 100 Q450 100 450 450 L450 500 L50 500 Z" fill="#E8743C" />
      </svg>

      <div className="max-w-[1100px] w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 bg-white border border-sand rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse-dot" />
            <span className="font-mono text-[10px] text-leaf tracking-widest font-semibold">
              LIVE DEMO · {societyFlats} OF {SOCIETY.totalFlats} FLATS ORDERING
            </span>
          </div>

          <h1 className="font-display font-normal tracking-[-0.035em] leading-[0.95] text-[44px] sm:text-[60px] md:text-[80px]"
              style={{ fontVariationSettings: '"SOFT" 50' }}>
            Step inside <em className="italic text-terra font-light">Community Cart.</em>
          </h1>

          <p className="text-base md:text-lg text-ink-soft max-w-[560px] mx-auto mt-5 leading-relaxed">
            A weekly bulk grocery ordering app for {SOCIETY.name}, {SOCIETY.area}. Pick a view to explore the experience from either side.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {/* Resident card */}
          <Link href="/app" className="group">
            <div className="bg-white border border-sand rounded-3xl p-7 md:p-9 h-full transition-all duration-300 hover:border-ink hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(42,24,16,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at top right, #C73A1F 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl text-cream flex items-center justify-center font-display text-2xl font-semibold"
                     style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
                  {RESIDENT.initial}
                </div>
                <span className="font-mono text-[10px] text-clay tracking-widest font-semibold">
                  ROLE · 01
                </span>
              </div>

              <div className="font-mono text-[10px] text-terra tracking-widest font-semibold mb-2">
                I&apos;M A RESIDENT
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-3">
                Shop with my <em className="italic text-terra font-light">society</em>.
              </h2>
              <p className="text-sm md:text-base text-ink-soft leading-relaxed mb-6">
                You&apos;re Priya Menon in flat A-407. Browse this week&apos;s catalog, watch your neighbours order in real time, split the bill, pay via UPI.
              </p>

              <div className="grid grid-cols-3 gap-3 pb-6 border-b border-sand mb-6">
                <Stat label="Saved YTD" value={`₹${(RESIDENT.totalSaved / 1000).toFixed(1)}k`} />
                <Stat label="Cycles" value={RESIDENT.cyclesParticipated.toString()} />
                <Stat label="Avg/week" value={`₹${RESIDENT.avgWeeklyOrder.toLocaleString('en-IN').slice(0, 5)}`} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-clay tracking-wider">5 INTERACTIVE TABS</span>
                <span className="font-display text-sm font-semibold text-terra group-hover:translate-x-1 transition-transform">
                  Open resident app →
                </span>
              </div>
            </div>
          </Link>

          {/* Admin card */}
          <Link href="/admin" className="group">
            <div className="bg-ink text-cream rounded-3xl p-7 md:p-9 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(42,24,16,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none"
                   style={{ background: 'radial-gradient(circle at top right, #E8743C 0%, transparent 70%)' }} />

              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cream text-ink flex items-center justify-center font-display text-2xl font-semibold">
                  S
                </div>
                <span className="font-mono text-[10px] opacity-60 tracking-widest font-semibold">
                  ROLE · 02
                </span>
              </div>

              <div className="font-mono text-[10px] text-terra-light tracking-widest font-semibold mb-2">
                I&apos;M THE RWA ADMIN
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-3">
                Run the <em className="italic text-terra-light font-light">whole society</em>.
              </h2>
              <p className="text-sm md:text-base opacity-70 leading-relaxed mb-6">
                You&apos;re Mr. Iyer, RWA President. See live participation, payment status flat-by-flat, push the consolidated order to your store partner.
              </p>

              <div className="grid grid-cols-3 gap-3 pb-6 border-b border-cream/15 mb-6">
                <Stat label="Participation" value={`${Math.round((societyFlats / SOCIETY.totalFlats) * 100)}%`} dark />
                <Stat label="Bulk tier" value={`${CYCLE_LIVE.currentDiscount}%`} dark highlight />
                <Stat label="Cycle Nº" value={SOCIETY.cycleNumber.toString()} dark />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono opacity-60 tracking-wider">FULL DESKTOP DASHBOARD</span>
                <span className="font-display text-sm font-semibold text-terra-light group-hover:translate-x-1 transition-transform">
                  Open admin view →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Below the fold context */}
        <div className="mt-12 pt-10 border-t border-ink/10 grid md:grid-cols-3 gap-8 md:gap-10">
          <div>
            <div className="font-mono text-[10px] text-clay tracking-widest font-semibold mb-2">
              THE PILOT SOCIETY
            </div>
            <div className="font-display text-lg font-medium leading-snug">
              {SOCIETY.name}, {SOCIETY.complex}
            </div>
            <div className="text-sm text-ink-soft mt-1">
              {SOCIETY.area}, {SOCIETY.city} {SOCIETY.pincode} · {SOCIETY.totalFlats} flats
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-clay tracking-widest font-semibold mb-2">
              CURRENT CYCLE
            </div>
            <div className="font-display text-lg font-medium leading-snug">
              Cycle Nº {SOCIETY.cycleNumber} · {SOCIETY.cycleDate}
            </div>
            <div className="text-sm text-ink-soft mt-1">
              <CutoffTimer /> · Delivery {SOCIETY.deliveryDay}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-clay tracking-widest font-semibold mb-2">
              ABOUT THIS DEMO
            </div>
            <div className="font-display text-lg font-medium leading-snug">
              All data is mocked.
            </div>
            <Link href="/about" className="text-sm text-terra mt-1 inline-block underline-link font-semibold">
              Read the full pitch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, dark, highlight }: { label: string; value: string; dark?: boolean; highlight?: boolean }) {
  return (
    <div>
      <div className={`font-display text-xl md:text-2xl font-semibold tracking-tight leading-none ${highlight ? 'text-leaf-light' : ''}`}>
        {value}
      </div>
      <div className={`text-[9px] font-mono tracking-widest mt-1.5 font-semibold ${dark ? 'opacity-60' : 'text-clay'}`}>
        {label.toUpperCase()}
      </div>
    </div>
  );
}
