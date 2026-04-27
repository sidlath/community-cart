'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import DecorArch from '@/components/DecorArch';
import HomeScreen from '@/components/screens/HomeScreen';
import CatalogScreen from '@/components/screens/CatalogScreen';
import LivePulseScreen from '@/components/screens/LivePulseScreen';
import PaymentScreen from '@/components/screens/PaymentScreen';
import SmartCartScreen from '@/components/screens/SmartCartScreen';
import { SOCIETY, RESIDENT, CYCLE_LIVE, TESTIMONIALS } from '@/lib/data';

export default function HomePage() {
  const [societyFlats, setSocietyFlats] = useState(CYCLE_LIVE.flatsJoined);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocietyFlats(prev => Math.min(prev + (Math.random() > 0.6 ? 1 : 0), 412));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <DecorArch />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-8">
        <Hero societyFlats={societyFlats} />
        <WeeklyCycle societyFlats={societyFlats} />
        <FeatureBand />
        <SmartFeatures />
        <Testimonials />
        <AdminPreview />
        <CTABand />
      </div>
    </div>
  );
}

/* HERO */
function Hero({ societyFlats }: { societyFlats: number }) {
  return (
    <section className="pt-16 md:pt-20 pb-20 relative">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
        <div className="animate-slide-up stagger-1">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-leaf animate-pulse-dot" />
            <span className="font-mono text-[11px] text-leaf tracking-[0.15em] font-semibold">
              LIVE IN {SOCIETY.name.toUpperCase()} · {SOCIETY.area.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display font-normal leading-[0.96] tracking-[-0.035em] text-[48px] sm:text-[64px] lg:text-[84px]"
              style={{ fontVariationSettings: '"SOFT" 50' }}>
            Your society<br/>
            buys groceries{' '}
            <em className="italic text-terra font-light">together</em>{' '}
            now.
          </h1>

          <p className="text-lg text-ink-soft max-w-[480px] mt-6 leading-relaxed">
            One curated catalog every week. All {SOCIETY.totalFlats} flats order at once. The store gives wholesale pricing. You save ₹400–600 a week without lifting a finger.
          </p>

          <div className="flex gap-3 mt-9 flex-wrap">
            <Link href="/app" className="px-7 py-4 bg-ink text-cream rounded-full text-[15px] font-bold tracking-wide hover:bg-terra transition-colors"
                  style={{ boxShadow: '0 12px 30px -10px rgba(42, 24, 16, 0.4)' }}>
              Open the app →
            </Link>
            <Link href="/for-societies" className="px-7 py-4 bg-transparent text-ink border-2 border-ink rounded-full text-[15px] font-bold tracking-wide hover:bg-ink hover:text-cream transition-colors">
              Bring it to your society
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-ink/12 grid grid-cols-3 gap-6">
            <Stat value={`₹${(RESIDENT.totalSaved / 1000).toFixed(1)}k`} label="Avg saving per flat / year" />
            <Stat value={SOCIETY.totalFlats.toString()} label="Flats in pilot society" />
            <Stat value="4.8★" label="Resident satisfaction" />
          </div>
        </div>

        <div className="flex justify-center relative animate-slide-up stagger-2">
          <div className="phone-shadow animate-float-soft">
            <PhoneFrame>
              <HomeScreen societyFlats={societyFlats} />
            </PhoneFrame>
          </div>

          <div className="hidden md:flex absolute top-20 -left-2 bg-white rounded-2xl p-4 items-center gap-2.5"
               style={{ boxShadow: '0 16px 40px -10px rgba(42, 24, 16, 0.2)', animation: 'slide-up 0.8s 0.6s both, float-soft 5s 1.5s ease-in-out infinite' }}>
            <div className="w-9 h-9 rounded-[10px] bg-leaf flex items-center justify-center text-white text-lg">✓</div>
            <div>
              <div className="text-[10px] text-clay font-mono tracking-wider">SAVED THIS WEEK</div>
              <div className="font-display text-lg font-semibold">₹487</div>
            </div>
          </div>

          <div className="hidden md:block absolute bottom-24 -right-4 bg-ink text-cream rounded-2xl px-4 py-3.5"
               style={{ boxShadow: '0 16px 40px -10px rgba(42, 24, 16, 0.3)', animation: 'slide-up 0.8s 0.8s both, float-soft 5s ease-in-out infinite' }}>
            <div className="text-[10px] opacity-60 font-mono tracking-wider">BULK TIER UNLOCKED</div>
            <div className="font-display text-lg font-medium mt-0.5">14% off, all flats</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[36px] font-medium tracking-[-0.02em] leading-none text-terra">
        {value}
      </div>
      <div className="text-[11px] text-clay uppercase tracking-[0.12em] mt-2 font-semibold">
        {label}
      </div>
    </div>
  );
}

/* WEEKLY CYCLE */
function WeeklyCycle({ societyFlats }: { societyFlats: number }) {
  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <span className="inline-block text-[11px] font-mono text-terra tracking-[0.2em] font-semibold mb-4">
          THE WEEKLY CYCLE
        </span>
        <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[48px] lg:text-[56px] max-w-[760px] mx-auto">
          Browse, watch the cart fill,<br/>
          <em className="italic text-terra font-light">split the bill, done.</em>
        </h2>
        <p className="text-base text-ink-soft max-w-[560px] mx-auto mt-5 leading-relaxed">
          Three taps a week. The app does the heavy lifting — aggregating orders, calculating splits, coordinating the gate delivery.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
        <CycleStep number="01" title="Browse the catalog" description="50–70 staples curated weekly, with real bulk pricing.">
          <PhoneFrame scale={0.9}><CatalogScreen /></PhoneFrame>
        </CycleStep>
        <CycleStep number="02" title="Watch the basket fill" description="See your neighbours order in real time. Each flat unlocks a deeper discount.">
          <PhoneFrame scale={0.9}><LivePulseScreen societyFlats={societyFlats} /></PhoneFrame>
        </CycleStep>
        <CycleStep number="03" title="Pay your share" description="Auto-calculated split. UPI in 2 seconds. Bag arrives at the gate.">
          <PhoneFrame scale={0.9}><PaymentScreen /></PhoneFrame>
        </CycleStep>
      </div>
    </section>
  );
}

function CycleStep({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center max-w-xs">
      <div className="phone-shadow mb-5">{children}</div>
      <div className="font-mono text-[11px] text-terra tracking-[0.15em] font-semibold mb-1.5">
        STEP {number}
      </div>
      <div className="font-display text-[22px] font-medium text-center tracking-tight">
        {title}
      </div>
      <p className="text-sm text-ink-soft text-center mt-2 leading-relaxed max-w-[260px]">
        {description}
      </p>
    </div>
  );
}

/* FEATURE BAND */
function FeatureBand() {
  const features = [
    { icon: '🛒', title: 'Curated weekly catalog', body: '50–70 staples your society actually buys. No 14 brands of cornflakes.' },
    { icon: '🤝', title: 'Real wholesale pricing', body: 'Your local store gives bulk rates because they get guaranteed weekly volume.' },
    { icon: '💸', title: 'Auto bill splitting', body: 'No spreadsheets, no UPI back-and-forth. Each flat pays only what they owe.' },
    { icon: '📦', title: 'One delivery, one gate', body: 'No 200 separate Blinkit riders. One labelled bag per flat, fixed day.' },
  ];

  return (
    <section className="py-20 border-t border-b border-ink/10 mt-10">
      <div className="mb-12">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          WHY IT WORKS
        </span>
        <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[42px] lg:text-[48px] mt-3.5 max-w-[720px]">
          Built for the way <em className="italic text-terra font-light">Mumbai apartments</em> actually live.
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-px bg-ink/10">
        {features.map((f, i) => (
          <div key={i} className="bg-cream p-8 min-h-[220px]">
            <div className="text-3xl mb-4">{f.icon}</div>
            <div className="font-display text-xl font-medium tracking-tight mb-2.5 leading-snug">
              {f.title}
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* SMART FEATURES */
function SmartFeatures() {
  return (
    <section className="py-24 relative">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center animate-float-soft">
          <div className="phone-shadow">
            <PhoneFrame>
              <SmartCartScreen />
            </PhoneFrame>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
            ✨ POWERED BY AI
          </span>
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[44px] lg:text-[52px] mt-3.5">
            Your cart fills <em className="italic text-terra font-light">itself</em> after week three.
          </h2>
          <p className="text-[17px] text-ink-soft mt-5 leading-relaxed max-w-[460px]">
            We learn your household&apos;s rhythm — how much rice you go through, when the dal runs out, which brand of tea you keep coming back to. From week 4 onwards, your weekly cart is pre-filled. You review, adjust, confirm. Sixty seconds.
          </p>

          <div className="mt-8">
            {[
              { title: 'Smart Cart Pre-fill', body: 'After 2–3 cycles, AI assembles your weekly cart automatically.' },
              { title: 'Replenishment Reminders', body: 'Bought 5kg rice 3 weeks ago? We tell you before you run out.' },
              { title: 'New-resident Provisions List', body: 'Tell us your family size. We generate a starter pantry for you.' },
            ].map((f, i) => (
              <div key={i} className="flex gap-4 py-3.5 border-t border-ink/12">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border border-sand"
                     style={{ background: 'linear-gradient(135deg, #FFFBF3, #F5EDE0)' }}>✨</div>
                <div>
                  <div className="font-display text-[17px] font-semibold tracking-tight">{f.title}</div>
                  <div className="text-sm text-ink-soft mt-0.5 leading-relaxed">{f.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* TESTIMONIALS */
function Testimonials() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          FROM THE PILOT
        </span>
        <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[44px] mt-3.5">
          What residents are <em className="italic text-terra font-light">saying.</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white border border-sand rounded-3xl p-7">
            <div className="text-4xl text-terra font-display leading-none mb-3">&ldquo;</div>
            <p className="font-display text-[17px] leading-snug font-medium text-ink mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3 pt-5 border-t border-sand">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-base font-semibold text-cream"
                   style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
                {t.initial}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-clay font-mono tracking-wide">{t.flat}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ADMIN PREVIEW */
function AdminPreview() {
  return (
    <section className="py-20">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
            FOR THE RWA
          </span>
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[44px] mt-3.5">
            The whole society on <em className="italic text-terra font-light">one screen.</em>
          </h2>
          <p className="text-base text-ink-soft mt-5 leading-relaxed max-w-[440px]">
            Track participation, collect payments, push the consolidated order to your store partner — all from a single dashboard. Your committee spends less than 30 minutes a week on it.
          </p>
          <Link href="/admin" className="inline-flex items-center gap-2 mt-7 px-6 py-3.5 bg-ink text-cream rounded-full text-sm font-bold tracking-wide hover:bg-terra transition-colors">
            View the live dashboard →
          </Link>
        </div>

        <div className="bg-[#1a1208] rounded-2xl p-3" style={{ boxShadow: '0 40px 80px -20px rgba(42, 24, 16, 0.3), 0 0 0 1px #3a2a1c' }}>
          <div className="flex items-center gap-2 px-3 pb-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-[#3a2a1c] rounded-md px-2.5 py-1 text-[11px] text-cream/70 font-mono text-center">
              🔒 admin.communitycart.in/eldora-powai
            </div>
          </div>
          <div className="bg-cream rounded-xl p-6 min-h-[400px]">
            <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-1.5">
              RWA · {SOCIETY.name.toUpperCase()} · CYCLE {SOCIETY.cycleNumber}
            </div>
            <h3 className="font-display text-2xl font-medium tracking-tight">
              Welcome back, <em className="italic text-terra">Mr. Iyer</em>.
            </h3>
            <div className="grid grid-cols-2 gap-3 mt-5">
              {[
                { label: 'Participation', value: '60%', sub: '247 of 412' },
                { label: 'Bulk discount', value: '14%', sub: 'Tier 3 unlocked' },
                { label: 'Payments', value: '78%', sub: '₹2.16L collected' },
                { label: 'Society savings', value: '₹38.9k', sub: 'this cycle' },
              ].map((k, i) => (
                <div key={i} className="bg-white border border-sand rounded-xl p-3.5">
                  <div className="text-[9px] text-clay uppercase tracking-widest font-semibold mb-1.5">
                    {k.label}
                  </div>
                  <div className="font-display text-2xl font-medium tracking-tight leading-none text-ink">
                    {k.value}
                  </div>
                  <div className="text-[10px] text-ink-soft mt-1">{k.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-[10px] font-mono text-clay tracking-wide">
              Click &lsquo;View the live dashboard&rsquo; to see the full RWA view →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CTA BAND */
function CTABand() {
  return (
    <section className="py-24">
      <div className="bg-ink text-cream rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, #C73A1F 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, #E8743C 0%, transparent 70%)' }} />
        </div>
        <div className="relative">
          <span className="text-[11px] font-mono text-terra-light tracking-[0.2em] font-semibold">
            READY TO START?
          </span>
          <h2 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[36px] sm:text-[48px] lg:text-[56px] mt-4 max-w-[700px] mx-auto">
            Bring Community Cart to <em className="italic text-terra-light font-light">your society.</em>
          </h2>
          <p className="text-base text-cream/70 mt-5 max-w-[480px] mx-auto leading-relaxed">
            We&apos;re onboarding 10 societies in Mumbai over the next 90 days. Talk to your RWA, then talk to us.
          </p>
          <div className="flex gap-3 mt-9 flex-wrap justify-center">
            <Link href="/contact" className="px-7 py-4 bg-cream text-ink rounded-full text-[15px] font-bold tracking-wide hover:bg-terra hover:text-cream transition-colors">
              Get on the pilot list →
            </Link>
            <Link href="/app" className="px-7 py-4 bg-transparent text-cream border-2 border-cream/30 rounded-full text-[15px] font-bold tracking-wide hover:border-cream transition-colors">
              Try the app first
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
