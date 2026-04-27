'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<'rwa' | 'store' | 'press' | 'other'>('rwa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16">
      <div className="text-center mb-14">
        <span className="text-[11px] font-mono text-terra tracking-[0.2em] font-semibold">
          GET IN TOUCH
        </span>
        <h1 className="font-display font-normal tracking-[-0.03em] leading-[1.05] text-[44px] md:text-[64px] mt-4">
          Let&apos;s talk.
        </h1>
        <p className="text-base text-ink-soft max-w-[560px] mx-auto mt-5 leading-relaxed">
          Whether you&apos;re an RWA committee, a wholesale grocer, or a journalist — we read everything that comes in. Real humans, real responses, usually within 24 hours.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
        {/* Contact info */}
        <div>
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2">
                EMAIL
              </div>
              <a href="mailto:hello@communitycart.in" className="font-display text-2xl font-medium underline-link">
                hello@communitycart.in
              </a>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                For RWA enquiries, partnership opportunities, and general questions.
              </p>
            </div>

            <div className="pt-6 border-t border-ink/10">
              <div className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2">
                PHONE
              </div>
              <a href="tel:+912266778899" className="font-display text-2xl font-medium underline-link">
                +91 22 6677 8899
              </a>
              <p className="text-sm text-ink-soft mt-2 leading-relaxed">
                Monday — Saturday, 10am to 7pm IST.
              </p>
            </div>

            <div className="pt-6 border-t border-ink/10">
              <div className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2">
                OFFICE
              </div>
              <div className="font-display text-lg font-medium leading-snug">
                Hiranandani Business Park<br/>
                Powai, Mumbai 400076<br/>
                Maharashtra, India
              </div>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">
                Drop in for a chai. We&apos;re on the 4th floor.
              </p>
            </div>

            <div className="pt-6 border-t border-ink/10">
              <div className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-3">
                FOLLOW
              </div>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Instagram'].map(s => (
                  <span key={s} className="px-4 py-2 border border-ink rounded-full text-xs font-bold cursor-pointer hover:bg-ink hover:text-cream transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-sand rounded-3xl p-7 md:p-9">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="font-display text-2xl font-medium tracking-tight mb-2">Message sent.</h3>
              <p className="text-sm text-ink-soft">
                We&apos;ll get back to you within 24 hours. Usually faster.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  I&apos;M ENQUIRING AS
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'rwa', label: 'RWA member' },
                    { id: 'store', label: 'Store partner' },
                    { id: 'press', label: 'Journalist / press' },
                    { id: 'other', label: 'Something else' },
                  ] as const).map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        type === t.id ? 'bg-ink text-cream' : 'bg-cream border border-sand-dark hover:border-ink'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mr. Iyer"
                  className="w-full px-4 py-3 bg-cream border border-sand rounded-xl text-sm focus:border-ink focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="iyer@example.com"
                  className="w-full px-4 py-3 bg-cream border border-sand rounded-xl text-sm focus:border-ink focus:outline-none transition-colors"
                />
              </div>

              {type === 'rwa' && (
                <div>
                  <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                    SOCIETY NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Hiranandani Eldora, Powai"
                    className="w-full px-4 py-3 bg-cream border border-sand rounded-xl text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>
              )}

              {type === 'store' && (
                <div>
                  <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                    STORE / BUSINESS NAME
                  </label>
                  <input
                    type="text"
                    placeholder="Mumbai Mart Wholesale"
                    className="w-full px-4 py-3 bg-cream border border-sand rounded-xl text-sm focus:border-ink focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us a bit about what you're hoping to do..."
                  className="w-full px-4 py-3 bg-cream border border-sand rounded-xl text-sm focus:border-ink focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-ink text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-terra transition-colors"
              >
                Send message →
              </button>

              <p className="text-[11px] text-clay text-center font-mono tracking-wide">
                WE READ EVERY MESSAGE · USUALLY REPLY WITHIN 24 HOURS
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
