import { writable, derived } from 'svelte/store';
import type { AdminMessage } from '../types';
import { apiClient } from '../api/client';
import { toastAction } from './ui.store';

// Seed initial admin messages (WhatsApp & Web Inquiries)
const initialMessages: AdminMessage[] = [
  {
    id: 'msg-inq-101',
    sender_name: 'Hans Dietrich',
    sender_company: 'Global Spice GmbH',
    sender_phone: '+49 152 9841 2300',
    sender_email: 'purchasing@globalspice.de',
    channel: 'WHATS_APP',
    subject: 'Inquiry: COA & Phytosanitary Certificate for Nutmeg ABCD',
    content: 'Good day PT. MEPC team. Following our order ORD-MEPC-2026-089, could you please confirm the lab report for aflatoxin levels and expected shipment schedule from Port of Belawan?',
    ref_code: 'ORD-MEPC-2026-089',
    status: 'UNREAD',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'msg-inq-102',
    sender_name: 'Tariq Al-Mansoor',
    sender_company: 'Gulf Spices Trading LLC',
    sender_phone: '+971 50 123 4567',
    sender_email: 'tariq@gulfspices.ae',
    channel: 'WEB_INQUIRY',
    subject: 'Request for Quotation: White Copra Edible Grade 25 MT CIF Jebel Ali',
    content: 'Dear Export Division, We submitted order ORD-MEPC-2026-092 via your portal. Kindly provide official CIF Jebel Ali quotation and confirm 20ft container packing specs.',
    ref_code: 'ORD-MEPC-2026-092',
    status: 'UNREAD',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'msg-inq-103',
    sender_name: 'Bapak Tumpal Sembiring',
    sender_company: 'Kelompok Tani Rempah Dairi Makmur',
    sender_phone: '+62 812-6345-9981',
    channel: 'WHATS_APP',
    subject: 'Konfirmasi Sampel Biji Pala Dairi Sudah Dikirim ke Medan',
    content: 'Selamat siang admin PT. MEPC, sampel biji pala super 2 kg sudah kami kirim melalui ekspedisi ke kantor Medan untuk uji lab moisture. Mohon kabari jika sudah tiba.',
    ref_code: 'SUP-MEPC-2026-042',
    status: 'READ',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'msg-inq-104',
    sender_name: 'Kenji Takahashi',
    sender_company: 'Nippon Marine Foods Corp',
    sender_phone: '+81 3 5555 0199',
    sender_email: 'k.takahashi@nipponmarine.co.jp',
    channel: 'WEB_INQUIRY',
    subject: 'Cold Chain Data Logger & Blast Freezing Specifications',
    content: 'Greetings. Regarding our Black Tiger shrimp inquiries, please verify if temperature logging data recorders (Sensitech) are inserted into every reefer container at Belawan.',
    ref_code: 'ORD-MEPC-2026-095',
    status: 'REPLIED',
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
];

export const messagesStore = writable<AdminMessage[]>(initialMessages);

export const unreadMessagesCount = derived(messagesStore, ($msgs) =>
  $msgs.filter((m) => m.status === 'UNREAD').length
);

export const messageActions = {
  async markRead(id: string) {
    messagesStore.update((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, status: 'READ' as const } : m))
    );
    try {
      await apiClient.markMessageRead(id);
    } catch {}
  },

  async replyMessage(id: string, replyText: string) {
    messagesStore.update((msgs) =>
      msgs.map((m) => (m.id === id ? { ...m, status: 'REPLIED' as const } : m))
    );
    try {
      await apiClient.replyMessage(id, replyText, 'Admin Operasional PT. MEPC');
    } catch {}
    toastAction.show('Balasan berhasil disimpan dan dicatat!', 'success');
  },

  async submitMessage(payload: {
    sender_name: string;
    sender_company?: string;
    sender_phone: string;
    sender_email?: string;
    channel: 'WHATS_APP' | 'WEB_INQUIRY' | 'EMAIL';
    subject: string;
    content: string;
    ref_code?: string;
  }) {
    const newMsg: AdminMessage = {
      id: `msg-${Date.now()}`,
      ...payload,
      status: 'UNREAD',
      created_at: new Date().toISOString(),
    };
    messagesStore.update((msgs) => [newMsg, ...msgs]);
    try {
      await apiClient.createMessage(newMsg);
    } catch {}
    toastAction.show('Pesan inquiry berhasil dikirimkan ke Admin!', 'success');
    return newMsg;
  },
};
