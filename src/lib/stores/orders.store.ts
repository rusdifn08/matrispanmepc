import { writable, derived } from 'svelte/store';
import type { BuyerOrder, CartItem, Invoice } from '../types';
import { apiClient } from '../api/client';
import { MEPC_ADMIN_WA } from '../utils';
import { toastAction, activeModal } from './ui.store';
import { cartActions } from './cart.store';
import { invoicesStore, activeInvoice } from './invoices.store';

export const initialOrders: BuyerOrder[] = [
  {
    id: 'ord-sample-089',
    order_code: 'ORD-MEPC-2026-089',
    buyer_name: 'Hans Dietrich',
    company_name: 'Global Spice GmbH',
    email: 'purchasing@globalspice.de',
    whatsapp_number: '+49 152 9841 2300',
    destination_country: 'Germany',
    destination_port: 'Port of Hamburg (DEHAM)',
    incoterms: 'FOB Belawan',
    items: [
      {
        product_id: 'prod-spices-01',
        product_name: 'Nutmeg Whole ABCD Grade (Biji Pala Utuh)',
        hs_code: '0908.11.00',
        quantity: 15,
        unit: 'MT',
        unit_price_usd: 8400,
        subtotal_usd: 126000,
      },
      {
        product_id: 'prod-spices-02',
        product_name: 'Cloves Lal Pari Quality (Cengkeh Lal Pari)',
        hs_code: '0907.10.00',
        quantity: 10,
        unit: 'MT',
        unit_price_usd: 9800,
        subtotal_usd: 98000,
      },
    ],
    status: 'APPROVED',
    total_amount: 224000,
    currency: 'USD',
    notes: 'Please prepare phytosanitary certificate and certificate of origin (Form A) for European Customs clearance.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'ord-sample-092',
    order_code: 'ORD-MEPC-2026-092',
    buyer_name: 'Tariq Al-Mansoor',
    company_name: 'Gulf Spices Trading LLC',
    email: 'tariq@gulfspices.ae',
    whatsapp_number: '+971 50 123 4567',
    destination_country: 'United Arab Emirates',
    destination_port: 'Port of Jebel Ali (AEJEA)',
    incoterms: 'CIF Jebel Ali',
    items: [
      {
        product_id: 'prod-coconut-02',
        product_name: 'White Copra Edible Grade (Kopra Putih)',
        hs_code: '1203.00.00',
        quantity: 25,
        unit: 'MT',
        unit_price_usd: 1450,
        subtotal_usd: 36250,
      },
    ],
    status: 'PENDING',
    total_amount: 36250,
    currency: 'USD',
    notes: 'Requires Certificate of Analysis (COA) for moisture < 5% and free fatty acid < 0.5%.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

export const ordersStore = writable<BuyerOrder[]>(initialOrders);
export const trackingOrder = writable<BuyerOrder | null>(null);

export const pendingOrdersCount = derived(ordersStore, ($orders) =>
  $orders.filter((o) => o.status === 'PENDING').length
);

export const orderActions = {
  async submitOrder(formData: {
    buyer_name: string;
    company_name: string;
    email: string;
    whatsapp_number: string;
    destination_country: string;
    destination_port: string;
    incoterms: string;
    notes?: string;
  }, cartItems: CartItem[]): Promise<{ order: BuyerOrder; waUrl: string }> {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const orderCode = `ORD-MEPC-2026-${nextNum}`;
    
    const items = cartItems.map((c) => ({
      product_id: c.product.id,
      product_name: c.product.name,
      hs_code: c.product.hs_code,
      quantity: c.quantity,
      unit: c.product.unit,
      unit_price_usd: c.product.price_estimate_usd,
      subtotal_usd: c.quantity * c.product.price_estimate_usd,
      packaging_notes: c.packaging_notes,
    }));

    const total_amount = items.reduce((s, i) => s + i.subtotal_usd, 0);

    const newOrder: BuyerOrder = {
      id: `ord-${Date.now()}`,
      order_code: orderCode,
      buyer_name: formData.buyer_name,
      company_name: formData.company_name,
      email: formData.email,
      whatsapp_number: formData.whatsapp_number,
      destination_country: formData.destination_country,
      destination_port: formData.destination_port,
      incoterms: formData.incoterms,
      items,
      status: 'PENDING',
      total_amount,
      currency: 'USD',
      notes: formData.notes,
      created_at: new Date().toISOString(),
    };

    ordersStore.update((orders) => [newOrder, ...orders]);
    cartActions.clear();

    try {
      await apiClient.createOrder(newOrder);
    } catch {}

    let itemsText = '';
    items.forEach((it, idx) => {
      itemsText += `${idx + 1}. ${it.product_name} (${it.quantity} ${it.unit})\n`;
    });

    const waMessage = 
`*[NOTIFIKASI ORDER BUYER BARU - PT. MEPC]*
No. Order : #${orderCode}
Perusahaan : ${formData.company_name} (${formData.destination_country})
PIC / Buyer : ${formData.buyer_name}
Pesanan :
${itemsText}Incoterms : ${formData.incoterms}
Pelabuhan Tujuan : ${formData.destination_port}
Kontak WA Buyer : ${formData.whatsapp_number}
Status : Menunggu Follow-Up & Approval Admin

_Pesan otomatis dikirim melalui Portal Terintegrasi matrispanmepc.com_`;

    const waUrl = `https://wa.me/${MEPC_ADMIN_WA}?text=${encodeURIComponent(waMessage)}`;
    toastAction.show(`Order #${orderCode} berhasil diajukan! Notifikasi dikirimkan ke WhatsApp Admin.`, 'success');
    return { order: newOrder, waUrl };
  },

  async approveOrder(orderId: string): Promise<Invoice> {
    let approvedOrder: BuyerOrder | null = null;

    ordersStore.update((orders) => {
      return orders.map((o) => {
        if (o.id === orderId) {
          approvedOrder = { ...o, status: 'APPROVED' };
          return approvedOrder;
        }
        return o;
      });
    });

    try {
      await apiClient.updateOrderStatus(orderId, 'APPROVED');
    } catch {}

    const order = approvedOrder || initialOrders[0];
    const invNumber = `INV/MEPC/2026/${Math.floor(100 + Math.random() * 899)}`;
    const today = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

    const invoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoice_number: invNumber,
      ref_type: 'BUYER_ORDER',
      ref_id: order.id,
      ref_code: order.order_code,
      approved_by_admin: 'Direktur Operasional & Ekspor PT. MEPC',
      issued_at: new Date().toISOString(),
      total_amount: order.total_amount,
      currency: 'USD',
      payload: {
        invoice_number: invNumber,
        title: 'COMMERCIAL / PROFORMA EXPORT INVOICE',
        status: 'APPROVED BY ADMIN',
        issued_date: today,
        due_date: 'Dalam 14 Hari Kerja',
        ref_type: 'BUYER_ORDER',
        ref_code: order.order_code,
        company_name: 'PT. MATRISPAN EXIM PHOENIX CORP',
        company_address: 'Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia',
        company_email: 'info@matrispanmepc.com',
        company_phone: '+62 851-8311-0510',
        port_of_loading: 'Belawan International Port (IDBLW), North Sumatra, Indonesia',
        recipient_name: order.buyer_name,
        recipient_company: order.company_name,
        recipient_email: order.email,
        recipient_phone: order.whatsapp_number,
        destination_country: order.destination_country,
        destination_port: order.destination_port,
        incoterms: order.incoterms,
        payment_terms: '30% T/T Advance Deposit upon Proforma confirmation, 70% Irrevocable L/C at sight upon Bill of Lading (B/L)',
        items: order.items.map((i) => ({
          description: i.product_name,
          hs_code: i.hs_code,
          quantity: i.quantity,
          unit: i.unit,
          unit_price: i.unit_price_usd,
          subtotal: i.subtotal_usd,
        })),
        subtotal: order.total_amount,
        shipping_and_insurance_fee: order.incoterms.includes('CIF') ? order.total_amount * 0.05 : 0,
        total_amount: order.incoterms.includes('CIF') ? order.total_amount * 1.05 : order.total_amount,
        currency: 'USD',
        bank_instructions: {
          bank_name: 'PT. BANK MANDIRI (PERSERO) TBK',
          account_name: 'PT. MATRISPAN EXIM PHOENIX CORP',
          account_number: '106-00-1899214-7 (USD / IDR FX ACCOUNT)',
          swift_code: 'BMRIIDJA',
          branch: 'KCP BINJAI JUANDA - SUMATERA UTARA, INDONESIA',
        },
        qr_verification_code: `https://matrispanmepc.com/verify-invoice?code=${invNumber}`,
        authorized_signatory: 'Direktur Operasional & Ekspor / M. Rusdi',
      },
    };

    invoicesStore.update((invs) => [invoice, ...invs]);
    activeInvoice.set(invoice);
    activeModal.set('invoice');
    toastAction.show(`Order Disetujui (OKE)! Proforma Invoice ${invNumber} resmi diterbitkan.`, 'success');
    return invoice;
  },

  async rejectOrder(orderId: string) {
    ordersStore.update((orders) =>
      orders.map((o) => (o.id === orderId ? { ...o, status: 'REJECTED' as const } : o))
    );
    try {
      await apiClient.updateOrderStatus(orderId, 'REJECTED');
    } catch {}
    toastAction.show('Pesanan ditolak/dibatalkan.', 'error');
  },

  async markContacted(orderId: string) {
    ordersStore.update((orders) =>
      orders.map((o) => (o.id === orderId ? { ...o, status: 'CONTACTED' as const } : o))
    );
    try {
      await apiClient.updateOrderStatus(orderId, 'CONTACTED');
    } catch {}
    toastAction.show('Status pesanan diubah ke: Sedang Dihubungi.', 'info');
  },

  async updateOrderPrice(orderId: string, newTotal: number) {
    ordersStore.update((orders) =>
      orders.map((o) => (o.id === orderId ? { ...o, total_amount: newTotal } : o))
    );
    try {
      await apiClient.updateOrderStatus(orderId, 'PENDING', newTotal);
    } catch {}
    toastAction.show('Total penawaran pesanan berhasil disesuaikan.', 'success');
  },
};
