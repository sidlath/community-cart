'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SOCIETY, STORE_PARTNER, CYCLE_LIVE, FLAT_ACTIVITY, TOP_CATEGORIES } from '@/lib/data';

export default function AdminPage() {
  const [societyFlats, setSocietyFlats] = useState(CYCLE_LIVE.flatsJoined);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setSocietyFlats(prev => Math.min(prev + (Math.random() > 0.6 ? 1 : 0), 412));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const participation = Math.round((societyFlats / SOCIETY.totalFlats) * 100);
  const basketValue = societyFlats * 1124;
  const filteredActivity = filter === 'all' ? FLAT_ACTIVITY : FLAT_ACTIVITY.filter(f => f.status === filter);

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 pt-8">
        <div className="bg-[#1a1208] rounded-2xl p-3" style={{ boxShadow: '0 40px 80px -20px rgba(42, 24, 16, 0.3), 0 0 0 1px #3a2a1c' }}>
          <div className="flex items-center gap-2 px-3 pb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-[#3a2a1c] rounded-md px-3 py-1 text-xs text-cream/70 font-mono text-center">
              🔒 admin.communitycart.in/eldora-powai
            </div>
          </div>

          <div className="bg-cream rounded-xl p-6 md:p-8 min-h-[800px]">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-ink pb-5 mb-6 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                  <span className="bg-ink text-cream font-mono text-[10px] px-2.5 py-1 rounded tracking-widest font-semibold">
                    RWA · {SOCIETY.name.toUpperCase()}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse-dot" />
                  <span className="text-[10px] text-leaf font-mono tracking-widest font-bold">
                    CYCLE {SOCIETY.cycleNumber} LIVE
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight leading-none">
                  Welcome back, <em className="italic text-terra font-normal">Mr. Iyer</em>.
                </h1>
                <p className="text-sm text-ink-soft mt-2">
                  Cycle closes in {SOCIETY.cutoffHours}h {SOCIETY.cutoffMinutes}m. {societyFlats} of {SOCIETY.totalFlats} flats have ordered.
                </p>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                <button className="px-5 py-2.5 bg-transparent text-ink border-[1.5px] border-ink rounded-full text-xs font-bold tracking-wide hover:bg-ink hover:text-cream transition-colors">
                  Export weekly report
                </button>
                <button className="px-5 py-2.5 bg-terra text-cream rounded-full text-xs font-bold tracking-wide hover:bg-ink transition-colors"
                        style={{ boxShadow: '0 8px 20px -8px rgba(199, 58, 31, 0.5)' }}>
                  Send order to store →
                </button>
              </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <KPI label="Participation" value={`${participation}%`} sub={`${societyFlats} of ${SOCIETY.totalFlats} flats`} color="#C73A1F" trend="+8% vs last week" />
              <KPI label="Basket value" value={`₹${(basketValue/100000).toFixed(2)}L`} sub="unlocking 14% bulk" color="#1F8A3F" trend="+₹42k vs last" />
              <KPI label="Payments" value="78%" sub="₹2.16L of ₹2.78L" color="#E8743C" trend="34 flats pending" />
              <KPI label="Society savings" value="₹38,920" sub="this cycle, 14% off MRP" color="#2A1810" trend="YTD: ₹4.7L" />
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-4">
              <ActivityTable activity={filteredActivity} filter={filter} setFilter={setFilter} />

              <div className="space-y-3">
                <CategoriesCard />
                <ActionCard />
                <StorePartnerCard />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-[10px] font-mono text-clay tracking-widest">
          DEMO MODE · ALL DATA IS SIMULATED · TAP ANYTHING — IT&apos;S CLICKABLE
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, sub, color, trend }: any) {
  return (
    <div className="bg-white border border-sand rounded-2xl p-4">
      <div className="text-[10px] text-clay uppercase tracking-widest font-semibold mb-2">
        {label}
      </div>
      <div className="font-display text-3xl md:text-[34px] font-medium tracking-tight leading-none" style={{ color }}>
        {value}
      </div>
      <div className="text-[11px] text-ink-soft mt-1.5">{sub}</div>
      <div className="text-[9px] text-clay font-mono tracking-wider mt-2">↗ {trend}</div>
    </div>
  );
}

function ActivityTable({ activity, filter, setFilter }: any) {
  return (
    <div className="bg-white border border-sand rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <h3 className="font-display text-lg font-medium tracking-tight">
          Flat-wise activity
        </h3>
        <div className="flex gap-1.5">
          {(['all', 'paid', 'pending'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold capitalize transition-colors ${filter === f ? 'bg-ink text-cream' : 'border border-sand-dark hover:border-ink'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[60px_1fr_60px_80px_80px] gap-3 py-2 border-b border-ink text-[9px] text-clay font-mono tracking-widest font-semibold">
        <span>FLAT</span>
        <span>RESIDENT</span>
        <span className="text-right">ITEMS</span>
        <span className="text-right">AMOUNT</span>
        <span className="text-right">STATUS</span>
      </div>

      {activity.map((f: any, i: number) => (
        <div key={i} className={`grid grid-cols-[60px_1fr_60px_80px_80px] gap-3 py-3 items-center text-xs ${i === activity.length - 1 ? '' : 'border-b border-sand'}`}>
          <div className="font-mono font-semibold text-[11px]">{f.flat}</div>
          <div>
            <div className="font-semibold text-[12px]">{f.name}</div>
            <div className="text-[10px] text-clay font-mono">{f.time}</div>
          </div>
          <div className="text-right font-display font-semibold text-[13px]">{f.items}</div>
          <div className="text-right font-display font-semibold text-[14px]">₹{f.amount.toLocaleString('en-IN')}</div>
          <div className="text-right">
            <span className={`px-2 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
              f.status === 'paid'
                ? 'bg-leaf/10 text-leaf'
                : 'bg-terra-light/15 text-terra-light'
            }`}>
              {f.status}
            </span>
          </div>
        </div>
      ))}

      <div className="mt-4 text-[11px] text-clay text-center font-mono tracking-wide">
        Showing {activity.length} of {CYCLE_LIVE.flatsJoined} · <span className="text-terra font-bold cursor-pointer">VIEW ALL →</span>
      </div>
    </div>
  );
}

function CategoriesCard() {
  return (
    <div className="bg-white border border-sand rounded-2xl p-5">
      <h3 className="font-display text-base font-medium tracking-tight mb-1">
        Top categories this cycle
      </h3>
      <div className="text-[10px] text-clay font-mono tracking-wide mb-3.5">
        BY VALUE · ₹2.78L TOTAL
      </div>
      {TOP_CATEGORIES.map((c, i) => (
        <div key={i} className="mb-2.5">
          <div className="flex justify-between text-xs mb-1 font-semibold">
            <span>{c.cat}</span>
            <span>{c.value}%</span>
          </div>
          <div className="h-1.5 bg-cream rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.value * 2.5}%`, background: c.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ActionCard() {
  return (
    <div className="bg-ink text-cream rounded-2xl p-5">
      <div className="text-[10px] font-mono opacity-60 tracking-widest font-semibold">
        ACTION REQUIRED
      </div>
      <div className="font-display text-lg font-medium mt-1.5 leading-snug tracking-tight">
        165 flats haven&apos;t ordered yet.
      </div>
      <p className="text-xs opacity-70 leading-relaxed mt-1.5">
        Sending a WhatsApp nudge could push you past the 75% participation tier — that&apos;s another 3% off for everyone.
      </p>
      <button className="bg-cream text-ink rounded-full px-4 py-2 text-[11px] font-bold tracking-wide mt-3 hover:bg-terra hover:text-cream transition-colors">
        Send WhatsApp reminder →
      </button>
    </div>
  );
}

function StorePartnerCard() {
  return (
    <div className="bg-white border border-sand rounded-2xl p-5">
      <div className="text-[10px] text-clay uppercase tracking-widest font-semibold">
        Store partner
      </div>
      <div className="font-display text-base font-medium tracking-tight mt-1">
        {STORE_PARTNER.name}
      </div>
      <div className="text-[11px] text-ink-soft mt-0.5">
        {STORE_PARTNER.branch} · {STORE_PARTNER.distance}
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-sand">
        <div>
          <div className="font-display text-lg font-semibold">{STORE_PARTNER.bulkDiscount}%</div>
          <div className="text-[9px] text-clay font-mono tracking-wider">BULK RATE</div>
        </div>
        <div>
          <div className="font-display text-lg font-semibold">{SOCIETY.deliveryDay.slice(0,3).toUpperCase()}</div>
          <div className="text-[9px] text-clay font-mono tracking-wider">DELIVERY DAY</div>
        </div>
        <div>
          <div className="font-display text-lg font-semibold">{STORE_PARTNER.partnerSince.split(' ')[0]}</div>
          <div className="text-[9px] text-clay font-mono tracking-wider">PARTNER SINCE</div>
        </div>
      </div>
    </div>
  );
}
