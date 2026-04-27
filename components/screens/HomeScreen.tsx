'use client';

import { SOCIETY, RESIDENT, CYCLE_LIVE, PRODUCTS } from '@/lib/data';

export default function HomeScreen({ societyFlats }: { societyFlats: number }) {
  const tierPercent = Math.min((societyFlats / SOCIETY.totalFlats) * 100, 100);
  const popularPicks = PRODUCTS.filter(p => p.popular).slice(0, 4);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-[18px] pb-20 pt-3">
      {/* Greeting */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-[11px] text-clay font-mono tracking-widest font-semibold">
            FLAT {RESIDENT.flat} · {RESIDENT.block.toUpperCase()}
          </div>
          <div className="font-display text-[22px] font-medium tracking-tight mt-0.5">
            Hello, {RESIDENT.name.split(' ')[0]}
          </div>
        </div>
        <div className="w-9 h-9 rounded-full text-cream flex items-center justify-center font-display text-[15px] font-semibold"
             style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
          {RESIDENT.initial}
        </div>
      </div>

      {/* Cycle banner */}
      <div className="bg-ink text-cream rounded-2xl p-4 mb-4 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[9px] opacity-60 font-mono tracking-widest">
              CYCLE Nº {SOCIETY.cycleNumber} · WEEK {SOCIETY.cycleDate.split(' ')[0]} {SOCIETY.cycleDate.split(' ')[1]}
            </div>
            <div className="font-display text-lg font-medium mt-1 leading-snug">
              Cutoff in {SOCIETY.cutoffHours}h {SOCIETY.cutoffMinutes}m
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-light animate-pulse-dot" />
            <span className="text-[9px] text-leaf-light font-mono tracking-wider font-semibold">LIVE</span>
          </div>
        </div>

        <div className="flex gap-[18px] mt-3.5 pt-3.5 border-t border-cream/15">
          <Stat value={societyFlats.toString()} label="FLATS JOINED" />
          <Stat value={`${CYCLE_LIVE.currentDiscount}%`} label="BULK DISCOUNT" highlight />
          <Stat value={`₹${(CYCLE_LIVE.basketValue / 100000).toFixed(1)}L`} label="BASKET VALUE" />
        </div>

        <div className="h-1 bg-cream/15 rounded-full mt-3.5 overflow-hidden">
          <div className="progress-fill h-full" style={{ width: `${tierPercent}%` }} />
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="border border-sand rounded-2xl p-3.5 mb-4"
           style={{ background: 'linear-gradient(135deg, #FFFBF3 0%, #F5EDE0 100%)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm">✨</span>
          <span className="text-[10px] text-terra font-mono tracking-widest font-semibold">
            SMART CART · BASED ON LAST 3 ORDERS
          </span>
        </div>
        <div className="font-display text-[15px] font-medium leading-snug mb-2">
          We&apos;ve pre-filled your cart with 11 staples you usually order.
        </div>
        <button className="bg-ink text-cream rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wide">
          Review &amp; confirm →
        </button>
      </div>

      {/* Categories */}
      <div className="mb-3.5">
        <div className="text-[10px] text-clay font-mono tracking-widest font-semibold mb-2.5">
          SHOP BY CATEGORY
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: '🍚', label: 'Staples' },
            { icon: '☕', label: 'Beverages' },
            { icon: '🥛', label: 'Dairy' },
            { icon: '🧴', label: 'Home' },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-sand rounded-xl py-2.5 text-center">
              <div className="text-[22px]">{c.icon}</div>
              <div className="text-[9px] mt-0.5 font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Picks */}
      <div className="flex justify-between items-baseline mb-2.5">
        <div className="font-display text-lg font-medium tracking-tight">Picks of the week</div>
        <span className="text-[10px] text-terra font-semibold">See all →</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {popularPicks.map(p => <MiniProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

function Stat({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div>
      <div className={`font-display text-[22px] font-semibold leading-none ${highlight ? 'text-leaf-light' : ''}`}>
        {value}
      </div>
      <div className="text-[9px] opacity-60 font-mono tracking-widest mt-1">{label}</div>
    </div>
  );
}

function MiniProductCard({ product }: { product: any }) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  return (
    <div className="bg-white border border-sand rounded-xl p-2.5 relative">
      {product.pick && (
        <div className="absolute top-1.5 right-1.5 text-[7px] bg-terra text-white px-1.5 py-0.5 rounded font-mono font-semibold tracking-wider">
          PICK
        </div>
      )}
      <div className="h-[60px] rounded-lg mb-2 flex items-center justify-center text-3xl"
           style={{ background: 'linear-gradient(135deg, #FFFBF3 0%, #F5EDE0 100%)' }}>
        {product.icon}
      </div>
      <div className="text-[9px] text-terra font-bold uppercase tracking-wider">{product.brand}</div>
      <div className="text-[11px] font-semibold leading-tight">{product.name}</div>
      <div className="text-[9px] text-clay font-mono">{product.size}</div>
      <div className="flex items-baseline gap-1 mt-1.5">
        <span className="font-display text-sm font-bold">₹{product.price}</span>
        <span className="text-[9px] text-clay line-through">₹{product.mrp}</span>
        <span className="text-[8px] text-leaf font-bold ml-auto">−{off}%</span>
      </div>
      <button className="w-full mt-1.5 py-1 bg-cream border border-ink rounded-md text-[10px] font-bold">
        + ADD
      </button>
    </div>
  );
}
