import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import ProductCard from './ProductCard.svelte';
import type { Product } from '$lib/types';

// Mock des stores
vi.mock('$lib/stores', () => ({
  cart: {
    subscribe: vi.fn(),
    add: vi.fn()
  },
  favorites: {
    subscribe: vi.fn(),
    isFavorite: vi.fn(() => false),
    toggle: vi.fn()
  }
}));

// Mock du composant FavoriteButton
vi.mock('./FavoriteButton.svelte', () => ({
  default: vi.fn().mockImplementation(() => ({
    $$: {
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      ctx: {}
    }
  }))
}));

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    slug: 'test-product',
    name: 'Test Product',
    description: 'This is a test product',
    price: 2999, // 29.99
    currency: 'EUR',
    image: '/test-image.jpg',
    tags: ['test', 'product'],
    stock: 10,
    active: true
  };

  it('renders product information correctly', () => {
    render(ProductCard, { props: { product: mockProduct } });

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('29,99 €')).toBeInTheDocument();
    expect(screen.getByText('✓ In stock (10 available)')).toBeInTheDocument();
  });

  it('displays out of stock message when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(ProductCard, { props: { product: outOfStockProduct } });

    expect(screen.getByText('✗ Out of stock')).toBeInTheDocument();
  });

  it('shows tags when available', () => {
    render(ProductCard, { props: { product: mockProduct } });

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('product')).toBeInTheDocument();
  });

  it('disables add to cart button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(ProductCard, { props: { product: outOfStockProduct } });

    const addToCartButton = screen.getByRole('button', { name: /out of stock/i });
    expect(addToCartButton).toBeDisabled();
  });

  it('calls add to cart function when button is clicked', async () => {
    const { cart } = await import('$lib/stores');
    const mockAdd = vi.fn();
    cart.add = mockAdd;

    render(ProductCard, { props: { product: mockProduct } });

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    await fireEvent.click(addToCartButton);

    expect(mockAdd).toHaveBeenCalledWith({
      product: mockProduct,
      qty: 1
    });
  });

  it('renders product image with correct attributes', () => {
    render(ProductCard, { props: { product: mockProduct } });

    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('handles products without tags', () => {
    const productWithoutTags = { ...mockProduct, tags: undefined };
    render(ProductCard, { props: { product: productWithoutTags } });

    // Should not crash and should still display product info
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('handles inactive products', () => {
    const inactiveProduct = { ...mockProduct, active: false };
    render(ProductCard, { props: { product: inactiveProduct } });

    // Should still render but could show inactive state
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
