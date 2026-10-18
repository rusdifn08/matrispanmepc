<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { messagesStore } from '../../../../stores';
  import type { AdminMessage } from '../../../../types';
  import { formatDate, getWhatsAppChatUrl } from '../../../../utils';

  const dispatch = createEventDispatcher<{
    openMessageDetail: AdminMessage;
  }>();

  let messageSearch = '';
  let messageStatusFilter: 'ALL' | 'UNREAD' | 'READ' | 'REPLIED' = 'ALL';
  let messageChannelFilter = 'ALL';

  $: filteredMessages = $messagesStore.filter((m) => {
    const matchStatus = messageStatusFilter === 'ALL' || m.status === messageStatusFilter;
    const matchChannel = messageChannelFilter === 'ALL' || m.channel === messageChannelFilter;
    const matchSearch =
      !messageSearch ||
      m.sender_name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (m.sender_company && m.sender_company.toLowerCase().includes(messageSearch.toLowerCase())) ||
      m.subject.toLowerCase().includes(messageSearch.toLowerCase()) ||
      m.content.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (m.ref_code && m.ref_code.toLowerCase().includes(messageSearch.toLowerCase()));
    return matchStatus && matchChannel && matchSearch;
  });
</script>

<div class="space-y-5 animate-in fade-in duration-200">
  <!-- Control Bar -->
  <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
    <div class="relative flex-1">
      <input
        type="text"
        bind:value={messageSearch}
        placeholder="Cari pengirim pesan, perusahaan, subjek, isi pesan, nomor WA..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none"
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      {#each ['ALL', 'UNREAD', 'READ', 'REPLIED'] as st}
        <button
          type="button"
          on:click={() => (messageStatusFilter = st as any)}
          class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors {messageStatusFilter === st ? 'bg-teal-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        >
          {st === 'ALL' ? 'Semua Status' : st === 'UNREAD' ? 'Belum Dibaca' : st === 'READ' ? 'Sudah Dibaca' : 'Sudah Dibalas'}
        </button>
      {/each}
    </div>
  </div>

  <!-- Messages Grid / List -->
  {#if filteredMessages.length === 0}
    <div class="bg-white rounded-3xl p-12 text-center border border-gray-200">
      <p class="text-sm text-gray-500">Kotak masuk kosong atau tidak ada pesan sesuai filter.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredMessages as msg}
        <div
          class="bg-white rounded-3xl p-5 border {msg.status === 'UNREAD' ? 'border-teal-500/60 shadow-md ring-2 ring-teal-500/10' : 'border-gray-200 shadow-sm'} flex flex-col justify-between gap-4 transition-all"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase {msg.channel === 'WHATS_APP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">
                  {msg.channel === 'WHATS_APP' ? 'WhatsApp Direct' : 'Web Inquiry'}
                </span>
                {#if msg.ref_code}
                  <span class="font-mono text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    Ref: {msg.ref_code}
                  </span>
                {/if}
              </div>

              <span class="text-[11px] text-gray-400">
                {formatDate(msg.created_at)}
              </span>
            </div>

            <h4 class="text-sm font-bold text-gray-900 line-clamp-1">
              {msg.subject}
            </h4>

            <p class="text-xs text-gray-600 mt-1 line-clamp-3 leading-relaxed">
              "{msg.content}"
            </p>

            <div class="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
              <strong>{msg.sender_name}</strong>
              {#if msg.sender_company}
                <span class="text-gray-400">({msg.sender_company})</span>
              {/if}
              <div class="text-[11px] text-gray-400 mt-0.5">
                Tel/WA: {msg.sender_phone} {msg.sender_email ? `• ${msg.sender_email}` : ''}
              </div>
            </div>
          </div>

          <!-- Action Footer -->
          <div class="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div>
              {#if msg.status === 'UNREAD'}
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Belum Dibaca
                </span>
              {:else if msg.status === 'REPLIED'}
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  ✓ Sudah Dibalas
                </span>
              {:else}
                <span class="text-[11px] text-gray-400">Sudah Dibaca</span>
              {/if}
            </div>

            <div class="flex items-center gap-2">
              <!-- WhatsApp Link -->
              <a
                href={getWhatsAppChatUrl(msg.sender_phone, `Halo ${msg.sender_name}, kami dari Tim Ekspor PT. MATRISPAN EXIM PHOENIX CORP menanggapi pertanyaan Anda: "${msg.subject}".`)}
                target="_blank"
                rel="noopener noreferrer"
                class="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors"
                title="Balas via WhatsApp"
              >
                Buka WA
              </a>

              <!-- Read / Reply Modal -->
              <button
                type="button"
                on:click={() => dispatch('openMessageDetail', msg)}
                class="px-3 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold transition-colors"
              >
                Buka & Balas
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
