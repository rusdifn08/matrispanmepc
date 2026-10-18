<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { AdminMessage } from '../../../../types';
  import { formatDate, getWhatsAppChatUrl } from '../../../../utils';

  export let message: AdminMessage | null = null;
  export let isOpen: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    reply: { id: string; replyText: string };
  }>();

  let replyText = '';

  function handleSendReply() {
    if (message && replyText.trim()) {
      dispatch('reply', { id: message.id, replyText: replyText.trim() });
      replyText = '';
    }
  }
</script>

{#if isOpen && message}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
      <div class="bg-teal-900 text-white p-5 flex items-center justify-between">
        <div>
          <span class="text-xs font-mono text-teal-200">PUSAT PESAN & INQUIRY</span>
          <h3 class="text-base font-bold font-heading">{message.subject}</h3>
        </div>
        <button
          type="button"
          on:click={() => dispatch('close')}
          class="text-teal-300 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4 text-xs">
        <div class="p-4 rounded-2xl bg-[#F8F6F0] space-y-1">
          <div class="flex items-center justify-between">
            <strong class="text-gray-900 text-sm">{message.sender_name}</strong>
            <span class="text-gray-400 text-[11px]">{formatDate(message.created_at)}</span>
          </div>
          <div class="text-gray-600">{message.sender_company || 'Perorangan / Trader'}</div>
          <div class="text-gray-600">Kontak: {message.sender_phone} {message.sender_email ? `• ${message.sender_email}` : ''}</div>
        </div>

        <div class="p-4 rounded-2xl border border-gray-200 bg-white">
          <span class="text-gray-400 block text-[10px] uppercase font-bold mb-1">Isi Pesan Masuk:</span>
          <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        <div>
          <label for="reply-box" class="font-bold text-gray-800 block mb-1">
            Balasan Resmi Admin PT. MEPC:
          </label>
          <textarea
            id="reply-box"
            rows="4"
            bind:value={replyText}
            placeholder="Tuliskan jawaban klarifikasi spesifikasi, COA, jadwal pengapalan kapal, atau kuotasi harga..."
            class="w-full p-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-teal-500 outline-none"
          ></textarea>
        </div>
      </div>

      <div class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <a
          href={getWhatsAppChatUrl(message.sender_phone, `Halo ${message.sender_name}, kami dari Tim Ekspor PT. MATRISPAN EXIM PHOENIX CORP menanggapi pertanyaan Anda: "${message.subject}".`)}
          target="_blank"
          rel="noopener noreferrer"
          class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
        >
          Balas Langsung via WA
        </a>

        <div class="flex items-center gap-2">
          <button
            type="button"
            on:click={handleSendReply}
            class="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs"
          >
            Simpan Balasan Resmi
          </button>
          <button
            type="button"
            on:click={() => dispatch('close')}
            class="px-3 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
