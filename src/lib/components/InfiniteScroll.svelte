<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';

  export let threshold = 200; // Distance en pixels avant la fin pour déclencher le chargement
  export let loading = false; // État de chargement
  export let hasMore = true; // S'il reste des éléments à charger
  export let disabled = false; // Désactiver le scroll infini

  const dispatch = createEventDispatcher();

  let scrollTimeout: ReturnType<typeof setTimeout>;

  function handleScroll() {
    if (disabled || loading || !hasMore) return;

    // Debounce pour éviter trop d'appels
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculer la distance par rapport au bas de la page
      const distanceToBottom = documentHeight - (scrollTop + windowHeight);

      // Si on est proche du bas, déclencher le chargement
      if (distanceToBottom < threshold) {
        dispatch('loadMore');
      }
    }, 100);
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (browser) {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      }
    };
  });

  // Mettre à jour l'écouteur quand les propriétés changent
  $: if (browser && !disabled && !loading && hasMore) {
    // L'écouteur est déjà configuré
  }
</script>

<!-- Invisible component that handles scroll detection -->
<div class="sr-only">
  Infinite scroll component
</div>
