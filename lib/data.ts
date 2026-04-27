// All mock data for Community Cart lives here.
// Edit anything here and it propagates everywhere in the app.

export const SOCIETY = {
  name: "Hiranandani Eldora",
  complex: "Hiranandani Gardens",
  area: "Powai",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400076",
  totalFlats: 412,
  blocks: ["A", "B", "C", "D"],
  rwaPresident: "Mr. Subramanian Iyer",
  cycleNumber: 14,
  cycleDate: "27 Apr — 03 May 2026",
  cutoffHours: 18,
  cutoffMinutes: 34,
  deliveryDay: "Wednesday",
  deliveryDate: "30 Apr",
  deliveryTime: "7–9 AM",
  deliveryGate: "Gate A",
};

export const STORE_PARTNER = {
  name: "Mumbai Mart Wholesale",
  branch: "Powai Branch",
  distance: "1.4 km",
  bulkDiscount: 14,
  partnerSince: "Jan 2026",
};

export const RESIDENT = {
  name: "Priya Menon",
  flat: "A-407",
  block: "Block A",
  initial: "P",
  joinedDate: "Jan 2026",
  cyclesParticipated: 11,
  totalSaved: 14820,
  avgWeeklyOrder: 1386,
};

export const CYCLE_LIVE = {
  flatsJoined: 247,
  basketValue: 277628,
  currentTier: 3,
  currentDiscount: 14,
  paymentsCollected: 78,
  amountCollected: 216550,
  amountPending: 61078,
};

export const TIERS = [
  { number: 1, threshold: 25, discount: 8 },
  { number: 2, threshold: 50, discount: 11 },
  { number: 3, threshold: 75, discount: 14 },
  { number: 4, threshold: 100, discount: 17 },
];

export const PRODUCTS = [
  // Staples
  { id: 1, brand: "Aashirvaad", name: "Whole Wheat Atta", size: "5 kg", category: "staples", price: 248, mrp: 295, icon: "🌾", pick: true, popular: true },
  { id: 2, brand: "Daawat", name: "Rozana Basmati Rice", size: "5 kg", category: "staples", price: 420, mrp: 485, icon: "🌾", pick: true },
  { id: 3, brand: "India Gate", name: "Sona Masoori Rice", size: "5 kg", category: "staples", price: 320, mrp: 368, icon: "🍚" },
  { id: 4, brand: "Tata Sampann", name: "Toor Dal Premium", size: "1 kg", category: "staples", price: 142, mrp: 168, icon: "🫘", popular: true },
  { id: 5, brand: "Tata Sampann", name: "Moong Dal", size: "1 kg", category: "staples", price: 138, mrp: 162, icon: "🫘" },
  { id: 6, brand: "Tata Sampann", name: "Chana Dal", size: "1 kg", category: "staples", price: 128, mrp: 152, icon: "🫘" },
  { id: 7, brand: "Fortune", name: "Sunlite Refined Oil", size: "1 L", category: "staples", price: 118, mrp: 148, icon: "🫗", popular: true },
  { id: 8, brand: "Saffola", name: "Gold Edible Oil", size: "1 L", category: "staples", price: 195, mrp: 230, icon: "🫗" },
  { id: 9, brand: "Tata", name: "Iodised Salt", size: "1 kg", category: "staples", price: 22, mrp: 28, icon: "🧂", popular: true },
  { id: 10, brand: "Madhur", name: "Pure Cane Sugar", size: "1 kg", category: "staples", price: 48, mrp: 56, icon: "🥄" },

  // Beverages
  { id: 11, brand: "Red Label", name: "Natural Care Tea", size: "500 g", category: "beverages", price: 178, mrp: 215, icon: "🍵", popular: true },
  { id: 12, brand: "Taj Mahal", name: "Premium Tea Leaves", size: "500 g", category: "beverages", price: 285, mrp: 340, icon: "🍵" },
  { id: 13, brand: "Bru", name: "Instant Coffee", size: "200 g", category: "beverages", price: 312, mrp: 365, icon: "☕" },
  { id: 14, brand: "Nescafe", name: "Classic Coffee", size: "100 g", category: "beverages", price: 245, mrp: 285, icon: "☕" },
  { id: 15, brand: "Real", name: "Mixed Fruit Juice", size: "1 L", category: "beverages", price: 128, mrp: 145, icon: "🧃" },

  // Dairy
  { id: 16, brand: "Amul Taaza", name: "Toned Milk", size: "1 L", category: "dairy", price: 58, mrp: 66, icon: "🥛", popular: true },
  { id: 17, brand: "Mother Dairy", name: "Full Cream Milk", size: "1 L", category: "dairy", price: 68, mrp: 78, icon: "🥛" },
  { id: 18, brand: "Amul", name: "Butter", size: "500 g", category: "dairy", price: 252, mrp: 295, icon: "🧈" },
  { id: 19, brand: "Mother Dairy", name: "Curd", size: "1 kg", category: "dairy", price: 78, mrp: 92, icon: "🥣" },
  { id: 20, brand: "Amul", name: "Cheese Slices", size: "200 g", category: "dairy", price: 142, mrp: 165, icon: "🧀" },

  // Home & Cleaning
  { id: 21, brand: "Surf Excel", name: "Easy Wash Detergent", size: "2 kg", category: "home", price: 410, mrp: 482, icon: "🧴", popular: true },
  { id: 22, brand: "Ariel", name: "Matic Top Load", size: "2 kg", category: "home", price: 445, mrp: 520, icon: "🧴" },
  { id: 23, brand: "Vim", name: "Dishwash Liquid", size: "750 ml", category: "home", price: 165, mrp: 198, icon: "🍶" },
  { id: 24, brand: "Lizol", name: "Floor Cleaner", size: "975 ml", category: "home", price: 178, mrp: 215, icon: "🧹" },
  { id: 25, brand: "Harpic", name: "Toilet Cleaner", size: "1 L", category: "home", price: 135, mrp: 162, icon: "🚽" },
  { id: 26, brand: "Colin", name: "Glass Cleaner", size: "500 ml", category: "home", price: 98, mrp: 118, icon: "🪟" },

  // Snacks & Other
  { id: 27, brand: "Britannia", name: "Marie Gold Biscuits", size: "Pack of 6", category: "snacks", price: 95, mrp: 120, icon: "🍪" },
  { id: 28, brand: "Parle", name: "Parle-G Biscuits", size: "Pack of 12", category: "snacks", price: 110, mrp: 144, icon: "🍪" },
  { id: 29, brand: "Maggi", name: "2-Minute Noodles", size: "Pack of 8", category: "snacks", price: 96, mrp: 112, icon: "🍜" },
  { id: 30, brand: "Saffola", name: "Honey", size: "500 g", category: "snacks", price: 218, mrp: 265, icon: "🍯" },
];

export const CATEGORIES = [
  { id: "all", label: "Everything", icon: "🛒" },
  { id: "staples", label: "Staples", icon: "🍚" },
  { id: "beverages", label: "Beverages", icon: "☕" },
  { id: "dairy", label: "Dairy", icon: "🥛" },
  { id: "home", label: "Home & Cleaning", icon: "🧴" },
  { id: "snacks", label: "Snacks & Other", icon: "🍪" },
];

export const FLAT_ACTIVITY = [
  { flat: "A-407", name: "Priya Menon", amount: 1386, status: "paid", items: 8, time: "12 min ago", initial: "P" },
  { flat: "B-208", name: "Karthik Reddy", amount: 980, status: "paid", items: 6, time: "34 min ago", initial: "K" },
  { flat: "C-512", name: "Anjali Sharma", amount: 1620, status: "pending", items: 11, time: "1 hr ago", initial: "A" },
  { flat: "A-301", name: "Rohan Desai", amount: 740, status: "paid", items: 5, time: "1 hr ago", initial: "R" },
  { flat: "D-105", name: "Meera Krishnan", amount: 2100, status: "paid", items: 14, time: "2 hr ago", initial: "M" },
  { flat: "B-602", name: "Vikram Joshi", amount: 580, status: "pending", items: 4, time: "3 hr ago", initial: "V" },
  { flat: "C-208", name: "Sneha Patel", amount: 1450, status: "paid", items: 9, time: "3 hr ago", initial: "S" },
  { flat: "A-712", name: "Arjun Nair", amount: 920, status: "paid", items: 6, time: "4 hr ago", initial: "A" },
  { flat: "D-405", name: "Kavita Bhatt", amount: 1180, status: "paid", items: 7, time: "5 hr ago", initial: "K" },
  { flat: "B-115", name: "Aditya Shah", amount: 760, status: "pending", items: 5, time: "6 hr ago", initial: "A" },
  { flat: "C-302", name: "Neha Iyer", amount: 1540, status: "paid", items: 10, time: "7 hr ago", initial: "N" },
  { flat: "A-510", name: "Suresh Kulkarni", amount: 880, status: "paid", items: 6, time: "8 hr ago", initial: "S" },
];

export const ORDER_HISTORY = [
  { cycle: 13, week: "20 Apr — 26 Apr", items: 9, paid: 1284, saved: 432, status: "delivered" },
  { cycle: 12, week: "13 Apr — 19 Apr", items: 11, paid: 1456, saved: 498, status: "delivered" },
  { cycle: 11, week: "06 Apr — 12 Apr", items: 8, paid: 1198, saved: 387, status: "delivered" },
  { cycle: 10, week: "30 Mar — 05 Apr", items: 13, paid: 1672, saved: 542, status: "delivered" },
  { cycle: 9, week: "23 Mar — 29 Mar", items: 7, paid: 982, saved: 318, status: "delivered" },
  { cycle: 8, week: "16 Mar — 22 Mar", items: 10, paid: 1340, saved: 421, status: "delivered" },
];

export const TOP_CATEGORIES = [
  { cat: "Staples", value: 38, color: "#C73A1F" },
  { cat: "Beverages", value: 22, color: "#E8743C" },
  { cat: "Dairy", value: 18, color: "#1F8A3F" },
  { cat: "Home & Cleaning", value: 14, color: "#2A1810" },
  { cat: "Snacks & Other", value: 8, color: "#8B6F5C" },
];

export const AI_PICKS = [
  { id: 1, brand: "Aashirvaad", name: "Atta", size: "5 kg", qty: 1, confidence: 98, icon: "🌾" },
  { id: 16, brand: "Amul Taaza", name: "Milk", size: "1 L", qty: 7, confidence: 100, icon: "🥛" },
  { id: 4, brand: "Tata Sampann", name: "Toor Dal", size: "1 kg", qty: 1, confidence: 92, icon: "🫘" },
  { id: 7, brand: "Fortune", name: "Sunlite Oil", size: "1 L", qty: 1, confidence: 95, icon: "🫗" },
  { id: 11, brand: "Red Label", name: "Tea", size: "500 g", qty: 1, confidence: 88, icon: "🍵" },
  { id: 21, brand: "Surf Excel", name: "Easy Wash", size: "2 kg", qty: 1, confidence: 84, icon: "🧴" },
  { id: 19, brand: "Mother Dairy", name: "Curd", size: "1 kg", qty: 1, confidence: 76, icon: "🥣" },
];

export const TESTIMONIALS = [
  {
    quote: "Saved ₹14,820 last year without changing a thing about how we shop. The Wednesday morning gate pickup is something my husband actually looks forward to.",
    name: "Priya Menon",
    flat: "A-407, Hiranandani Eldora",
    initial: "P",
  },
  {
    quote: "Our RWA was sceptical at first. After cycle 3, 60% of flats had joined. By cycle 8, we'd hit 75% participation and unlocked the deepest tier.",
    name: "Mr. S. Iyer",
    flat: "RWA President, Eldora",
    initial: "S",
  },
  {
    quote: "I used to do 3 different Blinkit orders a week. Now my pantry refills itself on Wednesday and I save real money. This should have existed years ago.",
    name: "Karthik Reddy",
    flat: "B-208, Hiranandani Eldora",
    initial: "K",
  },
];

export const FAQS = [
  {
    q: "How is this different from Blinkit or Zepto?",
    a: "Blinkit and Zepto deliver individual orders at retail prices in 10 minutes. Community Cart aggregates your entire society into one bulk order each week — you save 14–17% on every item, and the store delivers everything to your gate at once. We're not competing on speed. We're a weekly habit, not an emergency.",
  },
  {
    q: "Do I have to order every week?",
    a: "No. Skip any week you want. The cycle keeps running — your neighbours' orders still get processed. You can rejoin the next week with one tap.",
  },
  {
    q: "What if my order gets delivered wrong or items are missing?",
    a: "Every bag is labelled with your flat number and itemised. If something is missing or wrong, raise it in the app within 24 hours of delivery. The store partner replaces it the next cycle, or refunds your UPI within 48 hours.",
  },
  {
    q: "How does the bulk discount actually work?",
    a: "Our store partner gives wholesale rates because they know they'll receive a guaranteed bulk order every Wednesday. The more flats in your society that join the cycle, the deeper the discount tier — 8% at 25% participation, 11% at 50%, 14% at 75%, and 17% at full participation.",
  },
  {
    q: "Is my payment secure?",
    a: "All payments are UPI-only and routed through India's standard payment infrastructure. Community Cart never holds your money — it goes directly from your UPI to the store partner's verified account.",
  },
  {
    q: "What does the RWA have to do?",
    a: "Almost nothing once it's set up. The RWA admin dashboard tracks participation, payments, and complaints. The committee can send WhatsApp reminders with one click and review weekly savings reports. Most RWAs spend less than 30 minutes a week on it.",
  },
];
