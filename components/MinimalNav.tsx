'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MinimalNav() {
  const pathname = usePathname();

  // On the about/marketing page, hide this entirely (the about page has its own)
  if (pathname?.startsWith('/about') || pathname?.startsWith('/how-it-works') || pathname?.startsWith('/for-societies') || pathname?.startsWith('/pricing') || pathname?.startsWith('/contact')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-ink/8">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #C73A1F 0%, #E8743C 100%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18l-2 12H5L3 6z" stroke="#F5EDE0" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="9" cy="21" r="1.5" fill="#F5EDE0"/>
              <circle cx="17" cy="21" r="1.5" fill="#F5EDE0"/>
              <path d="M3 6L2 3H0" stroke="#F5EDE0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="font-display text-base font-semibold tracking-tight">Community Cart</div>
        </Link>

        <Link href="/about" className="text-xs font-mono text-clay tracking-wider hover:text-ink underline-link">
          ABOUT THE PITCH →
        </Link>
      </div>
    </nav>
  );
}
