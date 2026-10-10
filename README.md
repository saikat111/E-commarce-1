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

### 4. ⚡ Real-Time 'Recent Activity' Social Proof & Urgency Toast (`RecentActivityToast.tsx`)
- **Non-Intrusive Ambient Urgency Bubbles:**
  - Elegantly positioned in the bottom-left corner with sleek glassmorphism and subtle elevation (`shadow-xl bg-white/95 backdrop-blur-md border border-neutral-200/90`).
  - Staggered display intervals (displays for 6 seconds, pauses for 12 seconds) without disrupting customer browsing.
- **Authentic Bangladesh Customer Context (`activityService.ts`):**
  - Live verified order stream featuring realistic buyer names (*Tanvir H., Nusrat J., Shafiqul R., Farhana K.*) across key divisions (*Dhanmondi, Gulshan-2, Panchlaish Chittagong, Zindabazar Sylhet, KDA Khulna, Shaheb Bazar Rajshahi*).
  - Accurate payment methods (*bKash, Nagad, Cash on Delivery, Visa/Mastercard*).
  - High-resolution product thumbnail, item title, variant label, and live price in BDT (৳).
- **Dynamic Scarcity & Social Proof Indicators:**
  - Pulsing emerald live purchase dot with relative time stamps (*"Purchased Just now"*, *"Purchased 2m ago"*).
  - Stock scarcity notice (*"⚡ Only 3 units left in stock"*, *"14 viewing now"*).
- **Thoughtful Interactive Controls:**
  - **Pause on Hover:** Auto-dismiss timer pauses automatically when the customer hovers their mouse over the card to read product specs.
  - **Animated Progress Bar:** Micro-indicator along the bottom showing remaining display duration.
  - **Direct Product Redirection:** Clicking anywhere on the card instantly navigates to that product's dedicated PDP.
  - **User Privacy & Comfort Controls:** 1-click dismiss button (`X`) and a toggleable "Mute" control (`BellOff`) that respects user preference via `localStorage`.
- **Live Purchases Feed Explorer:**
  - Floating ambient pill button (*"⚡ Live Purchases · 18 today"*) opening a full verified order audit modal so users can inspect real-time transaction activity nationwide.

### 5. 🎯 Advanced Multi-Page Storefront Navigation
- **True Multi-Page Routing (No Single-Page Monolith):**
  - Dynamic browser history push state with URL hash syncing (`#home`, `#category/electronics_audio`, `#product/elec_01`, `#cart`, `#checkout`, `#wishlist`, `#dashboard`).
  - Native browser back and forward button support.
  - Header breadcrumb trail (`HeaderBreadcrumb.tsx`) with category quick-switcher dropdown and BDT pricing context.
- **Top AliExpress-Style Utility & Navigation Bar (`AliNavbar.tsx`):**
  - Currency & shipping notice: 🇧🇩 *Ship to: Bangladesh / BDT (৳)*.
  - Global department selector integrated directly into the search bar.
  - Visual image search button and trending Bangladesh search tags.
  - Account action button with live indicator connecting directly to the user dashboard.

### 6. 🏷️ Category Explorer with Interactive BDT Price Range Slider
- **Dual-Handle / Dynamic Price Range Filter (`CategoryPage.tsx`):**
  - Range slider in Bangladeshi Taka ranging from **৳0 to ৳50,000+** with ৳500 step precision.
  - Instant Min & Max number inputs for exact value entry.
  - One-click price preset chips: *All Prices*, *Under ৳3,000*, *৳3,000 – ৳10,000*, *Above ৳10,000*.
  - Deal filter toggles: **Flash Deals**, **Featured Items**, **Best Sellers**, and **Super Discounts**.
  - Service filters: *AliExpress Choice Only*, *Free Shipping Nationwide*, and *In Stock Only*.

### 7. 📸 Dedicated Product Detail Page (PDP) & Customer Reviews
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

### 8. 💳 Bangladesh-Tailored Express Checkout & Payments
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

### 9. 💬 Persistent 'Chat with Us' FAB & Mock AI Support Concierge (`SupportChatModal.tsx`, `mockChatService.ts`)
- **Persistent Floating Action Button (FAB):**
  - Positioned at `bottom-right` with pulsing emerald online beacon, unread badge counter, and smooth micro-hover physics.
  - Works across every page of the application without obstructing cart trays or checkout flows.
- **Intelligent Context-Aware Support Assistant:**
  - **Courier & Order Tracking Lookups:** Recognizes tracking codes (`SA-BD-XXXXXX`, `RX-BD-XXXXXX`) and order IDs (`NX-BD-89211`), rendering interactive timeline cards directly in the conversation with one-click jump to the tracking dashboard.
  - **Interactive Catalog Recommendations:** Understands product requests (*"recommend headphones under ৳5,000"*, *"watches"*, *"lighting"*) and embeds real clickable product cards with instant *View Product* and *Add to Bag* actions.
  - **Bangladesh Payment Guidance:** Explains bKash merchant QR checkout, Nagad, Cash on Delivery nationwide, and 0% card EMI.
  - **Coupon Delivery:** Serves verified promo vouchers (`ALIBD500`, `CHOICE10`) with a 1-click clipboard copy tool.
  - **Realistic Typing Simulation:** Animated bouncing typing indicator before delivering responses.
  - **Quick Action Prompt Chips:** Clickable chips for instant answers without typing (*Track active parcel*, *Payment methods*, *Delivery times*).

### 10. 🔔 Intelligent Price Drop Alerts & Urgency Notification Hub (`PriceDropAlertModal.tsx`, `PriceDropBannerToast.tsx`)
- **Product-Level Price Drop Alerts:**
  - Dedicated *"Set Price Drop Alert"* button on every Product Detail Page with active indicator badge.
  - Configurable target discount presets (-5%, -10%, -15%, -20%) and custom BDT slider controls.
  - Multi-channel delivery preference: SMS (+880 Bangladesh format), Email, or In-App Browser alerts.
- **Active Alerts Management Center (`UserDashboard.tsx`):**
  - Dedicated *Price Drop Alerts* tab in the user account dashboard displaying all monitored items, current vs. target price in BDT, and one-click removal.
  - **"⚡ Test Drop" Simulation Button:** Allows instant testing of price drop triggers, firing a celebratory urgency banner (`PriceDropBannerToast.tsx`) with savings calculation and direct *Buy Now* routing.

### 11. ⚖️ Multi-Product Side-by-Side Comparison Matrix (`ProductComparisonModal.tsx`, `CompareFloatingBar.tsx`)
- **Global Comparison State (`CompareContext.tsx`):**
  - Add up to 4 items from across the catalog with persistent `localStorage` synchronization.
  - One-click *Compare* button on Category cards and PDP action bars.
- **Floating Bottom Comparison Tray (`CompareFloatingBar.tsx`):**
  - Ambient tray appearing automatically whenever products are selected for comparison.
  - Shows item thumbnails, empty slots indicator, minimize/maximize control, and instant *"Compare Now"* launch button.
- **Comprehensive Side-by-Side Matrix (`ProductComparisonModal.tsx`):**
  - **🏆 Best Value Pick Algorithmic Tagging:** Evaluates price-to-rating ratio, discount percentage, and review volume to automatically highlight the top value product.
  - **Highlight Differences Toggle:** Filters or highlights rows where specifications vary between compared products.
  - Complete matrix covering prices in BDT, discounts, ratings, review counts, stock levels, delivery speed, official warranty, origin, and technical hardware specifications.
  - Direct *Add to Bag* and *Buy Now* buttons right inside the matrix.

---

## 📱 Mobile-Friendly App-Like UI & Phone Responsiveness

The marketplace features a responsive mobile app experience modeled after native shopping apps (AliExpress, Shopee, Amazon):

- **Persistent Bottom App Navigation Bar (`MobileBottomNav.tsx`):**
  - Sticky 5-tab bar at the bottom on mobile screens (Home, Categories, Compare, Cart, Account).
  - Dynamic notification badge counters for shopping cart items and compared products.
  - Active tab indicators and safe-area padding.
- **Top Category Quick Stories Carousel:**
  - Horizontal swipeable circular story chips on the mobile storefront (SuperDeals, Audio, Lighting, Watches, Living, Kitchen, Track Order, AI Concierge).
- **Mobile Sticky Action Bar on PDP:**
  - Fixed mobile bottom toolbar on Product Detail Pages with quick 1-tap *Chat with Concierge*, *Wishlist*, *Add to Bag*, and *Buy Now* with live BDT pricing.
- **App-Style Mobile Filter Bottom Drawer:**
  - Replaces long desktop sidebars with a quick *Filters & Price (৳)* button opening a slide-up bottom sheet with the interactive BDT slider, presets, subcategories, and services filters.
- **Mobile 2-Column Catalog Grids:**
  - Compact, high-density 2-column product cards across Category, Home, and Wishlist pages.
- **Mobile Cart Sticky Checkout Bar:**
  - Fixed mobile summary bar on the cart page displaying total BDT and direct checkout trigger.
- **Floating Controls Collision Prevention:**
  - AI Support Chat FAB, Compare tray, and Recent Activity social proof bubbles automatically lift above the mobile bottom tab bar (`bottom-20`).

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
│   │   ├── chat/              # SupportChatModal (persistent FAB & mock AI support concierge)
│   │   ├── compare/           # CompareFloatingBar, ProductComparisonModal (specs matrix)
│   │   ├── dashboard/         # UserDashboard, OrderTrackingTimeline, OrderTrackingSection
│   │   ├── home/              # RecommendedForYou (heuristic recommendation feed & persona simulators)
│   │   ├── layout/            # AliNavbar, MobileBottomNav, HeaderBreadcrumb, Footer
│   │   ├── notifications/     # RecentActivityToast (real-time purchase urgency bubbles & live feed)
│   │   ├── pages/             # HomePage, CategoryPage, ProductDetailPage, CartPage, CheckoutPage, WishlistPage
│   │   └── product/           # PriceDropAlertModal, PriceDropBannerToast, ProductCard, ReviewSection
│   ├── context/               # CartContext, CompareContext (multi-product comparison state)
│   ├── data/                  # products.ts (30+ catalog items with BDT pricing and multiple images)
│   ├── services/              # api.ts, mockChatService.ts, priceAlertService.ts, recommendationEngine.ts, activityService.ts
│   ├── types/                 # index.ts (TypeScript data models, PageRoute, Order, ChatMessage, PriceDropAlert)
│   └── utils/                 # formatters.ts (formatBDT, date helpers)
├── App.tsx                    # Multi-page application router & history coordinator
├── index.html                 # HTML5 entry with BDT meta branding
└── README.md                  # Complete technical and design documentation
```

---

## 🛡️ License
MIT License. Created for the Google AI Studio ultra-modern e-commerce showcase.
