'use client';

import { PRODUCTS } from '@/lib/data';

export default function CatalogScreen() {
  const products = PRODUCTS.slice(0, 6);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-4 pb-16 pt-2.5 relative">
      <div className="bg-white border border-sand rounded-full px-3.5 py-2 flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#8B6F5C" strokeWidth="2"/>
          <path d="M14 14L18 18" stroke="#8B6F5C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="text-[11px] text-clay">Search atta, oil, dal...</span>
      </div>

      <div className="flex gap-1.5 mb-3.5 overflow-x-auto hide-scrollbar">
        {['All', 'Staples', 'Beverages', 'Dairy', 'Home'].map((c, i) => (
          <span key={i} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${i === 0 ? 'bg-ink text-cream' : 'border border-sand-dark'}`}>
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {products.map(p => {
          const off = Math.round(((p.mrp - p.price) / p.mrp) * 100);
          return (
            <div key={p.id} className="bg-white border border-sand rounded-[10px] p-2">
              <div className="h-14 rounded-md flex items-center justify-center text-[26px] mb-1.5 relative"
                   style={{ background: 'linear-gradient(135deg, #FFFBF3 0%, #F5EDE0 100%)' }}>
                {p.icon}
                <span className="absolute top-1 left-1 text-[7px] bg-leaf text-white px-1 py-0.5 rounded font-bold tracking-wider">
                  −{off}%
                </span>
              </div>
              <div className="text-[8px] text-terra font-bold uppercase tracking-wider">{p.brand}</div>
              <div className="text-[10px] font-semibold leading-tight">{p.name}</div>
              <div className="text-[8px] text-clay font-mono">{p.size}</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display text-[13px] font-bold">₹{p.price}</span>
                <span className="text-[8px] text-clay line-through">₹{p.mrp}</span>
              </div>
              <button className="w-full mt-1.5 py-1 bg-cream border border-ink rounded text-[9px] font-bold">
                + ADD
              </button>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-ink text-cream rounded-full px-3.5 py-2 flex items-center gap-2">
        <div className="flex-1">
          <div className="text-[8px] opacity-60 font-mono tracking-widest">4 ITEMS · SAVING ₹487</div>
          <div className="font-display text-sm font-semibold">₹1,388</div>
        </div>
        <span className="bg-cream text-ink px-2.5 py-1 rounded-full text-[10px] font-bold">Review →</span>
      </div>
    </div>
  );
}
