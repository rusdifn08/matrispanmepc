<script lang="ts">
  import type { Invoice } from '../../../../types';
  import { formatCurrency } from '../../../../utils';

  export let invoices: Invoice[] = [];
</script>

<table class="w-full text-left text-xs border-collapse">
  <thead>
    <tr class="bg-[#0B2D24] text-white">
      <th class="py-2 px-2.5 font-bold">No. Proforma Invoice</th>
      <th class="py-2 px-2.5 font-bold">Ref Order</th>
      <th class="py-2 px-2.5 font-bold">Penerima (Buyer)</th>
      <th class="py-2 px-2.5 font-bold">Incoterms</th>
      <th class="py-2 px-2.5 font-bold">Tgl Terbit</th>
      <th class="py-2 px-2.5 font-bold text-right">Biaya Kargo (USD)</th>
      <th class="py-2 px-2.5 font-bold text-right">Total Invoice (USD)</th>
      <th class="py-2 px-2.5 font-bold text-center">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    {#each invoices as inv}
      <tr class="hover:bg-gray-50">
        <td class="py-2 px-2.5 font-mono font-bold text-[#0B2D24]">{inv.invoice_number}</td>
        <td class="py-2 px-2.5 font-mono text-gray-600">#{inv.ref_code}</td>
        <td class="py-2 px-2.5 text-gray-800 font-medium">
          <div>{inv.payload.recipient_company}</div>
          <div class="text-[10px] text-gray-500">{inv.payload.destination_country}</div>
        </td>
        <td class="py-2 px-2.5 font-mono font-bold text-[#C88A2E]">{inv.payload.incoterms}</td>
        <td class="py-2 px-2.5 text-gray-600">{inv.payload.issued_date}</td>
        <td class="py-2 px-2.5 text-right font-mono text-gray-700">
          {formatCurrency(inv.payload.subtotal, 'USD')}
        </td>
        <td class="py-2 px-2.5 text-right font-mono font-bold text-[#0B2D24]">
          {formatCurrency(inv.payload.total_amount, 'USD')}
        </td>
        <td class="py-2 px-2.5 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
            {inv.payload.status}
          </span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
