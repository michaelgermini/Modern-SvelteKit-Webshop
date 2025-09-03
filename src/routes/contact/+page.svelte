<script lang="ts">
  import { Toast } from '$lib/components';
  import { handleError } from '$lib/utils/errorHandler';

  // États du formulaire
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  // États des notifications
  let showToast = false;
  let toastMessage = '';
  let toastType = 'info';

  // Validation du formulaire
  function validateForm(): boolean {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return Object.keys(errors).length === 0;
  }

  // Gestionnaire de soumission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!validateForm()) {
      showNotification('Please fix the errors in the form', 'warning');
      return;
    }

    isSubmitting = true;

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Ici vous pourriez envoyer les données à votre API
      console.log('Form submitted:', formData);

      // Réinitialiser le formulaire
      formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

    } catch (error) {
      const appError = handleError(error);
      showNotification(appError.message, 'error');
    } finally {
      isSubmitting = false;
    }
  }

  function showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    showToast = true;
    toastMessage = message;
    toastType = type;
  }
</script>

<svelte:head>
  <title>Contact Us - SvelteKit Webshop</title>
  <meta name="description" content="Get in touch with us. We're here to help with any questions about our products or services." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        Contact Us
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
        Have a question about our products, need help with an order,
        or just want to say hello? We'd love to hear from you!
      </p>
    </div>
  </section>

  <!-- Contact Form & Info -->
  <section class="py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <!-- Contact Form -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Send us a Message
          </h2>

          <form on:submit={handleSubmit} class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                bind:value={formData.name}
                placeholder="Your full name"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                class:border-red-500={errors.name}
              />
              {#if errors.name}
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              {/if}
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                placeholder="your@email.com"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                class:border-red-500={errors.email}
              />
              {#if errors.email}
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              {/if}
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                bind:value={formData.subject}
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                class:border-red-500={errors.subject}
              >
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="product">Product Question</option>
                <option value="shipping">Shipping Information</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
              {#if errors.subject}
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
              {/if}
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                bind:value={formData.message}
                placeholder="Tell us how we can help you..."
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
                class:border-red-500={errors.message}
              ></textarea>
              {#if errors.message}
                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
              {/if}
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isSubmitting}
                <span class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              {:else}
                Send Message
              {/if}
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>

          <div class="space-y-8">
            <!-- Email -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                <p class="text-gray-600 dark:text-gray-300">support@webshop.dev</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">We typically respond within 24 hours</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Phone</h3>
                <p class="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>

            <!-- Address -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Address</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  123 Developer Street<br>
                  Tech City, TC 12345<br>
                  United States
                </p>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                <div class="text-gray-600 dark:text-gray-300 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Follow Us
            </h3>
            <div class="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 class="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg flex items-center justify-center transition-colors">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 class="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg flex items-center justify-center transition-colors">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
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
