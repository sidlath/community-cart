'use client';

import { useEffect, useState } from 'react';
import { SOCIETY } from '@/lib/data';

// Calculate the target cutoff timestamp once on mount
function getCutoffTarget() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(target.getHours() + SOCIETY.cutoffHours);
  target.setMinutes(target.getMinutes() + SOCIETY.cutoffMinutes);
  return target;
}

export function useCutoffTimer() {
  const [target] = useState(getCutoffTarget);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { hours, minutes, seconds, expired: diff === 0 };
}

interface CutoffTimerProps {
  variant?: 'compact' | 'large' | 'inline';
  className?: string;
}

export default function CutoffTimer({ variant = 'compact', className = '' }: CutoffTimerProps) {
  const { hours, minutes, seconds, expired } = useCutoffTimer();

  if (expired) {
    return <span className={className}>Cycle closed</span>;
  }

  if (variant === 'large') {
    return (
      <span className={className}>
        {hours}h {minutes}m {seconds}s
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`font-mono ${className}`}>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    );
  }

  // compact
  return (
    <span className={className}>
      Cutoff in {hours}h {minutes}m
    </span>
  );
}
