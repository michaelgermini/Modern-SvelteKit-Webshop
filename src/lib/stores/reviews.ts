import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const REVIEWS_KEY = 'webshop_reviews';

// Type pour les avis
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title?: string;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
}

// Store pour les avis
function createReviewsStore() {
  const initialReviews: Review[] = browser
    ? JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]').map((review: any) => ({
        ...review,
        date: new Date(review.date)
      }))
    : [];

  const { subscribe, set, update } = writable<Review[]>(initialReviews);

  // Sauvegarder dans localStorage quand les avis changent
  subscribe((reviews) => {
    if (browser) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    }
  });

  return {
    subscribe,

    // Ajouter un nouvel avis
    add: (reviewData: Omit<Review, 'id' | 'date'>) => {
      const newReview: Review = {
        ...reviewData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        date: new Date()
      };

      update(reviews => [...reviews, newReview]);
      return newReview;
    },

    // Récupérer les avis d'un produit
    getByProductId: (productId: string) => {
      let result: Review[] = [];
      update(reviews => {
        result = reviews
          .filter(review => review.productId === productId)
          .sort((a, b) => b.date.getTime() - a.date.getTime()); // Plus récent en premier
        return reviews;
      });
      return result;
    },

    // Marquer un avis comme utile
    markHelpful: (reviewId: string) => {
      update(reviews =>
        reviews.map(review =>
          review.id === reviewId
            ? { ...review, helpful: review.helpful + 1 }
            : review
        )
      );
    },

    // Supprimer un avis (admin seulement)
    remove: (reviewId: string) => {
      update(reviews => reviews.filter(review => review.id !== reviewId));
    },

    // Obtenir les statistiques d'un produit
    getStats: (productId: string) => {
      const reviews = getByProductId(productId);

      if (reviews.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          recommendedPercentage: 0
        };
      }

      const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      const ratingDistribution = [1, 2, 3, 4, 5].reduce((acc, rating) => {
        acc[rating] = reviews.filter(review => review.rating === rating).length;
        return acc;
      }, {} as Record<number, number>);

      const recommendedReviews = reviews.filter(review => review.rating >= 4).length;
      const recommendedPercentage = Math.round((recommendedReviews / reviews.length) * 100);

      return {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews.length,
        ratingDistribution,
        recommendedPercentage
      };
    },

    // Réinitialiser tous les avis
    clear: () => {
      set([]);
    }
  };
}

export const reviews = createReviewsStore();

// Store dérivé pour les statistiques globales
export const reviewStats = writable({
  totalReviews: 0,
  averageRating: 0,
  productsWithReviews: 0
});

reviews.subscribe(allReviews => {
  if (allReviews.length === 0) {
    reviewStats.set({
      totalReviews: 0,
      averageRating: 0,
      productsWithReviews: 0
    });
    return;
  }

  const totalReviews = allReviews.length;
  const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const uniqueProducts = new Set(allReviews.map(review => review.productId)).size;

  reviewStats.set({
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    productsWithReviews: uniqueProducts
  });
});
