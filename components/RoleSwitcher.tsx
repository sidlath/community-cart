'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RoleSwitcher() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] bg-ink text-cream rounded-full px-1.5 py-1.5 items-center gap-1 shadow-[0_16px_40px_-10px_rgba(42,24,16,0.5)]">
      <Link
        href="/"
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider font-semibold transition-colors ${
          pathname === '/' ? 'bg-cream text-ink' : 'opacity-60 hover:opacity-100'
        }`}
      >
        ⌂
      </Link>
      <Link
        href="/app"
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider font-semibold transition-colors ${
          pathname === '/app' ? 'bg-cream text-ink' : 'opacity-60 hover:opacity-100'
        }`}
      >
        RESIDENT
      </Link>
      <Link
        href="/admin"
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider font-semibold transition-colors ${
          pathname === '/admin' ? 'bg-cream text-ink' : 'opacity-60 hover:opacity-100'
        }`}
      >
        RWA ADMIN
      </Link>
    </div>
  );
}
