'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES, CYCLE_LIVE, SOCIETY, RESIDENT, ORDER_HISTORY } from '@/lib/data';

type Tab = 'home' | 'catalog' | 'cart' | 'orders' | 'profile';

export default function AppPage() {
  const [tab, setTab] = useState<Tab>('home');
  const [cart, setCart] = useState<{ [k: number]: number }>({ 1: 1, 7: 1, 9: 1, 16: 4, 11: 1, 21: 1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [societyFlats, setSocietyFlats] = useState(CYCLE_LIVE.flatsJoined);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocietyFlats(prev => Math.min(prev + (Math.random() > 0.6 ? 1 : 0), 412));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const updateCart = (id: number, delta: number) => {
    setCart(prev => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) + delta);
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const cartItems = PRODUCTS.filter(p => cart[p.id] > 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = cartItems.reduce((s, p) => s + p.price * cart[p.id], 0);
  const discount = Math.round(subtotal * (CYCLE_LIVE.currentDiscount / 100));
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-cream pb-32 pt-8 px-4">
      <div className="max-w-[440px] mx-auto">
        <div className="bg-cream rounded-[44px] p-3 relative" style={{ background: '#1a1208', boxShadow: 'inset 0 0 0 2px #3a2a1c, 0 30px 60px -20px rgba(42,24,16,0.3)' }}>
          <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[110px] h-7 bg-[#1a1208] rounded-2xl z-10" />

          <div className="bg-cream rounded-[32px] overflow-hidden relative" style={{ height: '720px' }}>
            <div className="h-11 flex justify-between items-center px-6 pt-3.5 text-[13px] font-semibold text-ink">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <SignalIcon />
                <WifiIcon />
                <BatteryIcon />
              </div>
            </div>

            <div className="h-[calc(100%-44px-72px)] overflow-y-auto hide-scrollbar relative">
              {tab === 'home' && <HomeTab societyFlats={societyFlats} setTab={setTab} updateCart={updateCart} cart={cart} />}
              {tab === 'catalog' && <CatalogTab activeCategory={activeCategory} setActiveCategory={setActiveCategory} search={search} setSearch={setSearch} cart={cart} updateCart={updateCart} />}
              {tab === 'cart' && <CartTab cartItems={cartItems} cart={cart} updateCart={updateCart} subtotal={subtotal} discount={discount} total={total} />}
              {tab === 'orders' && <OrdersTab />}
              {tab === 'profile' && <ProfileTab />}
            </div>

            {/* Sticky cart bar */}
            {totalItems > 0 && tab !== 'cart' && (
              <div className="absolute bottom-[80px] left-3 right-3 bg-ink text-cream rounded-full px-4 py-3 flex items-center gap-3 cursor-pointer animate-slide-up"
                   onClick={() => setTab('cart')}>
                <div className="flex-1">
                  <div className="text-[9px] opacity-60 font-mono tracking-widest">
                    {totalItems} ITEMS · SAVING ₹{discount}
                  </div>
                  <div className="font-display text-[15px] font-semibold">₹{total.toLocaleString('en-IN')}</div>
                </div>
                <span className="bg-cream text-ink px-3 py-1.5 rounded-full text-[10px] font-bold">View cart →</span>
              </div>
            )}

            {/* Bottom nav */}
            <BottomNav tab={tab} setTab={setTab} cartCount={totalItems} />
          </div>
        </div>

        <div className="text-center mt-5 text-[10px] font-mono text-clay tracking-widest">
          <p className="mb-1">DEMO MODE · ALL DATA IS SIMULATED</p>
          <p>TAP ANYTHING — IT&apos;S ALL CLICKABLE</p>
        </div>
      </div>
    </div>
  );
}

/* ICONS */
function SignalIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
      <rect x="0" y="6" width="3" height="5" rx="0.5" />
      <rect x="4" y="4" width="3" height="7" rx="0.5" />
      <rect x="8" y="2" width="3" height="9" rx="0.5" />
      <rect x="12" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 16 11" fill="currentColor" className="ml-0.5">
      <path d="M8 1.5C5.5 1.5 3.2 2.4 1.4 3.9L0 2.5C2.2 0.7 5 0 8 0s5.8 0.7 8 2.5L14.6 3.9C12.8 2.4 10.5 1.5 8 1.5z" />
      <path d="M8 4.5C6.5 4.5 5 5 3.8 5.8L2.4 4.4C4 3.2 6 2.5 8 2.5s4 0.7 5.6 1.9L12.2 5.8C11 5 9.5 4.5 8 4.5z" />
      <circle cx="8" cy="9.5" r="1.5" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <div className="w-6 h-[11px] border-[1.5px] border-current rounded-[3px] relative ml-0.5">
      <div className="absolute inset-0.5 bg-current rounded-[1px]" style={{ width: '85%' }} />
    </div>
  );
}

/* HOME TAB */
function HomeTab({ societyFlats, setTab, updateCart, cart }: any) {
  const tierPercent = Math.min((societyFlats / SOCIETY.totalFlats) * 100, 100);
  const popularPicks = PRODUCTS.filter(p => p.popular);

  return (
    <div className="px-5 pt-3 pb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-[10px] text-clay font-mono tracking-widest font-semibold">
            FLAT {RESIDENT.flat} · {RESIDENT.block.toUpperCase()}
          </div>
          <div className="font-display text-2xl font-medium tracking-tight mt-0.5">
            Hello, {RESIDENT.name.split(' ')[0]}
          </div>
        </div>
        <div onClick={() => setTab('profile')} className="w-10 h-10 rounded-full text-cream flex items-center justify-center font-display text-base font-semibold cursor-pointer"
             style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
          {RESIDENT.initial}
        </div>
      </div>

      <div className="bg-ink text-cream rounded-2xl p-4 mb-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[9px] opacity-60 font-mono tracking-widest">
              CYCLE Nº {SOCIETY.cycleNumber} · WEEK {SOCIETY.cycleDate}
            </div>
            <div className="font-display text-lg font-medium mt-1">
              Cutoff in {SOCIETY.cutoffHours}h {SOCIETY.cutoffMinutes}m
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-leaf-light animate-pulse-dot" />
            <span className="text-[9px] text-leaf-light font-mono tracking-wider font-bold">LIVE</span>
          </div>
        </div>

        <div className="flex gap-5 mt-4 pt-3.5 border-t border-cream/15">
          <div>
            <div className="font-display text-[22px] font-semibold leading-none animate-count-bump" key={societyFlats}>
              {societyFlats}
            </div>
            <div className="text-[9px] opacity-60 font-mono tracking-widest mt-1">FLATS JOINED</div>
          </div>
          <div>
            <div className="font-display text-[22px] font-semibold leading-none text-leaf-light">
              {CYCLE_LIVE.currentDiscount}%
            </div>
            <div className="text-[9px] opacity-60 font-mono tracking-widest mt-1">BULK DISCOUNT</div>
          </div>
          <div>
            <div className="font-display text-[22px] font-semibold leading-none">
              ₹{(CYCLE_LIVE.basketValue / 100000).toFixed(1)}L
            </div>
            <div className="text-[9px] opacity-60 font-mono tracking-widest mt-1">BASKET VALUE</div>
          </div>
        </div>

        <div className="h-1 bg-cream/15 rounded-full mt-3.5 overflow-hidden">
          <div className="progress-fill h-full" style={{ width: `${tierPercent}%` }} />
        </div>
      </div>

      <div className="border border-sand rounded-2xl p-4 mb-4 relative"
           style={{ background: 'linear-gradient(135deg, #FFFBF3 0%, #F5EDE0 100%)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">✨</span>
          <span className="text-[10px] text-terra font-mono tracking-widest font-bold">
            SMART CART · BASED ON LAST 3 ORDERS
          </span>
        </div>
        <div className="font-display text-base font-medium leading-snug mb-3">
          We&apos;ve pre-filled your cart with 11 staples you usually order.
        </div>
        <button onClick={() => setTab('cart')} className="bg-ink text-cream rounded-full px-4 py-2 text-[11px] font-bold tracking-wide">
          Review &amp; confirm →
        </button>
      </div>

      <div className="mb-4">
        <div className="text-[10px] text-clay font-mono tracking-widest font-semibold mb-2.5">
          SHOP BY CATEGORY
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'staples', icon: '🍚', label: 'Staples' },
            { id: 'beverages', icon: '☕', label: 'Beverages' },
            { id: 'dairy', icon: '🥛', label: 'Dairy' },
            { id: 'home', icon: '🧴', label: 'Home' },
          ].map((c, i) => (
            <div key={i} onClick={() => setTab('catalog')} className="bg-white border border-sand rounded-xl py-3 text-center cursor-pointer hover:border-ink transition-colors">
              <div className="text-2xl">{c.icon}</div>
              <div className="text-[10px] mt-1 font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-baseline mb-2.5">
        <div className="font-display text-lg font-medium tracking-tight">Picks of the week</div>
        <button onClick={() => setTab('catalog')} className="text-[10px] text-terra font-bold">See all →</button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {popularPicks.slice(0, 4).map(p => <ProductCard key={p.id} product={p} cart={cart} updateCart={updateCart} />)}
      </div>
    </div>
  );
}

/* CATALOG TAB */
function CatalogTab({ activeCategory, setActiveCategory, search, setSearch, cart, updateCart }: any) {
  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="px-5 pt-3 pb-4">
      <h2 className="font-display text-2xl font-medium tracking-tight mb-3">Shop the catalog</h2>

      <div className="bg-white border border-sand rounded-full px-4 py-2.5 flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#8B6F5C" strokeWidth="2"/>
          <path d="M14 14L18 18" stroke="#8B6F5C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search atta, oil, dal..."
          className="flex-1 outline-none bg-transparent text-[13px] placeholder:text-clay"
        />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${activeCategory === c.id ? 'bg-ink text-cream' : 'bg-white border border-sand-dark hover:border-ink'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-clay text-sm">No products match your search.</div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {filtered.map(p => <ProductCard key={p.id} product={p} cart={cart} updateCart={updateCart} />)}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, cart, updateCart }: any) {
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const inCart = cart[product.id] || 0;

  return (
    <div className="bg-white border border-sand rounded-xl p-2.5 relative">
      {product.pick && (
        <div className="absolute top-1.5 right-1.5 text-[8px] bg-terra text-white px-1.5 py-0.5 rounded font-mono font-bold tracking-wider z-10">
          PICK
        </div>
      )}
      <div className="h-[70px] rounded-lg flex items-center justify-center text-[32px] mb-2 relative"
           style={{ background: 'linear-gradient(135deg, #FFFBF3 0%, #F5EDE0 100%)' }}>
        {product.icon}
        <span className="absolute top-1.5 left-1.5 text-[8px] bg-leaf text-white px-1.5 py-0.5 rounded font-bold tracking-wider">
          −{off}%
        </span>
      </div>
      <div className="text-[8px] text-terra font-bold uppercase tracking-wider">{product.brand}</div>
      <div className="text-[11px] font-semibold leading-tight">{product.name}</div>
      <div className="text-[9px] text-clay font-mono">{product.size}</div>
      <div className="flex items-baseline gap-1 mt-1.5">
        <span className="font-display text-[14px] font-bold">₹{product.price}</span>
        <span className="text-[9px] text-clay line-through">₹{product.mrp}</span>
      </div>
      {inCart === 0 ? (
        <button
          onClick={() => updateCart(product.id, 1)}
          className="w-full mt-1.5 py-1.5 bg-cream border border-ink rounded-md text-[10px] font-bold hover:bg-ink hover:text-cream transition-colors"
        >
          + ADD
        </button>
      ) : (
        <div className="flex items-center justify-between bg-ink rounded-md p-0.5 mt-1.5">
          <button onClick={() => updateCart(product.id, -1)} className="w-6 h-6 text-cream text-sm font-bold">−</button>
          <span className="text-cream font-display text-xs font-semibold">{inCart}</span>
          <button onClick={() => updateCart(product.id, 1)} className="w-6 h-6 text-cream text-sm font-bold">+</button>
        </div>
      )}
    </div>
  );
}

/* CART TAB */
function CartTab({ cartItems, cart, updateCart, subtotal, discount, total }: any) {
  if (cartItems.length === 0) {
    return (
      <div className="px-5 pt-12 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <div className="font-display text-xl font-medium mb-2">Your cart is empty</div>
        <p className="text-sm text-ink-soft">Add some items from the catalog to get started.</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-3 pb-4">
      <div className="text-[10px] text-clay font-mono tracking-widest font-semibold">
        YOUR SHARE · {RESIDENT.flat}
      </div>
      <h2 className="font-display text-[28px] font-medium tracking-tight mt-1">The split.</h2>

      <div className="mt-4 pt-3 border-t border-ink">
        {cartItems.map((p: any) => (
          <div key={p.id} className="flex items-center gap-3 py-3 border-b border-sand">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                 style={{ background: 'linear-gradient(135deg, #FFFBF3, #F5EDE0)' }}>
              {p.icon}
            </div>
            <div className="flex-1">
              <div className="text-[8px] text-terra font-bold uppercase tracking-wider">{p.brand}</div>
              <div className="text-[12px] font-semibold leading-tight">{p.name}</div>
              <div className="text-[10px] text-clay font-mono">{p.size}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-sm font-semibold">₹{p.price * cart[p.id]}</div>
              <div className="flex items-center gap-1 mt-1 bg-ink rounded p-0.5 ml-auto">
                <button onClick={() => updateCart(p.id, -1)} className="w-5 h-5 text-cream text-xs font-bold">−</button>
                <span className="text-cream text-[10px] w-4 text-center">{cart[p.id]}</span>
                <button onClick={() => updateCart(p.id, 1)} className="w-5 h-5 text-cream text-xs font-bold">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-sand rounded-xl p-4 mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-ink-soft">Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm mb-2 text-leaf font-bold">
          <span>Bulk discount ({CYCLE_LIVE.currentDiscount}%)</span>
          <span>−₹{discount}</span>
        </div>
        <div className="flex justify-between text-sm mb-2 text-ink-soft">
          <span>Delivery to gate</span>
          <span>Free</span>
        </div>
        <div className="border-t border-sand mt-3 pt-3 flex justify-between items-baseline">
          <span className="font-display text-base font-bold">You pay</span>
          <span className="font-display text-3xl font-semibold tracking-tight">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <button className="w-full mt-3 py-4 bg-ink text-cream rounded-xl text-sm font-bold tracking-wide hover:bg-terra transition-colors">
        Pay ₹{total.toLocaleString('en-IN')} via UPI →
      </button>
      <p className="text-[10px] text-clay text-center mt-2 font-mono tracking-wide">
        DELIVERY · {SOCIETY.deliveryDay.toUpperCase()} {SOCIETY.deliveryDate.toUpperCase()} · {SOCIETY.deliveryTime} · {SOCIETY.deliveryGate.toUpperCase()}
      </p>
    </div>
  );
}

/* ORDERS TAB */
function OrdersTab() {
  return (
    <div className="px-5 pt-3 pb-4">
      <h2 className="font-display text-2xl font-medium tracking-tight mb-1">Your orders</h2>
      <p className="text-xs text-ink-soft mb-5">11 cycles · ₹{RESIDENT.totalSaved.toLocaleString('en-IN')} saved total</p>

      {ORDER_HISTORY.map(o => (
        <div key={o.cycle} className="bg-white border border-sand rounded-xl p-4 mb-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[9px] text-clay font-mono tracking-widest font-semibold">
                CYCLE Nº {o.cycle} · {o.week}
              </div>
              <div className="font-display text-base font-semibold mt-1">{o.items} items delivered</div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-leaf/10 text-leaf tracking-wider uppercase">
              {o.status}
            </span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-sand">
            <div>
              <div className="text-[9px] text-clay font-mono tracking-widest">PAID</div>
              <div className="font-display text-base font-semibold">₹{o.paid.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-[9px] text-clay font-mono tracking-widest">SAVED</div>
              <div className="font-display text-base font-semibold text-leaf">₹{o.saved}</div>
            </div>
            <button className="px-3 py-2 bg-cream border border-ink rounded-full text-[10px] font-bold">
              Repeat order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* PROFILE TAB */
function ProfileTab() {
  return (
    <div className="px-5 pt-3 pb-4">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full text-cream flex items-center justify-center font-display text-3xl font-semibold mb-3"
             style={{ background: 'linear-gradient(135deg, #E8743C, #C73A1F)' }}>
          {RESIDENT.initial}
        </div>
        <div className="font-display text-xl font-medium">{RESIDENT.name}</div>
        <div className="text-xs text-clay font-mono tracking-wider mt-0.5">
          {RESIDENT.flat} · {SOCIETY.name.toUpperCase()}
        </div>
      </div>

      <div className="bg-ink text-cream rounded-2xl p-5 mb-4 text-center">
        <div className="text-[10px] opacity-60 font-mono tracking-widest">TOTAL SAVED</div>
        <div className="font-display text-4xl font-semibold leading-none mt-1.5">
          ₹{RESIDENT.totalSaved.toLocaleString('en-IN')}
        </div>
        <div className="text-[10px] opacity-60 mt-2">Across {RESIDENT.cyclesParticipated} cycles since {RESIDENT.joinedDate}</div>
      </div>

      <div className="space-y-2">
        {[
          { icon: '🏠', label: 'Society details', sub: SOCIETY.name },
          { icon: '💳', label: 'Payment methods', sub: 'UPI · ****@ybl' },
          { icon: '🔔', label: 'Notifications', sub: 'Cycle reminders, deliveries' },
          { icon: '🎁', label: 'Refer a neighbour', sub: 'Get ₹100 in your next cycle' },
          { icon: '❓', label: 'Help &amp; support', sub: 'FAQs, contact us' },
          { icon: '⚙️', label: 'Settings', sub: 'Preferences, privacy' },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-sand rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-ink transition-colors">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                 style={{ background: 'linear-gradient(135deg, #FFFBF3, #F5EDE0)' }}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-[10px] text-clay font-mono">{item.sub}</div>
            </div>
            <span className="text-clay">›</span>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 py-3 border border-ink/30 text-ink-soft rounded-xl text-sm font-semibold hover:border-ink hover:text-ink transition-colors">
        Sign out
      </button>
    </div>
  );
}

/* BOTTOM NAV */
function BottomNav({ tab, setTab, cartCount }: { tab: Tab; setTab: (t: Tab) => void; cartCount: number }) {
  const items: { id: Tab; icon: string; label: string }[] = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'catalog', icon: '🛒', label: 'Catalog' },
    { id: 'cart', icon: '🧾', label: 'Cart' },
    { id: 'orders', icon: '📦', label: 'Orders' },
    { id: 'profile', icon: '👤', label: 'You' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[72px] bg-cream border-t border-sand flex items-center justify-around px-2">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setTab(item.id)}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 relative ${tab === item.id ? 'text-terra' : 'text-clay'}`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className={`text-[9px] font-mono tracking-wider font-semibold ${tab === item.id ? 'text-terra' : 'text-clay'}`}>
            {item.label.toUpperCase()}
          </span>
          {item.id === 'cart' && cartCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-terra text-cream rounded-full text-[8px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
