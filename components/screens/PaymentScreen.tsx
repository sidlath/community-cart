'use client';

import { SOCIETY, RESIDENT } from '@/lib/data';

const BILL_ITEMS = [
  { brand: 'Aashirvaad', name: 'Atta 5kg', qty: 1, price: 248, icon: '🌾' },
  { brand: 'Fortune', name: 'Oil 1L', qty: 1, price: 118, icon: '🫗' },
  { brand: 'Daawat', name: 'Basmati 5kg', qty: 1, price: 420, icon: '🌾' },
  { brand: 'Amul Taaza', name: 'Milk 1L', qty: 4, price: 232, icon: '🥛' },
  { brand: 'Surf Excel', name: 'Easy Wash 1kg', qty: 1, price: 210, icon: '🧴' },
  { brand: 'Red Label', name: 'Tea 500g', qty: 1, price: 178, icon: '🍵' },
];

export default function PaymentScreen() {
  const subtotal = 1853;
  const discount = 467;
  const total = 1386;

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-4 pt-3">
      <div className="text-[9px] text-clay font-mono tracking-widest font-semibold mb-1">
        YOUR SHARE · {RESIDENT.flat}
      </div>
      <h2 className="font-display text-[26px] font-medium tracking-tight">
        The split.
      </h2>

      <div className="mt-3.5 pt-3 border-t border-ink">
        {BILL_ITEMS.map((p, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-sand">
            <span className="text-base">{p.icon}</span>
            <div className="flex-1">
              <div className="text-[10px] font-semibold">
                {p.brand} <span className="text-clay font-medium">{p.name}</span>
              </div>
              <div className="text-[8px] text-clay font-mono">{p.qty} ×</div>
            </div>
            <div className="font-display text-[11px] font-semibold">₹{p.price}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-sand rounded-xl p-3 mt-3">
        <BillRow label="Subtotal" value={`₹${subtotal.toLocaleString('en-IN')}`} />
        <BillRow label="Bulk discount (14%)" value={`−₹${discount}`} green />
        <BillRow label="Delivery to gate" value="Free" />
        <div className="border-t border-sand mt-2 pt-2 flex justify-between items-baseline">
          <span className="font-display text-[13px] font-bold">You pay</span>
          <span className="font-display text-[22px] font-semibold tracking-tight">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <button className="w-full mt-2.5 py-3.5 bg-ink text-cream rounded-[10px] text-xs font-bold tracking-wide">
        Pay ₹{total.toLocaleString('en-IN')} via UPI →
      </button>
      <p className="text-[8px] text-clay text-center mt-1.5 font-mono tracking-wide">
        DELIVERY · {SOCIETY.deliveryDay.toUpperCase()} {SOCIETY.deliveryDate.toUpperCase()} · {SOCIETY.deliveryTime} · {SOCIETY.deliveryGate.toUpperCase()}
      </p>
    </div>
  );
}

function BillRow({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className={`flex justify-between text-[10px] mb-1 ${green ? 'text-leaf font-bold' : 'text-ink-soft font-medium'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
