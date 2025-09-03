<script lang="ts">
  import {
    list,
    getNewProducts,
    getPopularProducts,
    getExclusiveProducts,
    getEcoProducts,
    getGamingProducts,
    getProductsStats,
    getAllSlugs
  } from '$lib/services/products';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import type { Product } from '$lib/types';
  import { goto } from '$app/navigation';

  // Get products by categories
  const allProducts: Product[] = list();
  const newProducts = getNewProducts(8);
  const popularProducts = getPopularProducts(8);
  const exclusiveProducts = getExclusiveProducts(6);
  const ecoProducts = getEcoProducts(6);
  const gamingProducts = getGamingProducts(6);

  // Statistiques du catalogue
  const stats = getProductsStats();

  // Debug: vérifier les slugs disponibles (seulement en développement)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Available slugs:', getAllSlugs());
    console.log('Testing product access for first 3 products...');

    // Test the first 3 products
    const testSlugs = getAllSlugs().slice(0, 3);
    testSlugs.forEach(testSlug => {
      console.log(`Testing /product/${testSlug}...`);
    });
  }

  // Fallback list with some known slugs (covering more products)
  const fallbackSlugs = [
    'tshirt-svelte',
    'hoodie-dev',
    'tshirt-react',
    'tshirt-vue',
    'hoodie-typescript',
    'cap-dev',
    'socks-coding',
    'mug-code',
    'sticker-svelte',
    'notebook-dev',
    'ergonomic-chair',
    'mechanical-keyboard',
    'wireless-mouse',
    'usb-hub',
    'smartphone-stand',
    'coffee-mug'
  ];

  // Reactive variable for total product count
  let totalProductsCount = 0;

  // Initialize product counter
  $: totalProductsCount = getAllSlugs().length;

  // Navigation functions
  function goToProduct(product: Product) {
    goto(`/product/${product.slug}`);
  }

  function goToProductsPage(category?: string) {
    const url = category ? `/products?category=${category}` : '/products';
    goto(url);
  }

  // Keyboard handler for product cards
  function handleProductKeyDown(event: KeyboardEvent, product: Product) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToProduct(product);
    }
  }
</script>

<svelte:head>
  <title>SvelteKit Webshop - Home</title>
  <meta name="description" content="Discover our selection of quality products" />
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      Welcome to our Webshop
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-primary-100">
      Discover our selection of {stats.totalProducts}+ quality products
      for developers and tech enthusiasts
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a
        href="#featured"
        class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        Explore Products
      </a>
      <div class="text-primary-100 text-sm">
        Free shipping • 30-day returns • Secure payments
      </div>
    </div>
  </div>
</section>

<!-- Featured Products Section -->
<section id="featured" class="py-16 bg-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Featured Products
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover our handpicked selection of premium products
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
      {#each allProducts.slice(0, 8) as product}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
</section>

<!-- New Arrivals -->
{#if newProducts.length > 0}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          ✨ New Arrivals
        </h2>
        <p class="text-gray-600">Latest additions to our collection</p>
      </div>
      <a
        href="/products?filter=new"
        class="text-primary-600 hover:text-primary-700 font-medium"
      >
        View all →
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label="New products grid">
      {#each newProducts.slice(0, 8) as product, index}
        <div
          class="group"
          role="gridcell"
          aria-label={`Product ${index + 1} of ${newProducts.slice(0, 8).length}: ${product.name}`}
        >
          <ProductCard {product} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <button
        on:click={() => goToProductsPage('new')}
        class="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-colors"
      >
        View All New Products
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</section>
{/if}

<!-- Popular Products -->
{#if popularProducts.length > 0}
<section class="py-16 bg-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          🔥 Popular Products
        </h2>
        <p class="text-gray-600">Most loved by our customers</p>
      </div>
      <a
        href="/products?filter=popular"
        class="text-primary-600 hover:text-primary-700 font-medium"
      >
        View all →
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label="Popular products grid">
      {#each popularProducts.slice(0, 8) as product, index}
        <div
          class="group"
          role="gridcell"
          aria-label={`Popular product ${index + 1} of ${popularProducts.slice(0, 8).length}: ${product.name}`}
        >
          <ProductCard {product} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <button
        on:click={() => goToProductsPage('popular')}
        class="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors"
      >
        View All Popular Products
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</section>
{/if}

<!-- Exclusive Products -->
{#if exclusiveProducts.length > 0}
<section class="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        💎 Exclusive Collection
      </h2>
      <p class="text-gray-600">Limited edition and premium products</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="grid" aria-label="Exclusive products grid">
      {#each exclusiveProducts.slice(0, 6) as product, index}
        <div
          class="group"
          role="gridcell"
          aria-label={`Exclusive product ${index + 1} of ${exclusiveProducts.slice(0, 6).length}: ${product.name}`}
        >
          <ProductCard {product} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <button
        on:click={() => goToProductsPage('exclusive')}
        class="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-colors"
      >
        View All Exclusive Products
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</section>
{/if}

<!-- Eco-Friendly Products -->
{#if ecoProducts.length > 0}
<section class="py-16 bg-green-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          🌱 Eco-Friendly
        </h2>
        <p class="text-gray-600">Sustainable products for conscious consumers</p>
      </div>
      <a
        href="/products?filter=eco"
        class="text-primary-600 hover:text-primary-700 font-medium"
      >
        View all →
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="grid" aria-label="Eco-friendly products grid">
      {#each ecoProducts.slice(0, 6) as product, index}
        <div
          class="group"
          role="gridcell"
          aria-label={`Eco-friendly product ${index + 1} of ${ecoProducts.slice(0, 6).length}: ${product.name}`}
        >
          <ProductCard {product} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <button
        on:click={() => goToProductsPage('eco')}
        class="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-colors"
      >
        View All Eco-Friendly Products
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</section>
{/if}

<!-- Gaming Products -->
{#if gamingProducts.length > 0}
<section class="py-16 bg-gray-900 text-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold mb-2">
          🎮 Gaming Gear
        </h2>
        <p class="text-gray-300">Premium gaming equipment and accessories</p>
      </div>
      <a
        href="/products?filter=gaming"
        class="text-primary-400 hover:text-primary-300 font-medium"
      >
        View all →
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="grid" aria-label="Gaming products grid">
      {#each gamingProducts.slice(0, 8) as product, index}
        <div
          class="group"
          role="gridcell"
          aria-label={`Gaming product ${index + 1} of ${gamingProducts.slice(0, 8).length}: ${product.name}`}
        >
          <ProductCard {product} />
        </div>
      {/each}
    </div>

    <div class="text-center mt-8">
      <button
        on:click={() => goToProductsPage('gaming')}
        class="inline-flex items-center px-6 py-3 border border-primary-400 text-primary-400 rounded-lg font-medium hover:bg-primary-400 hover:text-white transition-colors"
      >
        View All Gaming Products
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</section>
{/if}

<!-- Stats Section -->
<section class="py-16 bg-primary-600 text-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Our Catalog at a Glance
      </h2>
      <p class="text-xl text-primary-100">
        {stats.totalProducts} products across {Object.values(stats.categories).filter(count => count > 0).length} categories
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold mb-2">{stats.categories.clothing}</div>
        <div class="text-primary-100">Clothing Items</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold mb-2">{stats.categories.electronics}</div>
        <div class="text-primary-100">Electronics</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold mb-2">{stats.categories.accessories}</div>
        <div class="text-primary-100">Accessories</div>
      </div>
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold mb-2">{stats.categories.book}</div>
        <div class="text-primary-100">Books</div>
      </div>
    </div>

    <div class="text-center mt-12">
      <a
        href="/products"
        class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        Browse All Products
      </a>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Choose Us?
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Performance</h3>
        <p class="text-gray-600">Ultra-fast website built with SvelteKit and optimized for exceptional user experience</p>
      </div>

      <div class="text-center">
        <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Security</h3>
        <p class="text-gray-600">Secure payments with Stripe and personal data protection</p>
      </div>

      <div class="text-center">
        <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
        <p class="text-gray-600">Carefully selected products and responsive customer service</p>
      </div>
    </div>
  </div>
</section>


