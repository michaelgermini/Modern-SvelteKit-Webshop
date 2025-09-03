<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(async () => {
    if (!browser) return;

    // Désactiver complètement les service workers pour éviter les conflits
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
          console.log('Service Worker unregistered:', reg.scope);
        }
        console.log('Service Workers disabled to prevent conflicts');
      } catch (error) {
        console.error('Service Worker cleanup failed:', error);
      }
    }
  });
</script>

<!-- Service Workers disabled to prevent conflicts -->
