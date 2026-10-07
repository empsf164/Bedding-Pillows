# NESTORA — Luxury Bedding & Sleep Comfort Discovery Platform

> **“Better Sleep Starts With Better Comfort.”**

NESTORA is a luxury, production-quality responsive bedding, linen, and pillow discovery ecommerce platform. Built for tactile elegance, editorial typography, and seamless sleep ergonomics, NESTORA allows users to **Discover → Explore → Compare → Customize → Save → Shop**.

---

## 🌟 Key Highlights & Architecture

- **Streamlined Navigation & Visual Direction**:
  - Direct menu links: **Home**, **About**, **Shop**, **Collections**, **Sleep Guide**, **Contact**.
  - Right action items: **Wishlist**, **Bedding Bag (Cart Drawer)**, and **Sign Up** CTA.
  - Relatable luxury SVG favicon in all `<head>` sections.
  - 4-column footer consistent across all pages with social channels (Instagram, Pinterest, Facebook, Twitter/X, YouTube).
- **Curated Natural Palette**:
  - Light mode: Warm Ivory (`#FDFBF7`), Soft Linen (`#EDE6D8`), Sand (`#D8C8B0`), Taupe (`#8C7E72`), Warm Stone (`#A89F91`), Deep Charcoal (`#1C1A18`), and Muted Sage (`#5E6D5B`).
  - Dark mode: Deep Charcoal (`#121110`), Warm Black (`#0F0E0D`), Soft Ivory (`#FAF7F2`), Warm Taupe (`#A89B8D`), and Muted Sage (`#8DA08A`).
- **Interactive Pillow Finder Wizard**:
  - 4-step sleep posture, firmness, temperature, and fill quiz with intelligent matching algorithm and "Why it matches your preferences" breakdown.
- **Product Comparison Engine**:
  - Compare up to 4 items simultaneously with floating drawer and fully responsive side-by-side spec comparison table.
- **Modular Shopping Bag & Distraction-Free Checkout**:
  - Slide-in mini-cart drawer with free shipping progress bar ($150 threshold).
  - 4-step checkout flow (Contact, Shipping, Delivery, Payment) with payment field masks and instant order confirmation tracking (Confirmed → Packed → Shipped → Delivered).
- **Persistent LocalStorage State**:
  - Shopping Bag items, Wishlist favorites, Comparison queue, and simulated Authentication.

---

## 📁 File Structure

```
nestora-bedding/
│
├── index.html                  # Editorial Homepage with Hero, Categories, Best Sellers, Comfort Personas, Pillow Quiz preview, Material Explorer, and Reviews
├── shop.html                   # Primary Product Discovery & Catalog with Sidebar Filters, Sorting, and Search
├── category.html               # Dynamic Category Layout (Bed Sheets, Pillows, Duvet Covers, Comforters, Quilts, Blankets)
├── product-details.html        # Product Detail Page with Multi-Angle Gallery, Swatches, Size Selector, Tabs, Features, and Related Items
├── compare.html                # Product Comparison Matrix (Up to 4 Items)
├── pillow-finder.html          # Interactive 4-Step Pillow Finder Quiz & Matching Engine
├── collections.html            # Curated Collections (The Quiet Luxury, Hotel Comfort, Cooling, Sustainable)
├── cart.html                   # Full Shopping Bag with Item Rows, Steppers, Promo Codes, and Subtotal Breakdown
├── checkout.html               # 4-Step Distraction-Free Checkout (Contact, Shipping, Delivery, Payment Simulation)
├── order-confirmation.html     # Order Confirmation & Visual Shipment Tracking Timeline
├── account.html                # Lightweight Customer Account (Profile, Recent Orders, Saved Items, Addresses, Preferences)
├── orders.html                 # My Orders History, Shipment Tracking, and Reordering
├── about.html                  # Brand Story, Craftsmanship Origins, Material Science, and Sustainability
├── contact.html                # Contact Form, Concierge Channels, and FAQs
├── login.html                  # Customer Sign In
├── signup.html                 # Customer Account Creation
├── forgot-password.html        # Password Recovery Flow
├── 404.html                    # 404 Error Page
├── coming-soon.html            # Coming Soon Seasonal Capsule Preview
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Design Tokens, CSS Variables, Typography, Color Palettes, Base Resets
│   │   ├── components.css      # Header, Cards, Drawers, Modals, Badges, Toasts, Footer
│   │   └── responsive.css      # Responsive Breakpoints (320px to 2560px+)
│   │
│   └── js/
│       ├── products.js         # Comprehensive Bedding & Pillow Catalog Data Store
│       ├── theme.js            # Light / Dark Mode System
│       ├── auth.js             # Simulated Authentication & User Profile State
│       ├── filters.js          # Shop & Category Filtering and Sorting Engine
│       ├── compare.js          # Product Comparison State & Matrix Renderer
│       ├── wishlist.js         # Wishlist & Saved Items Management
│       ├── cart.js             # Shopping Bag Drawer & Full Page Calculations
│       ├── checkout.js         # Multi-step Checkout Validation & Order Placement
│       ├── payments.js         # Card Masking & Payment Method Handlers
│       ├── orders.js           # Order History & Tracking Simulation
│       ├── pillow-finder.js    # 4-Step Interactive Sleep Ergonomics Quiz
│       ├── quick-view.js       # Product Card Quick View Modal
│       ├── notifications.js    # Dynamic Toast Notification System
│       └── main.js             # Global Layout Coordinator & Dynamic Page Renderers
│
└── README.md
```

---

## 🛠️ Technology Stack

- **HTML5** (Semantic structure, SEO meta tags, OpenGraph data)
- **CSS3 / Vanilla CSS** (CSS custom properties design system, smooth transitions)
- **Bootstrap 5.3.3** (Grid architecture & utility helpers)
- **Bootstrap Icons 1.11.3**
- **Vanilla JavaScript (ES6 Modules)**
- **Google Fonts** (DM Serif Display, Cormorant Garamond, Plus Jakarta Sans, Inter)

---

© 2026 NESTORA Home LLC. All rights reserved.
