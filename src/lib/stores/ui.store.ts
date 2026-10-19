import { writable } from 'svelte/store';
import { playNotificationChime } from '../utils';

import type { Product } from '../types';

export const adminDashboardMenu = writable<'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings'>('overview');

export const currentCurrency = writable<'USD' | 'IDR'>('USD');
export const usdExchangeRate = writable<number>(16250);

export const activeSection = writable<string>('hero');
export const activeModal = writable<'cart' | 'supplier' | 'invoice' | 'tracking' | 'product_detail' | 'order_choice' | null>(null);
export const selectedModalProduct = writable<{ product: Product; quantity: number } | null>(null);

export const notificationToast = writable<{
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}>({
  show: false,
  message: '',
  type: 'info',
});

export const toastAction = {
  show(message: string, type: 'success' | 'info' | 'error' = 'info') {
    notificationToast.set({ show: true, message, type });
    playNotificationChime();
    setTimeout(() => {
      notificationToast.set({ show: false, message: '', type: 'info' });
    }, 4500);
  },
};
