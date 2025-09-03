<script lang="ts">
  import { cart, favoritesCount } from '$lib/stores';
  import { formatPrice } from '$lib/utils';
  import ThemeToggle from './ThemeToggle.svelte';
  import UserMenu from './UserMenu.svelte';
  import KeyboardHelp from './KeyboardHelp.svelte';
  import { keyboardManager } from '$lib/stores/keyboard';

  let showKeyboardHelp = false;

  $: cartTotal = $cart.reduce((total, item) => total + (item.product.price * item.qty), 0);
  $: cartCount = $cart.reduce((count, item) => count + item.qty, 0);

  // Register keyboard shortcut for help
  if (typeof window !== 'undefined') {
    keyboardManager.register({
      key: '?',
      shift: true,
      action: () => showKeyboardHelp = true,
      description: 'Show keyboard shortcuts',
      category: 'actions'
    });
  }
</script>

<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold text-primary-600">
          🛒 Webshop
        </a>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
                  <a href="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </a>
          <a href="/products" class="text-gray-700 hover:text-primary-600 transition-colors">
            Products
          </a>
          <a href="/favorites" class="text-gray-700 hover:text-primary-600 transition-colors">
            Favorites
          </a>
          <a href="/about" class="text-gray-700 hover:text-primary-600 transition-colors">
            About
          </a>
          <a href="/contact" class="text-gray-700 hover:text-primary-600 transition-colors">
            Contact
          </a>
      </nav>

      <!-- Theme Toggle, Favorites, Cart & User Menu -->
      <div class="flex items-center space-x-4">
        <!-- Keyboard Shortcuts Help -->
        <button
          on:click={() => showKeyboardHelp = true}
          class="p-2 text-gray-700 hover:text-primary-600 transition-colors"
          aria-label="Keyboard shortcuts"
          title="Show keyboard shortcuts (Shift+?)"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>

        <ThemeToggle />

        <!-- Favorites -->
        <a
          href="/favorites"
          class="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
          aria-label="Favorites"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>

          {#if $favoritesCount > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {$favoritesCount}
            </span>
          {/if}
        </a>

        <!-- Cart -->
        <a
          href="/cart"
          class="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
          aria-label="Cart"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
          </svg>

          {#if cartCount > 0}
            <span class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          {/if}
        </a>

        {#if cartCount > 0}
          <div class="hidden sm:block text-sm text-gray-600">
            Total: {formatPrice(cartTotal, 'EUR')}
          </div>
        {/if}

        <!-- User Menu -->
        <UserMenu />
      </div>
    </div>
  </div>
</header>

<!-- Keyboard Help Modal -->
<KeyboardHelp bind:show={showKeyboardHelp} />
