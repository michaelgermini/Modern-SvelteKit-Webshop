<script lang="ts">
  import { onMount } from 'svelte';

  export let images: string[] = [];
  export let currentImage: string = '';
  export let alt: string = '';
  export let productName: string = '';

  let currentIndex = 0;
  let isZoomed = false;
  let zoomLevel = 1;

  // Initialiser l'index de l'image courante
  $: if (currentImage && images.length > 0) {
    currentIndex = images.indexOf(currentImage);
    if (currentIndex === -1) currentIndex = 0;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    currentImage = images[currentIndex];
  }

  function previousImage() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    currentImage = images[currentIndex];
  }

  function selectImage(index: number) {
    currentIndex = index;
    currentImage = images[index];
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    zoomLevel = isZoomed ? 1.5 : 1;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (images.length <= 1) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        previousImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextImage();
        break;
      case 'Escape':
        if (isZoomed) {
          toggleZoom();
        }
        break;
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="image-gallery space-y-4">
  <!-- Image principale -->
  <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
    {#if currentImage}
      <img
        src={currentImage}
        alt="{alt || productName}"
        class="w-full h-96 object-contain cursor-zoom-in transition-transform duration-300"
        class:zoomed={isZoomed}
        style="transform: scale({zoomLevel})"
        on:click={toggleZoom}
      />

      <!-- Bouton zoom -->
      <button
        on:click={toggleZoom}
        class="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
        aria-label="{isZoomed ? 'Zoom out' : 'Zoom in'}"
      >
        {#if isZoomed}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7m3 3v-6"></path>
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        {/if}
      </button>

      <!-- Indicateur d'aide -->
      {#if images.length > 1}
        <div class="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
          Use ← → keys to navigate
        </div>
      {/if}
    {:else}
      <!-- Placeholder -->
      <div class="w-full h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
        <div class="text-center text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <p class="text-lg font-medium">No image available</p>
          <p class="text-sm">Image will be added soon</p>
        </div>
      </div>
    {/if}
  </div>

  <!-- Miniatures -->
  {#if images.length > 1}
    <div class="flex space-x-2 overflow-x-auto pb-2">
      {#each images as image, index}
        <button
          on:click={() => selectImage(index)}
          class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
          class:border-primary-500={index === currentIndex}
          class:border-gray-300={!index === currentIndex}
          aria-label="View image {index + 1} of {images.length}"
        >
          <img
            src={image}
            alt="{productName} - Image {index + 1}"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </button>
      {/each}
    </div>

    <!-- Indicateur de position -->
    <div class="text-center text-sm text-gray-600 dark:text-gray-400">
      {currentIndex + 1} / {images.length}
    </div>
  {/if}

  <!-- Contrôles de navigation (pour écrans tactiles) -->
  {#if images.length > 1}
    <div class="flex justify-center space-x-4 mt-4">
      <button
        on:click={previousImage}
        class="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={images.length <= 1}
        aria-label="Previous image"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button
        on:click={nextImage}
        class="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={images.length <= 1}
        aria-label="Next image"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  {/if}
</div>

<style>
  .zoomed {
    cursor: zoom-out;
  }

  .image-gallery img {
    transition: transform 0.3s ease;
  }

  .image-gallery button:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
