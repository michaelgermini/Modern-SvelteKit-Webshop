import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const FAVORITES_KEY = 'webshop_favorites';

// Type pour les éléments favoris
export interface FavoriteItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  addedAt: Date;
}

// Store pour les favoris
function createFavoritesStore() {
  const initialFavorites: FavoriteItem[] = browser
    ? JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]').map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }))
    : [];

  const { subscribe, set, update } = writable<FavoriteItem[]>(initialFavorites);

  // Sauvegarder dans localStorage quand les favoris changent
  subscribe((favorites) => {
    if (browser) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  });

  return {
    subscribe,
    add: (product: { id: string; slug: string; name: string; price: number; image: string }) => {
      update(favorites => {
        // Vérifier si le produit est déjà dans les favoris
        const exists = favorites.some(fav => fav.id === product.id);

        if (exists) {
          return favorites;
        }

        // Ajouter le nouveau favori
        const newFavorite: FavoriteItem = {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          addedAt: new Date()
        };

        return [...favorites, newFavorite];
      });
    },
    remove: (productId: string) => {
      update(favorites => favorites.filter(fav => fav.id !== productId));
    },
    isFavorite: (productId: string) => {
      let result = false;
      update(favorites => {
        result = favorites.some(fav => fav.id === productId);
        return favorites;
      });
      return result;
    },
    toggle: (product: { id: string; slug: string; name: string; price: number; image: string }) => {
      update(favorites => {
        const exists = favorites.some(fav => fav.id === product.id);

        if (exists) {
          // Supprimer des favoris
          return favorites.filter(fav => fav.id !== product.id);
        } else {
          // Ajouter aux favoris
          const newFavorite: FavoriteItem = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            addedAt: new Date()
          };
          return [...favorites, newFavorite];
        }
      });
    },
    clear: () => {
      set([]);
    }
  };
}

export const favorites = createFavoritesStore();

// Store dérivé pour le compteur de favoris
export const favoritesCount = writable(0);
favorites.subscribe(favorites => {
  favoritesCount.set(favorites.length);
});
