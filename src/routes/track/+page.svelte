<script lang="ts">
  import { orders } from '$lib/stores';
  import OrderTracking from '$lib/components/OrderTracking.svelte';
  import { Toast } from '$lib/components';

  let orderNumber = '';
  let order: any = null;
  let isLoading = false;
  let notFound = false;
  let showToast = false;
  let toastMessage = '';
  let toastType = 'info';

  function handleTrackOrder() {
    if (!orderNumber.trim()) {
      showNotification('Please enter an order number', 'warning');
      return;
    }

    isLoading = true;
    notFound = false;
    order = null;

    // Simuler une petite attente pour l'effet loading
    setTimeout(() => {
      const foundOrder = orders.getByOrderNumber(orderNumber.trim().toUpperCase());

      if (foundOrder) {
        order = foundOrder;
        showNotification('Order found successfully!', 'success');
      } else {
        notFound = true;
        showNotification('Order not found. Please check your order number.', 'error');
      }

      isLoading = false;
    }, 1000);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleTrackOrder();
    }
  }

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    toastMessage = message;
    toastType = type;
  }

  function resetSearch() {
    orderNumber = '';
    order = null;
    notFound = false;
  }
</script>

<svelte:head>
  <title>Track Your Order - SvelteKit Webshop</title>
  <meta name="description" content="Track your order status and delivery information" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Header -->
  <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="flex items-center justify-center mb-4">
        <svg class="w-12 h-12 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 class="text-4xl md:text-6xl font-bold">
          Track Your Order
        </h1>
      </div>
      <p class="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
        Enter your order number to track your package and see real-time updates.
      </p>
    </div>
  </div>

  <!-- Content -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-2xl mx-auto">
      <!-- Search Form -->
      {#if !order}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enter Your Order Number
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              Your order number was sent to your email after purchase.
            </p>
          </div>

          <div class="space-y-6">
            <div>
              <label for="orderNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                bind:value={orderNumber}
                placeholder="e.g. ORD-123456789-ABCDEF"
                on:keydown={handleKeydown}
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg tracking-wider font-mono"
                disabled={isLoading}
              />
            </div>

            <button
              on:click={handleTrackOrder}
              disabled={isLoading || !orderNumber.trim()}
              class="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {#if isLoading}
                <span class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              {:else}
                Track Order
              {/if}
            </button>
          </div>

          <!-- Demo Orders -->
          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Demo Orders (for testing):
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                on:click={() => orderNumber = 'ORD-123456789-ABCDEF'}
                class="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div class="text-sm font-medium text-gray-900 dark:text-white">ORD-123456789-ABCDEF</div>
                <div class="text-xs text-gray-600 dark:text-gray-300">Demo Order 1</div>
              </button>
              <button
                on:click={() => orderNumber = 'ORD-987654321-FEDCBA'}
                class="text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div class="text-sm font-medium text-gray-900 dark:text-white">ORD-987654321-FEDCBA</div>
                <div class="text-xs text-gray-600 dark:text-gray-300">Demo Order 2</div>
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Order Not Found -->
      {#if notFound}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.01-5.625-2.629M12 4v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Order Not Found
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't find an order with that number. Please check your order number and try again.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              on:click={resetSearch}
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Try Another Order
            </button>
            <a
              href="/contact"
              class="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      {/if}

      <!-- Order Tracking -->
      {#if order}
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Order Tracking
            </h2>
            <button
              on:click={resetSearch}
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
            >
              ← Track Another Order
            </button>
          </div>

          <OrderTracking {order} showDetails={true} />
        </div>
      {/if}
    </div>
  </main>
</div>

<!-- Toast Notifications -->
<Toast
  {showToast}
  {toastMessage}
  {toastType}
  on:close={() => showToast = false}
/>
