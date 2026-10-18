import { writable, derived } from 'svelte/store';
import type { CartItem, Product } from '../types';
import { toastAction } from './ui.store';

export const cartStore = writable<CartItem[]>([]);

export const cartCount = derived(cartStore, ($cart) =>
  $cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotalUsd = derived(cartStore, ($cart) =>
  $cart.reduce((sum, item) => sum + item.quantity * item.product.price_estimate_usd, 0)
);

export const cartActions = {
  addItem(product: Product, quantity = product.min_order_qty, packaging_notes = '') {
    cartStore.update((items) => {
      const idx = items.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        items[idx].quantity += quantity;
        if (packaging_notes) items[idx].packaging_notes = packaging_notes;
        return [...items];
      }
      return [...items, { product, quantity, unit: product.unit, packaging_notes }];
    });
    toastAction.show(`Ditambahkan ke keranjang: ${product.name} (${quantity} ${product.unit})`, 'success');
  },

  removeItem(productId: string) {
    cartStore.update((items) => items.filter((i) => i.product.id !== productId));
  },

  updateQty(productId: string, qty: number) {
    cartStore.update((items) => {
      const target = items.find((i) => i.product.id === productId);
      if (target) {
        target.quantity = Math.max(target.product.min_order_qty, qty);
      }
      return [...items];
    });
  },

  clear() {
    cartStore.set([]);
  },
};
