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
  <title>About Us - SvelteKit Webshop</title>
  <meta name="description" content="Learn about our mission to provide quality products for developers and tech enthusiasts" />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        About Us
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
        We're passionate about providing quality products for developers and tech enthusiasts,
        built with modern web technologies and attention to detail.
      </p>
    </div>
  </section>

  <!-- Our Story -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Story
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            How we started and where we're going
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Born from Passion
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Our journey began when a group of developers realized the need for quality products
              that reflect our community's values. We believe in creating products that not only
              look great but also serve a purpose in the development workflow.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              What started as a small collection of developer-themed merchandise has grown into
              a curated selection of products that celebrate the developer lifestyle and support
              the open-source community.
            </p>
            <p class="text-gray-600 dark:text-gray-300">
              Every product in our store is carefully selected and tested to ensure it meets our
              high standards of quality, functionality, and style.
            </p>
          </div>

          <div class="relative">
            <div class="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-8">
              <div class="text-center">
                <svg class="mx-auto h-16 w-16 text-primary-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Built by Developers
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  For Developers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Values -->
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Our Values
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The principles that guide everything we do
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
          <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality First</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Every product undergoes rigorous testing and quality control to ensure it meets our high standards.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
          <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community Driven</h3>
          <p class="text-gray-600 dark:text-gray-300">
            We listen to our community and continuously improve our products based on your feedback and needs.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
          <div class="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
          <p class="text-gray-600 dark:text-gray-300">
            We stay ahead of trends and continuously innovate to bring you the best products and technologies.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Team -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Our Team
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The passionate people behind your favorite developer products
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Alex Developer</h3>
          <p class="text-primary-600 dark:text-primary-400 mb-2">Founder & CEO</p>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Full-stack developer with 10+ years of experience building scalable web applications.
          </p>
        </div>

        <div class="text-center">
          <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sarah Designer</h3>
          <p class="text-primary-600 dark:text-primary-400 mb-2">Product Designer</p>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            UX/UI designer passionate about creating intuitive and beautiful user experiences.
          </p>
        </div>

        <div class="text-center">
          <div class="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Mike Operations</h3>
          <p class="text-primary-600 dark:text-primary-400 mb-2">Operations Manager</p>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Ensuring smooth operations and exceptional customer service for our community.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="py-16 bg-primary-600 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Ready to Join Our Community?
      </h2>
      <p class="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
        Have questions or want to get in touch? We'd love to hear from you!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
        >
          Get in Touch
        </a>
        <a
          href="/products"
          class="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 transition-colors"
        >
          Shop Now
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
