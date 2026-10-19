import { writable } from 'svelte/store';
import type { UserProfileDto } from '../types';
import { apiClient } from '../api/client';
import { toastAction } from './ui.store';
import { securityActions } from './security.store';

export const isAdminAuthenticated = writable<boolean>(false);
export const isAdminLoginModalOpen = writable<boolean>(false);
export const currentUser = writable<UserProfileDto | null>(null);
export const jwtToken = writable<string | null>(apiClient.getToken());

function normalizeAdminUser(user: UserProfileDto | null): UserProfileDto | null {
  if (!user) return null;
  if (user.role === 'SUPER_ADMIN' || user.nik === 'MEPC-DIR-001' || user.name.includes('H. Rusdi')) {
    return {
      ...user,
      name: 'Rusdi Fadli Nuryuda',
    };
  }
  return user;
}

export const authActions = {
  async initAuth() {
    const token = apiClient.getToken();
    if (!token) return;
    try {
      const user = await apiClient.getCurrentUser();
      if (user && user.is_active) {
        currentUser.set(normalizeAdminUser(user));
        isAdminAuthenticated.set(true);
        jwtToken.set(token);
      } else {
        this.logout();
      }
    } catch {
      // In case server is offline or token invalid
    }
  },

  async login(identifier: string, password: string) {
    const res = await apiClient.login({ identifier, password });
    if (res.token && res.user) {
      currentUser.set(normalizeAdminUser(res.user));
      jwtToken.set(res.token);
      isAdminAuthenticated.set(true);
      isAdminLoginModalOpen.set(false);
      toastAction.show(res.message || 'Login berhasil!', 'success');
      return res;
    }
    throw new Error('Respons autentikasi tidak valid');
  },

  async register(payload: {
    nik: string;
    name: string;
    email: string;
    password: string;
    department: string;
    role: string;
    phone?: string;
  }) {
    const res = await apiClient.register(payload);
    if (res.token && res.user) {
      currentUser.set(res.user);
      jwtToken.set(res.token);
      isAdminAuthenticated.set(true);
      isAdminLoginModalOpen.set(false);
      toastAction.show(res.message || 'Pendaftaran staf berhasil!', 'success');
      return res;
    }
    throw new Error('Respons pendaftaran tidak valid');
  },

  async loadSecurityData() {
    return securityActions.loadSecurityData();
  },

  logout() {
    apiClient.setToken(null);
    currentUser.set(null);
    jwtToken.set(null);
    isAdminAuthenticated.set(false);
    toastAction.show('Sesi telah diakhiri. Anda telah logout.', 'info');
  },
};

