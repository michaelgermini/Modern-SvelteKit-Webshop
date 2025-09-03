<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let placeholder = 'Search products...';
  export let value = '';

  const dispatch = createEventDispatcher();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('search', { query: value });
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    dispatch('search', { query: value });
  }

  function clearSearch() {
    value = '';
    dispatch('search', { query: '' });
  }
</script>

<form on:submit={handleSubmit} class="relative max-w-md mx-auto">
  <div class="relative">
    <input
      type="text"
      {placeholder}
      {value}
      on:input={handleInput}
      class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
    />

    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>

    {#if value}
      <button
        type="button"
        on:click={clearSearch}
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    {/if}
  </div>
</form>
