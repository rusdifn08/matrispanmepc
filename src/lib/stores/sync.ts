import { writable } from 'svelte/store';
import type { DashboardStats } from '../types';
import { apiClient } from '../api/client';
import { productsStore, sanitizeProductImage } from './products.store';
import { ordersStore } from './orders.store';
import { supplierRequestsStore } from './suppliers.store';
import { invoicesStore } from './invoices.store';
import { messagesStore } from './messages.store';
import { toastAction } from './ui.store';

export const dashboardStatsStore = writable<DashboardStats | null>(null);

export async function syncBackendData() {
  try {
    const [prods, ords, sups, invs, msgs, stats] = await Promise.all([
      apiClient.getProducts(),
      apiClient.getOrders(),
      apiClient.getSuppliers(),
      apiClient.getInvoices(),
      apiClient.getMessages(),
      apiClient.getStats(),
    ]);

    if (prods && prods.length > 0) {
      productsStore.set(prods.map(sanitizeProductImage));
    }
    if (ords && ords.length > 0) ordersStore.set(ords);
    if (sups && sups.length > 0) supplierRequestsStore.set(sups);
    if (invs && invs.length > 0) invoicesStore.set(invs);
    if (msgs && msgs.length > 0) messagesStore.set(msgs);
    if (stats) dashboardStatsStore.set(stats);
  } catch (e) {
    console.warn('Backend sync failed, using reactive fallback', e);
  }
}
