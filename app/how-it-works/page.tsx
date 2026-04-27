import Link from 'next/link';
import { SOCIETY, FAQS } from '@/lib/data';

export default function HowItWorksPage() {
  const steps = [
    {
      n: '01',
      title: 'Join your society',
      body: 'Search for your apartment complex in the app, pick your flat number, and you\'re in. If your society isn\'t live yet, we\'ll let your RWA know there\'s demand.',
    },
    {
      n: '02',
      title: 'Browse this week\'s catalog',
      body: 'Every Sunday, a fresh catalog of 50–70 staples drops in the app — atta, dal, oil, dairy, cleaning supplies. Real brands, weekly bulk prices.',
    },
    {
      n: '03',
      title: 'Add what you need to the cart',
      body: 'Tap to add. See your running total, your savings, and the live society participation. From week 4, the AI pre-fills your cart for you.',
    },
    {
      n: '04',
      title: 'Pay your share via UPI',
      body: 'Before the Monday cutoff, pay your portion. The system auto-splits the bulk bill across all participating flats — you only pay for what you ordered.',
    },
    {
      n: '05',
      title: 'Pick up from the gate',
      body: 'On Wednesday morning, the consolidated order arrives at the society gate. Each bag is labelled with a flat number. Pick up yours, done.',
    },
  ];

  const tiers = [
    { participation: '25%', discount: '8%', flats: '103' },
    { participation: '50%', discount: '11%', flats: '206' },
    { participation: '75%', discount: '14%', flats: '309', current: true },
    { participation: '100%', discount: '17%', flats: '412' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          HOW IT WORKS
        </span>
        <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[44px] md:text-[64px] mt-4">
          Five steps. Once a week.<br/>
          <em className="italic text-terra font-light">Forever cheaper groceries.</em>
        </h1>
        <p className="text-base text-ink-soft max-w-[620px] mx-auto mt-5 leading-relaxed">
          Community Cart aggregates your entire apartment&apos;s grocery demand into one weekly bulk order. Here&apos;s exactly what happens, week by week.
        </p>
      </div>

      <div className="space-y-1 mb-20">
        {steps.map(s => (
          <div key={s.n} className="grid md:grid-cols-[100px_1fr] gap-6 md:gap-12 py-10 border-t border-ink/15 first:border-t-2 first:border-ink">
            <div className="font-mono text-2xl text-terra font-bold tracking-wider">{s.n}</div>
            <div className="grid md:grid-cols-2 gap-8">
              <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-tight">{s.title}</h3>
              <p className="text-base text-ink-soft leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Discount tiers */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">THE BULK DISCOUNT</span>
          <h2 className="font-display font-normal tracking-[-0.03em] text-[36px] md:text-[44px] mt-3">
            More flats = <em className="italic text-terra font-light">deeper discount.</em>
          </h2>
          <p className="text-base text-ink-soft max-w-[480px] mx-auto mt-4">
            Your store partner gives wholesale pricing in tiers. The more of your society that participates each week, the more everyone saves.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiers.map((t, i) => (
            <div key={i} className={`rounded-2xl p-6 text-center ${t.current ? 'bg-ink text-cream' : 'bg-white border border-sand'}`}>
              <div className={`text-[10px] font-mono tracking-widest font-semibold mb-2 ${t.current ? 'opacity-60' : 'text-clay'}`}>
                TIER {i + 1}
              </div>
              <div className="font-display text-4xl font-medium tracking-tight" style={{ color: t.current ? '#7BC97D' : '#C73A1F' }}>
                {t.discount}
              </div>
              <div className="text-xs mt-1 mb-3 font-semibold">off MRP</div>
              <div className={`text-[10px] font-mono tracking-wider ${t.current ? 'opacity-60' : 'text-clay'}`}>
                {t.participation} PARTICIPATION
              </div>
              <div className={`text-[10px] mt-1 ${t.current ? 'opacity-60' : 'text-clay'}`}>
                ({t.flats} flats)
              </div>
              {t.current && <div className="text-[9px] font-bold text-leaf-light mt-3 tracking-wider">↑ CURRENT TIER</div>}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">FAQ</span>
          <h2 className="font-display font-normal tracking-[-0.03em] text-[36px] md:text-[44px] mt-3">
            Things people ask.
          </h2>
        </div>

        <div className="max-w-[760px] mx-auto">
          {FAQS.map((f, i) => (
            <details key={i} className="border-t border-ink/15 last:border-b group">
              <summary className="flex justify-between items-center py-6 cursor-pointer list-none">
                <span className="font-display text-lg md:text-xl font-medium tracking-tight pr-6">{f.q}</span>
                <span className="text-2xl text-terra group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-base text-ink-soft leading-relaxed pb-6 pr-12">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-ink text-cream rounded-3xl p-10 md:p-14 text-center">
        <h2 className="font-display font-normal tracking-tight text-[32px] md:text-[44px] leading-tight">
          Ready to see it in action?
        </h2>
        <div className="flex gap-3 mt-6 justify-center flex-wrap">
          <Link href="/app" className="px-7 py-4 bg-cream text-ink rounded-full text-sm font-bold tracking-wide hover:bg-terra hover:text-cream transition-colors">
            Try the app demo →
          </Link>
          <Link href="/contact" className="px-7 py-4 border-2 border-cream/30 rounded-full text-sm font-bold tracking-wide hover:border-cream transition-colors">
            Bring it to your society
          </Link>
        </div>
      </div>
    </div>
  );
}
