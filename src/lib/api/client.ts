import type {
  AdminMessage,
  BuyerOrder,
  DashboardStats,
  Invoice,
  Product,
  SupplierRequest,
  AuthResponse,
  UserProfileDto,
  SecurityAuditLog,
  SecurityTestReport,
} from '../types';

const RAW_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'https://backend-matrispanmepc.onrender.com';
export const BACKEND_URL = RAW_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '');
export const API_BASE = `${BACKEND_URL}/api`;

let authToken: string | null = typeof localStorage !== 'undefined' ? localStorage.getItem('mepc_jwt_token') : null;

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
}

export const apiClient = {
  setToken(token: string | null) {
    authToken = token;
    if (typeof localStorage !== 'undefined') {
      if (token) {
        localStorage.setItem('mepc_jwt_token', token);
      } else {
        localStorage.removeItem('mepc_jwt_token');
      }
    }
  },

  getToken(): string | null {
    return authToken;
  },

  async login(payload: { identifier: string; password: string }): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: payload.identifier,
        username: payload.identifier,
        password: payload.password,
      }),
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      data = { message: `Gagal menghubungkan ke server (${res.status} ${res.statusText})` };
    }

    if (!res.ok) {
      throw new Error(data.message || data.error || `Login gagal (${res.status})`);
    }

    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async register(payload: {
    nik: string;
    name: string;
    email: string;
    password: string;
    department: string;
    role: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registrasi gagal');
    }

    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async getCurrentUser(): Promise<UserProfileDto | null> {
    if (!authToken) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) return await res.json();
    } catch {
      // Ignored
    }
    return null;
  },

  async getAuditLogs(): Promise<SecurityAuditLog[]> {
    try {
      const res = await fetch(`${API_BASE}/auth/audit-logs`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async getSecurityTestReport(): Promise<SecurityTestReport | null> {
    try {
      const res = await fetch(`${API_BASE}/auth/security-test`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },
  async getProducts(category?: string): Promise<Product[]> {
    try {
      const url = category ? `${API_BASE}/products?category=${encodeURIComponent(category)}` : `${API_BASE}/products`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async updateProduct(id: string, payload: { price_estimate_usd?: number; min_order_qty?: number; featured?: boolean }): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async getOrders(): Promise<BuyerOrder[]> {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async createOrder(payload: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback handled in store
    }
    return null;
  },

  async updateOrderStatus(id: string, status: string, adjustedTotal?: number): Promise<BuyerOrder | null> {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adjusted_total_amount: adjustedTotal }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async getSuppliers(): Promise<SupplierRequest[]> {
    try {
      const res = await fetch(`${API_BASE}/suppliers`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async createSupplier(payload: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async updateSupplierStatus(id: string, status: string, agreedPrice?: number): Promise<SupplierRequest | null> {
    try {
      const res = await fetch(`${API_BASE}/suppliers/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, agreed_price_idr: agreedPrice }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async getInvoices(): Promise<Invoice[]> {
    try {
      const res = await fetch(`${API_BASE}/invoices`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async getMessages(): Promise<AdminMessage[]> {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return [];
  },

  async createMessage(payload: any): Promise<AdminMessage | null> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async markMessageRead(id: string): Promise<AdminMessage | null> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/read`, {
        method: 'PATCH',
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async replyMessage(id: string, replyContent: string, adminUser: string): Promise<AdminMessage | null> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply_content: replyContent, admin_user: adminUser }),
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async getStats(): Promise<DashboardStats | null> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },

  async getMetrics(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/metrics`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return null;
  },
};
