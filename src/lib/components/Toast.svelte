<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let message = '';
  export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
  export let duration = 3000;
  export let show = false;

  const dispatch = createEventDispatcher();

  function getIcon() {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  }

  function getBgColor() {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  }

  function getTextColor() {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
      default:
        return 'text-blue-800';
    }
  }

  function getBorderColor() {
    switch (type) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'warning':
        return 'border-yellow-500';
      case 'info':
      default:
        return 'border-blue-500';
    }
  }

  function close() {
    show = false;
    dispatch('close');
  }

  // Cleanup on component destroy
  import { onDestroy } from 'svelte';

  onDestroy(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
  });

  // Auto-hide after duration
  let timerId: number;

  $: if (show && duration > 0) {
    // Clear any existing timer
    if (timerId) clearTimeout(timerId);

    // Set new timer
    timerId = setTimeout(() => {
      close();
    }, duration);
  } else if (timerId) {
    // Clear timer when show becomes false
    clearTimeout(timerId);
    timerId = undefined;
  }
</script>

{#if show}
  <div
    class="fixed top-4 right-4 z-50 max-w-sm w-full {getBgColor()} border-l-4 {getBorderColor()} rounded-md p-4 shadow-lg animate-slide-in"
    role="alert"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <span class="text-lg">{getIcon()}</span>
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium {getTextColor()}">
          {message}
        </p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          on:click={close}
          class="inline-flex {getTextColor()} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
        >
          <span class="sr-only">Close</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 011.414 1.414L10 11.414l-4.293 4.293a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
</style>
