'use client';

import { SOCIETY, FLAT_ACTIVITY } from '@/lib/data';

export default function LivePulseScreen({ societyFlats }: { societyFlats: number }) {
  const tierPercent = Math.min((societyFlats / SOCIETY.totalFlats) * 100, 100);
  const recentActivity = FLAT_ACTIVITY.slice(0, 5);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar px-4 pt-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse-dot" />
        <span className="text-[9px] text-leaf font-mono tracking-widest font-bold">
          LIVE · CYCLE {SOCIETY.cycleNumber}
        </span>
      </div>

      <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight">
        Your block is<br/>shopping together.
      </h2>

      <div className="bg-ink text-cream rounded-2xl p-4 mt-3.5 text-center">
        <div className="text-[9px] opacity-60 font-mono tracking-widest">
          FLATS JOINED THIS CYCLE
        </div>
        <div className="font-display text-[64px] font-medium leading-none tracking-tight mt-1 animate-count-bump" key={societyFlats}>
          {societyFlats}
        </div>
        <div className="text-[10px] opacity-50 font-mono tracking-wider mt-0.5">
          OF {SOCIETY.totalFlats} · {Math.round(tierPercent)}%
        </div>

        <div className="mt-4">
          <div className="h-1.5 bg-cream/15 rounded-full overflow-hidden">
            <div className="progress-fill h-full" style={{ width: `${tierPercent}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-[8px] font-mono opacity-60 tracking-wider">
            <span>8%</span>
            <span>11%</span>
            <span className="text-leaf-light">14%</span>
            <span>17%</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[9px] text-clay font-mono tracking-widest font-semibold mb-2">
          NEIGHBOURS ORDERING
        </div>
        {recentActivity.map((f, i) => (
          <div key={i} className={`flex items-center gap-2.5 py-2 ${i === 0 ? 'border-t border-ink/15' : 'border-t border-ink/6'}`}>
            <div className="w-7 h-7 rounded-md text-cream flex items-center justify-center font-display text-[11px] font-semibold"
                 style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
              {f.initial}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold">{f.flat}</div>
              <div className="text-[8px] text-clay font-mono">{f.time}</div>
            </div>
            <div className="font-display text-[13px] font-semibold">₹{f.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
