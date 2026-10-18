import { writable } from 'svelte/store';
import type { Product } from '../types';
import { apiClient } from '../api/client';
import { toastAction } from './ui.store';

export const initialProducts: Product[] = [
  {
    id: 'prod-spices-01',
    category: 'Spices',
    name: 'Nutmeg Whole ABCD Grade (Biji Pala Utuh)',
    latin_or_local_name: 'Myristica fragrans',
    hs_code: '0908.11.00',
    min_order_qty: 5,
    unit: 'MT',
    price_estimate_usd: 8400,
    specs: {
      grade: 'ABCD Grade (Sound, Whole)',
      moisture: 'Max 10% - 12%',
      volatile_oil: 'Min 6.5% - 7.5%',
      packaging: '50 Kg Double Jute Bags with inner poly liner',
      origin: 'North Sumatra & Banda, Indonesia',
    },
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: 'Biji pala utuh kualitas ekspor tinggi aroma atsiri, disortir cermat bebas jamur dan aflatoksin, siap untuk industri rempah dan pangan internasional.',
    featured: true,
  },
  {
    id: 'prod-spices-02',
    category: 'Spices',
    name: 'Cloves Lal Pari Quality (Cengkeh Lal Pari)',
    latin_or_local_name: 'Syzygium aromaticum',
    hs_code: '0907.10.00',
    min_order_qty: 5,
    unit: 'MT',
    price_estimate_usd: 9800,
    specs: {
      grade: 'Lal Pari Hand-Picked 99.5% Pure',
      moisture: 'Max 11.5%',
      volatile_oil: 'Min 18% - 20%',
      packaging: '25 / 50 Kg PP Bags or Carton Boxes',
      origin: 'Zanzibar type grown in North Sumatra',
    },
    image_url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    description: 'Cengkeh merah kecokelatan berkadar eugenol dan minyak atsiri tinggi, dikeringkan matahari alami tanpa residu pestisida.',
    featured: true,
  },
  {
    id: 'prod-coconut-01',
    category: 'Coconut',
    name: 'Activated Coconut Charcoal Briquettes (Briket Arang Batok)',
    latin_or_local_name: 'Cocos nucifera shell charcoal',
    hs_code: '4402.90.10',
    min_order_qty: 18,
    unit: 'MT',
    price_estimate_usd: 1450,
    specs: {
      grade: 'Cube 25x25x25mm / Hexagonal 100% Coconut',
      moisture: 'Max 5.0%',
      volatile_oil: 'Fixed Carbon: 80% - 85%',
      ash_content: 'White Ash Max 2.2%',
      packaging: '1 Kg Inner Box with 10 Kg Master Carton',
      origin: 'North Sumatra, Indonesia',
    },
    image_url: 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=800&q=80',
    description: 'Briket arang batok kelapa 100% alami tanpa bahan kimia, panas tinggi hingga 7500 Kcal, waktu bakar lama > 2.5 jam dan abu putih minimal untuk pasar shisha dan BBQ internasional.',
    featured: true,
  },
  {
    id: 'prod-seafood-01',
    category: 'Seafood',
    name: 'Frozen Yellowfin Tuna Loin (Thunnus albacares)',
    latin_or_local_name: 'Thunnus albacares',
    hs_code: '0303.42.00',
    min_order_qty: 10,
    unit: 'MT',
    price_estimate_usd: 9200,
    specs: {
      grade: 'Sashimi / Export AAA Grade (Skinless, Boneless)',
      moisture: 'Flash Frozen -40°C IQF / Blast Frozen',
      volatile_oil: 'Histamine: < 20 ppm',
      packaging: 'Vacuum packed 2-5 Kg per IVP, 20 Kg Master Box',
      origin: 'Indian Ocean / Malacca Strait caught, Belawan landed',
    },
    image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    description: 'Daging loin ikan tuna sirip kuning beku kualitas sashimi dan steak, diproses dengan pengawasan rantai dingin (Cold Chain) ketat dari kapal pancing hingga kontainer reefer.',
    featured: true,
  },
  {
    id: 'prod-textiles-01',
    category: 'Textiles',
    name: 'Handwoven Songket & Ulos Heritage Silk Fabric (Tenun Otentik)',
    latin_or_local_name: 'Sumatran Handloom Heritage Weave',
    hs_code: '5007.20.00',
    min_order_qty: 100,
    unit: 'Kg',
    price_estimate_usd: 85,
    specs: {
      grade: 'Master Artisan Handloom (Silk & Metallic Weft)',
      moisture: 'Dye Fastness: Grade 4-5 Natural & Eco Pigment',
      volatile_oil: 'Width: 115 cm - 140 cm',
      packaging: 'Protective roll packing in moisture-barrier cartons',
      origin: 'North Sumatra Weaving Guilds',
    },
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Kain tenun autentik Sumatera dengan motif geometris filosofis bernilai seni tinggi, ditenun manual oleh perajin binaan untuk industri fesyen mewah dan interior global.',
    featured: true,
  },
];

export const productsStore = writable<Product[]>(initialProducts);

export const catalogActions = {
  async updateProductPrice(id: string, price: number, moq?: number) {
    productsStore.update((prods) =>
      prods.map((p) => {
        if (p.id === id) {
          return { ...p, price_estimate_usd: price, min_order_qty: moq ?? p.min_order_qty };
        }
        return p;
      })
    );
    try {
      await apiClient.updateProduct(id, { price_estimate_usd: price, min_order_qty: moq });
    } catch {}
    toastAction.show('Harga komoditas berhasil diperbarui!', 'success');
  },
};
