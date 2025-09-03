<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { reviews } from '$lib/stores';
  import StarRating from './StarRating.svelte';

  export let productId: string;
  export let showForm = true;

  const dispatch = createEventDispatcher();

  let formData = {
    author: '',
    rating: 0,
    title: '',
    comment: ''
  };

  let isSubmitting = false;
  let errors: Record<string, string> = {};

  // Validation du formulaire
  function validateForm(): boolean {
    errors = {};

    if (!formData.author.trim()) {
      errors.author = 'Name is required';
    } else if (formData.author.trim().length < 2) {
      errors.author = 'Name must be at least 2 characters';
    }

    if (formData.rating === 0) {
      errors.rating = 'Please select a rating';
    }

    if (!formData.comment.trim()) {
      errors.comment = 'Review comment is required';
    } else if (formData.comment.trim().length < 10) {
      errors.comment = 'Review must be at least 10 characters';
    }

    return Object.keys(errors).length === 0;
  }

  // Gestionnaire de soumission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    isSubmitting = true;

    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Ajouter l'avis via le store
      const newReview = reviews.add({
        productId,
        author: formData.author.trim(),
        rating: formData.rating,
        title: formData.title.trim() || undefined,
        comment: formData.comment.trim(),
        verified: false, // Pourrait être true si l'utilisateur est connecté et a acheté
        helpful: 0
      });

      // Dispatch l'événement pour mettre à jour le composant parent
      dispatch('reviewAdded', { review: newReview });

      // Réinitialiser le formulaire
      formData = {
        author: '',
        rating: 0,
        title: '',
        comment: ''
      };

      // Fermer le formulaire
      showForm = false;

    } catch (error) {
      console.error('Error adding review:', error);
      errors.general = 'Failed to add review. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }

  function handleCancel() {
    formData = {
      author: '',
      rating: 0,
      title: '',
      comment: ''
    };
    errors = {};
    showForm = false;
    dispatch('cancel');
  }

  function handleRatingChange(event: CustomEvent) {
    formData.rating = event.detail.rating;
    if (errors.rating) {
      delete errors.rating;
      errors = errors; // Trigger reactivity
    }
  }
</script>

{#if showForm}
  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Share Your Experience
    </h3>

    {#if errors.general}
      <div class="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md">
        <p class="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
      </div>
    {/if}

    <form on:submit={handleSubmit} class="space-y-6">
      <!-- Rating -->
      <div>
        <label for="review-rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Rating *
        </label>
        <StarRating
          id="review-rating"
          rating={formData.rating}
          interactive={true}
          on:rating={handleRatingChange}
        />
        {#if errors.rating}
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rating}</p>
        {/if}
      </div>

      <!-- Name -->
      <div>
        <label for="review-author" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="review-author"
          bind:value={formData.author}
          placeholder="Enter your name"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          class:border-red-500={errors.author}
        />
        {#if errors.author}
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.author}</p>
        {/if}
      </div>

      <!-- Title (optional) -->
      <div>
        <label for="review-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Review Title <span class="text-gray-500">(optional)</span>
        </label>
        <input
          type="text"
          id="review-title"
          bind:value={formData.title}
          placeholder="Summarize your experience"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <!-- Comment -->
      <div>
        <label for="review-comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Review *
        </label>
        <textarea
          id="review-comment"
          bind:value={formData.comment}
          placeholder="Tell others about your experience with this product..."
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-vertical"
          class:border-red-500={errors.comment}
        ></textarea>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Minimum 10 characters. Be honest and detailed.
        </p>
        {#if errors.comment}
          <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.comment}</p>
        {/if}
      </div>

      <!-- Terms -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            class="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-2"
            required
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="text-gray-700 dark:text-gray-300">
            I agree to the <a href="/terms" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
            and understand that this review will be publicly visible.
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {#if isSubmitting}
            <span class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          {:else}
            Submit Review
          {/if}
        </button>

        <button
          type="button"
          on:click={handleCancel}
          class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
{/if}
