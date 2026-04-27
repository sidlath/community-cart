'use client';

import { useEffect, useState } from 'react';
import { SOCIETY, STORE_PARTNER, CYCLE_LIVE, TOP_CATEGORIES } from '@/lib/data';

type Stage = 'review' | 'sending' | 'sent';

interface SendOrderModalProps {
  open: boolean;
  flatsCount: number;
  basketValue: number;
  onClose: () => void;
  onSent: () => void;
}

export default function SendOrderModal({ open, flatsCount, basketValue, onClose, onSent }: SendOrderModalProps) {
  const [stage, setStage] = useState<Stage>('review');
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (open) {
      setStage('review');
      setOrderRef('CC-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 8).toUpperCase());
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const handleSend = () => {
    setStage('sending');
    setTimeout(() => setStage('sent'), 2400);
  };

  const handleDone = () => {
    onSent();
    onClose();
  };

  if (!open) return null;

  const totalItems = flatsCount * 9; // rough estimate
  const lakhValue = (basketValue / 100000).toFixed(2);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
         onClick={stage === 'review' ? onClose : undefined}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      <div className="relative bg-cream w-full max-w-[560px] rounded-3xl overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.22,1,0.36,1)] max-h-[90vh] flex flex-col"
           onClick={(e) => e.stopPropagation()}>

        {stage === 'review' && (
          <>
            <div className="p-6 pb-4 border-b border-sand">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <span className="font-mono text-[10px] text-terra tracking-widest font-semibold">
                    SEND CONSOLIDATED ORDER
                  </span>
                </div>
                <button onClick={onClose} className="text-clay text-2xl leading-none hover:text-ink transition-colors">×</button>
              </div>
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Push order to {STORE_PARTNER.name}?
              </h2>
              <p className="text-sm text-ink-soft mt-1">
                Once sent, the store starts assembling the delivery for {SOCIETY.deliveryDay} {SOCIETY.deliveryDate}.
              </p>
            </div>

            <div className="overflow-y-auto flex-1 p-6 pt-4">
              {/* Order summary card */}
              <div className="bg-white border border-sand rounded-2xl p-4 mb-4">
                <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-3">
                  ORDER SUMMARY
                </div>
                <div className="space-y-2 text-sm">
                  <Row label="Order ref" value={orderRef} mono />
                  <Row label="Cycle" value={`Nº ${SOCIETY.cycleNumber} · ${SOCIETY.cycleDate}`} />
                  <Row label="Society" value={`${SOCIETY.name}, ${SOCIETY.area}`} />
                  <Row label="Flats ordering" value={`${flatsCount} of ${SOCIETY.totalFlats}`} />
                  <Row label="Total items" value={`~${totalItems.toLocaleString('en-IN')} units`} />
                  <Row label="GMV" value={`₹${lakhValue} lakh`} />
                  <Row label="Bulk discount" value={`${CYCLE_LIVE.currentDiscount}%`} highlight />
                </div>
              </div>

              {/* Category breakdown */}
              <div className="bg-white border border-sand rounded-2xl p-4 mb-4">
                <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-3">
                  BREAKDOWN BY CATEGORY
                </div>
                <div className="space-y-2">
                  {TOP_CATEGORIES.map((c, i) => (
                    <div key={i} className="flex justify-between text-[13px]">
                      <span className="text-ink-soft">{c.cat}</span>
                      <span className="font-semibold">₹{Math.round((basketValue * c.value / 100) / 1000)}k</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white border border-sand rounded-2xl p-4">
                <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-3">
                  DELIVERY DETAILS
                </div>
                <div className="space-y-2 text-sm">
                  <Row label="Store" value={`${STORE_PARTNER.name}, ${STORE_PARTNER.branch}`} />
                  <Row label="Distance" value={STORE_PARTNER.distance} />
                  <Row label="Delivery day" value={`${SOCIETY.deliveryDay} ${SOCIETY.deliveryDate}`} />
                  <Row label="Time slot" value={SOCIETY.deliveryTime} />
                  <Row label="Drop point" value={SOCIETY.deliveryGate} />
                </div>
              </div>
            </div>

            <div className="p-6 pt-3 border-t border-sand bg-cream-light">
              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 py-3 border border-ink text-ink rounded-xl text-sm font-bold tracking-wide hover:bg-ink hover:text-cream transition-colors">
                  Review again
                </button>
                <button onClick={handleSend} className="flex-1 py-3 bg-terra text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-ink transition-colors">
                  Confirm &amp; send →
                </button>
              </div>
              <p className="text-[10px] text-clay text-center mt-2.5 font-mono tracking-wide">
                STORE WILL CONFIRM RECEIPT WITHIN 30 MINUTES
              </p>
            </div>
          </>
        )}

        {stage === 'sending' && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-terra/15 flex items-center justify-center text-3xl mb-5 animate-pulse">
              📦
            </div>
            <h2 className="font-display text-xl font-medium tracking-tight">
              Pushing order to {STORE_PARTNER.name}…
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              Awaiting confirmation from store
            </p>
            <div className="mt-6 flex justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-terra animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-[10px] text-clay font-mono tracking-widest mt-8">
              {orderRef}
            </p>
          </div>
        )}

        {stage === 'sent' && (
          <div className="p-6 pt-7">
            <div className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center mb-4 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="font-display text-2xl font-medium tracking-tight text-center">
              Order confirmed by store.
            </h2>
            <p className="text-sm text-ink-soft text-center mt-1">
              {STORE_PARTNER.name} will deliver {SOCIETY.deliveryDay}, {SOCIETY.deliveryTime}
            </p>

            <div className="mt-5 bg-white border border-sand rounded-2xl p-4">
              <div className="space-y-2 text-sm">
                <Row label="Confirmed by" value="Anil K. (Store Manager)" />
                <Row label="Store ref" value={orderRef} mono />
                <Row label="Estimated dispatch" value={`${SOCIETY.deliveryDay} 6:30 AM`} />
                <Row label="Delivery vehicle" value="Tempo · MH-04-AT-2891" />
              </div>
            </div>

            <p className="text-[12px] text-ink-soft text-center mt-4 leading-relaxed">
              Residents will receive a WhatsApp confirmation with their bag-pickup details. Cycle 14 closeout is now locked.
            </p>

            <button onClick={handleDone} className="w-full mt-5 py-3.5 bg-ink text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-terra transition-colors">
              Back to dashboard →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}

function Row({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-clay flex-shrink-0">{label}</span>
      <span className={`font-semibold text-right ${mono ? 'font-mono text-[12px]' : ''} ${highlight ? 'text-leaf' : ''}`}>{value}</span>
    </div>
  );
}
