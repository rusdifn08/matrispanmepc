import { writable, derived } from 'svelte/store';
import type { SupplierRequest } from '../types';
import { apiClient } from '../api/client';
import { MEPC_ADMIN_WA } from '../utils';
import { toastAction } from './ui.store';

export const initialSupplierRequests: SupplierRequest[] = [
  {
    id: 'sup-sample-042',
    req_code: 'SUP-MEPC-2026-042',
    supplier_name: 'Bapak Tumpal Sembiring',
    group_or_cv_name: 'Kelompok Tani Rempah Dairi Makmur',
    location_regency: 'Kabupaten Dairi',
    location_province: 'Sumatera Utara',
    whatsapp_number: '+62 812-6345-9981',
    commodity_category: 'Spices',
    commodity_name: 'Biji Pala Asalan & ABCD Grade',
    qty_monthly_capacity: 20,
    unit: 'Ton',
    moisture_or_grade: 'Kadar Air < 11%, Mutu Super ABCD',
    offered_price_idr: 95000,
    readiness_status: 'Ready Stock',
    notes: 'Panen raya musim ini melimpah, siap kirim ke gudang PT. MEPC di Medan/Binjai setiap dua minggu.',
    status: 'PENDING',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'sup-sample-045',
    req_code: 'SUP-MEPC-2026-045',
    supplier_name: 'Ibu Ratna Saragih',
    group_or_cv_name: 'Koperasi Produsen Kelapa Asahan',
    location_regency: 'Kabupaten Asahan',
    location_province: 'Sumatera Utara',
    whatsapp_number: '+62 813-7721-0044',
    commodity_category: 'Coconut',
    commodity_name: 'Briket Arang Kelapa Shisha & Barbeque',
    qty_monthly_capacity: 35,
    unit: 'Ton',
    moisture_or_grade: 'Abu Putih < 2.2%, Kalori 7300 Kcal',
    offered_price_idr: 16500,
    readiness_status: 'Ready Stock',
    notes: 'Pabrik briket kami memiliki 4 oven rotary dan kapasitas continue untuk ekspor Timur Tengah.',
    status: 'PENDING',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

export const supplierRequestsStore = writable<SupplierRequest[]>(initialSupplierRequests);

export const pendingSuppliersCount = derived(supplierRequestsStore, ($reqs) =>
  $reqs.filter((r) => r.status === 'PENDING').length
);

export const supplierActions = {
  async submitRequest(formData: {
    supplier_name: string;
    group_or_cv_name: string;
    location_regency: string;
    location_province: string;
    whatsapp_number: string;
    commodity_category: string;
    commodity_name: string;
    qty_monthly_capacity: number;
    unit: string;
    moisture_or_grade: string;
    offered_price_idr: number;
    readiness_status: string;
    notes?: string;
  }): Promise<{ request: SupplierRequest; waUrl: string }> {
    const nextNum = Math.floor(10 + Math.random() * 89);
    const reqCode = `SUP-MEPC-2026-${nextNum}`;

    const newReq: SupplierRequest = {
      id: `sup-${Date.now()}`,
      req_code: reqCode,
      ...formData,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    };

    supplierRequestsStore.update((reqs) => [newReq, ...reqs]);

    try {
      await apiClient.createSupplier(newReq);
    } catch {}

    const waMsg =
`*[NOTIFIKASI PENGAJUAN SUPLAI BARU - PT. MEPC]*
No. Pengajuan : #${reqCode}
Mitra / Kelompok Tani : ${formData.group_or_cv_name}
Nama Kontak : ${formData.supplier_name}
Komoditas : ${formData.commodity_name} (${formData.commodity_category})
Kapasitas Rutin : ${formData.qty_monthly_capacity} ${formData.unit}/Bulan
Lokasi Kebun/Gudang : ${formData.location_regency}, ${formData.location_province}
Kadar Air / Mutu : ${formData.moisture_or_grade}
Harga Pengajuan : IDR ${new Intl.NumberFormat('id-ID').format(formData.offered_price_idr)} / ${formData.unit}
Status Kesiapan : ${formData.readiness_status}
Kontak WA Mitra : ${formData.whatsapp_number}
Catatan : ${formData.notes || '-'}

_Pesan otomatis dicatat di Antrean Dashboard Admin PT. MEPC_`;

    const waUrl = `https://wa.me/${MEPC_ADMIN_WA}?text=${encodeURIComponent(waMsg)}`;
    toastAction.show(`Pengajuan suplai #${reqCode} berhasil dicatat! Menunggu verifikasi tim logistik.`, 'success');
    return { request: newReq, waUrl };
  },

  async approveRequest(reqId: string) {
    supplierRequestsStore.update((reqs) =>
      reqs.map((r) => (r.id === reqId ? { ...r, status: 'APPROVED' as const } : r))
    );
    try {
      await apiClient.updateSupplierStatus(reqId, 'APPROVED');
    } catch {}
    toastAction.show('Pengajuan mitra petani/pemasok disetujui (OKE)!', 'success');
  },

  async rejectRequest(reqId: string) {
    supplierRequestsStore.update((reqs) =>
      reqs.map((r) => (r.id === reqId ? { ...r, status: 'REJECTED' as const } : r))
    );
    try {
      await apiClient.updateSupplierStatus(reqId, 'REJECTED');
    } catch {}
    toastAction.show('Pengajuan mitra ditolak/arsip.', 'error');
  },

  async markContacted(reqId: string) {
    supplierRequestsStore.update((reqs) =>
      reqs.map((r) => (r.id === reqId ? { ...r, status: 'CONTACTED' as const } : r))
    );
    try {
      await apiClient.updateSupplierStatus(reqId, 'CONTACTED');
    } catch {}
    toastAction.show('Mitra berhasil ditandai telah dihubungi via WA.', 'info');
  },
};
