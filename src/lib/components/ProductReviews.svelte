<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import StarRating from './StarRating.svelte';

  export let productId: string;
  export let reviews = [];
  export let showForm = false;

  const dispatch = createEventDispatcher();

  // Calculer la moyenne des notes
  $: averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Distribution des notes
  $: ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  function handleAddReview(event: CustomEvent) {
    dispatch('addReview', {
      productId,
      ...event.detail
    });
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
      Customer Reviews
    </h3>
    {#if !showForm}
      <button
        on:click={() => showForm = true}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Write Review
      </button>
    {/if}
  </div>

  {#if reviews.length === 0 && !showForm}
    <!-- Empty State -->
    <div class="text-center py-8">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews yet</h4>
      <p class="text-gray-600 dark:text-gray-300 mb-4">Be the first to share your thoughts about this product!</p>
      <button
        on:click={() => showForm = true}
        class="inline-flex items-center px-4 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
      >
        Write the first review
      </button>
    </div>
  {:else}
    <!-- Reviews Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Rating Overview -->
      <div>
        <div class="flex items-center mb-4">
          <div class="text-3xl font-bold text-gray-900 dark:text-white mr-4">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <StarRating {averageRating} size="lg" showValue={false} />
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <!-- Rating Distribution -->
        <div class="space-y-2">
          {#each ratingDistribution as { rating, count, percentage }}
            <div class="flex items-center text-sm">
              <span class="w-8 text-gray-600 dark:text-gray-400">{rating}★</span>
              <div class="flex-1 mx-3">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style="width: {percentage}%"
                  ></div>
                </div>
              </div>
              <span class="w-8 text-right text-gray-600 dark:text-gray-400">{count}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="space-y-4">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div class="text-lg font-semibold text-green-800 dark:text-green-200">Recommended</div>
              <div class="text-sm text-green-600 dark:text-green-300">
                {Math.round((reviews.filter(r => r.rating >= 4).length / Math.max(reviews.length, 1)) * 100)}% of reviewers
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div class="text-lg font-semibold text-blue-800 dark:text-blue-200">Recent Reviews</div>
              <div class="text-sm text-blue-600 dark:text-blue-300">
                Last review {reviews.length > 0 ? formatDate(reviews[0].date) : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Individual Reviews -->
    <div class="space-y-6">
      {#each reviews as review (review.id)}
        <div class="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0 last:pb-0">
          <div class="flex items-start space-x-4">
            <!-- Avatar -->
            <div class="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-medium text-sm">
                {review.author.charAt(0).toUpperCase()}
              </span>
            </div>

            <!-- Review Content -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{review.author}</h4>
                  <div class="flex items-center space-x-2">
                    <StarRating rating={review.rating} size="sm" showValue={false} />
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>

                {#if review.verified}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    Verified Purchase
                  </span>
                {/if}
              </div>

              {#if review.title}
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">{review.title}</h5>
              {/if}

              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {review.comment}
              </p>

              {#if review.helpful}
                <div class="mt-3 flex items-center space-x-4">
                  <button class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    👍 Helpful ({review.helpful})
                  </button>
                  <button class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    Report
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Write Review Form -->
  {#if showForm}
    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h4>
      <slot name="review-form" {productId} />
    </div>
  {/if}
</div>
