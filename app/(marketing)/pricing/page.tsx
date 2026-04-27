import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Resident',
      price: 'Free',
      sub: 'forever',
      description: 'For every household in a participating society.',
      features: [
        'Weekly bulk grocery ordering',
        'Auto bill splitting via UPI',
        'Smart Cart AI pre-fill (week 4+)',
        'Replenishment reminders',
        'Order history & savings tracker',
        'Free delivery to society gate',
      ],
      cta: 'Open the app',
      ctaHref: '/app',
      featured: true,
    },
    {
      name: 'RWA & Society',
      price: 'Free',
      sub: 'no setup, no subscription',
      description: 'For Resident Welfare Associations onboarding their society.',
      features: [
        'Full RWA admin dashboard',
        'Real-time participation tracking',
        'Payment collection & monitoring',
        'WhatsApp reminder broadcasts',
        'Weekly savings reports',
        'Dedicated onboarding manager',
      ],
      cta: 'Schedule a call',
      ctaHref: '/contact',
    },
    {
      name: 'Store Partner',
      price: '3–5%',
      sub: 'commission per cycle',
      description: 'For wholesale grocery stores supplying participating societies.',
      features: [
        'Guaranteed weekly bulk volume',
        'Zero customer acquisition cost',
        'Pre-paid orders, no credit risk',
        'Inventory forecasting tools',
        'Multi-society routing',
        'Settlement within 48 hours',
      ],
      cta: 'Become a partner',
      ctaHref: '/contact',
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-16">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          PRICING
        </span>
        <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[44px] md:text-[64px] mt-4">
          Simple. <em className="italic text-terra font-light">For everyone.</em>
        </h1>
        <p className="text-base text-ink-soft max-w-[560px] mx-auto mt-5 leading-relaxed">
          We don&apos;t charge residents or RWAs. The model works because store partners pay a small commission for guaranteed bulk demand they couldn&apos;t get any other way.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {tiers.map((t, i) => (
          <div
            key={i}
            className={`rounded-3xl p-8 ${t.featured ? 'bg-ink text-cream' : 'bg-white border border-sand'}`}
          >
            <div className={`text-[11px] font-mono tracking-widest font-semibold mb-3 ${t.featured ? 'text-terra-light' : 'text-clay'}`}>
              {t.name.toUpperCase()}
            </div>
            <div className="font-display text-5xl font-medium tracking-tight leading-none">
              {t.price}
            </div>
            <div className={`text-sm mt-2 ${t.featured ? 'opacity-60' : 'text-clay'}`}>
              {t.sub}
            </div>
            <p className={`text-sm mt-4 leading-relaxed pb-6 border-b ${t.featured ? 'opacity-80 border-cream/15' : 'text-ink-soft border-sand'}`}>
              {t.description}
            </p>
            <ul className="space-y-3 mt-6 mb-8">
              {t.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm">
                  <span className={`mt-1 ${t.featured ? 'text-leaf-light' : 'text-leaf'}`}>✓</span>
                  <span className={t.featured ? 'opacity-80' : ''}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={t.ctaHref}
              className={`block text-center px-6 py-3.5 rounded-full text-sm font-bold tracking-wide transition-colors ${
                t.featured
                  ? 'bg-cream text-ink hover:bg-terra hover:text-cream'
                  : 'bg-ink text-cream hover:bg-terra'
              }`}
            >
              {t.cta} →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight">
          Questions about pricing?
        </h2>
        <p className="text-base text-ink-soft mt-3 max-w-[480px] mx-auto leading-relaxed">
          We&apos;re happy to walk through the model with your RWA committee or finance team.
        </p>
        <Link href="/contact" className="inline-block mt-6 px-7 py-4 bg-ink text-cream rounded-full text-sm font-bold tracking-wide hover:bg-terra transition-colors">
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
