<script lang="ts">
  import { coupons, appliedCoupon } from '$lib/stores';
  import { createEventDispatcher } from 'svelte';

  export let orderTotal: number = 0;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  let couponCode = '';
  let isValidating = false;
  let errorMessage = '';
  let successMessage = '';

  function handleApplyCoupon() {
    if (!couponCode.trim()) {
      errorMessage = 'Please enter a coupon code';
      return;
    }

    isValidating = true;
    errorMessage = '';
    successMessage = '';

    try {
      const result = coupons.validate(couponCode.trim(), orderTotal);

      if (result.valid && result.coupon) {
        // Appliquer le coupon
        appliedCoupon.set({
          coupon: result.coupon,
          discount: result.discount || 0
        });

        successMessage = `Coupon applied! ${result.coupon.description}`;
        couponCode = '';

        // Notifier le parent
        dispatch('couponApplied', {
          coupon: result.coupon,
          discount: result.discount
        });
      } else {
        errorMessage = result.error || 'Invalid coupon code';
      }
    } catch (error) {
      errorMessage = 'Failed to validate coupon. Please try again.';
      console.error('Coupon validation error:', error);
    } finally {
      isValidating = false;
    }
  }

  function handleRemoveCoupon() {
    appliedCoupon.set(null);
    couponCode = '';
    errorMessage = '';
    successMessage = '';

    dispatch('couponRemoved');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !disabled && !isValidating) {
      handleApplyCoupon();
    }
  }

  // Souscrire aux changements du coupon appliqué
  appliedCoupon.subscribe((coupon) => {
    if (coupon) {
      successMessage = `Coupon applied: ${coupon.coupon.description}`;
      errorMessage = '';
    } else {
      successMessage = '';
    }
  });
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
    Have a coupon code?
  </h3>

  <!-- Coupon appliqué -->
  {#if $appliedCoupon}
    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <p class="font-medium text-green-800 dark:text-green-200">
              {$appliedCoupon.coupon.code}
            </p>
            <p class="text-sm text-green-600 dark:text-green-300">
              {$appliedCoupon.coupon.description}
            </p>
            {#if $appliedCoupon.discount > 0}
              <p class="text-sm font-medium text-green-700 dark:text-green-300">
                -${$appliedCoupon.discount.toFixed(2)} discount applied
              </p>
            {/if}
          </div>
        </div>
        <button
          on:click={handleRemoveCoupon}
          class="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 p-1"
          aria-label="Remove coupon"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  {/if}

  <!-- Formulaire de coupon -->
  <div class="flex gap-3">
    <div class="flex-1">
      <input
        type="text"
        bind:value={couponCode}
        placeholder="Enter coupon code"
        on:keydown={handleKeydown}
        disabled={disabled || isValidating}
        class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
    <button
      on:click={handleApplyCoupon}
      disabled={disabled || isValidating || !couponCode.trim()}
      class="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
    >
      {#if isValidating}
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Applying...
      {:else}
        Apply
      {/if}
    </button>
  </div>

  <!-- Messages d'erreur -->
  {#if errorMessage}
    <div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
      </div>
    </div>
  {/if}

  <!-- Messages de succès -->
  {#if successMessage}
    <div class="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md">
      <div class="flex items-start">
        <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
      </div>
    </div>
  {/if}

  <!-- Coupons disponibles -->
  <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
    <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
      Available Coupons
    </h4>
    <div class="space-y-2">
      {#each coupons.getActive() as coupon}
        <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">{coupon.code}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{coupon.description}</p>
          </div>
          <button
            on:click={() => couponCode = coupon.code}
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
          >
            Use Code
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
