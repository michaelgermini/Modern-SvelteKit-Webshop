<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ProductCard from './ProductCard.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';
  import { useInfiniteScroll } from '$lib/hooks/useInfiniteScroll';

  export let products: any[] = [];
  export let loading = false;
  export let hasMore = true;
  export let showProgress = true;

  const dispatch = createEventDispatcher();

  // Utiliser le hook de scroll infini
  const { cleanup } = useInfiniteScroll(
    () => {
      dispatch('loadMore');
    },
    {
      threshold: 200,
      loading,
      hasMore,
      disabled: false
    }
  );

  // Calculer le pourcentage affiché
  $: showingPercentage = products.length > 0 ? Math.round((products.length / 100) * 100) : 0; // Placeholder pour le calcul réel
</script>

<!-- Product Grid with Infinite Scroll -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {#each products as product}
    <ProductCard
      {product}
      on:addToCart
    />
  {/each}
</div>

<!-- Loading indicator -->
{#if loading}
  <div class="flex justify-center items-center py-8">
    <div class="flex items-center space-x-2">
      <LoadingSpinner size="md" />
      <span class="text-gray-600 dark:text-gray-300">Loading more products...</span>
    </div>
  </div>
{/if}

<!-- Progress indicator -->
{#if showProgress && products.length > 0}
  <div class="flex justify-center items-center py-6">
    <div class="text-center">
      <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Showing {products.length} products
      </div>
      {#if hasMore}
        <div class="text-xs text-gray-400 dark:text-gray-500">
          Scroll down to load more
        </div>
      {:else}
        <div class="text-xs text-green-600 dark:text-green-400">
          All products loaded
        </div>
      {/if}
    </div>
  </div>
{/if}
