<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { keyboardShortcuts } from '$lib/stores/keyboard';

  export let show = false;
  const dispatch = createEventDispatcher();

  function close() {
    show = false;
    dispatch('close');
  }

  $: navigationShortcuts = $keyboardShortcuts.filter(s => s.category === 'navigation');
  $: searchShortcuts = $keyboardShortcuts.filter(s => s.category === 'search');
  $: actionShortcuts = $keyboardShortcuts.filter(s => s.category === 'actions');

  function formatShortcut(shortcut: any) {
    let keyText = shortcut.key.toUpperCase();
    if (shortcut.ctrl) keyText = `Ctrl+${keyText}`;
    if (shortcut.alt) keyText = `Alt+${keyText}`;
    if (shortcut.shift) keyText = `Shift+${keyText}`;
    return keyText;
  }
</script>

{#if show}
  <!-- Backdrop -->
  <button
    type="button"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
    on:click={close}
    on:keydown={(e) => { if (e.key === 'Escape') close(); }}
    aria-label="Close keyboard shortcuts"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      on:click|stopPropagation
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 id="shortcuts-title" class="text-xl font-semibold text-gray-900 dark:text-white">
          ⌨️ Keyboard Shortcuts
        </h2>
        <button
          on:click={close}
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close shortcuts guide"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Search Shortcuts -->
        {#if searchShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Search & Navigation
            </h3>
            <div class="space-y-2">
              {#each searchShortcuts as shortcut}
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Navigation Shortcuts -->
        {#if navigationShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Quick Categories
            </h3>
            <div class="grid grid-cols-2 gap-2">
              {#each navigationShortcuts as shortcut}
                <div class="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span class="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Action Shortcuts -->
        {#if actionShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Actions & Filters
            </h3>
            <div class="space-y-2">
              {#each actionShortcuts as shortcut}
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {formatShortcut(shortcut)}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- General Tips -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">💡 Tips</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Use <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Tab</kbd> to navigate between interactive elements</li>
            <li>• Press <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd> or <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Space</kbd> on product cards to view details</li>
            <li>• All shortcuts work when focused on the page content</li>
            <li>• Shortcuts are case-insensitive</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
        <button
          on:click={close}
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  </button>
{/if}

<style>
  kbd {
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }
</style>
