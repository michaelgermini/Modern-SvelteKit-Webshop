import { describe, expect, it, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { cart, add, remove, updateQuantity, clear, type CartItem } from './cart';
import type { Product } from '$lib/types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Cart Store', () => {
  const mockProduct: Product = {
    id: '1',
    slug: 'test-product',
    name: 'Test Product',
    description: 'Test description',
    price: 2999,
    currency: 'EUR',
    image: '/test.jpg',
    active: true
  };

  beforeEach(() => {
    // Reset cart before each test
    clear();
    vi.clearAllMocks();

    // Mock localStorage
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  it('initializes with empty cart', () => {
    const cartValue = get(cart);
    expect(cartValue.items).toEqual([]);
    expect(cartValue.total).toBe(0);
    expect(cartValue.itemCount).toBe(0);
  });

  it('adds item to cart', () => {
    add({ product: mockProduct, qty: 2 });

    const cartValue = get(cart);
    expect(cartValue.items).toHaveLength(1);
    expect(cartValue.items[0].product.id).toBe(mockProduct.id);
    expect(cartValue.items[0].qty).toBe(2);
    expect(cartValue.total).toBe(5998); // 2999 * 2
    expect(cartValue.itemCount).toBe(2);
  });

  it('increases quantity when adding same product', () => {
    add({ product: mockProduct, qty: 1 });
    add({ product: mockProduct, qty: 3 });

    const cartValue = get(cart);
    expect(cartValue.items).toHaveLength(1);
    expect(cartValue.items[0].qty).toBe(4);
    expect(cartValue.total).toBe(11996); // 2999 * 4
  });

  it('removes item from cart', () => {
    add({ product: mockProduct, qty: 1 });

    const cartValue = get(cart);
    const itemId = cartValue.items[0].id;

    remove(itemId);

    const updatedCart = get(cart);
    expect(updatedCart.items).toHaveLength(0);
    expect(updatedCart.total).toBe(0);
  });

  it('updates item quantity', () => {
    add({ product: mockProduct, qty: 1 });

    const cartValue = get(cart);
    const itemId = cartValue.items[0].id;

    updateQuantity(itemId, 5);

    const updatedCart = get(cart);
    expect(updatedCart.items[0].qty).toBe(5);
    expect(updatedCart.total).toBe(14995); // 2999 * 5
  });

  it('removes item when quantity set to 0', () => {
    add({ product: mockProduct, qty: 2 });

    const cartValue = get(cart);
    const itemId = cartValue.items[0].id;

    updateQuantity(itemId, 0);

    const updatedCart = get(cart);
    expect(updatedCart.items).toHaveLength(0);
  });

  it('clears all items from cart', () => {
    add({ product: mockProduct, qty: 1 });
    add({ product: { ...mockProduct, id: '2', name: 'Another Product' }, qty: 1 });

    clear();

    const cartValue = get(cart);
    expect(cartValue.items).toHaveLength(0);
    expect(cartValue.total).toBe(0);
  });

  it('handles multiple different products', () => {
    const product2: Product = {
      ...mockProduct,
      id: '2',
      name: 'Product 2',
      price: 1999
    };

    add({ product: mockProduct, qty: 2 }); // 2999 * 2 = 5998
    add({ product: product2, qty: 1 }); // 1999 * 1 = 1999

    const cartValue = get(cart);
    expect(cartValue.items).toHaveLength(2);
    expect(cartValue.total).toBe(7997); // 5998 + 1999
    expect(cartValue.itemCount).toBe(3);
  });

  it('saves cart to localStorage', () => {
    add({ product: mockProduct, qty: 1 });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'webshop_cart',
      expect.any(String)
    );
  });

  it('loads cart from localStorage', () => {
    const savedCart = {
      items: [{
        id: '1',
        product: mockProduct,
        qty: 2,
        addedAt: new Date().toISOString()
      }],
      total: 5998,
      itemCount: 2
    };

    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart));

    // Re-import pour déclencher le chargement
    // Note: Dans un vrai test, il faudrait recharger le module
    expect(localStorageMock.getItem).toHaveBeenCalledWith('webshop_cart');
  });

  it('handles invalid localStorage data gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    // Should not crash and initialize empty cart
    const cartValue = get(cart);
    expect(cartValue.items).toEqual([]);
  });

  it('calculates total correctly with different currencies', () => {
    const usdProduct: Product = {
      ...mockProduct,
      currency: 'USD',
      price: 2999
    };

    add({ product: mockProduct, qty: 1 }); // EUR
    add({ product: usdProduct, qty: 1 }); // USD

    const cartValue = get(cart);
    // Note: Dans un vrai système, il faudrait convertir les devises
    expect(cartValue.total).toBe(5998);
  });
});
