<script lang="ts">
  import { favorites } from '$lib/stores';
  import { createEventDispatcher } from 'svelte';

  export let product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };

  const dispatch = createEventDispatcher();

  let isFavorite = false;

  // Vérifier si le produit est dans les favoris
  $: {
    favorites.subscribe((favoritesList) => {
      isFavorite = favoritesList.some(fav => fav.id === product.id);
    });
  }

  function toggleFavorite() {
    favorites.toggle(product);
    isFavorite = !isFavorite;

    dispatch('toggle', {
      product,
      isFavorite
    });
  }
</script>

<button
  on:click={toggleFavorite}
  class="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
>
  <svg
    class="w-5 h-5 transition-colors duration-200 {isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'}"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ></path>
  </svg>
</button>

<style>
  button:hover svg {
    transform: scale(1.1);
  }
</style>
