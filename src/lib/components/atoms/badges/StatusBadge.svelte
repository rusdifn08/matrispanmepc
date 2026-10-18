<script lang="ts">
  export let status: 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED' | string = 'PENDING';

  const badgeStyles: Record<string, { bg: string; text: string; label: string; dot: string }> = {
    PENDING: {
      bg: 'bg-amber-50 border-amber-300',
      text: 'text-amber-800',
      label: 'Menunggu Review',
      dot: 'bg-amber-500',
    },
    CONTACTED: {
      bg: 'bg-blue-50 border-blue-300',
      text: 'text-blue-800',
      label: 'Dihubungi via WA',
      dot: 'bg-blue-500',
    },
    APPROVED: {
      bg: 'bg-emerald-50 border-emerald-300',
      text: 'text-emerald-800',
      label: 'Disetujui (Invoice Terbit)',
      dot: 'bg-emerald-500',
    },
    REJECTED: {
      bg: 'bg-rose-50 border-rose-300',
      text: 'text-rose-800',
      label: 'Ditolak / Batal',
      dot: 'bg-rose-500',
    },
  };

  $: style = badgeStyles[status] || badgeStyles.PENDING;
</script>

<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border {style.bg} {style.text}">
  <span class="w-1.5 h-1.5 rounded-full {style.dot}"></span>
  {style.label}
</span>
