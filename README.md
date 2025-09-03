# 🛒 Modern SvelteKit Webshop

A **modern e-commerce webshop** built with **SvelteKit**, featuring high performance, accessibility, SEO optimization, and ready for **Stripe** integration. This comprehensive README covers installation, architecture, best practices (testing, CI/CD, security, performance), and deployment.

---

## ✨ Key Features

- ⚡ **SvelteKit + Vite**: Ultra-fast rendering, SSR/SSG, PWA ready
- 🧩 **Modular Architecture**: Clean separation of layers (UI, stores, services, API)
- 🛍️ **Product Catalog & Cart**: Product listing, details, persistent cart
- 💳 **Stripe Payment Integration**: Server endpoints for secure payment processing
- 🌍 **Internationalization Ready**: Structure prepared for i18n (EN/FR)
- ♿ **Accessibility (a11y)**: Components with ARIA roles, focus management
- 🔎 **SEO Optimized**: Page-specific metadata, OG/Twitter cards, sitemap, robots.txt
- 🧪 **Code Quality**: Tests (Vitest), linting (ESLint), formatting (Prettier), type safety (TypeScript)
- 🚀 **Deployment Ready**: Vercel/Netlify/Node.js adapter support
- 🛡️ **Security**: Best practices (CSP, schema validation, environment secrets)

---

## 🧰 Tech Stack

- **SvelteKit** (routing, SSR/SSG, server endpoints)
- **TypeScript** (optional but recommended)
- **Tailwind CSS** (fast design system)
- **Zod** (schema validation)
- **Stripe** (payment processing, server-side)
- **Vitest** (unit testing)
- **ESLint + Prettier** (code quality)
- **Playwright** (e2e testing if desired)

---

## 📦 Project Structure

```
webshop/
├─ src/
│  ├─ lib/
│  │  ├─ components/        # UI components (ProductCard, Header, Footer)
│  │  ├─ stores/            # Svelte stores (cart, theme, auth)
│  │  ├─ services/          # Data access (products, API)
│  │  ├─ utils/             # Helper functions (formatPrice)
│  │  ├─ types/             # TypeScript types (Product, CartItem)
│  │  └─ hooks/             # Custom Svelte hooks
│  ├─ routes/
│  │  ├─ +layout.svelte     # Main layout (header/footer)
│  │  ├─ +layout.ts         # Global data/SEO
│  │  ├─ +page.svelte       # Homepage (product listing)
│  │  ├─ cart/+page.svelte  # Shopping cart
│  │  ├─ products/+page.svelte # Products catalog
│  │  ├─ product/[slug]/+page.svelte # Product details
│  │  └─ api/
│  │     ├─ checkout/+server.ts     # POST Stripe checkout session
│  │     └─ webhook/+server.ts      # POST Stripe webhook
│  ├─ app.d.ts
│  └─ app.css
├─ static/                  # Static assets (images, favicon, robots.txt)
├─ env.example              # Environment variables template
├─ svelte.config.js
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ package.json
└─ README.md
```

---

## 🚀 Quick Start

```bash
# 1) Clone the repository
git clone <your-repo-url>
cd webshop

# 2) Install dependencies
npm install

# 3) Configure environment
cp env.example .env
# Edit .env with your Stripe keys

# 4) Start development server
npm run dev
```

### Stripe Configuration

1. Create a [Stripe](https://stripe.com) account
2. Get your API keys (public and secret)
3. Configure the `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_STRIPE_PK=pk_test_...
BASE_URL=http://localhost:5173
```

---

## 🧱 Data Models (Types)

### Product
```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;          // in cents
  currency: "EUR" | "CHF" | "USD";
  image: string;          // static path or URL
  tags?: string[];
  stock?: number;
  active: boolean;
};
```

### Cart
```ts
export type CartItem = {
  product: Product;
  qty: number
};

export type Cart = CartItem[];
```

---

## 🧠 Stores (Cart Management)

The cart store handles:
- **Adding** products to cart
- **Removing** products from cart
- **Updating** product quantities
- **Persistence** in localStorage
- **Automatic reactivity**

```ts
import { cart, add, remove, clear, updateQuantity } from '$lib/stores';

// Add a product
add({ product, qty: 1 });

// Update quantity
updateQuantity(productId, 3);

// Clear cart
clear();
```

---

## 🔌 Products Service

Service with mock data (52 products included):
- **Svelte T-shirt** (€25.00)
- **Code Coffee Mug** (€12.00)
- **Tech Sticker Pack** (€8.00)
- **TypeScript Hoodie** (€55.00)
- **RGB Mechanical Keyboard** (€1,200.00)
- **Ergonomic Wireless Mouse** (€450.00)
- **Wireless Charging Pad** (€250.00)
- **Developer Headphones** (€1,800.00)
- **VR Development Kit** (€25,000.00)
- **Smart Robot Vacuum** (€32,000.00)
- **And 42 more products...**

Available functions:
- `list()`: Lists all active products
- `bySlug(slug)`: Gets product by slug
- `byId(id)`: Gets product by ID
- `search(query)`: Searches products
- `searchAdvanced(query, filters)`: Advanced search with filters

---

## 🧭 Pages

### Homepage (`/`)
- Hero section with call-to-action
- Product grid display
- "Why choose us" section

### Product Details (`/product/[slug]`)
- Product image and details
- Stock management
- Add to cart buttons
- Navigation breadcrumbs

### Products Catalog (`/products`)
- Advanced search and filtering
- Product grid with infinite scroll option
- Category-based browsing
- Sort by price, name, stock

### Shopping Cart (`/cart`)
- Added products list
- Quantity management
- Total calculation
- Stripe checkout integration

---

## 💳 Stripe Integration

### Checkout Endpoint (`/api/checkout`)
- Data validation with Zod
- Stripe session creation
- Error handling
- Success/cancel URLs

### Webhook (`/api/webhook`)
- Stripe event processing
- Payment success/failure handling
- Debug logging
- Future extension structure

---

## 🔐 Security Best Practices

- **Environment secrets**: Never commit .env files, use env.example template
- **Strict validation** (Zod) for all API inputs
- **CSP** (Content Security Policy) via headers
- **Rate limiting** on sensitive endpoints
- **Stripe webhook**: Validate signature in production
- **Regular updates** of dependencies

---

## 📈 Performance

- **Optimized images** with lazy loading
- **Automatic code splitting** with SvelteKit
- **SSR/SSG** for fast rendering
- **Tailwind CSS** for optimized CSS
- **TypeScript** for type safety

---

## 🔎 SEO & Metadata

- **Page-specific metadata** with `<svelte:head>`
- **Semantic URLs** (`/product/[slug]`)
- **Navigation breadcrumbs**
- **robots.txt** configured
- **Sitemap-ready structure**

---

## 🧪 Testing & Quality

```bash
# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Check types
npm run check
```

### Included Tests
- Unit tests for `formatPrice`
- Vitest configuration with jsdom
- Utility function tests

---

## 🔁 CI/CD (GitHub Actions)

Example CI/CD workflow:

```yaml
name: ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test -- --run
```

---

## ☁️ Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Node.js
```bash
npm run build
npm run preview
```

---

## 🗺️ Roadmap & Future Features

- [ ] **Authentication** (email/password, OAuth)
- [ ] **Admin Panel** (CRUD products, stock, orders)
- [ ] **Advanced Search & Filters** (fuse.js, algolia)
- [ ] **Customer Reviews & Ratings**
- [ ] **Order Emails** (resend, nodemailer)
- [ ] **Coupons and Discounts**
- [ ] **PDF Invoice Generation**
- [ ] **Installment Payments**
- [ ] **Returns Management**
- [ ] **Analytics and Metrics**
- [ ] **Multi-language Support**
- [ ] **Wishlist Feature**
- [ ] **Product Comparisons**

---

## 🚀 Development

### Available Scripts
```bash
npm run dev          # Local development
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # TypeScript type checking
npm run lint         # ESLint linting
npm run format       # Prettier formatting
npm run test         # Vitest testing
```

### Environment Variables
```env
STRIPE_SECRET_KEY=sk_test_...     # Stripe secret key
PUBLIC_STRIPE_PK=pk_test_...      # Stripe public key
BASE_URL=http://localhost:5173    # Base URL
```

---

## 📄 License

MIT — Use, modify, and deploy freely. Keep license attribution if redistributing.

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/webshop/issues)
- **Documentation**: [SvelteKit Docs](https://kit.svelte.dev/)
- **Stripe**: [Stripe Docs](https://stripe.com/docs)

---

## 🎯 Features Overview

### 🛍️ E-commerce Features
- **52 Products** with detailed information
- **Advanced Search** with multiple filters
- **Shopping Cart** with persistent storage
- **Product Categories** (Electronics, Clothing, Gaming, Eco, etc.)
- **Responsive Design** for all devices

### 🎨 UI/UX Features
- **Dark/Light Mode** with automatic system detection
- **Accessibility** (WCAG compliant)
- **Keyboard Navigation** and shortcuts
- **Loading States** and skeleton screens
- **Toast Notifications** for user feedback

### 🔧 Technical Features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Svelte Stores** for state management
- **Stripe Integration** for payments
- **PWA Ready** with service worker
- **SEO Optimized** with meta tags

---

**🎉 Your SvelteKit webshop is ready!**

Start with `npm run dev` and start selling online! 🚀
