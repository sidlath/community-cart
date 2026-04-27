# Community Cart

A Next.js demo app pitching a weekly bulk grocery ordering platform for Indian apartment societies. Live mock society: **Hiranandani Eldora, Powai, Mumbai**.

This is a pitch prototype — fully clickable, looks complete, but no real backend.

---

## Deploy to Vercel (3 ways, pick one)

### Option 1: Drag-and-drop (easiest, no terminal needed)

1. Go to https://vercel.com/new
2. Sign in (use GitHub, Google, or email)
3. Click the upload area and drag this entire `community-cart` folder into it
4. Click **Deploy**
5. In ~60 seconds you'll get a live URL like `community-cart-xyz.vercel.app`

### Option 2: GitHub import (recommended if you want easy edits)

1. Create a new GitHub repo (private is fine)
2. Push this folder to it:
   ```bash
   cd community-cart
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. Go to https://vercel.com/new
4. Click **Import Git Repository** and select your repo
5. Click **Deploy** (no config needed — Vercel auto-detects Next.js)

Future edits: push to GitHub → Vercel auto-redeploys.

### Option 3: Vercel CLI (for developers)

```bash
npm install -g vercel
cd community-cart
vercel
```

Follow the prompts. First deploy creates the project; subsequent `vercel --prod` deploys updates.

---

## Run locally first (optional)

```bash
cd community-cart
npm install
npm run dev
```

Open http://localhost:3000

---

## Editing the demo

**All mock data lives in one file: `lib/data.ts`**

Want to change the society, products, residents, savings numbers, or testimonials? Open that file. Edit. Save. Everything across the app updates automatically.

Common edits:
- **Change the society** → edit `SOCIETY` object (name, area, total flats, etc.)
- **Add/remove products** → edit `PRODUCTS` array
- **Change resident name** → edit `RESIDENT` object
- **Change FAQs** → edit `FAQS` array
- **Change pilot stats** → edit `CYCLE_LIVE` object

---

## File structure

```
community-cart/
├── app/                       # Pages (Next.js App Router)
│   ├── page.tsx              # Homepage (long-scroll showcase)
│   ├── app/page.tsx          # Interactive resident app demo
│   ├── admin/page.tsx        # RWA dashboard
│   ├── how-it-works/page.tsx
│   ├── for-societies/page.tsx
│   ├── pricing/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx            # Wraps every page (nav + footer)
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PhoneFrame.tsx        # Reusable iPhone mockup
│   ├── DecorArch.tsx         # Decorative SVG
│   └── screens/              # Inside-phone screens
│       ├── HomeScreen.tsx
│       ├── CatalogScreen.tsx
│       ├── LivePulseScreen.tsx
│       ├── PaymentScreen.tsx
│       └── SmartCartScreen.tsx
├── lib/
│   └── data.ts               # All mock data
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## What's real vs what's mocked

**Looks real but is mock data:**
- All resident names, flat numbers, payment statuses
- The 247 flats / 78% payments / ₹38k savings figures
- The "live counter" that ticks up (just a JS interval)
- Order history, testimonials, AI confidence scores

**Brand references (text-only, no logos used):**
- Aashirvaad, Tata Sampann, Daawat, Fortune, Amul, Surf Excel, Red Label etc.
- Hiranandani Eldora as society name (geographic reference)
- "Mumbai Mart Wholesale" as fictional store partner

**Functional in the demo:**
- All navigation links
- Adding/removing items from cart in `/app`
- Tab switching, filters, search
- Contact form (logs success, doesn't actually send email)
- Animations and hover states

**Not built (because it's a pitch demo):**
- Actual auth/login
- Real UPI payment integration
- Real backend / database
- Order placement to real stores

---

## Tech stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Custom Fraunces + Manrope + JetBrains Mono fonts (loaded via Google Fonts)

---

## Need to make changes?

Open `lib/data.ts` first — most demo content lives there. If you need actual layout or copy changes, the page files are in `app/` and components in `components/`. Each file is self-contained and well-commented.

If something breaks during deploy, the most common issues are:
- Missing `node_modules` (run `npm install`)
- TypeScript errors (the project has `strict: false` so this should be rare)
- Vercel needs Node 18+ (it picks this automatically)

Built as a pitch prototype. Not for production use without further work.
