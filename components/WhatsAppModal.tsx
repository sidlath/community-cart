'use client';

import { useEffect, useState } from 'react';

type Stage = 'compose' | 'sending' | 'sent';

interface WhatsAppModalProps {
  open: boolean;
  pendingFlats: number;
  onClose: () => void;
  onSent: () => void;
}

const SAMPLE_PENDING = [
  'A-104', 'A-208', 'A-509', 'A-611', 'A-705',
  'B-102', 'B-309', 'B-415', 'B-707', 'B-812',
  'C-103', 'C-204', 'C-308', 'C-411', 'C-606',
  'D-201', 'D-303', 'D-407', 'D-512', 'D-708',
];

const DEFAULT_MESSAGE = `Hi neighbours 👋

Just a reminder — Community Cart cycle 14 closes in a few hours.

We're at 247/412 flats already — 18 more flats and we hit 75% participation, unlocking an extra 3% off for everyone in the society.

Order now: communitycart.in/eldora`;

export default function WhatsAppModal({ open, pendingFlats, onClose, onSent }: WhatsAppModalProps) {
  const [stage, setStage] = useState<Stage>('compose');
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  useEffect(() => {
    if (open) {
      setStage('compose');
      setMessage(DEFAULT_MESSAGE);
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
    setTimeout(() => setStage('sent'), 1800);
  };

  const handleDone = () => {
    onSent();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
         onClick={stage === 'compose' ? onClose : undefined}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" />

      <div className="relative bg-cream w-full max-w-[520px] rounded-3xl overflow-hidden animate-[slideUp_0.35s_cubic-bezier(0.22,1,0.36,1)] max-h-[90vh] flex flex-col"
           onClick={(e) => e.stopPropagation()}>

        {stage === 'compose' && (
          <>
            <div className="p-6 pb-4 border-b border-sand">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <span className="font-mono text-[10px] text-leaf tracking-widest font-semibold">
                    SEND WHATSAPP NUDGE
                  </span>
                </div>
                <button onClick={onClose} className="text-clay text-2xl leading-none hover:text-ink transition-colors">×</button>
              </div>
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Nudge the {pendingFlats} pending flats
              </h2>
              <p className="text-sm text-ink-soft mt-1">
                One message via WhatsApp Business API. They&apos;ll see it as a regular WhatsApp message.
              </p>
            </div>

            <div className="overflow-y-auto flex-1 p-6 pt-4">
              <div className="mb-5">
                <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-2">
                  MESSAGE
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-44 bg-white border border-sand rounded-xl p-3 text-sm font-sans focus:border-ink focus:outline-none resize-none"
                />
                <p className="text-[10px] text-clay mt-1.5 font-mono">
                  {message.length} characters · {pendingFlats} recipients
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono text-clay tracking-widest font-semibold mb-2">
                  RECIPIENTS · SHOWING 20 OF {pendingFlats}
                </div>
                <div className="bg-white border border-sand rounded-xl p-3 max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_PENDING.map(flat => (
                      <span key={flat} className="bg-cream font-mono text-[11px] px-2 py-0.5 rounded font-semibold">
                        {flat}
                      </span>
                    ))}
                    <span className="font-mono text-[11px] text-clay px-2 py-0.5">
                      + {pendingFlats - 20} more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-3 border-t border-sand bg-cream-light">
              <button
                onClick={handleSend}
                className="w-full py-3.5 bg-leaf text-white rounded-xl text-sm font-bold tracking-wide hover:bg-leaf/90 transition-colors flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Send to {pendingFlats} flats</span>
              </button>
              <p className="text-[10px] text-clay text-center mt-2.5 font-mono tracking-wide">
                MESSAGES SEND OVER ~30 SECONDS · 1 PER 100MS RATE LIMIT
              </p>
            </div>
          </>
        )}

        {stage === 'sending' && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-leaf/15 flex items-center justify-center text-3xl mb-5 animate-pulse">
              💬
            </div>
            <h2 className="font-display text-xl font-medium tracking-tight">
              Sending nudges…
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              Broadcasting to {pendingFlats} flats via WhatsApp
            </p>
            <div className="mt-6 flex justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-leaf animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-leaf animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-leaf animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {stage === 'sent' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-leaf flex items-center justify-center mb-4 animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Nudges sent.
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              {pendingFlats} flats notified · expected 60-80 to convert
            </p>

            <div className="mt-5 bg-white border border-sand rounded-2xl p-4 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-clay">Currently at</span>
                <span className="font-semibold">247 flats (60%)</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-clay">Projected after nudge</span>
                <span className="font-semibold text-leaf">~310 flats (75%)</span>
              </div>
              <div className="flex justify-between text-sm pt-2 mt-2 border-t border-sand">
                <span className="text-clay">If we hit tier 4</span>
                <span className="font-semibold text-terra">+3% extra discount unlocked</span>
              </div>
            </div>

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
