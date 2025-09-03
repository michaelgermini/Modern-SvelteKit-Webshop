import { onMount } from 'svelte';
import { browser } from '$app/environment';

interface InfiniteScrollOptions {
  threshold?: number;
  loading?: boolean;
  hasMore?: boolean;
  disabled?: boolean;
}

interface InfiniteScrollReturn {
  cleanup: () => void;
}

export function useInfiniteScroll(
  callback: () => void,
  options: InfiniteScrollOptions = {}
): InfiniteScrollReturn {
  const {
    threshold = 200,
    loading = false,
    hasMore = true,
    disabled = false
  } = options;

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

      // Si on est proche du bas, déclencher le callback
      if (distanceToBottom < threshold) {
        callback();
      }
    }, 100);
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll);
    }
  });

  const cleanup = () => {
    if (browser) {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    }
  };

  return { cleanup };
}
