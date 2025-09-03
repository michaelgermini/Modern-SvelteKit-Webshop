<script lang="ts">
  import { favorites, favoritesCount } from '$lib/stores';
  import { formatPrice } from '$lib/utils';
  import { Toast } from '$lib/components';
  import ProductCard from '$lib/components/ProductCard.svelte';

  let favoritesList = [];
  let isLoading = true;
  let showToast = false;
  let toastMessage = '';
  let toastType = 'info';

  // Souscrire aux changements des favoris
  favorites.subscribe((items) => {
    favoritesList = items;
    isLoading = false;
  });

  function handleRemoveFromFavorites(productId: string) {
    favorites.remove(productId);
    const product = favoritesList.find(fav => fav.id === productId);
    if (product) {
      showNotification(`Removed ${product.name} from favorites`, 'info');
    }
  }

  function handleAddToCart(product) {
    // Cette fonction sera appelée depuis ProductCard
    showNotification(`${product.name} added to cart!`, 'success');
  }

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    toastMessage = message;
    toastType = type;
  }

  function clearAllFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
      favorites.clear();
      showNotification('All favorites cleared!', 'info');
    }
  }
</script>

<svelte:head>
  <title>My Favorites - SvelteKit Webshop</title>
  <meta name="description" content="View and manage your favorite products saved for later" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-12 h-12 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <h1 class="text-4xl md:text-6xl font-bold">
          My Favorites
        </h1>
      </div>
      <p class="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
        Your saved products, ready when you are. Never lose track of items you love!
      </p>
    </div>
  </div>

  <!-- Content -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {#if isLoading}
      <!-- Loading State -->
      <div class="flex items-center justify-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <span class="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading favorites...</span>
      </div>
    {:else if favoritesList.length === 0}
      <!-- Empty State -->
      <div class="text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          No favorites yet
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Start exploring our products and save your favorites for later!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </a>
          <a
            href="/"
            class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    {:else}
      <!-- Favorites List -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Favorite Products
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              {favoritesList.length} item{favoritesList.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          <button
            on:click={clearAllFavorites}
            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Clear All
          </button>
        </div>

        <!-- Favorites Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {#each favoritesList as favorite (favorite.id)}
            <div class="relative">
              <!-- Product Card -->
              <ProductCard
                product={{
                  id: favorite.id,
                  slug: favorite.slug,
                  name: favorite.name,
                  description: '', // Les favoris n'ont pas de description détaillée
                  price: favorite.price,
                  currency: 'USD',
                  image: favorite.image,
                  tags: [],
                  stock: 0,
                  active: true
                }}
                on:addToCart={handleAddToCart}
              />

              <!-- Remove from favorites button -->
              <button
                on:click={() => handleRemoveFromFavorites(favorite.id)}
                class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Remove from favorites"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <!-- Date added -->
              <div class="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Added {favorite.addedAt.toLocaleDateString()}
              </div>
            </div>
          {/each}
        </div>

        <!-- Action Buttons -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What would you like to do next?
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/products"
              class="flex items-center justify-center px-4 py-3 border border-primary-300 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 018 0z"></path>
              </svg>
              Continue Shopping
            </a>

            <a
              href="/cart"
              class="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
              </svg>
              View Cart
            </a>

            <button
              on:click={clearAllFavorites}
              class="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Clear Favorites
            </button>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <!-- Toast Notifications -->
  <Toast
    {showToast}
    {toastMessage}
    {toastType}
    on:close={() => showToast = false}
  />
</div>
