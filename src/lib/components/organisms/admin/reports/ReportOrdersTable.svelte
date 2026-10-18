<script lang="ts">
  import type { BuyerOrder } from '../../../../types';
  import { formatCurrency } from '../../../../utils';

  export let orders: BuyerOrder[] = [];
</script>

<table class="w-full text-left text-xs border-collapse">
  <thead>
    <tr class="bg-[#0B2D24] text-white">
      <th class="py-2 px-2.5 font-bold">Kode Order</th>
      <th class="py-2 px-2.5 font-bold">Perusahaan Buyer</th>
      <th class="py-2 px-2.5 font-bold">Negara Tujuan</th>
      <th class="py-2 px-2.5 font-bold">Komoditas & Kuantitas</th>
      <th class="py-2 px-2.5 font-bold">Incoterms</th>
      <th class="py-2 px-2.5 font-bold text-right">Nilai Total (USD)</th>
      <th class="py-2 px-2.5 font-bold text-center">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    {#each orders as order}
      <tr class="hover:bg-gray-50">
        <td class="py-2 px-2.5 font-mono font-bold text-gray-900">{order.order_code}</td>
        <td class="py-2 px-2.5 font-medium text-gray-800">
          <div>{order.company_name}</div>
          <div class="text-[10px] text-gray-500">Attn: {order.buyer_name}</div>
        </td>
        <td class="py-2 px-2.5 text-gray-700">{order.destination_country}</td>
        <td class="py-2 px-2.5 text-gray-700">
          {#each order.items as item}
            <div class="text-[11px]">• {item.product_name} ({item.quantity} {item.unit})</div>
          {/each}
        </td>
        <td class="py-2 px-2.5 font-mono font-bold text-[#C88A2E]">{order.incoterms}</td>
        <td class="py-2 px-2.5 text-right font-mono font-bold text-[#0B2D24]">
          {formatCurrency(order.total_amount, 'USD')}
        </td>
        <td class="py-2 px-2.5 text-center">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase {order.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : (order.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800')}">
            {order.status}
          </span>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
