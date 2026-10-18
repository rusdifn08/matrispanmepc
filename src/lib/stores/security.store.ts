import { writable } from 'svelte/store';
import type { SecurityAuditLog, SecurityTestReport } from '../types';
import { apiClient } from '../api/client';

export const securityAuditLogs = writable<SecurityAuditLog[]>([]);
export const securityReport = writable<SecurityTestReport | null>(null);

export const securityActions = {
  async loadSecurityData() {
    try {
      const [logs, rep] = await Promise.all([
        apiClient.getAuditLogs(),
        apiClient.getSecurityTestReport(),
      ]);
      if (logs) securityAuditLogs.set(logs);
      if (rep) securityReport.set(rep);
    } catch (e) {
      console.warn('Gagal memuat audit logs / security report', e);
    }
  },
};
