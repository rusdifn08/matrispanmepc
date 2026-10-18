<script lang="ts">
  import type { SupplierRequest } from '../../../../types';

  export let suppliers: SupplierRequest[] = [];
</script>

<table class="w-full text-left text-xs border-collapse">
  <thead>
    <tr class="bg-[#0B2D24] text-white">
      <th class="py-2 px-2.5 font-bold">No. Registrasi</th>
      <th class="py-2 px-2.5 font-bold">Nama Petani / Kelompok</th>
      <th class="py-2 px-2.5 font-bold">Komoditas & Varietas</th>
      <th class="py-2 px-2.5 font-bold">Kapasitas Bulanan</th>
      <th class="py-2 px-2.5 font-bold">Lokasi Gudang / Lahan</th>
      <th class="py-2 px-2.5 font-bold">Kesiapan Panen</th>
      <th class="py-2 px-2.5 font-bold text-center">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    {#each suppliers as sup}
      <tr class="hover:bg-gray-50">
        <td class="py-2 px-2.5 font-mono font-bold text-gray-900">{sup.req_code}</td>
        <td class="py-2 px-2.5 font-medium text-gray-800">
          <div>{sup.supplier_name}</div>
          <div class="text-[10px] text-gray-500">{sup.group_or_cv_name || 'Petani Mandiri'}</div>
        </td>
        <td class="py-2 px-2.5 text-gray-700">
          <div class="font-bold text-emerald-900">{sup.commodity_name}</div>
          <div class="text-[10px] text-gray-500">Kat: {sup.commodity_category}</div>
        </td>
        <td class="py-2 px-2.5 font-mono font-bold text-gray-800">
          {sup.qty_monthly_capacity} {sup.unit}
        </td>
        <td class="py-2 px-2.5 text-gray-700">
          <div>{sup.location_regency}</div>
          <div class="text-[10px] text-gray-500">{sup.location_province}</div>
        </td>
        <td class="py-2 px-2.5 font-mono text-[11px] text-emerald-700">
          {sup.readiness_status}
        </td>
        <td class="py-2 px-2.5 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase {sup.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
            {sup.status}
          </span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
