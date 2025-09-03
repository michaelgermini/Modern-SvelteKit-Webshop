# 🛒 SvelteKit Webshop — Professional README

A **modern webshop** built with **SvelteKit**, performant, accessible, SEO-friendly, and ready for **Stripe** integration. This README guides installation, architecture, best practices (tests, CI/CD, security, performance) and deployment.

---

## ✨ Key Features

- ⚡ **SvelteKit + Vite**: Ultra-fast rendering, SSR/SSG, PWA support.
- 🧩 **Modular Architecture**: Clear separation of layers (UI, stores, services, API).
- 🛍️ **Catalog & Cart**: Product listing, details, persistent cart.
- 💳 **Payment (Stripe-ready)**: Server endpoints for secure payment processing.
- 🌍 **i18n**: Structure ready for internationalization (FR/EN).
- ♿ **Accessibility (a11y)**: Components with ARIA roles, focus management.
- 🔎 **SEO**: Page metadata, OG/Twitter, sitemap, robots.
- 🧪 **Quality**: Tests (Vitest), lint (ESLint), format (Prettier), type safety (TypeScript).
- 🚀 **Deployment**: Vercel/Netlify/Node adapters.
- 🛡️ **Security**: Best practices (CSP, schema validation, environment secrets).

---

## 🧰 Tech Stack

- **SvelteKit** (routing, SSR/SSG, server endpoints)
- **TypeScript** (optional but recommended)
- **Tailwind CSS** (fast design system)
- **Zod** (schema validation)
- **Stripe** (server-side payments)
- **Vitest** (unit tests)
- **ESLint + Prettier** (code quality)
- **Playwright** (e2e testing if needed)

---

## 📦 Project Structure

```
webshop/
├─ src/
│  ├─ lib/
│  │  ├─ components/        # UI (Card, Button, ProductCard, Header, Footer, Toast)
│  │  ├─ stores/            # Svelte stores (cart, user, ui)
│  │  ├─ services/          # Data access (products, orders, payments)
│  │  ├─ utils/             # Helpers (formatPrice, fetcher, logger)
│  │  ├─ types/             # TS types (Product, CartItem, Order)
│  │  └─ config/            # Constants, SEO, i18n
│  ├─ routes/
│  │  ├─ +layout.svelte     # Main layout (header/footer)
│  │  ├─ +layout.ts         # Global data/SEO
│  │  ├─ +page.svelte       # Homepage (listing)
│  │  ├─ cart/+page.svelte  # Cart page
│  │  ├─ product/[id]/+page.svelte  # Product details
│  │  └─ api/
│  │     ├─ checkout/+server.ts     # POST Stripe checkout session
│  │     └─ webhook/+server.ts      # POST Stripe webhook
│  ├─ app.d.ts
│  └─ app.css
├─ static/                  # Images, favicon, robots.txt
├─ .env.example
├─ svelte.config.js
├─ vite.config.ts
├─ package.json
└─ README.md
```

---

## 🚀 Quick Start

```bash
# 1) Create project
npm create svelte@latest webshop
cd webshop

# 2) Install dependencies
npm i

# 3) (Optional) Add Tailwind
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4) Start development server
npm run dev
```

### Tailwind Configuration (minimal example)
`tailwind.config.cjs`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,ts,js}"],
  theme: { extend: {} },
  plugins: []
};
```
`src/app.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧱 Data Models (Types)

`src/lib/types/product.ts`
```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;          // in cents
  currency: "EUR" | "CHF" | "USD";
  image: string;          // static/... path or URL
  tags?: string[];
  stock?: number;
  active: boolean;
};
```

`src/lib/types/cart.ts`
```ts
import type { Product } from "./product";
export type CartItem = { product: Product; qty: number };
export type Cart = CartItem[];
```

---

## 🧠 Stores (Cart)

`src/lib/stores/cart.ts`
```ts
import { writable } from "svelte/store";
import type { Cart, CartItem } from "$lib/types/cart";
import { browser } from "$app/environment";

const KEY = "webshop-cart";

const initial: Cart = browser
  ? JSON.parse(localStorage.getItem(KEY) ?? "[]")
  : [];

export const cart = writable<Cart>(initial);

cart.subscribe((val) => {
  if (browser) localStorage.setItem(KEY, JSON.stringify(val));
});

export function add(item: CartItem) {
  cart.update((c) => {
    const idx = c.findIndex((i) => i.product.id === item.product.id);
    if (idx > -1) {
      c[idx].qty += item.qty;
      return [...c];
    }
    return [...c, item];
  });
}

export function remove(productId: string) {
  cart.update((c) => c.filter((i) => i.product.id !== productId));
}

export function clear() {
  cart.set([]);
}
```

---

## 🔌 Product Service (mock or API)

`src/lib/services/products.ts`
```ts
import type { Product } from "$lib/types/product";

// Demo: client-side (mock). In prod, prefer real API / DB.
export const products: Product[] = [
  {
    id: "p1",
    slug: "tshirt-svelte",
    name: "Svelte T-shirt",
    description: "100% organic cotton, Svelte print",
    price: 2500,
    currency: "EUR",
    image: "/img/tshirt.png",
    tags: ["tshirt", "dev"],
    stock: 42,
    active: true
  },
  {
    id: "p2",
    slug: "mug-code",
    name: "Code Mug",
    description: "350ml ceramic mug",
    price: 1200,
    currency: "EUR",
    image: "/img/mug.png",
    tags: ["mug"],
    stock: 100,
    active: true
  }
];

export function list(): Product[] {
  return products.filter((p) => p.active);
}

export function bySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
```

---

## 🧭 Pages (Extracts)

`src/routes/+page.svelte` — **Homepage (listing)**
```svelte
<script lang="ts">
  import { list } from "$lib/services/products";
  import { add } from "$lib/stores/cart";
  import type { Product } from "$lib/types/product";

  const items: Product[] = list();
  function addOne(p: Product) { add({ product: p, qty: 1 }); }
</script>

<section class="container mx-auto p-6 space-y-6">
  <h1 class="text-3xl font-bold">Webshop</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each items as p}
      <article class="rounded-2xl shadow p-4 border">
        <img src={p.image} alt={p.name} class="mx-auto h-40 object-contain" />
        <h2 class="text-xl font-semibold mt-2">{p.name}</h2>
        <p class="opacity-80 text-sm mt-1">{p.description}</p>
        <div class="flex items-center justify-between mt-4">
          <span class="font-bold">{(p.price/100).toFixed(2)} {p.currency}</span>
          <button class="px-3 py-2 rounded-xl border hover:shadow"
            on:click={() => addOne(p)}>Add to Cart</button>
        </div>
      </article>
    {/each}
  </div>
</section>
```

`src/routes/product/[slug]/+page.svelte` — **Product Details**
```svelte
<script lang="ts">
  import { bySlug } from "$lib/services/products";
  import { page } from "$app/stores";
  import { add } from "$lib/stores/cart";

  $: slug = $page.params.slug;
  $: product = bySlug(slug);
</script>

{#if !product}
  <p>Product not found.</p>
{:else}
  <section class="container mx-auto p-6 grid md:grid-cols-2 gap-8">
    <img src={product.image} alt={product.name} class="w-full object-contain" />
    <div>
      <h1 class="text-3xl font-bold">{product.name}</h1>
      <p class="mt-2 opacity-80">{product.description}</p>
      <p class="mt-4 text-2xl font-bold">{(product.price/100).toFixed(2)} {product.currency}</p>
      <button class="mt-6 px-4 py-3 rounded-xl border hover:shadow"
        on:click={() => add({ product, qty: 1 })}>Add to Cart</button>
    </div>
  </section>
{/if}
```

`src/routes/cart/+page.svelte` — **Cart**
```svelte
<script lang="ts">
  import { cart, clear, remove } from "$lib/stores/cart";
  $: total = $cart.reduce((t, i) => t + i.product.price * i.qty, 0);
</script>

<section class="container mx-auto p-6">
  <h1 class="text-3xl font-bold mb-4">Cart</h1>

  {#if $cart.length === 0}
    <p>Your cart is empty.</p>
  {:else}
    <ul class="space-y-3">
      {#each $cart as { product, qty }}
        <li class="flex items-center justify-between border rounded-xl p-3">
          <div class="flex items-center gap-3">
            <img src={product.image} alt={product.name} class="h-12 w-12 object-contain" />
            <div>
              <p class="font-medium">{product.name}</p>
              <p class="text-sm opacity-70">{qty} × {(product.price/100).toFixed(2)} {product.currency}</p>
            </div>
          </div>
          <button class="text-sm underline" on:click={() => remove(product.id)}>Remove</button>
        </li>
      {/each}
    </ul>

    <div class="mt-6 flex items-center justify-between">
      <strong>Total: {(total/100).toFixed(2)} EUR</strong>
      <form method="POST" action="/api/checkout">
        <button class="px-4 py-3 rounded-xl border hover:shadow">Pay Now</button>
      </form>
    </div>

    <button class="mt-3 text-sm underline" on:click={clear}>Empty Cart</button>
  {/if}
</section>
```

---

## 💳 Stripe — Server Endpoints (Examples)

> ⚠️ Install Stripe: `npm i stripe` and set `STRIPE_SECRET_KEY` in `.env`

`.env.example`
```
STRIPE_SECRET_KEY=sk_live_XXX_or_test
PUBLIC_STRIPE_PK=pk_live_XXX_or_test
BASE_URL=http://localhost:5173
```

`src/routes/api/checkout/+server.ts`
```ts
import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20"
});

const Item = z.object({
  name: z.string(),
  amount: z.number().int().positive(),
  currency: z.enum(["EUR", "USD", "CHF"]),
  quantity: z.number().int().positive()
});
const Body = z.object({ items: z.array(Item) });

export const POST: RequestHandler = async ({ request, url }) => {
  const json = await request.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: parsed.data.items.map((i) => ({
      price_data: {
        currency: i.currency.toLowerCase(),
        product_data: { name: i.name },
        unit_amount: i.amount
      },
      quantity: i.quantity
    })),
    success_url: `${url.origin}/?success=true`,
    cancel_url: `${url.origin}/cart?canceled=true`
  });

  return new Response(JSON.stringify({ id: session.id, url: session.url }), { status: 200 });
};
```

`src/routes/api/webhook/+server.ts`
```ts
import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20"
});

export const POST: RequestHandler = async ({ request }) => {
  // ⚠️ In prod: validate signature (Stripe-Signature header)
  const event = await request.json();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // TODO: mark order as paid, send email, etc.
  }
  return new Response("ok");
};
```

---

## 🔐 Security — Best Practices

- **Environment Secrets**: Never commit. Use `.env.example` and environment variables.
- **Strict Validation** (Zod) for all API inputs.
- **CSP** (Content Security Policy) via headers (e.g., `helmet` behind proxy) or adapter.
- **Rate Limiting** on sensitive endpoints.
- **Stripe Webhooks**: Validate signature. Store events idempotently.
- **Regular Updates** of dependencies (npm audit, dependabot).

---

## 📈 Performance

- **Optimized Images** (modern formats, fixed dimensions).
- **Code Splitting** + **Lazy Loading** for heavy pages.
- **Cache-Control** on `static/`.
- **SSR Adapter** based on hosting (Vercel = edge friendly).
- **Metrics**: Lighthouse, Web Vitals (CLS/LCP/FID), Sentry/LogRocket for UX.

---

## 🔎 SEO & Metadata

- `+layout.ts`: Define **SEO primitives** (title, description, og:image).
- **Sitemap** and **robots.txt** in `static/`.
- **Semantic URLs** (`/product/[slug]`), **canonical** tags.
- **Breadcrumbs** and **schema.org** (JSON-LD) if needed.

Minimal example `+layout.ts`:
```ts
export const prerender = true;
export const ssr = true;

export const load = async () => {
  return {
    meta: {
      title: "Svelte Webshop",
      description: "Fast online store with SvelteKit",
      image: "/og.png"
    }
  };
};
```

---

## 🌍 i18n

- Store dictionaries in `src/lib/config/i18n`.
- Expose `t(key)` function and `locale` store.
- Plan URLs `/fr/...` `/en/...` for multi-language SEO.

---

## 🧪 Testing & Quality

```bash
# Install
npm i -D vitest @testing-library/svelte eslint prettier

# Run
npm run test
npm run lint
npm run format
```

Example test (Vitest) `src/lib/utils/formatPrice.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats in EUR", () => {
    expect(formatPrice(1999, "EUR")).toBe("19.99 €");
  });
});
```

---

## 🔁 CI/CD (GitHub Actions example)

`.github/workflows/ci.yml`
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

- **Vercel**: `@sveltejs/adapter-vercel`
- **Netlify**: `@sveltejs/adapter-netlify`
- **Node**: `@sveltejs/adapter-node` (PM2/Docker)
- **Static/SSG**: `adapter-static` if no server API

```bash
# Example production build
npm run build
npm run preview
```

---

## 🗺️ Roadmap (Suggestions)

- Authentication (email/password, OAuth)
- Admin panel (CRUD products, stock, orders)
- Search & filters (fuse.js, algolia)
- Customer reviews & ratings
- Order emails (resend, nodemailer)
- Coupons and discounts
- PDF invoice generation

---

## 📄 License

MIT — Use, modify and deploy freely. Keep license notice if redistributing.
