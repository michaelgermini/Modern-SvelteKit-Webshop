<script lang="ts">
  import type { Product } from '$lib/types';
  import { add } from '$lib/stores';
  import { formatPrice } from '$lib/utils';
  import { browser } from '$app/environment';
  import FavoriteButton from './FavoriteButton.svelte';

  export let product: Product;

  function addToCart() {
    add({ product, qty: 1 });
  }

  function handleFavoriteToggle(event: CustomEvent) {
    // Peut être utilisé pour afficher une notification
    const { product: favProduct, isFavorite } = event.detail;
    console.log(`${isFavorite ? 'Added' : 'Removed'} ${favProduct.name} ${isFavorite ? 'to' : 'from'} favorites`);
  }

  function goToProduct() {
    // Navigation native pour éviter l'erreur "hash, app is undefined"
    if (browser) {
      window.location.href = `/product/${product.slug}`;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Gestionnaire clavier pour accessibilité
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToProduct();
    }
  }
</script>

<!-- Product Card with improved accessibility -->
<article
  class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 relative group cursor-pointer focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
  aria-labelledby="product-{product.id}-title"
  aria-describedby="product-{product.id}-description"
>
  <div 
    class="aspect-square bg-gray-100 p-4 relative cursor-pointer"
    role="button"
    tabindex="0"
    on:click={goToProduct}
    on:keydown={handleKeyDown}
    aria-label="View details for {product.name}"
  >
    <img
      src={product.image}
      alt="{product.name} - {product.description}"
      class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />

    <!-- Favorite Button -->
    <FavoriteButton
      {product}
      on:toggle={handleFavoriteToggle}
    />

    <!-- Quick View Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg class="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
      </div>
    </div>
  </div>

  <div class="p-4 space-y-3">
    <h3 id="product-{product.id}-title" class="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
      {product.name}
    </h3>

    <p id="product-{product.id}-description" class="text-sm text-gray-600 line-clamp-2">
      {product.description}
    </p>

    <!-- Product Tags -->
    {#if product.tags && product.tags.length > 0}
      <div class="flex flex-wrap gap-1">
        {#each product.tags.slice(0, 2) as tag}
          <span class="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
            {tag}
          </span>
        {/each}
        {#if product.tags.length > 2}
          <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{product.tags.length - 2} more
          </span>
        {/if}
      </div>
    {/if}

    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-xl font-bold text-primary-600">
          {formatPrice(product.price, product.currency)}
        </span>
        {#if product.stock !== undefined}
          <p class="text-xs {product.stock > 0 ? 'text-green-600' : 'text-red-600'}">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        {/if}
      </div>

      <div class="flex gap-2">
        <!-- Quick Add to Cart -->
        <button
          on:click|stopPropagation={addToCart}
          disabled={product.stock === 0}
          class="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Add {product.name} to cart"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m5-5V8m0 0V5a2 2 0 012-2h3a2 2 0 012 2v3"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</article>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
