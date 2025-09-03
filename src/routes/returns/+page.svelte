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
  <title>Returns & Exchanges - SvelteKit Webshop</title>
  <meta name="description" content="Learn about our hassle-free return policy and exchange process for a worry-free shopping experience." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Returns & Exchanges
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
        We want you to love your purchase. That's why we offer a hassle-free
        return and exchange policy to ensure your complete satisfaction.
      </p>
    </div>
  </section>

  <!-- Return Policy Overview -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Return Policy
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Simple, fair, and designed with you in mind
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- 30-Day Returns -->
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">30-Day Returns</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Return most items within 30 days for a full refund
            </p>
          </div>

          <!-- Free Returns -->
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Return Shipping</h3>
            <p class="text-gray-600 dark:text-gray-300">
              We pay for return shipping on most items
            </p>
          </div>

          <!-- Easy Process -->
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Process</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Simple online returns with prepaid labels
            </p>
          </div>
        </div>

        <!-- Key Terms -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Terms & Conditions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">What's Eligible?</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unused items in original packaging
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Within 30 days of delivery
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Original receipt or proof of purchase
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">What's Not Eligible?</h4>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Used or damaged items
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Custom or personalized items
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Items returned after 30 days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How to Return -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How to Return an Item
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            We've made the return process as simple as possible
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start Your Return</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Contact our support team or use our online return portal to initiate your return request
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pack Your Item</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Place the item back in its original packaging with all accessories and documentation
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ship It Back</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Use the prepaid return label we provide to ship your item back to us at no cost
            </p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-primary-600">4</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Refunded</h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              Once we receive your return, we'll process your refund within 3-5 business days
            </p>
          </div>
        </div>

        <!-- Start Return Button -->
        <div class="text-center mt-12">
          <button
            on:click={() => showNotification('Return portal coming soon! Contact support for now.', 'info')}
            class="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Start Return Process
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Exchange Policy -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Exchanges
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Prefer to exchange instead of returning? We've got you covered.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Exchange Benefits -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Exchange Benefits</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span class="font-medium text-gray-900 dark:text-white">Faster Process</span>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Get your new item quicker than waiting for a refund and reordering</p>
                </div>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span class="font-medium text-gray-900 dark:text-white">No Restocking Fee</span>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Exchange directly without additional charges</p>
                </div>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                  <span class="font-medium text-gray-900 dark:text-white">Size & Color Changes</span>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Perfect for finding the right fit or preferred color</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Exchange Process -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Exchange Process</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-bold text-primary-600">1</span>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    Contact our support team with your order number and the item you want to exchange
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-bold text-primary-600">2</span>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    We'll send you an exchange authorization and prepaid return label
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-bold text-primary-600">3</span>
                </div>
                <div>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">
                    Send back your current item and we'll ship your new selection immediately
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Return FAQs
        </h2>

        <div class="space-y-6">
          <!-- FAQ Item 1 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How long do I have to return an item?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              You have 30 days from the date of delivery to initiate a return. We recommend starting the process as soon as possible to ensure timely processing.
            </p>
          </div>

          <!-- FAQ Item 2 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Will I get a full refund?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Yes, eligible returns receive a full refund to your original payment method. Refunds are typically processed within 3-5 business days after we receive your return.
            </p>
          </div>

          <!-- FAQ Item 3 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What if my item arrived damaged?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              If your item arrived damaged, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.
            </p>
          </div>

          <!-- FAQ Item 4 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I return items purchased during a sale?
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Yes, sale items are eligible for return under the same 30-day policy. You'll receive a full refund of the amount you paid for the item.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="py-16 bg-primary-600 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Need Help with a Return?
      </h2>
      <p class="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
        Our customer service team is here to assist you with any questions about returns,
        exchanges, or your order. We're committed to making the process as smooth as possible.
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
          View Full FAQ
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
