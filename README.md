# Nexus Bazaar — Ultra-Modern Multi-Page Marketplace (BDT)

> **AliExpress-Inspired UI Architecture · Pure BDT (৳) Pricing · Multi-Page Navigation**  
> Built with React 19, TypeScript, and Tailwind CSS. Features full multi-page client routing, category browsing with faceted sidebar filters, dedicated full-page Product Details (PDP) with Related Products, selectable Cart items, and an express checkout flow tailored for Bangladesh (bKash, Nagad, Cash on Delivery).

---

## 🌟 Key Features & Marketplace UX

### 1. Multi-Page Architecture (No Single-Page Monolith)
- **Home Page (`home`):**
  - AliExpress-style Hero Grid with left category taxonomy sidebar, central promotional banner slider, and right Welcome Card with **৳500 OFF** first order coupon (`ALIBD500`) + Daily Coins claim.
  - **SuperDeals Flash Sale:** Live countdown timer (Hours:Minutes:Seconds), discount callouts (-35% to -45%), progress bars with sold counts, and instant Buy Now buttons.
  - **Choice Day Curated Picks:** Multi-category tabbed browsing with verified buyer ratings.
  - **Trust & Assurance Strip:** Free nationwide shipping threshold (৳2,500), 15-day free returns, and Cash on Delivery guarantee.
- **Category Page (`category`):**
  - Dedicated multi-page view with breadcrumbs (`Home > Department > Subcategory`).
  - Left facet sidebar:
    - Subcategory filtering.
    - Price range filter in **BDT (৳)** with minimum and maximum inputs and an "Apply" button.
    - Services & programs: AliExpress Choice Only, Free Shipping Only, In Stock Only.
  - Main catalog grid with sorting (*Best Match, Orders (popular), Price: Low to High, Price: High to Low, Rating*), item count, discount tags, and Add to Cart / Buy Now buttons.
- **Product Details Page (`product`):**
  - Dedicated full page (not a modal!) with browser history navigation.
  - High-resolution multi-photo gallery with thumbnail switcher.
  - Price block in BDT (`formatBDT`): Flash price, original price, discount percentage, and BDT savings.
  - Colorway swatches and specifications variant pickers.
  - Quantity selector with live stock availability warnings.
  - **Dual Conversion Actions:** Working **"Add to Cart"** and instant **"Buy Now"** (routes directly to express checkout).
  - AliExpress-style **Seller / Store Card** (Store Name, 98.8% positive feedback, chat with seller).
  - **Tabbed Dossier:** Technical specifications table, detailed product highlights, and verified customer reviews.
  - **Related Products Section:** "Customers Also Bought / More to Love" showcase featuring 4+ related pieces from the same category.
- **Dedicated Cart Page (`cart`):**
  - Select-all and individual item selection checkboxes.
  - Quantity steppers and line item deletion.
  - Free shipping progress bar (Free nationwide courier inside Bangladesh at **৳2,500**).
  - Coupon discount input with instant verification (`ALIBD500`, `CHOICE10`).
  - Itemized calculation in BDT with "Proceed to Checkout".
- **Dedicated Checkout Page (`checkout`):**
  - Bangladeshi shipping address form: Receiver Name, Contact Phone (+880), Division selection (Dhaka, Chittagong, Sylhet, Khulna, etc.), City, Area, Street Address.
  - Payment methods tailored for Bangladesh:
    - **Cash on Delivery (COD)** — Zero pre-payment required.
    - **bKash Mobile Wallet** — Instant mobile checkout.
    - **Nagad Payment**
    - **Credit / Debit Card** (Visa, Mastercard, Amex).
  - Order confirmation receipt with reference number (`BD-2026-XXXXXX`) and courier tracking code (`SA-BD-XXXXX`).
- **Wishlist Page (`wishlist`):**
  - Dedicated page for bookmarked items with one-click "Move to Cart" and "Buy Now".

---

## 💰 100% BDT (Bangladeshi Taka) Pricing & Rich Catalog

Every single price, calculation, and discount is rendered in BDT with the `৳` symbol.

The catalog contains **30+ products** across 6 core departments, with a **minimum of 5 products per category**:

1. **Consumer Electronics & Audio (5 products):**
   - Aether Pro Hybrid ANC Wireless Headphones (৳6,450)
   - Strata Monolith Aluminum Wireless Desktop Speaker (৳14,990)
   - Pulse X Pro Low-Latency Wireless Gaming Earbuds (৳2,850)
   - Lumia 75 Hot-Swappable Wireless Mechanical Keyboard (৳5,200)
   - Clarity 4K UHD Streaming Webcam with Ring Light (৳4,150)
2. **Smart Home & Architectural Lighting (5 products):**
   - Lumina Fluted Brass & Travertine Table Lamp (৳3,850)
   - Sunset Halo 16-Color RGB Projection Lamp (৳1,650)
   - Ultra-Thin Magnetic Wireless PIR Sensor LED Strip (Pack of 2) (৳1,250)
   - Nordic Minimalist Arc Floor Lamp with Marble Plinth (৳9,800)
   - Levitating Magnetic 3D Moon Night Lamp (৳4,500)
3. **Timepieces & Horology (5 products):**
   - Atelier Chronos Grade 5 Titanium Automatic Watch (৳18,500)
   - Nordic Slim Line Minimalist Steel Mesh Watch (৳3,450)
   - Apex Tactical Military AMOLED Smartwatch (৳4,890)
   - Aviator Heritage Mechanical Pilot Chronograph (৳12,800)
   - Full-Grain Vegetable-Tanned Italian Leather Strap (৳1,450)
4. **Furniture & Interior Living (5 products):**
   - Form Architectural Lounge Chair in Solid White Oak (৳24,500)
   - Nordic Walnut Wall-Mounted Floating Nightstand (৳3,200)
   - Monolith Travertine & Oak Round Coffee Table (৳14,500)
   - ErgoPro 3D Lumbar Breathable Mesh Office Chair (৳16,800)
   - Nordic Sculptural Bouclé Fabric Armchair (৳28,000)
5. **Kitchen, Dining & Coffee Craft (5 products):**
   - Precision Gooseneck Variable Temp Electric Pour-Over Kettle (৳5,950)
   - Kanso Hand-Thrown Stoneware Carafe with 2 Cups Set (৳2,650)
   - Shogun 67-Layer Damascus Steel 8-Inch Chef Knife (৳4,400)
   - Apex Precision Stainless Steel Conical Burr Coffee Grinder (৳6,800)
   - Nordic Double-Wall Insulated Borosilicate Glass French Press (৳2,150)
6. **Everyday Carry & Lifestyle Decor (5 products):**
   - Vesper Monolithic Spanish Nero Marble Incense Altar (৳2,450)
   - Tempo Minimalist Architectural Column Desk Clock (৳3,900)
   - Nordic Washed Waffle 100% Belgian Flax Linen Blanket (৳3,600)
   - MagFlow 3-in-1 Foldable Aluminum Fast Wireless Charging Stand (৳3,850)
   - Aero Titanium Bolt-Action EDC Multi-Tool Pen (৳1,850)

---

## 🛠️ Project Structure

```
├── index.html                   # Entry point with Google Fonts and BDT metadata
├── metadata.json                # Project capabilities configuration
├── package.json                 # Dependencies & scripts
├── README.md                    # Architecture and documentation
├── src/
│   ├── App.tsx                  # Multi-page router orchestrator
│   ├── main.tsx                 # React 19 entry point
│   ├── index.css                # Tailwind CSS v4 setup
│   ├── types/
│   │   └── index.ts             # Domain models, BDT types & routes
│   ├── utils/
│   │   └── formatters.ts        # BDT (৳) currency & number formatters
│   ├── data/
│   │   └── products.ts          # 30+ product catalog with BDT pricing
│   ├── services/
│   │   └── api.ts               # Repository layer for products, orders & promos
│   ├── context/
│   │   └── CartContext.tsx      # Shopping cart with BDT math & persistence
│   └── components/
│       ├── layout/
│       │   ├── AliNavbar.tsx    # AliExpress-style search bar & category nav
│       │   └── Footer.tsx       # Bangladesh delivery hubs & payment partners
│       ├── pages/
│       │   ├── HomePage.tsx     # Hero grid, SuperDeals countdown & Choice tabs
│       │   ├── CategoryPage.tsx # Facet sidebar, BDT price filters & sorting
│       │   ├── ProductDetailPage.tsx # Dedicated PDP with Related Products
│       │   ├── CartPage.tsx     # Full cart with select-all & BDT checkout
│       │   ├── CheckoutPage.tsx # Bangladesh address & bKash/COD payments
│       │   └── WishlistPage.tsx # Bookmarked items collection
│       └── cart/
│           └── CartDrawer.tsx   # Slide-over cart preview
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build

# 4. Type check and lint
npm run lint
```
