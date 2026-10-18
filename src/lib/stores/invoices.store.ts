import { writable } from 'svelte/store';
import type { Invoice } from '../types';

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-089',
    invoice_number: 'INV/MEPC/2026/0089',
    ref_type: 'BUYER_ORDER',
    ref_id: 'ord-sample-089',
    ref_code: 'ORD-MEPC-2026-089',
    approved_by_admin: 'Direktur Operasional & Ekspor PT. MEPC',
    issued_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    total_amount: 224000,
    currency: 'USD',
    payload: {
      invoice_number: 'INV/MEPC/2026/0089',
      title: 'COMMERCIAL / PROFORMA EXPORT INVOICE',
      status: 'APPROVED BY ADMIN',
      issued_date: '15 October 2026',
      due_date: '29 October 2026',
      ref_type: 'BUYER_ORDER',
      ref_code: 'ORD-MEPC-2026-089',
      company_name: 'PT. MATRISPAN EXIM PHOENIX CORP',
      company_address: 'Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia',
      company_email: 'info@matrispanmepc.com',
      company_phone: '+62 851-8311-0510',
      port_of_loading: 'Belawan International Port (IDBLW), North Sumatra, Indonesia',
      recipient_name: 'Hans Dietrich',
      recipient_company: 'Global Spice GmbH',
      recipient_email: 'purchasing@globalspice.de',
      recipient_phone: '+49 152 9841 2300',
      destination_country: 'Germany',
      destination_port: 'Port of Hamburg (DEHAM)',
      incoterms: 'FOB Belawan',
      payment_terms: '30% T/T Advance Deposit upon Proforma confirmation, 70% Irrevocable L/C at sight upon Bill of Lading (B/L)',
      items: [
        {
          description: 'Nutmeg Whole ABCD Grade (Biji Pala Utuh)',
          hs_code: '0908.11.00',
          quantity: 15,
          unit: 'MT',
          unit_price: 8400,
          subtotal: 126000,
        },
        {
          description: 'Cloves Lal Pari Quality (Cengkeh Lal Pari)',
          hs_code: '0907.10.00',
          quantity: 10,
          unit: 'MT',
          unit_price: 9800,
          subtotal: 98000,
        },
      ],
      subtotal: 224000,
      shipping_and_insurance_fee: 0,
      total_amount: 224000,
      currency: 'USD',
      bank_instructions: {
        bank_name: 'PT. BANK MANDIRI (PERSERO) TBK',
        account_name: 'PT. MATRISPAN EXIM PHOENIX CORP',
        account_number: '106-00-1899214-7 (USD / IDR FX ACCOUNT)',
        swift_code: 'BMRIIDJA',
        branch: 'KCP BINJAI JUANDA - SUMATERA UTARA, INDONESIA',
      },
      qr_verification_code: 'https://matrispanmepc.com/verify-invoice?code=INV/MEPC/2026/0089',
      authorized_signatory: 'Direktur Operasional & Ekspor / M. Rusdi',
    },
  },
];

export const invoicesStore = writable<Invoice[]>(initialInvoices);
export const activeInvoice = writable<Invoice | null>(initialInvoices[0]);
