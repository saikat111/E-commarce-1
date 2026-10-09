# 🛍️ Nexus Bazaar — Ultra-Modern Multi-Page E-Commerce Marketplace (BDT)

> **AliExpress-Inspired Architecture · Pure Bangladeshi Taka (৳) Pricing · Real-Time Order Tracking Timeline · Interactive User Account Dashboard · Rich Multi-Category Catalog**

Nexus Bazaar is a production-grade, ultra-modern e-commerce web application crafted with **React 19**, **TypeScript**, and **Tailwind CSS**. It replicates the high-converting, detail-oriented shopping experience of global platforms like AliExpress, customized specifically for Bangladesh's ecosystem (bKash, Nagad, Cash on Delivery, Steadfast & RedX courier logistics).

---

## 🌟 Key Application Highlights

### 1. 🚚 Dedicated Order Tracking & Shipping Timeline
- **5-Milestone Canonical Timeline (`OrderTrackingTimeline.tsx`):**
  1. **Order Confirmed & Verified** (bKash/Nagad/COD payment verified)
  2. **Processing & Barcode Packed** (central sorting facility quality check)
  3. **Dispatched with Courier Partner** (Steadfast Courier / RedX Express priority manifest)
  4. **Out for Delivery** (rider assigned with name and phone number)
  5. **Delivered to Customer Doorstep** (OTP verification and signature)
- **Live Location Checkpoints:**
  - Audit trail with timestamps, facility hubs (e.g., *Tejgaon Industrial Area, Dhaka North Regional Hub, Gulshan-2*), and operational notes.
  - Interactive **One-Click Tracking Number Copy** (`SA-BD-XXXXXX`, `RX-BD-XXXXXX`) with toast feedback.
  - Active parcel status indicator with animated pulsing badges.
  - Direct courier helpline link and transit damage insurance guarantee card.

### 2. 👤 Ultra-Modern User Account Dashboard (`UserDashboard.tsx`)
- **Pro User Summary Strip:**
  - Profile avatar with Diamond Choice / Platinum membership tier status.
  - Key performance metrics: *Total Orders Placed*, *Active In-Transit Shipments*, and *Nexus Bazaar Coins* (redeemable for checkout discounts).
- **Tabbed Architecture:**
  - **Dashboard Overview:** Real-time metrics breakdown, highlighted active shipment card with quick jump to live tracker, recent order history preview, and recently viewed products.
  - **Track Shipments:** Split view with live search by order/tracking number, status filters (*All, In Transit, Delivered*), and package contents breakdown.
  - **Order History:** Complete log of previous orders with date stamps, payment methods, line items, and tracking shortcuts.
  - **Saved Wishlist:** One-click Add to Cart, product detail redirection, and item deletion.
  - **Delivery Addresses:** Multiple address cards (Home, Office) with default selection toggle for 1-click checkout.
  - **Account Settings:** Editable customer profile, Bangladesh phone number, and security preferences.

### 3. 🧠 Smart 'Recommended for You' Heuristic Recommendation Engine
- **Dedicated Homepage Feed (`RecommendedForYou.tsx`):**
  - Prominently positioned on the homepage with real-time adaptation to user browsing behavior and viewed products.
- **Multi-Factor Heuristic Scoring Model (`recommendationEngine.ts`):**
  - **Category Affinity Scoring:** Analyzes viewed departments with time-decay weights, boosting high-interest categories.
  - **Subcategory & Style Synergy:** Recommends complementary and matching subcategories based on recent clicks.
  - **Price Range Proximity:** Calculates the weighted average price of inspected goods and prioritizes items within ±35% of the user's viewed budget.
  - **Last-Viewed Product Pairing:** Identifies companion products frequently paired with the most recently inspected item.
  - **Wishlist & Cart Synergy:** Boosts saved wishlist items while preventing redundant recommendations for items already placed in the shopping bag.
- **Explainable Match Scores & Transparent Badges:**
  - Every card displays a confidence match pill (e.g., *🎯 97% Match*, *Audio Affinity*, *Budget Fit ~৳5,400*).
  - Hover/preview explanation detailing *why* the item was selected by the heuristic.
- **Live Taste Profile Bar & Quick Persona Simulator:**
  - Transparent inspector revealing total inspected items, primary category, and estimated budget.
  - One-click Persona Simulators (**Audiophile**, **Smart Home**, **Horology & Watches**, **Interior Living**) enabling instant live demonstration of the recommendation engine.
- **Collapsible 'Recently Viewed' Mini-Shelf (`browsingHistory.ts`):**
  - Persistent horizontal scroll of recently viewed products stored in `localStorage` with view counts and clear/remove options.
- **Intelligent Cold-Start Fallback:**
  - Seamlessly welcomes first-time visitors with high-conversion Choice and best-selling curations across diverse categories.

### 4. 🎯 Advanced Multi-Page Storefront Navigation
- **True Multi-Page Routing (No Single-Page Monolith):**
  - Dynamic browser history push state with URL hash syncing (`#home`, `#category/electronics_audio`, `#product/elec_01`, `#cart`, `#checkout`, `#wishlist`, `#dashboard`).
  - Native browser back and forward button support.
  - Header breadcrumb trail (`HeaderBreadcrumb.tsx`) with category quick-switcher dropdown and BDT pricing context.
- **Top AliExpress-Style Utility & Navigation Bar (`AliNavbar.tsx`):**
  - Currency & shipping notice: 🇧🇩 *Ship to: Bangladesh / BDT (৳)*.
  - Global department selector integrated directly into the search bar.
  - Visual image search button and trending Bangladesh search tags.
  - Account action button with live indicator connecting directly to the user dashboard.

### 5. 🏷️ Category Explorer with Interactive BDT Price Range Slider
- **Dual-Handle / Dynamic Price Range Filter (`CategoryPage.tsx`):**
  - Range slider in Bangladeshi Taka ranging from **৳0 to ৳50,000+** with ৳500 step precision.
  - Instant Min & Max number inputs for exact value entry.
  - One-click price preset chips: *All Prices*, *Under ৳3,000*, *৳3,000 – ৳10,000*, *Above ৳10,000*.
  - Deal filter toggles: **Flash Deals**, **Featured Items**, **Best Sellers**, and **Super Discounts**.
  - Service filters: *AliExpress Choice Only*, *Free Shipping Nationwide*, and *In Stock Only*.

### 6. 📸 Dedicated Product Detail Page (PDP) & Customer Reviews
- **Multi-Photo Image Gallery:**
  - 4 distinct, high-resolution photographs per product with thumbnail selector.
  - Zoom-in preview modal / lightbox for fine detail inspection.
- **Bangladeshi Buyer Reviews System:**
  - 5-star distribution breakdown, buyer satisfaction percentage, and verified badges.
  - Real customer reviews from verified buyers across Dhaka, Chittagong, Sylhet, and Khulna.
  - Interactive "Helpful" counters and "Write a Customer Review" modal submission form.
- **Conversion Actions:**
  - Working **Add to Cart** with quantity controls and color/spec variant pickers.
  - Instant **Buy Now** button which populates cart and immediately routes to express checkout.
  - Related items carousel ("More to Love / Customers Also Bought").

### 7. 💳 Bangladesh-Tailored Express Checkout & Payments
- **Nationwide Logistics & Address Form:**
  - Division selector (Dhaka, Chittagong, Rajshahi, Khulna, Barisal, Sylhet, Rangpur, Mymensingh).
  - City, Area, Street address, and contact number (+880).
- **Payment Methods:**
  - **Cash on Delivery (COD)** — Zero advance payment required.
  - **bKash Mobile Wallet** — Instant mobile checkout simulation.
  - **Nagad Payment**
  - **Visa / Mastercard / Amex**
- **Promotional Coupons:**
  - `ALIBD500` (৳500 OFF first order).
  - `CHOICE10` (10% extra discount).

---

## 📦 Rich Product Catalog (30+ Products, 6 Categories)

Every category contains at least 5 high-end products with multiple photos, detailed technical specifications, seller ratings, and verified buyer reviews:

1. **Consumer Electronics & Audio** (Headphones, Desktop Monitors, Keyboards, Microphones, Soundbars)
2. **Smart Home & Architectural Lighting** (Fluted Brass Table Lamps, RGB Halo Projection, Levitating Moon Lamps)
3. **Timepieces & Horology** (Grade 5 Titanium Automatic Watches, AMOLED Tacticals, Pilot Chronographs)
4. **Furniture & Interior Living** (Architectural White Oak Chairs, Travertine Coffee Tables, Bouclé Armchairs)
5. **Kitchen, Dining & Coffee Craft** (Gooseneck Electric Kettles, Damascus Chef Knives, Conical Burr Grinders)
6. **Everyday Carry & Lifestyle Gadgets** (Spanish Nero Marble Altars, Desk Clocks, Belgian Flax Linen)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build
```

---

## 📁 Architecture Overview

```
├── src/
│   ├── components/
│   │   ├── cart/              # CartDrawer, slide-over bag
│   │   ├── dashboard/         # UserDashboard, OrderTrackingTimeline, OrderTrackingSection
│   │   ├── layout/            # AliNavbar, HeaderBreadcrumb, Footer
│   │   ├── pages/             # HomePage, CategoryPage, ProductDetailPage, CartPage, CheckoutPage, WishlistPage
│   │   └── product/           # ProductCard, ReviewSection, ImageGallery
│   ├── context/               # CartContext (cart state, wishlist, coupons)
│   ├── data/                  # products.ts (30+ catalog items with BDT pricing and multiple images)
│   ├── services/              # api.ts (simulated backend for products, orders, promos, and tracking)
│   ├── types/                 # index.ts (TypeScript data models, PageRoute, Order, Checkpoint)
│   └── utils/                 # formatters.ts (formatBDT, date helpers)
├── App.tsx                    # Multi-page application router & history coordinator
├── index.html                 # HTML5 entry with BDT meta branding
└── README.md                  # Complete technical and design documentation
```

---

## 🛡️ License
MIT License. Created for the Google AI Studio ultra-modern e-commerce showcase.
