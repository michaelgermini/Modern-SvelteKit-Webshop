<script lang="ts">
  import { onMount } from 'svelte';

  export let src = '';
  export let alt = '';
  export let width = '';
  export let height = '';
  export let className = '';
  export let loading: 'lazy' | 'eager' = 'lazy';
  export let quality = 80;
  export let placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEgxMDBWODBIMjBaIiBmaWxsPSIjRTVFNUU1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUI5QkE5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg==';

  let imgElement: HTMLImageElement;
  let isLoaded = false;
  let hasError = false;
  let isInView = false;
  let observer: IntersectionObserver | null = null;

  // Fonction pour optimiser l'URL de l'image (si vous utilisez un service comme Cloudinary)
  function optimizeImageUrl(url: string, quality: number = 80): string {
    // Pour cet exemple, on retourne l'URL originale
    // Dans un vrai projet, vous pourriez utiliser :
    // - Cloudinary: url.replace('/upload/', `/upload/q_${quality}/`)
    // - Imgix: url + `?q=${quality}`
    // - Votre propre service d'optimisation
    return url;
  }

  function handleLoad() {
    isLoaded = true;
    hasError = false;
  }

  function handleError() {
    hasError = true;
    isLoaded = false;
  }

  // Intersection Observer pour le lazy loading
  function setupIntersectionObserver() {
    if (!imgElement || loading !== 'lazy') return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView = true;
            observer?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Commencer le chargement 50px avant que l'image soit visible
        threshold: 0.1
      }
    );

    observer.observe(imgElement);
  }

  onMount(() => {
    setupIntersectionObserver();

    return () => {
      observer?.disconnect();
    };
  });

  $: optimizedSrc = optimizeImageUrl(src, quality);
  $: shouldLoad = loading === 'eager' || isInView;
</script>

<div class="relative {className}" style="width: {width}; height: {height}">
  <!-- Placeholder/Skeleton -->
  {#if !isLoaded && !hasError}
    <div
      class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
      style="background-image: url({placeholder}); background-size: cover; background-position: center;"
    ></div>
  {/if}

  <!-- Image principale -->
  {#if shouldLoad}
    <img
      bind:this={imgElement}
      src={optimizedSrc}
      {alt}
      {width}
      {height}
      class="w-full h-full object-cover transition-opacity duration-300 {isLoaded ? 'opacity-100' : 'opacity-0'}"
      on:load={handleLoad}
      on:error={handleError}
      loading={loading}
      decoding="async"
    />
  {/if}

  <!-- Placeholder de secours en cas d'erreur -->
  {#if hasError}
    <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded">
      <div class="text-center text-gray-500 dark:text-gray-400">
        <svg class="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-sm">Image unavailable</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
