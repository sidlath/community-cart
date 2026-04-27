import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-20 py-16 px-6 md:px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #C73A1F 0%, #E8743C 100%)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18l-2 12H5L3 6z" stroke="#F5EDE0" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="9" cy="21" r="1.5" fill="#F5EDE0"/>
                  <circle cx="17" cy="21" r="1.5" fill="#F5EDE0"/>
                  <path d="M3 6L2 3H0" stroke="#F5EDE0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="font-display text-xl font-semibold tracking-tight">Community Cart</div>
            </Link>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              India&apos;s first weekly bulk grocery ordering club for apartment communities. Save together, shop smarter.
            </p>
            <div className="mt-6 text-xs font-mono text-clay tracking-wider">
              POWAI · MUMBAI 400076
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-clay tracking-widest font-semibold mb-4">
              FOR RESIDENTS
            </div>
            <div className="space-y-2.5">
              <Link href="/how-it-works" className="block text-sm underline-link">How it works</Link>
              <Link href="/app" className="block text-sm underline-link">Open the app</Link>
              <Link href="/pricing" className="block text-sm underline-link">Pricing</Link>
              <Link href="/contact" className="block text-sm underline-link">Help &amp; support</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono text-clay tracking-widest font-semibold mb-4">
              FOR RWAs &amp; STORES
            </div>
            <div className="space-y-2.5">
              <Link href="/for-societies" className="block text-sm underline-link">Bring to your society</Link>
              <Link href="/admin" className="block text-sm underline-link">RWA dashboard demo</Link>
              <Link href="/contact" className="block text-sm underline-link">Become a store partner</Link>
              <Link href="/contact" className="block text-sm underline-link">Press &amp; partnerships</Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-ink/10 flex flex-wrap justify-between items-center gap-4">
          <div className="text-xs text-clay font-mono tracking-wide">
            © 2026 COMMUNITY CART · MADE IN MUMBAI FOR INDIAN APARTMENTS
          </div>
          <div className="flex gap-6 text-xs text-clay">
            <span className="underline-link cursor-pointer">Privacy</span>
            <span className="underline-link cursor-pointer">Terms</span>
            <span className="underline-link cursor-pointer">Press</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
