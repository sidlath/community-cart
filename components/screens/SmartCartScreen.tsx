'use client';

import { AI_PICKS } from '@/lib/data';

export default function SmartCartScreen() {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-4 pb-16 pt-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs">✨</span>
        <span className="text-[9px] text-terra font-mono tracking-widest font-bold">
          SMART CART · WEEK 14
        </span>
      </div>

      <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight">
        We&apos;ve made you a cart based on your <em className="text-terra font-light italic">last 11 weeks</em>.
      </h2>

      <div className="flex items-baseline gap-2 mt-3">
        <span className="font-display text-[28px] font-semibold">₹1,386</span>
        <span className="text-[9px] text-leaf font-bold font-mono">SAVING ₹467</span>
      </div>

      <div className="mt-3.5">
        {AI_PICKS.map((p, i) => (
          <div key={i} className="bg-white border border-sand rounded-[10px] p-2 flex items-center gap-2 mb-1.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                 style={{ background: 'linear-gradient(135deg, #FFFBF3, #F5EDE0)' }}>
              {p.icon}
            </div>
            <div className="flex-1">
              <div className="text-[8px] text-terra font-bold uppercase tracking-wider">{p.brand}</div>
              <div className="text-[10px] font-semibold">{p.name} · {p.size}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex-1 h-[3px] bg-cream rounded-full overflow-hidden">
                  <div className="h-full rounded-full"
                       style={{ width: `${p.confidence}%`, background: 'linear-gradient(90deg, #E8743C, #1F8A3F)' }} />
                </div>
                <span className="text-[7px] text-clay font-mono">{p.confidence}%</span>
              </div>
            </div>
            <div className="font-display text-[13px] font-semibold">×{p.qty}</div>
          </div>
        ))}
      </div>

      <button className="w-full mt-2.5 py-3 bg-ink text-cream rounded-[10px] text-[11px] font-bold tracking-wide">
        Confirm cart →
      </button>
    </div>
  );
}
