import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const ORDERS_KEY = 'webshop_orders';

// Types de statuts de commande
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// Interface pour les éléments de commande
export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Interface pour les informations de livraison
export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  method: string;
  cost: number;
}

// Interface pour les informations de paiement
export interface PaymentInfo {
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  amount: number;
  currency: string;
}

// Interface pour l'historique des statuts
export interface StatusHistory {
  status: OrderStatus;
  timestamp: Date;
  note?: string;
}

// Interface principale de commande
export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: ShippingInfo;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  statusHistory: StatusHistory[];
  paymentInfo: PaymentInfo;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
}

// Store pour les commandes
function createOrdersStore() {
  // Commandes de démonstration
  const demoOrders: Order[] = [
    {
      id: 'demo-order-1',
      orderNumber: 'ORD-123456789-ABCDEF',
      customerInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        zipCode: '10001',
        country: 'United States',
        method: 'Standard Shipping',
        cost: 5.99
      },
      items: [
        {
          id: 'item-1',
          productId: '1',
          name: 'Classic T-Shirt',
          price: 19.99,
          quantity: 2,
          image: '/img/tshirt.png'
        },
        {
          id: 'item-2',
          productId: '2',
          name: 'Coffee Mug',
          price: 12.99,
          quantity: 1,
          image: '/img/mug.png'
        }
      ],
      subtotal: 52.97,
      tax: 4.24,
      shipping: 5.99,
      discount: 0,
      total: 63.20,
      currency: 'USD',
      status: 'shipped',
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date('2024-01-15T10:30:00'),
          note: 'Order created'
        },
        {
          status: 'confirmed',
          timestamp: new Date('2024-01-15T11:00:00'),
          note: 'Payment confirmed'
        },
        {
          status: 'processing',
          timestamp: new Date('2024-01-15T14:30:00'),
          note: 'Order being prepared'
        },
        {
          status: 'shipped',
          timestamp: new Date('2024-01-16T09:15:00'),
          note: 'Package shipped via UPS'
        }
      ],
      paymentInfo: {
        method: 'Credit Card',
        status: 'completed',
        transactionId: 'txn_123456789',
        amount: 63.20,
        currency: 'USD'
      },
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-16T09:15:00'),
      estimatedDelivery: new Date('2024-01-20T17:00:00'),
      trackingNumber: '1Z999AA1234567890'
    },
    {
      id: 'demo-order-2',
      orderNumber: 'ORD-987654321-FEDCBA',
      customerInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'user@example.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Avenue',
        city: 'Los Angeles',
        zipCode: '90210',
        country: 'United States',
        method: 'Express Shipping',
        cost: 12.99
      },
      items: [
        {
          id: 'item-3',
          productId: '3',
          name: 'Stickers Pack',
          price: 8.99,
          quantity: 3,
          image: '/img/sticker.png'
        }
      ],
      subtotal: 26.97,
      tax: 2.16,
      shipping: 12.99,
      discount: 5.00,
      total: 36.12,
      currency: 'USD',
      status: 'delivered',
      statusHistory: [
        {
          status: 'pending',
          timestamp: new Date('2024-01-10T15:45:00'),
          note: 'Order created'
        },
        {
          status: 'confirmed',
          timestamp: new Date('2024-01-10T16:00:00'),
          note: 'Payment confirmed'
        },
        {
          status: 'processing',
          timestamp: new Date('2024-01-11T10:30:00'),
          note: 'Order being prepared'
        },
        {
          status: 'shipped',
          timestamp: new Date('2024-01-11T14:20:00'),
          note: 'Package shipped via FedEx'
        },
        {
          status: 'delivered',
          timestamp: new Date('2024-01-13T11:30:00'),
          note: 'Package delivered successfully'
        }
      ],
      paymentInfo: {
        method: 'PayPal',
        status: 'completed',
        transactionId: 'paypal_txn_987654321',
        amount: 36.12,
        currency: 'USD'
      },
      createdAt: new Date('2024-01-10T15:45:00'),
      updatedAt: new Date('2024-01-13T11:30:00'),
      estimatedDelivery: new Date('2024-01-15T17:00:00'),
      trackingNumber: '7777 7777 7777'
    }
  ];

  const initialOrders: Order[] = browser
    ? JSON.parse(localStorage.getItem(ORDERS_KEY) || JSON.stringify(demoOrders)).map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
        statusHistory: order.statusHistory.map((history: any) => ({
          ...history,
          timestamp: new Date(history.timestamp)
        })),
        estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined
      }))
    : demoOrders;

  const { subscribe, set, update } = writable<Order[]>(initialOrders);

  // Sauvegarder dans localStorage quand les commandes changent
  subscribe((orders) => {
    if (browser) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  });

  return {
    subscribe,

    // Créer une nouvelle commande
    create: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'statusHistory'>) => {
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        orderNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
        statusHistory: [{
          status: orderData.status,
          timestamp: new Date(),
          note: 'Order created'
        }]
      };

      update(orders => [...orders, newOrder]);
      return newOrder;
    },

    // Obtenir une commande par ID
    getById: (orderId: string) => {
      let result: Order | null = null;
      update(orders => {
        result = orders.find(order => order.id === orderId) || null;
        return orders;
      });
      return result;
    },

    // Obtenir une commande par numéro de commande
    getByOrderNumber: (orderNumber: string) => {
      let result: Order | null = null;
      update(orders => {
        result = orders.find(order => order.orderNumber === orderNumber) || null;
        return orders;
      });
      return result;
    },

    // Mettre à jour le statut d'une commande
    updateStatus: (orderId: string, newStatus: OrderStatus, note?: string) => {
      update(orders => {
        return orders.map(order => {
          if (order.id === orderId) {
            const newHistoryEntry: StatusHistory = {
              status: newStatus,
              timestamp: new Date(),
              note: note || `Status changed to ${newStatus}`
            };

            return {
              ...order,
              status: newStatus,
              updatedAt: new Date(),
              statusHistory: [...order.statusHistory, newHistoryEntry]
            };
          }
          return order;
        });
      });
    },

    // Ajouter un numéro de suivi
    addTrackingNumber: (orderId: string, trackingNumber: string) => {
      update(orders => {
        return orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              trackingNumber,
              updatedAt: new Date()
            };
          }
          return order;
        });
      });
    },

    // Définir une date de livraison estimée
    setEstimatedDelivery: (orderId: string, estimatedDelivery: Date) => {
      update(orders => {
        return orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              estimatedDelivery,
              updatedAt: new Date()
            };
          }
          return order;
        });
      });
    },

    // Obtenir toutes les commandes d'un client (par email)
    getByCustomerEmail: (email: string) => {
      let result: Order[] = [];
      update(orders => {
        result = orders
          .filter(order => order.customerInfo.email.toLowerCase() === email.toLowerCase())
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return orders;
      });
      return result;
    },

    // Obtenir les statistiques des commandes
    getStats: () => {
      let result = {
        total: 0,
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0
      };

      update(orders => {
        result = orders.reduce((stats, order) => {
          stats.total++;
          stats[order.status]++;
          if (order.status !== 'cancelled') {
            stats.totalRevenue += order.total;
          }
          return stats;
        }, result);

        return orders;
      });

      return result;
    },

    // Annuler une commande
    cancel: (orderId: string, reason?: string) => {
      update(orders => {
        return orders.map(order => {
          if (order.id === orderId) {
            const newHistoryEntry: StatusHistory = {
              status: 'cancelled',
              timestamp: new Date(),
              note: reason || 'Order cancelled by customer'
            };

            return {
              ...order,
              status: 'cancelled',
              updatedAt: new Date(),
              statusHistory: [...order.statusHistory, newHistoryEntry]
            };
          }
          return order;
        });
      });
    },

    // Supprimer une commande (admin seulement)
    remove: (orderId: string) => {
      update(orders => orders.filter(order => order.id !== orderId));
    },

    // Réinitialiser toutes les commandes
    clear: () => {
      set([]);
    }
  };
}

export const orders = createOrdersStore();

// Store pour la commande actuelle (en cours de création)
export const currentOrder = writable<Partial<Order> | null>(null);

// Store dérivé pour les statistiques globales
export const orderStats = writable({
  totalOrders: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  processingOrders: 0
});

orders.subscribe(allOrders => {
  const stats = allOrders.reduce((acc, order) => {
    acc.totalOrders++;
    acc.totalRevenue += order.total;
    if (order.status === 'pending') acc.pendingOrders++;
    if (order.status === 'processing') acc.processingOrders++;
    return acc;
  }, {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0
  });

  orderStats.set(stats);
});

// Fonctions utilitaires pour les statuts
export const ORDER_STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: '⏳'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    icon: '✓'
  },
  processing: {
    label: 'Processing',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    icon: '⚙️'
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    icon: '🚚'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: '📦'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    icon: '❌'
  },
  refunded: {
    label: 'Refunded',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    icon: '↩️'
  }
};
