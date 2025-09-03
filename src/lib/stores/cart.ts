import { writable } from "svelte/store";
import type { Cart, CartItem } from "$lib/types/cart";
import { browser } from "$app/environment";

const KEY = "webshop-cart";

const initial: Cart = browser
  ? JSON.parse(localStorage.getItem(KEY) ?? "[]")
  : [];

export const cart = writable<Cart>(initial);

cart.subscribe((val) => {
  if (browser) localStorage.setItem(KEY, JSON.stringify(val));
});

export function add(item: CartItem) {
  cart.update((c) => {
    const idx = c.findIndex((i) => i.product.id === item.product.id);
    if (idx > -1) {
      c[idx].qty += item.qty;
      return [...c];
    }
    return [...c, item];
  });
}

export function remove(productId: string) {
  cart.update((c) => c.filter((i) => i.product.id !== productId));
}

export function clear() {
  cart.set([]);
}

export function updateQuantity(productId: string, qty: number) {
  cart.update((c) => {
    const idx = c.findIndex((i) => i.product.id === productId);
    if (idx > -1) {
      if (qty <= 0) {
        return c.filter((i) => i.product.id !== productId);
      }
      c[idx].qty = qty;
      return [...c];
    }
    return c;
  });
}
