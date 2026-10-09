# Atelier Nord — Curated Architectural Objects & Goods

> **Phase 1: High-Fidelity Frontend & Modular Architecture**  
> Built with React 19, TypeScript, Tailwind CSS, Lucide Icons, and Motion. Designed from first principles to be 100% future-ready for **Next.js App Router**, Server Actions, and headless e-commerce backends (Shopify, Medusa, Stripe, Supabase).

---

## 🌟 Executive Overview

**Atelier Nord** is an artisanal digital storefront for architectural lighting, tactile objects, solid oak furniture, precision acoustics, and horology. Every interaction has been designed according to strict domain-native e-commerce principles:

- **Strict Top Bar Contract:** Three clean zones (single-element brand wordmark, single-line text category links, primary bag trigger with count).
- **Lead with Imagery:** Clean vector illustration engine delivering crisp architectural renderings with reactive finish/colorway switching.
- **Zero-Pill Metadata:** Clean inline typographic metadata with subtle separators (`·`), avoiding colored capsule spam.
- **Contiguous Purchase Module (PDP):** Stable, uninterrupted purchase experience with finish selection, spec tables, verified buyer reviews, and instant bag integration.
- **Slide-Over Bag & Frictionless Checkout:** Live calculation of free shipping thresholds, instant promo code simulation (`WELCOME10`, `ARCHITECT15`), and multi-step simulated checkout with order generation and receipt tracking.

---

## 🏗️ Future-Ready Next.js & Backend Migration Guide

This codebase is structured with clean boundaries following the **Repository Pattern** and **Modular Component Architecture**, making the transition to **Next.js** and full-stack backends turnkey:

### 1. Mapping to Next.js App Router

| Current Location | Next.js App Router Target | Function |
| :--- | :--- | :--- |
| `src/App.tsx` | `app/page.tsx` + `app/layout.tsx` | Main storefront landing and global root layout |
| `src/components/shop/ProductDetailModal.tsx` | `app/products/[slug]/page.tsx` | Standalone server-rendered Product Detail Page (PDP) |
| `src/services/api.ts` | `app/api/products/route.ts` & Server Actions | Can be replaced directly with database queries or external API calls |
| `src/types/index.ts` | `types/index.ts` / Prisma Schema | Domain models shared between client, server, and DB |
| `src/context/CartContext.tsx` | `providers/CartProvider.tsx` | Client-side shopping cart state with server cart synchronization |

### 2. Backend Integration Endpoints (Phase 2 Ready)

The `src/services/api.ts` file acts as the single source of truth for all asynchronous data flows. In Phase 2, connect each method to your backend:

```typescript
// Example: Converting to Next.js Server Action or REST route
export const api = {
  products: {
    async getAll(filters) {
      // In Next.js:
      // const res = await fetch(`/api/products?${new URLSearchParams(filters)}`);
      // return res.json();
    },
    async getById(id) {
      // In Next.js Server Component:
      // return await db.product.findUnique({ where: { id } });
    }
  },
  orders: {
    async create(payload) {
      // In Next.js with Stripe / Medusa:
      // const session = await stripe.checkout.sessions.create(...);
      // return { url: session.url };
    }
  }
};
```

---

## 📂 Modular Component Directory

```
├── index.html                   # Entry HTML with custom fonts & OpenGraph metadata
├── metadata.json                # Project identification & capability manifests
├── package.json                 # Dependencies & build scripts
├── README.md                    # Documentation & architecture guide
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite build & bundler setup
└── src/
    ├── App.tsx                  # Root orchestrator & modal coordinator
    ├── main.tsx                 # React 19 root mounting
    ├── index.css                # Tailwind CSS v4 layers & typography
    ├── types/
    │   └── index.ts             # Strong TypeScript domain models
    ├── data/
    │   └── products.ts          # Curated catalog dataset & specifications
    ├── services/
    │   └── api.ts               # Repository pattern service layer
    ├── context/
    │   └── CartContext.tsx      # Shopping bag state, discounts & local persistence
    └── components/
        ├── layout/
        │   ├── Navbar.tsx       # Top Bar Contract header
        │   └── Footer.tsx       # Studio footer & newsletter subscription
        ├── home/
        │   ├── Hero.tsx         # Campaign focal point & quantitative proof strip
        │   └── StorySection.tsx # Material ethics & workshop heritage
        ├── shop/
        │   ├── ProductCard.tsx          # Catalog card with hover lift & quick add
        │   ├── ProductGrid.tsx          # Segmented tabs, search, and sorting
        │   ├── ProductDetailModal.tsx   # Contiguous purchase module & PDP
        │   ├── QuickViewModal.tsx       # Instant modal preview
        │   ├── WishlistModal.tsx        # Saved items collection
        │   ├── SearchModal.tsx          # Full-text instant catalog search
        │   └── ProductIllustration.tsx  # Dynamic vector SVG illustrations
        ├── cart/
        │   └── CartDrawer.tsx   # Slide-over bag with free freight progress
        └── checkout/
            └── CheckoutModal.tsx # Multi-step shipping, payment, & receipt
```

---

## 🛒 Features & Interactive Capabilities

1. **Catalog & Filters:**
   - Filter by categories: *Lighting, Objects, Furniture, Tableware, Acoustics, Horology*.
   - Live search by name, subtitle, material, and origin.
   - Sort by *Featured, Price Low-to-High, Price High-to-Low, Highest Rated, Newest*.
   - "In Stock Only" toggle.

2. **Interactive Visual Objects:**
   - High-fidelity vector illustrations with real-time finish switching (Brushed Brass, Travertine, Obsidian, Sandstone, Titanium, Smoked Oak).

3. **Persistent Shopping Bag:**
   - Free shipping progress bar (Free insured global delivery at $250).
   - Reactive quantity steppers and line item deletion.
   - Promotional discount voucher simulator (`WELCOME10` for 10% off, `ARCHITECT15` for 15% off).
   - Saved in browser `localStorage`.

4. **Product Dossier (PDP):**
   - Architectural narrative, dimensional specs table, materials composition.
   - Verified collector reviews with ratings and locations.
   - Material plinth selector with dynamic surcharges.
   - Related piece recommendations.

5. **Multi-Step Checkout & Confirmation:**
   - Customer shipping information form with validation.
   - Multiple payment methods: Credit Card simulation and Cash on Delivery (COD).
   - Post-order receipt with generated order reference (e.g. `NOR-2026-XXXX`), courier tracking number, and estimated arrival date.

6. **Wishlist & Instant Search:**
   - One-click heart toggling on cards and product modal.
   - Dedicated saved items tray with quick "Move to Bag" actions.
   - Modal search overlay accessible with `Ctrl/Cmd+K` or search icon.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build

# 4. Type check and lint
npm run lint
```

---

## 📜 License & Provenance
Crafted for **Atelier Nord**. Apache-2.0 License.
