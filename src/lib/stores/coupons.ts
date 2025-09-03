import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const COUPONS_KEY = 'webshop_coupons';

// Types de coupons
export type CouponType = 'percentage' | 'fixed' | 'free_shipping';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // Pourcentage ou montant fixe
  minOrder?: number; // Montant minimum de commande
  maxDiscount?: number; // Remise maximale pour les pourcentages
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number; // Nombre d'utilisations maximum
  usedCount: number;
  isActive: boolean;
  description: string;
}

// Store pour les coupons
function createCouponsStore() {
  // Coupons par défaut pour la démo
  const defaultCoupons: Coupon[] = [
    {
      id: 'welcome10',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      minOrder: 50,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      description: '10% off on orders over $50'
    },
    {
      id: 'freeship',
      code: 'FREESHIP',
      type: 'free_shipping',
      value: 0,
      minOrder: 75,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 jours
      usageLimit: 50,
      usedCount: 0,
      isActive: true,
      description: 'Free shipping on orders over $75'
    },
    {
      id: 'save20',
      code: 'SAVE20',
      type: 'fixed',
      value: 20,
      maxDiscount: 20,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours
      usageLimit: 25,
      usedCount: 0,
      isActive: true,
      description: '$20 off any order'
    }
  ];

  const initialCoupons: Coupon[] = browser
    ? JSON.parse(localStorage.getItem(COUPONS_KEY) || JSON.stringify(defaultCoupons)).map((coupon: any) => ({
        ...coupon,
        validFrom: new Date(coupon.validFrom),
        validUntil: new Date(coupon.validUntil)
      }))
    : defaultCoupons;

  const { subscribe, set, update } = writable<Coupon[]>(initialCoupons);

  // Sauvegarder dans localStorage quand les coupons changent
  subscribe((coupons) => {
    if (browser) {
      localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
    }
  });

  return {
    subscribe,

    // Valider un code de coupon
    validate: (code: string, orderTotal: number = 0) => {
      let result: { valid: boolean; coupon?: Coupon; discount?: number; error?: string } = {
        valid: false
      };

      update(coupons => {
        const coupon = coupons.find(c => c.code.toLowerCase() === code.toLowerCase() && c.isActive);

        if (!coupon) {
          result = { valid: false, error: 'Invalid coupon code' };
          return coupons;
        }

        const now = new Date();
        if (now < coupon.validFrom || now > coupon.validUntil) {
          result = { valid: false, error: 'Coupon has expired' };
          return coupons;
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          result = { valid: false, error: 'Coupon usage limit exceeded' };
          return coupons;
        }

        if (coupon.minOrder && orderTotal < coupon.minOrder) {
          result = {
            valid: false,
            error: `Minimum order of $${coupon.minOrder} required`
          };
          return coupons;
        }

        // Calculer la remise
        let discount = 0;
        if (coupon.type === 'percentage') {
          discount = (orderTotal * coupon.value) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else if (coupon.type === 'fixed') {
          discount = Math.min(coupon.value, orderTotal);
        } else if (coupon.type === 'free_shipping') {
          // La remise sera calculée au niveau de la livraison
          discount = 0;
        }

        result = {
          valid: true,
          coupon,
          discount
        };

        return coupons;
      });

      return result;
    },

    // Appliquer un coupon (marquer comme utilisé)
    apply: (couponId: string) => {
      update(coupons => {
        return coupons.map(coupon =>
          coupon.id === couponId
            ? { ...coupon, usedCount: coupon.usedCount + 1 }
            : coupon
        );
      });
    },

    // Obtenir tous les coupons actifs
    getActive: () => {
      let result: Coupon[] = [];
      update(coupons => {
        result = coupons.filter(coupon =>
          coupon.isActive &&
          new Date() >= coupon.validFrom &&
          new Date() <= coupon.validUntil &&
          (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit)
        );
        return coupons;
      });
      return result;
    },

    // Ajouter un nouveau coupon (admin)
    add: (couponData: Omit<Coupon, 'id' | 'usedCount'>) => {
      const newCoupon: Coupon = {
        ...couponData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        usedCount: 0
      };

      update(coupons => [...coupons, newCoupon]);
      return newCoupon;
    },

    // Supprimer un coupon (admin)
    remove: (couponId: string) => {
      update(coupons => coupons.filter(coupon => coupon.id !== couponId));
    },

    // Mettre à jour un coupon (admin)
    update: (couponId: string, updates: Partial<Coupon>) => {
      update(coupons => {
        return coupons.map(coupon =>
          coupon.id === couponId
            ? { ...coupon, ...updates }
            : coupon
        );
      });
    },

    // Réinitialiser tous les coupons
    reset: () => {
      set(defaultCoupons);
    }
  };
}

export const coupons = createCouponsStore();

// Store pour le coupon appliqué au panier
export const appliedCoupon = writable<{
  coupon: Coupon;
  discount: number;
} | null>(null);
