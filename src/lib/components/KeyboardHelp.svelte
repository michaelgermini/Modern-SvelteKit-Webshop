<script lang="ts">
  import { keyboardManager } from '$lib/stores/keyboard';

  export let show = false;

  function close() {
    show = false;
  }

  function getShortcutString(shortcut: any): string {
    return keyboardManager.getShortcutString(shortcut);
  }

  $: shortcuts = keyboardManager.getShortcuts();
  $: navigationShortcuts = shortcuts.filter(s => s.category === 'navigation');
  $: searchShortcuts = shortcuts.filter(s => s.category === 'search');
  $: actionShortcuts = shortcuts.filter(s => s.category === 'actions');
</script>

{#if show}
  <!-- Backdrop -->
  <button
    type="button"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
    on:click={close}
    on:keydown={(e) => { if (e.key === 'Escape') close(); }}
    aria-label="Close keyboard help modal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      on:click|stopPropagation
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 id="keyboard-help-title" class="text-xl font-semibold text-gray-900 dark:text-white">
          ⌨️ Keyboard Shortcuts
        </h2>
        <button
          on:click={close}
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Close keyboard shortcuts"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        {#if navigationShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">🧭 Navigation</h3>
            <div class="space-y-2">
              {#each navigationShortcuts as shortcut}
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-600 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {getShortcutString(shortcut)}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if searchShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">🔍 Search</h3>
            <div class="space-y-2">
              {#each searchShortcuts as shortcut}
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-600 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {getShortcutString(shortcut)}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        {#if actionShortcuts.length > 0}
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">⚡ Actions</h3>
            <div class="space-y-2">
              {#each actionShortcuts as shortcut}
                <div class="flex items-center justify-between py-2">
                  <span class="text-gray-600 dark:text-gray-300">{shortcut.description}</span>
                  <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">
                    {getShortcutString(shortcut)}
                  </kbd>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 rounded-b-lg">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Press <kbd class="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Esc</kbd> to close this dialog
        </p>
      </div>
    </div>
  </button>
{/if}
