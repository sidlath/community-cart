'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/for-societies', label: 'For societies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #C73A1F 0%, #E8743C 100%)', boxShadow: '0 6px 16px -6px rgba(199, 58, 31, 0.5)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18l-2 12H5L3 6z" stroke="#F5EDE0" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="9" cy="21" r="1.5" fill="#F5EDE0"/>
              <circle cx="17" cy="21" r="1.5" fill="#F5EDE0"/>
              <path d="M3 6L2 3H0" stroke="#F5EDE0" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="font-display text-xl font-semibold tracking-tight">Community Cart</div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`underline-link text-sm font-medium ${pathname === link.href ? 'text-terra' : 'text-ink'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/app"
            className="px-5 py-2.5 bg-ink text-cream rounded-full text-sm font-bold tracking-wide hover:bg-terra transition-colors"
          >
            Open the app →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`w-5 h-0.5 bg-ink transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-ink transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ink/10 bg-cream px-6 py-4">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-base font-medium ${pathname === link.href ? 'text-terra' : 'text-ink'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="block mt-3 text-center py-3 bg-ink text-cream rounded-full text-sm font-bold"
          >
            Open the app →
          </Link>
        </div>
      )}
    </nav>
  );
}
