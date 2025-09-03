<script lang="ts">
  import { Toast } from '$lib/components';

  let showToast = false;
  let toastMessage = '';
  let toastType = 'info';

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    toastMessage = message;
    toastType = type;
  }
</script>

<svelte:head>
  <title>Shipping Information - SvelteKit Webshop</title>
  <meta name="description" content="Learn about our shipping rates, delivery times, and shipping policies for all orders." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Shipping & Delivery
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
        Fast, reliable shipping worldwide. We work with trusted carriers
        to ensure your orders arrive safely and on time.
      </p>
    </div>
  </section>

  <!-- Shipping Options -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Shipping Options
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose the shipping method that works best for you
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Standard Shipping -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Standard Shipping</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Reliable delivery for most orders
          </p>
          <div class="text-2xl font-bold text-primary-600 mb-2">$5.99</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Free on orders over $50</p>
          <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• 3-5 business days (US)</li>
            <li>• 7-14 business days (International)</li>
            <li>• Tracking included</li>
            <li>• Signature not required</li>
          </ul>
        </div>

        <!-- Express Shipping -->
        <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 text-center border-2 border-primary-200 dark:border-primary-700">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Express Shipping</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Fast delivery when you need it most
          </p>
          <div class="text-2xl font-bold text-primary-600 mb-2">$12.99</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Free on orders over $100</p>
          <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• 1-2 business days (US)</li>
            <li>• 3-5 business days (International)</li>
            <li>• Priority handling</li>
            <li>• Signature required</li>
          </ul>
        </div>

        <!-- Overnight Shipping -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Overnight Shipping</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Next business day delivery
          </p>
          <div class="text-2xl font-bold text-primary-600 mb-2">$24.99</div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Available in select areas</p>
          <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Next business day</li>
            <li>• US only</li>
            <li>• Morning delivery available</li>
            <li>• Signature required</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Shipping Information -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Shipping Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Processing Times -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Processing Times</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-300">Order Processing</span>
                <span class="font-medium text-gray-900 dark:text-white">1-2 business days</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-300">Custom Orders</span>
                <span class="font-medium text-gray-900 dark:text-white">3-5 business days</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600 dark:text-gray-300">Bulk Orders</span>
                <span class="font-medium text-gray-900 dark:text-white">Contact for timeline</span>
              </div>
            </div>
          </div>

          <!-- Delivery Times -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Delivery Times</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-300">United States</span>
                <span class="font-medium text-gray-900 dark:text-white">2-8 business days</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-300">Canada</span>
                <span class="font-medium text-gray-900 dark:text-white">3-10 business days</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-300">Europe</span>
                <span class="font-medium text-gray-900 dark:text-white">5-15 business days</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600 dark:text-gray-300">Rest of World</span>
                <span class="font-medium text-gray-900 dark:text-white">7-21 business days</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Notes -->
        <div class="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Important Shipping Notes
              </h4>
              <ul class="text-yellow-700 dark:text-yellow-300 space-y-1 text-sm">
                <li>• Delivery times may be affected by holidays, weather, or carrier delays</li>
                <li>• International orders may be subject to customs fees and duties</li>
                <li>• We are not responsible for delays caused by carriers or postal services</li>
                <li>• Rural or remote addresses may have extended delivery times</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Order Tracking -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Track Your Order
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Once your order ships, you'll receive a tracking number via email.
          You can use it to track your package in real-time.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-primary-600 font-bold">1</span>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Order Placed</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Your order has been received and is being processed</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-primary-600 font-bold">2</span>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Processing</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">We're preparing your order for shipment</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-primary-600 font-bold">3</span>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Shipped</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Your order is on its way with tracking information</p>
          </div>

          <div class="text-center">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-primary-600 font-bold">4</span>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Delivered</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Your order has arrived at its destination</p>
          </div>
        </div>

        <div class="mt-8">
          <button
            on:click={() => showNotification('Tracking feature coming soon! Check your email for updates.', 'info')}
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Track My Order
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="py-16 bg-primary-600 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Questions About Shipping?
      </h2>
      <p class="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
        Our shipping experts are here to help. Contact us for personalized shipping advice
        or assistance with any delivery concerns.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          class="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors"
        >
          Contact Support
        </a>
        <a
          href="/help"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
        >
          View FAQ
        </a>
      </div>
    </div>
  </section>

  <!-- Toast Notifications -->
  <Toast
    {showToast}
    {toastMessage}
    {toastType}
    on:close={() => showToast = false}
  />
</div>
