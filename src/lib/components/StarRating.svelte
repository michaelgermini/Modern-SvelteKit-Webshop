<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let rating = 0;
  export let maxRating = 5;
  export let interactive = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let showValue = true;
  export let id: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  function getSizeClasses() {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      case 'md':
      default:
        return 'w-5 h-5';
    }
  }

  function handleStarClick(newRating: number) {
    if (interactive) {
      rating = newRating;
      dispatch('rating', { rating: newRating });
    }
  }

  function handleStarKeydown(event: KeyboardEvent, starIndex: number) {
    if (!interactive) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStarClick(starIndex + 1);
    }
  }
</script>

<div class="flex items-center space-x-1" {id}>
  {#each Array(maxRating) as _, i}
    <button
      class="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded"
      class:cursor-pointer={interactive}
      class:cursor-default={!interactive}
      on:click={() => handleStarClick(i + 1)}
      on:keydown={(e) => handleStarKeydown(e, i)}
      disabled={!interactive}
      aria-label={interactive ? `Rate ${i + 1} star${i + 1 !== 1 ? 's' : ''}` : `${i + 1} star${i + 1 !== 1 ? 's' : ''}`}
      tabindex={interactive ? 0 : -1}
    >
      <svg
        class="{getSizeClasses()} {i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors duration-150"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </button>
  {/each}

  {#if showValue}
    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
      ({rating}/{maxRating})
    </span>
  {/if}
</div>
