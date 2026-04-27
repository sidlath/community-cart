'use client';

import { useEffect, useState } from 'react';

type Stage = 'form' | 'generating' | 'result';
type Diet = 'veg' | 'non-veg' | 'jain' | 'vegan';

interface ProvisionsModalProps {
  open: boolean;
  onClose: () => void;
}

interface Item {
  brand: string;
  name: string;
  size: string;
  qty: number;
  price: number;
  icon: string;
}

function generateList(familySize: number, diet: Diet): { items: Item[]; total: number; weeklyEstimate: number } {
  const base: Item[] = [
    { brand: 'Aashirvaad', name: 'Whole Wheat Atta', size: '5 kg', qty: Math.ceil(familySize / 2), price: 248, icon: '🌾' },
    { brand: 'Daawat', name: 'Rozana Basmati Rice', size: '5 kg', qty: 1, price: 420, icon: '🍚' },
    { brand: 'Tata Sampann', name: 'Toor Dal Premium', size: '1 kg', qty: 2, price: 142, icon: '🫘' },
    { brand: 'Tata Sampann', name: 'Moong Dal', size: '1 kg', qty: 1, price: 138, icon: '🫘' },
    { brand: 'Fortune', name: 'Sunlite Refined Oil', size: '1 L', qty: Math.ceil(familySize / 2), price: 118, icon: '🫗' },
    { brand: 'Tata', name: 'Iodised Salt', size: '1 kg', qty: 1, price: 22, icon: '🧂' },
    { brand: 'Madhur', name: 'Pure Cane Sugar', size: '1 kg', qty: 1, price: 48, icon: '🥄' },
    { brand: 'Red Label', name: 'Tea Leaves', size: '500 g', qty: 1, price: 178, icon: '🍵' },
    { brand: 'Surf Excel', name: 'Easy Wash Detergent', size: '2 kg', qty: 1, price: 410, icon: '🧴' },
    { brand: 'Vim', name: 'Dishwash Liquid', size: '750 ml', qty: 1, price: 165, icon: '🍶' },
    { brand: 'Lizol', name: 'Floor Cleaner', size: '975 ml', qty: 1, price: 178, icon: '🧹' },
    { brand: 'Britannia', name: 'Marie Gold Biscuits', size: 'Pack of 6', qty: 1, price: 95, icon: '🍪' },
  ];

  const dairyItems: Item[] = diet === 'vegan' ? [] : [
    { brand: 'Amul Taaza', name: 'Toned Milk', size: '1 L', qty: familySize * 2, price: 58, icon: '🥛' },
    { brand: 'Mother Dairy', name: 'Curd', size: '1 kg', qty: 1, price: 78, icon: '🥣' },
    { brand: 'Amul', name: 'Butter', size: '500 g', qty: 1, price: 252, icon: '🧈' },
  ];

  const nonVegItems: Item[] = diet === 'non-veg' ? [
    { brand: 'Real', name: 'Mixed Fruit Juice', size: '1 L', qty: 1, price: 128, icon: '🧃' },
  ] : [];

  // Jain: skip onion-related, but our list has none anyway
  const items = [...base, ...dairyItems, ...nonVegItems];

  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const discount = Math.round(total * 0.14);
  const finalTotal = total - discount;

  return { items, total: finalTotal, weeklyEstimate: Math.round(finalTotal / 4.3) }; // monthly to weekly
}

export default function ProvisionsModal({ open, onClose }: ProvisionsModalProps) {
  const [stage, setStage] = useState<Stage>('form');
  const [familySize, setFamilySize] = useState(3);
  const [diet, setDiet] = useState<Diet>('veg');
  const [result, setResult] = useState<ReturnType<typeof generateList> | null>(null);

  useEffect(() => {
    if (open) {
      setStage('form');
      setResult(null);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const handleGenerate = () => {
    setStage('generating');
    setTimeout(() => {
      setResult(generateList(familySize, diet));
      setStage('result');
    }, 1800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
         onClick={stage !== 'generating' ? onClose : undefined}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      <div className="relative bg-cream w-full md:max-w-[480px] md:rounded-3xl rounded-t-3xl overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.22,1,0.36,1)] max-h-[90vh] flex flex-col"
           onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 bg-clay/30 rounded-full" />
        </div>

        {stage === 'form' && (
          <>
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">✨</span>
                  <span className="font-mono text-[10px] text-terra tracking-widest font-semibold">
                    AI PROVISIONS GENERATOR
                  </span>
                </div>
                <button onClick={onClose} className="text-clay text-2xl leading-none hover:text-ink transition-colors">×</button>
              </div>
              <h2 className="font-display text-2xl font-medium tracking-tight">
                New to Community Cart? <em className="italic text-terra font-light">Let&apos;s build your starter pantry.</em>
              </h2>
              <p className="text-sm text-ink-soft mt-2">
                Tell us about your household. We&apos;ll generate a recommended monthly cart based on what families like yours actually buy.
              </p>
            </div>

            <div className="overflow-y-auto flex-1 px-6 pb-6">
              <div className="mb-5">
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  HOW MANY PEOPLE IN YOUR HOUSEHOLD?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[2, 3, 4, 5, 6].map(n => (
                    <button
                      key={n}
                      onClick={() => setFamilySize(n)}
                      className={`py-3 rounded-xl font-display text-xl font-semibold transition-colors ${
                        familySize === n
                          ? 'bg-ink text-cream'
                          : 'bg-white border border-sand-dark hover:border-ink'
                      }`}
                    >
                      {n}{n === 6 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="text-[11px] font-mono text-clay tracking-widest font-semibold mb-2 block">
                  DIETARY PREFERENCE
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'veg', label: 'Vegetarian', emoji: '🥬' },
                    { id: 'non-veg', label: 'Non-vegetarian', emoji: '🍗' },
                    { id: 'jain', label: 'Jain', emoji: '🪷' },
                    { id: 'vegan', label: 'Vegan', emoji: '🌱' },
                  ] as const).map(d => (
                    <button
                      key={d.id}
                      onClick={() => setDiet(d.id)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${
                        diet === d.id
                          ? 'bg-ink text-cream'
                          : 'bg-white border border-sand-dark hover:border-ink'
                      }`}
                    >
                      <span>{d.emoji}</span>
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-3 border-t border-sand bg-cream-light">
              <button onClick={handleGenerate} className="w-full py-3.5 bg-terra text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-ink transition-colors flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Generate my starter cart</span>
              </button>
            </div>
          </>
        )}

        {stage === 'generating' && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-terra/15 flex items-center justify-center text-3xl mb-5 animate-pulse">
              ✨
            </div>
            <h2 className="font-display text-xl font-medium tracking-tight">
              Building your starter pantry…
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              Analysing what households like yours buy
            </p>
            <div className="mt-6 flex justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {stage === 'result' && result && (
          <>
            <div className="p-6 pb-4 border-b border-sand">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">✓</span>
                  <span className="font-mono text-[10px] text-leaf tracking-widest font-semibold">
                    GENERATED · {result.items.length} ITEMS
                  </span>
                </div>
                <button onClick={onClose} className="text-clay text-2xl leading-none hover:text-ink transition-colors">×</button>
              </div>
              <h2 className="font-display text-xl font-medium tracking-tight mt-2">
                Your starter pantry for {familySize} {familySize === 1 ? 'person' : 'people'}
              </h2>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-display text-2xl font-semibold">₹{result.total.toLocaleString('en-IN')}</span>
                <span className="text-xs text-clay">monthly</span>
                <span className="text-xs text-leaf font-bold font-mono">~₹{result.weeklyEstimate.toLocaleString('en-IN')}/WEEK</span>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              <div className="space-y-1.5">
                {result.items.map((item, i) => (
                  <div key={i} className="bg-white border border-sand rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                         style={{ background: 'linear-gradient(135deg, #FFFBF3, #F5EDE0)' }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] text-terra font-bold uppercase tracking-wider">{item.brand}</div>
                      <div className="text-[12px] font-semibold leading-tight truncate">{item.name}</div>
                      <div className="text-[10px] text-clay font-mono">{item.size} · ×{item.qty}</div>
                    </div>
                    <div className="font-display text-sm font-semibold flex-shrink-0">
                      ₹{(item.qty * item.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 pt-3 border-t border-sand bg-cream-light">
              <button onClick={onClose} className="w-full py-3.5 bg-ink text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-terra transition-colors">
                Add to my Smart Cart →
              </button>
              <p className="text-[10px] text-clay text-center mt-2.5 font-mono tracking-wide">
                YOU CAN ADJUST QUANTITIES BEFORE THE WEEKLY CUTOFF
              </p>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
