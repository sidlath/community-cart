import Link from 'next/link';
import { SOCIETY } from '@/lib/data';

export default function ForSocietiesPage() {
  const benefits = [
    { icon: '💰', title: 'Residents save ₹15k+ a year', body: 'Real wholesale pricing on the staples every household buys anyway. Money stays in residents\' pockets, not Blinkit\'s warehouse.' },
    { icon: '📉', title: 'Less delivery chaos at the gate', body: 'One delivery a week instead of 200 individual riders. Security has fewer gate entries to track. Less noise, less litter.' },
    { icon: '👥', title: 'Stronger community bonds', body: 'Residents start chatting about the weekly cart in WhatsApp groups. Naturally builds the sense of "we" your RWA already wants.' },
    { icon: '🤝', title: 'Local economy support', body: 'Your store partner is a small or mid-size local business. Every order flows to them, not to a faceless dark store warehouse 30 km away.' },
  ];

  const onboarding = [
    { week: 'Week 0', title: 'Discovery call', body: '30-minute call with the RWA committee. We walk through how the model works, share data from existing pilots, answer questions.' },
    { week: 'Week 1', title: 'Store partner setup', body: 'We identify and onboard a wholesale grocery partner near your society — usually within 2 km. They commit to bulk pricing.' },
    { week: 'Week 2', title: 'RWA endorsement', body: 'Your committee posts an announcement in resident WhatsApp groups. We provide the messaging, FAQs, and onboarding video.' },
    { week: 'Week 3', title: 'First cycle goes live', body: 'Residents download the app, browse the catalog, and order. The first delivery happens Wednesday morning.' },
    { week: 'Week 4+', title: 'It runs itself', body: 'Once the weekly habit is established, the cycle is automated. RWA admin reviews the dashboard once or twice a week.' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          FOR RWA COMMITTEES
        </span>
        <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[44px] md:text-[64px] mt-4">
          Bring Community Cart to<br/>
          <em className="italic text-terra font-light">your society.</em>
        </h1>
        <p className="text-base text-ink-soft max-w-[640px] mx-auto mt-5 leading-relaxed">
          Zero cost to the RWA. Zero cost to residents. Just a weekly habit that saves every flat ₹400–600 per cycle, builds community, and reduces delivery chaos.
        </p>
        <div className="flex gap-3 mt-8 justify-center flex-wrap">
          <Link href="/contact" className="px-7 py-4 bg-ink text-cream rounded-full text-sm font-bold tracking-wide hover:bg-terra transition-colors"
                style={{ boxShadow: '0 12px 30px -10px rgba(42, 24, 16, 0.4)' }}>
            Schedule a discovery call →
          </Link>
          <Link href="/admin" className="px-7 py-4 border-2 border-ink rounded-full text-sm font-bold tracking-wide hover:bg-ink hover:text-cream transition-colors">
            View RWA dashboard demo
          </Link>
        </div>
      </div>

      {/* Pilot society stats */}
      <div className="bg-ink text-cream rounded-3xl p-10 md:p-12 mb-20">
        <div className="text-[11px] font-mono text-terra-light tracking-[0.2em] font-semibold mb-3">
          OUR PILOT · {SOCIETY.name.toUpperCase()} · {SOCIETY.area.toUpperCase()}
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight leading-tight mb-10">
          What 14 weeks at <em className="italic text-terra-light font-light">Hiranandani Eldora</em> looks like.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-display text-4xl md:text-5xl font-medium tracking-tight">412</div>
            <div className="text-xs opacity-60 font-mono tracking-wider mt-2">FLATS IN SOCIETY</div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl font-medium tracking-tight text-terra-light">60%</div>
            <div className="text-xs opacity-60 font-mono tracking-wider mt-2">AVG WEEKLY PARTICIPATION</div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl font-medium tracking-tight text-leaf-light">14%</div>
            <div className="text-xs opacity-60 font-mono tracking-wider mt-2">AVG BULK DISCOUNT</div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl font-medium tracking-tight">₹4.7L</div>
            <div className="text-xs opacity-60 font-mono tracking-wider mt-2">YTD RESIDENT SAVINGS</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-20">
        <h2 className="font-display font-normal tracking-tight text-[36px] md:text-[44px] mb-10 text-center">
          Why RWAs say <em className="italic text-terra font-light">yes.</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white border border-sand rounded-2xl p-7">
              <div className="text-3xl mb-3">{b.icon}</div>
              <div className="font-display text-xl font-medium tracking-tight mb-2 leading-tight">{b.title}</div>
              <p className="text-sm text-ink-soft leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding timeline */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">ONBOARDING</span>
          <h2 className="font-display font-normal tracking-tight text-[36px] md:text-[44px] mt-3">
            From first call to first delivery in <em className="italic text-terra font-light">21 days.</em>
          </h2>
        </div>

        <div className="space-y-1">
          {onboarding.map((o, i) => (
            <div key={i} className="grid md:grid-cols-[140px_1fr] gap-6 md:gap-12 py-8 border-t border-ink/15 first:border-t-2 first:border-ink">
              <div className="font-mono text-sm text-terra font-bold tracking-widest">{o.week}</div>
              <div className="grid md:grid-cols-[1fr_1fr] gap-6">
                <h3 className="font-display text-2xl font-medium tracking-tight leading-tight">{o.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cost section */}
      <div className="bg-cream-light border-2 border-ink rounded-3xl p-10 md:p-14 mb-20">
        <div className="text-center max-w-[640px] mx-auto">
          <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">THE COST TO YOUR SOCIETY</span>
          <h2 className="font-display font-normal tracking-tight text-[44px] md:text-[64px] mt-3 leading-none">
            <em className="italic text-terra font-light">Zero.</em>
          </h2>
          <p className="text-base text-ink-soft mt-4 leading-relaxed">
            No setup fees. No subscription costs. No commitment from the RWA. Community Cart is funded by a 3–5% commission from the store partner — they pay it because the bulk volume is worth it. The RWA just provides the pre-existing trust and access. Residents save. The store sells more. Everyone wins.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-ink text-cream rounded-3xl p-10 md:p-14 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight leading-tight mb-3">
          We&apos;re onboarding 10 societies in Mumbai over the next 90 days.
        </h2>
        <p className="text-cream/70 text-base max-w-[480px] mx-auto leading-relaxed">
          Talk to your RWA. Then talk to us. We handle everything from there.
        </p>
        <Link href="/contact" className="inline-block mt-7 px-7 py-4 bg-terra text-cream rounded-full text-sm font-bold tracking-wide hover:bg-terra-light transition-colors">
          Get on the pilot list →
        </Link>
      </div>
    </div>
  );
}
