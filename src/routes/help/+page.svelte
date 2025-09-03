<script lang="ts">
  import { Toast } from '$lib/components';

  let showToast = false;
  let toastMessage = '';
  let toastType = 'info';

  let searchQuery = '';
  let expandedItems = new Set<number>();

  const faqItems = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details. Orders are processed within 1-2 business days.",
      category: "ordering"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through Stripe.",
      category: "payment"
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within the US, and 7-14 business days internationally. Express shipping options are available at checkout.",
      category: "shipping"
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Simply contact our support team to initiate a return. Return shipping is free for defective items.",
      category: "returns"
    },
    {
      id: 5,
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard.",
      category: "tracking"
    },
    {
      id: 6,
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Duties and taxes may apply.",
      category: "shipping"
    },
    {
      id: 7,
      question: "How do I reset my password?",
      answer: "Click the 'Forgot Password' link on the login page. Enter your email address and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      category: "account"
    },
    {
      id: 8,
      question: "Are my payments secure?",
      answer: "Absolutely! We use Stripe for payment processing, which employs bank-level security. Your payment information is never stored on our servers and is fully encrypted.",
      category: "security"
    },
    {
      id: 9,
      question: "Can I cancel or modify my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. Contact our support team immediately if you need to make changes. Once an order is processed, modifications may not be possible.",
      category: "ordering"
    },
    {
      id: 10,
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer bulk pricing for orders of 10+ items. Contact our sales team for custom quotes and bulk discounts on larger orders.",
      category: "ordering"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: 'help' },
    { id: 'ordering', name: 'Ordering', icon: 'shopping' },
    { id: 'payment', name: 'Payment', icon: 'credit-card' },
    { id: 'shipping', name: 'Shipping', icon: 'truck' },
    { id: 'returns', name: 'Returns', icon: 'refresh' },
    { id: 'tracking', name: 'Tracking', icon: 'map-pin' },
    { id: 'account', name: 'Account', icon: 'user' },
    { id: 'security', name: 'Security', icon: 'shield' }
  ];

  let selectedCategory = 'all';

  $: filteredFaq = selectedCategory === 'all'
    ? faqItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems.filter(item =>
        item.category === selectedCategory &&
        (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  function toggleItem(id: number) {
    if (expandedItems.has(id)) {
      expandedItems.delete(id);
    } else {
      expandedItems.add(id);
    }
    expandedItems = expandedItems; // Trigger reactivity
  }

  function getCategoryIcon(category: string) {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || 'help';
  }

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    toastMessage = message;
    toastType = type;
  }
</script>

<svelte:head>
  <title>Help & FAQ - SvelteKit Webshop</title>
  <meta name="description" content="Find answers to frequently asked questions about our products, orders, shipping, and more." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Help Center
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
        Find answers to your questions about our products, orders, shipping, and more.
        Can't find what you're looking for? Contact our support team.
      </p>
    </div>
  </section>

  <!-- Search & Categories -->
  <section class="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search FAQs..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 018 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-2">
        {#each categories as category}
          <button
            on:click={() => selectedCategory = category.id}
            class="px-4 py-2 text-sm font-medium rounded-full transition-colors {selectedCategory === category.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
          >
            {category.name}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- FAQ List -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        {#if filteredFaq.length === 0}
          <!-- No Results -->
          <div class="text-center py-16">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.203-2.47"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No FAQs found</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search terms or browse by category.
            </p>
            <div class="mt-6">
              <button
                on:click={() => { searchQuery = ''; selectedCategory = 'all'; }}
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Clear filters
              </button>
            </div>
          </div>
        {:else}
          <!-- FAQ Items -->
          <div class="space-y-4">
            {#each filteredFaq as item (item.id)}
              <div class="border border-gray-200 dark:border-gray-600 rounded-lg">
                <button
                  on:click={() => toggleItem(item.id)}
                  class="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  aria-expanded={expandedItems.has(item.id)}
                  aria-controls="faq-{item.id}"
                >
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      {item.question}
                    </h3>
                    <svg
                      class="w-5 h-5 text-gray-500 transition-transform {expandedItems.has(item.id) ? 'transform rotate-180' : ''}"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </button>

                {#if expandedItems.has(item.id)}
                  <div
                    id="faq-{item.id}"
                    class="px-6 pb-4"
                    role="region"
                    aria-labelledby="faq-{item.id}"
                  >
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                {/if}
              </div>
            {/each}
          </div>

          <!-- Results Summary -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredFaq.length} of {faqItems.length} FAQs
            </p>
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Still Need Help? -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Still Need Help?
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Can't find the answer you're looking for? Our support team is here to help.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <!-- Contact Support -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Get instant help from our support team
          </p>
          <button
            on:click={() => showNotification('Live chat feature coming soon!', 'info')}
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            Start Chat
          </button>
        </div>

        <!-- Email Support -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Send us an email and we'll respond within 24 hours
          </p>
          <a
            href="/contact"
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors inline-block text-center"
          >
            Send Email
          </a>
        </div>

        <!-- Phone Support -->
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Speak directly with our support team
          </p>
          <button
            on:click={() => showNotification('Phone: +1 (555) 123-4567', 'info')}
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            Call Now
          </button>
        </div>
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
