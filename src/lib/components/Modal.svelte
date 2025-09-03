<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let show = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let closable = true;

  const dispatch = createEventDispatcher();

  function close() {
    show = false;
    dispatch('close');
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  function handleBackdropKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && closable) {
      close();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && closable) {
      close();
    }
  }

  $: if (show) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    document.removeEventListener('keydown', handleKeydown);
  }

  function getSizeClasses() {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'md':
      default:
        return 'max-w-lg';
    }
  }
</script>

{#if show}
  <!-- Backdrop -->
  <button
    type="button"
    class="fixed inset-0 z-50 overflow-y-auto"
    on:click={handleBackdropClick}
    aria-label="Close modal"
  >
    <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <!-- Modal panel -->
      <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:align-middle {getSizeClasses()}">
        <!-- Header -->
        {#if title || closable}
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            {#if title}
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                {title}
              </h3>
            {/if}

            {#if closable}
              <button
                type="button"
                on:click={close}
                class="ml-auto rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span class="sr-only">Close</span>
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            {/if}
          </div>
        {/if}

        <!-- Content -->
        <div class="px-6 py-4">
          <slot />
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 px-6 py-4">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </button>
{/if}
