<script lang="ts">
  import { orders, isLoggedIn, auth } from '$lib/stores';
  import OrderTracking from '$lib/components/OrderTracking.svelte';
  import AuthModal from '$lib/components/AuthModal.svelte';
  import { onMount } from 'svelte';

  let userOrders = [];
  let showAuthModal = false;
  let authMode: 'login' | 'register' = 'login';

  onMount(() => {
    if (!$isLoggedIn) {
      showAuthModal = true;
      authMode = 'login';
    }
  });

  // Charger les commandes de l'utilisateur connecté
  $: if ($isLoggedIn && $auth.user) {
    userOrders = orders.getByCustomerEmail($auth.user.email);
    showAuthModal = false;
  } else if (!$isLoggedIn) {
    userOrders = [];
    showAuthModal = true;
  }

  function handleAuthSuccess() {
    showAuthModal = false;
  }
</script>

<svelte:head>
  <title>My Orders - SvelteKit Webshop</title>
  <meta name="description" content="Track and manage your orders" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-12 h-12 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h1 class="text-4xl md:text-6xl font-bold">
          My Orders
        </h1>
      </div>
      <p class="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
        Track your orders, view order history, and manage your purchases.
      </p>
    </div>
  </div>

  <!-- Content -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {#if !$isLoggedIn}
      <!-- Not logged in -->
      <div class="text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sign in to view your orders
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Please sign in to your account to view and track your orders.
        </p>
        <button
          on:click={() => { showAuthModal = true; authMode = 'login'; }}
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    {:else if userOrders.length === 0}
      <!-- No orders -->
      <div class="text-center py-16">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          No orders yet
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          You haven't placed any orders yet. Start shopping to see your orders here!
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
      <!-- Orders list -->
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Your Orders ({userOrders.length})
          </h2>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            Total spent: <span class="font-medium text-primary-600">
              ${userOrders.reduce((total, order) => total + order.total, 0).toFixed(2)}
            </span>
          </div>
        </div>

        {#each userOrders as order (order.id)}
          <OrderTracking {order} showDetails={false} />
        {/each}
      </div>
    {/if}
  </main>
</div>

<!-- Auth Modal -->
<AuthModal
  show={showAuthModal}
  mode={authMode}
  on:login={handleAuthSuccess}
  on:register={handleAuthSuccess}
  on:close={() => showAuthModal = false}
/>
