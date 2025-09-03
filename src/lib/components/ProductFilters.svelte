<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let categories = ['All', 'T-shirts', 'Accessories', 'Other'];
  export let selectedCategory = 'All';
  export let sortBy = 'name';
  export let sortOrder: 'asc' | 'desc' = 'asc';

  const dispatch = createEventDispatcher();

  function handleCategoryChange(category: string) {
    selectedCategory = category;
    dispatch('filter', {
      category: selectedCategory,
      sortBy,
      sortOrder
    });
  }

  function handleSortChange(newSortBy: string, newSortOrder: 'asc' | 'desc') {
    sortBy = newSortBy;
    sortOrder = newSortOrder;
    dispatch('filter', {
      category: selectedCategory,
      sortBy,
      sortOrder
    });
  }
</script>

<div class="bg-white border-b border-gray-200 py-4">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">

      <!-- Categories -->
      <div class="flex flex-wrap gap-2">
        {#each categories as category}
          <button
            on:click={() => handleCategoryChange(category)}
            class="px-4 py-2 text-sm font-medium rounded-full transition-colors {selectedCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            {category}
          </button>
        {/each}
      </div>

      <!-- Sort Options -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Sort by:</span>
        <select
          bind:value={sortBy}
          on:change={() => handleSortChange(sortBy, sortOrder)}
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>

        <button
          on:click={() => handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
          class="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label="Toggle sort order"
        >
          {#if sortOrder === 'asc'}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
            </svg>
          {:else}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
