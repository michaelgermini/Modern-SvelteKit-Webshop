<script lang="ts">
  import {
    list,
    search,
    getClothingProducts,
    getAccessoriesProducts,
    getElectronicsProducts,
    getBooksProducts,
    getNewProducts,
    getSeasonalProducts,
    getPromoProducts,
    getEcoProducts,
    getGamingProducts,
    getExclusiveProducts,
    getCollectiblesProducts,
    getProductsByPriceRange,
    sortByPrice,
    sortByName,
    sortByStock,
    searchAdvanced
  } from '$lib/services/products';
  import {
    SearchBar,
    ProductFilters,
    ProductSkeleton,
    Toast
  } from '$lib/components';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import SkeletonLoader from '$lib/components/SkeletonLoader.svelte';
  import Tooltip from '$lib/components/Tooltip.svelte';
  import KeyboardShortcutsGuide from '$lib/components/KeyboardShortcutsGuide.svelte';
  import { formatPrice } from '$lib/utils';
  import { handleError } from '$lib/utils/errorHandler';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { keyboardManager } from '$lib/stores/keyboard';

  // États de l'application
  let products = [];
  let filteredProducts = [];
  let paginatedProducts = [];
  let isLoading = true;

  // États de recherche et filtrage
  let searchQuery = '';
  let selectedCategory = 'All';
  let sortBy = 'name';
  let sortOrder = 'asc';
  let priceRange = { min: 0, max: 100000 };
  let inStockOnly = false;
  let showShortcutsGuide = false;

  // États simplifiés (tous les produits affichés directement)
  let displayedProducts = [];

  // États des notifications
  let showToast = false;
  let message = '';
  let type = 'info';

  // Charger les produits (affichage direct)
  async function loadProducts() {
    try {
      isLoading = true;
      products = await list();
      updateDisplayedProducts();
    } catch (error) {
      const appError = handleError(error);
      showNotification(appError.message, 'error');
    } finally {
      isLoading = false;
    }
  }

  // Mettre à jour les produits affichés (tous les produits filtrés)
  function updateDisplayedProducts() {
    displayedProducts = applyFiltersToProducts();
  }

  // Initialiser les filtres depuis l'URL
  onMount(() => {
    if ($page.url) {
      const urlParams = $page.url.searchParams;

    // Filtre depuis l'URL
    const filterParam = urlParams.get('filter');
    if (filterParam) {
      switch (filterParam) {
        case 'new':
          selectedCategory = 'New';
          break;
        case 'clothing':
          selectedCategory = 'Clothing';
          break;
        case 'accessories':
          selectedCategory = 'Accessories';
          break;
        case 'electronics':
          selectedCategory = 'Electronics';
          break;
        case 'books':
          selectedCategory = 'Books';
          break;
        case 'gaming':
          selectedCategory = 'Gaming';
          break;
        case 'eco':
          selectedCategory = 'Eco';
          break;
        case 'exclusive':
          selectedCategory = 'Exclusive';
          break;
        case 'promo':
          selectedCategory = 'Promo';
          break;
        case 'seasonal':
          selectedCategory = 'Seasonal';
          break;
        case 'collectibles':
          selectedCategory = 'Collectibles';
          break;
      }
    }

    // Recherche depuis l'URL
    const searchParam = urlParams.get('q');
    if (searchParam) {
      searchQuery = searchParam;
    }

    // Tri depuis l'URL
    const sortParam = urlParams.get('sort');
    if (sortParam) {
      if (sortParam === 'price-asc' || sortParam === 'price-desc') {
        sortBy = 'price';
        sortOrder = sortParam.split('-')[1];
      } else if (sortParam === 'name-asc' || sortParam === 'name-desc') {
        sortBy = 'name';
        sortOrder = sortParam.split('-')[1];
      } else if (sortParam === 'stock-asc' || sortParam === 'stock-desc') {
        sortBy = 'stock';
        sortOrder = sortParam.split('-')[1];
      }
    }

      loadProducts();

      // Configurer les raccourcis clavier pour la navigation produits
      setupKeyboardShortcuts();
    }
  });

  // Plus de scroll infini - tous les produits affichés directement

  // Configuration des raccourcis clavier
  function setupKeyboardShortcuts() {
    // Raccourci pour la recherche
    keyboardManager.register({
      key: '/',
      action: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Focus search bar',
      category: 'search'
    });

    // Raccourci pour effacer les filtres
    keyboardManager.register({
      key: 'c',
      ctrl: true,
      action: () => {
        clearFilters();
        showNotification('Filters cleared', 'info');
      },
      description: 'Clear all filters',
      category: 'actions'
    });

    // Navigation par catégories avec chiffres
    const categoryShortcuts = [
      { key: '1', category: 'All' },
      { key: '2', category: 'Clothing' },
      { key: '3', category: 'Accessories' },
      { key: '4', category: 'Electronics' },
      { key: '5', category: 'Books' },
      { key: '6', category: 'Gaming' }
    ];

    categoryShortcuts.forEach(({ key, category }) => {
      keyboardManager.register({
        key,
        action: () => {
          selectedCategory = category;
          applyFilters();
          showNotification(`Filtered by ${category}`, 'info');
        },
        description: `Filter by ${category}`,
        category: 'navigation'
      });
    });

    // Raccourci pour trier par prix
    keyboardManager.register({
      key: 'p',
      action: () => {
        sortBy = 'price';
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        applyFilters();
        showNotification(`Sorted by price (${sortOrder})`, 'info');
      },
      description: 'Sort by price',
      category: 'actions'
    });

    // Raccourci pour trier par nom
    keyboardManager.register({
      key: 'n',
      action: () => {
        sortBy = 'name';
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        applyFilters();
        showNotification(`Sorted by name (${sortOrder})`, 'info');
      },
      description: 'Sort by name',
      category: 'actions'
    });

    // Raccourci pour afficher le guide des raccourcis
    keyboardManager.register({
      key: '?',
      action: () => {
        showShortcutsGuide = true;
      },
      description: 'Show keyboard shortcuts',
      category: 'actions'
    });
  }

  // Appliquer les filtres et retourner les produits filtrés
  function applyFiltersToProducts() {
    // Utiliser la fonction de recherche avancée
    const categories = selectedCategory === 'All' ? undefined :
      selectedCategory === 'Clothing' ? ['clothing'] :
      selectedCategory === 'Accessories' ? ['accessories'] :
      selectedCategory === 'Electronics' ? ['electronics'] :
      selectedCategory === 'Books' ? ['book'] :
      selectedCategory === 'New' ? ['new'] :
      selectedCategory === 'Seasonal' ? ['seasonal'] :
      selectedCategory === 'Promo' ? ['promo'] :
      selectedCategory === 'Eco' ? ['eco', 'sustainable'] :
      selectedCategory === 'Gaming' ? ['gaming'] :
      selectedCategory === 'Exclusive' ? ['limited', 'exclusive', 'premium'] :
      selectedCategory === 'Collectibles' ? ['collectible'] : undefined;

    const filters = {
      categories,
      priceRange: priceRange.min > 0 || priceRange.max < 100000 ? priceRange : undefined,
      inStock: inStockOnly,
      sortBy: sortBy as 'price' | 'name' | 'stock',
      sortOrder: sortOrder as 'asc' | 'desc'
    };

    return searchAdvanced(searchQuery, filters);
  }

  // Appliquer les filtres
  function applyFilters() {
    updateDisplayedProducts();
  }

  // Gestionnaire de changement de filtre rapide
  function handleQuickFilter(category: string) {
    selectedCategory = category;
    applyFilters();
  }

  // Gestionnaire de changement de filtre de prix
  function handlePriceRangeChange(min: number, max: number) {
    priceRange = { min, max };
    applyFilters();
  }

  // Fonction pour effacer tous les filtres
  function clearFilters() {
    searchQuery = '';
    selectedCategory = 'All';
    sortBy = 'name';
    sortOrder = 'asc';
    priceRange = { min: 0, max: 100000 };
    inStockOnly = false;
    applyFilters();
  }

  // Gestionnaire de tri
  function handleSortChange(sort: string, order: string) {
    sortBy = sort;
    sortOrder = order;
    applyFilters();
  }

  // Gestionnaires d'événements
  function handleSearch(event: CustomEvent) {
    searchQuery = event.detail.query;
    applyFilters();
  }

  function handleFilter(event: CustomEvent) {
    selectedCategory = event.detail.category;
    sortBy = event.detail.sortBy;
    sortOrder = event.detail.sortOrder;
    applyFilters();
  }



  function handleAddToCart(event: CustomEvent) {
    const product = event.detail.product;
    showNotification(`${product.name} added to cart!`, 'success');
  }

  function showNotification(notificationMessage: string, notificationType: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    message = notificationMessage;
    type = notificationType;
  }

  // Calculs réactifs simplifiés
  $: totalProducts = applyFiltersToProducts().length;

  // Initialisation
  loadProducts();
</script>

<svelte:head>
  <title>Products - SvelteKit Webshop</title>
  <meta name="description" content="Browse our complete catalog of quality products" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Products
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover our complete catalog of quality products, carefully selected for developers and tech enthusiasts.
        </p>
      </div>
    </div>
  </div>

  <!-- Search Bar -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="max-w-md mx-auto relative">
        <SearchBar
          placeholder="Search products..."
          on:search={handleSearch}
        />
        <!-- Keyboard Shortcuts Button -->
        <button
          on:click={() => showShortcutsGuide = true}
          class="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Show keyboard shortcuts"
          title="Keyboard shortcuts (?)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Filters -->
  <ProductFilters
    {selectedCategory}
    {sortBy}
    {sortOrder}
    categories={['All', 'T-shirts', 'Accessories', 'Other']}
    on:filter={handleFilter}
  />

  <!-- Quick Filters -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-wrap gap-2 justify-center">
        <Tooltip content="Show all products in our catalog">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'All' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('All')}
          >
            All ({products.length})
          </button>
        </Tooltip>
        <Tooltip content="Browse our newest products">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'New' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('New')}
          >
          ✨ New
          </button>
        </Tooltip>
        <Tooltip content="Browse our clothing collection">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Clothing' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Clothing')}
          >
            👕 Clothing
          </button>
        </Tooltip>
        <Tooltip content="Discover our accessories range">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Accessories' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Accessories')}
          >
            🎒 Accessories
          </button>
        </Tooltip>
        <Tooltip content="Explore electronic devices and gadgets">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Electronics' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Electronics')}
          >
            💻 Electronics
          </button>
        </Tooltip>
        <Tooltip content="Gaming gear and accessories">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Gaming' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Gaming')}
          >
            🎮 Gaming
          </button>
        </Tooltip>
        <Tooltip content="Sustainable and eco-friendly products">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Eco' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Eco')}
          >
            🌱 Eco-Friendly
          </button>
        </Tooltip>
        <Tooltip content="Limited edition and premium products">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Exclusive' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Exclusive')}
          >
            💎 Exclusive
          </button>
        </Tooltip>
        <Tooltip content="Products on special promotion">
          <button
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {selectedCategory === 'Promo' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
            on:click={() => handleQuickFilter('Promo')}
          >
            🏷️ Promo
          </button>
        </Tooltip>
      </div>
    </div>
  </div>

  <!-- Results Info -->
  <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {#if totalProducts > 0}
          Showing {totalProducts} products
        {:else}
          No products found
        {/if}
      </p>
    </div>
  </div>

  <!-- Products Grid -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if isLoading}
      <!-- Loading Skeletons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each Array(12) as _}
          <ProductSkeleton />
        {/each}
      </div>
    {:else if displayedProducts.length === 0}
      <!-- No Results -->
      <div class="text-center py-16">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 018 0z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No products found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
        <div class="mt-6">
          <button
            on:click={() => {
              searchQuery = '';
              selectedCategory = 'All';
              applyFilters();
            }}
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Clear filters
          </button>
        </div>
      </div>
    {:else}
      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each displayedProducts as product}
          <ProductCard
            {product}
            on:addToCart={handleAddToCart}
          />
        {/each}
      </div>
    {/if}
  </main>

  <!-- Toast Notifications -->
  <Toast
    show={showToast}
    message={message}
    type={type}
    on:close={() => showToast = false}
  />

  <!-- Keyboard Shortcuts Guide -->
  <KeyboardShortcutsGuide
    bind:show={showShortcutsGuide}
    on:close={() => showShortcutsGuide = false}
  />
</div>
