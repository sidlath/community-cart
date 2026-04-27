'use client';

import { useEffect, useState } from 'react';
import { SOCIETY, RESIDENT } from '@/lib/data';

type Stage = 'select' | 'authenticating' | 'success';

interface PaymentModalProps {
  open: boolean;
  total: number;
  itemCount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', emoji: '🟢', accent: '#4285F4' },
  { id: 'phonepe', name: 'PhonePe', emoji: '🟣', accent: '#5F259F' },
  { id: 'paytm', name: 'Paytm', emoji: '🔵', accent: '#00BAF2' },
  { id: 'bhim', name: 'BHIM UPI', emoji: '🟠', accent: '#F58220' },
];

export default function PaymentModal({ open, total, itemCount, onClose, onSuccess }: PaymentModalProps) {
  const [stage, setStage] = useState<Stage>('select');
  const [chosen, setChosen] = useState<typeof UPI_APPS[0] | null>(null);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setStage('select');
      setChosen(null);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const handleAppSelect = (app: typeof UPI_APPS[0]) => {
    setChosen(app);
    setStage('authenticating');
    setTimeout(() => setStage('success'), 2200);
  };

  const handleDone = () => {
    onSuccess();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
         onClick={stage === 'select' ? onClose : undefined}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      {/* Sheet */}
      <div className="relative bg-cream w-full md:max-w-[420px] md:rounded-3xl rounded-t-3xl overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.22,1,0.36,1)]"
           onClick={(e) => e.stopPropagation()}>
        {/* Drag handle on mobile */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 bg-clay/30 rounded-full" />
        </div>

        {stage === 'select' && (
          <div className="p-6 pt-5">
            <div className="flex items-baseline justify-between mb-1">
              <div className="font-mono text-[10px] text-clay tracking-widest font-semibold">
                PAY VIA UPI
              </div>
              <button onClick={onClose} className="text-clay text-2xl leading-none hover:text-ink transition-colors">×</button>
            </div>
            <h2 className="font-display text-3xl font-medium tracking-tight">
              ₹{total.toLocaleString('en-IN')}
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              For {itemCount} items · Cycle Nº {SOCIETY.cycleNumber} · {RESIDENT.flat}
            </p>

            <div className="mt-5 space-y-2">
              {UPI_APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => handleAppSelect(app)}
                  className="w-full bg-white border border-sand rounded-2xl p-3.5 flex items-center gap-3 hover:border-ink transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                       style={{ background: `${app.accent}15` }}>
                    {app.emoji}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[14px]">{app.name}</div>
                    <div className="text-[11px] text-clay font-mono">priya@{app.id === 'gpay' ? 'okicici' : app.id === 'phonepe' ? 'ybl' : app.id === 'paytm' ? 'paytm' : 'sbi'}</div>
                  </div>
                  <span className="text-clay group-hover:text-ink group-hover:translate-x-1 transition-all">›</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-clay text-center mt-5 font-mono tracking-wide">
              SECURED BY NPCI · UPI 2.0
            </p>
          </div>
        )}

        {stage === 'authenticating' && chosen && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5 animate-pulse"
                 style={{ background: `${chosen.accent}15` }}>
              {chosen.emoji}
            </div>
            <h2 className="font-display text-xl font-medium tracking-tight">
              Authenticating with {chosen.name}…
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              Verifying your UPI PIN
            </p>
            <div className="mt-6 flex justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-ink animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-ink animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-ink animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-[10px] text-clay font-mono tracking-widest mt-8">
              UPI REF · {Math.random().toString(36).slice(2, 14).toUpperCase()}
            </p>
          </div>
        )}

        {stage === 'success' && (
          <div className="p-6 pt-7">
            {/* Checkmark */}
            <div className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center mb-4 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" className="animate-[drawCheck_0.5s_0.2s_both_ease-out]" style={{ strokeDasharray: 24, strokeDashoffset: 24 }}/>
              </svg>
            </div>

            <h2 className="font-display text-2xl font-medium tracking-tight text-center">
              Payment confirmed.
            </h2>
            <p className="text-sm text-ink-soft text-center mt-1">
              ₹{total.toLocaleString('en-IN')} paid via {chosen?.name}
            </p>

            {/* Bag label preview */}
            <div className="mt-6 bg-white border-2 border-dashed border-ink/30 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-base">🏷️</span>
                <span className="font-mono text-[10px] text-clay tracking-widest font-semibold">
                  YOUR BAG LABEL
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-clay">Resident</span>
                  <span className="font-semibold">{RESIDENT.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-clay">Flat</span>
                  <span className="font-semibold font-mono">{RESIDENT.flat}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-clay">Items</span>
                  <span className="font-semibold">{itemCount} items</span>
                </div>
                <div className="flex justify-between text-sm pt-2 mt-2 border-t border-sand">
                  <span className="text-clay">Pickup</span>
                  <span className="font-semibold text-right text-[13px]">
                    {SOCIETY.deliveryDay} {SOCIETY.deliveryDate}<br/>
                    <span className="font-mono text-[11px]">{SOCIETY.deliveryTime} · {SOCIETY.deliveryGate}</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full mt-5 py-3.5 bg-ink text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-terra transition-colors"
            >
              Done →
            </button>
            <p className="text-[10px] text-clay text-center mt-3 font-mono tracking-widest">
              YOU&apos;LL GET A WHATSAPP REMINDER ON {SOCIETY.deliveryDay.toUpperCase()} MORNING
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes drawCheck { to { stroke-dashoffset: 0 } }
      `}</style>
    </div>
  );
}
