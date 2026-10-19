import { writable } from 'svelte/store';
import type { Product } from '../types';
import { apiClient } from '../api/client';
import { toastAction } from './ui.store';

export const PRODUCT_IMAGE_MAP: Record<string, string> = {
  'prod-coconut-01': '/images/products/coconut-charcoal.jpg',
  'prod-coconut-02': '/images/products/desiccated-coconut.jpg',
  'prod-seafood-01': '/images/products/black-tiger-shrimp.jpg',
  'prod-seafood-02': '/images/products/mud-crab.jpg',
  'prod-spices-01': '/images/products/nutmeg-whole.jpg',
  'prod-spices-02': '/images/products/dried-cloves.jpg',
  'prod-spices-03': '/images/products/green-cardamom.jpg',
  'prod-spices-04': '/images/products/green-coffee-beans.jpg',
  'prod-textile-01': '/images/products/viscose-rayon-fabric.jpg',
  'prod-textiles-01': '/images/products/viscose-rayon-fabric.jpg',
};

export function sanitizeProductImage(product: Product): Product {
  if (PRODUCT_IMAGE_MAP[product.id]) {
    return { ...product, image_url: PRODUCT_IMAGE_MAP[product.id] };
  }
  const nameLower = product.name.toLowerCase();
  if (nameLower.includes('charcoal') || nameLower.includes('briket') || nameLower.includes('shisha')) {
    return { ...product, image_url: '/images/products/coconut-charcoal.jpg' };
  }
  if (nameLower.includes('desiccated') || nameLower.includes('parut')) {
    return { ...product, image_url: '/images/products/desiccated-coconut.jpg' };
  }
  if (nameLower.includes('shrimp') || nameLower.includes('udang') || nameLower.includes('windu')) {
    return { ...product, image_url: '/images/products/black-tiger-shrimp.jpg' };
  }
  if (nameLower.includes('crab') || nameLower.includes('kepiting')) {
    return { ...product, image_url: '/images/products/mud-crab.jpg' };
  }
  if (nameLower.includes('nutmeg') || nameLower.includes('pala')) {
    return { ...product, image_url: '/images/products/nutmeg-whole.jpg' };
  }
  if (nameLower.includes('clove') || nameLower.includes('cengkeh')) {
    return { ...product, image_url: '/images/products/dried-cloves.jpg' };
  }
  if (nameLower.includes('cardamom') || nameLower.includes('kapulaga')) {
    return { ...product, image_url: '/images/products/green-cardamom.jpg' };
  }
  if (nameLower.includes('coffee') || nameLower.includes('kopi')) {
    return { ...product, image_url: '/images/products/green-coffee-beans.jpg' };
  }
  if (nameLower.includes('rayon') || nameLower.includes('fabric') || nameLower.includes('kain') || nameLower.includes('tenun')) {
    return { ...product, image_url: '/images/products/viscose-rayon-fabric.jpg' };
  }
  return product;
}

export const initialProducts: Product[] = [
  {
    id: 'prod-coconut-01',
    category: 'Coconut',
    name: 'Premium Shisha / Hookah Coconut Charcoal Briquettes',
    latin_or_local_name: 'Cocos nucifera shell',
    hs_code: '4402.90.10',
    min_order_qty: 18,
    unit: 'MT',
    price_estimate_usd: 1380,
    specs: {
      grade: 'Cube 25×25×25mm / 26×26×26mm',
      moisture: 'Max 5.0%',
      volatile_oil: 'Fixed Carbon: 82% - 85%',
      ash_content: 'White Ash Max 2.0%',
      packaging: '1 Kg Inner Box with full brand printing + 10 Kg Master Carton',
      origin: 'Asahan & Batu Bara, North Sumatra',
    },
    image_url: '/images/products/coconut-charcoal.jpg',
    description: 'Briket arang batok kelapa 100% alami tanpa bahan kimia, waktu bakar 90-120 menit, panas konsisten 7500 Kcal/kg, tanpa asap dan tanpa bau.',
    featured: true,
  },
  {
    id: 'prod-coconut-02',
    category: 'Coconut',
    name: 'Desiccated Coconut High Fat (Fine / Medium Grade)',
    latin_or_local_name: 'Cocos nucifera meat',
    hs_code: '0801.11.00',
    min_order_qty: 15,
    unit: 'MT',
    price_estimate_usd: 2150,
    specs: {
      grade: 'High Fat (Min 65% Oil)',
      moisture: 'Max 3.0%',
      volatile_oil: 'FFA Max 0.15%',
      packaging: '25 Kg Multi-ply Kraft paper bags with food-grade PE liner',
      origin: 'Coastal North Sumatra & Riau',
    },
    image_url: '/images/products/desiccated-coconut.jpg',
    description: 'Kelapa parut kering mutu ekspor murni warna putih alami, rasa gurih legit, diproses pasteurisasi higienis untuk bakery dan kembang gula dunia.',
    featured: true,
  },
  {
    id: 'prod-seafood-01',
    category: 'Seafood',
    name: 'Frozen Black Tiger Shrimp Head-on (Udang Windu Laut)',
    latin_or_local_name: 'Penaeus monodon',
    hs_code: '0306.17.11',
    min_order_qty: 10,
    unit: 'MT',
    price_estimate_usd: 11900,
    specs: {
      grade: 'Grade A (Sizes: 16/20, 21/25, 26/30 pcs/kg)',
      moisture: 'Individually Quick Frozen (IQF) / Semi-IQF -40°C',
      volatile_oil: 'Antibiotic Free (Chloramphenicol & Nitrofurans Negative)',
      packaging: '1 Kg Inner Carton x 10 = 10 Kg Master Carton',
      origin: 'East Coast Mangrove Estuaries, North Sumatra',
    },
    image_url: '/images/products/black-tiger-shrimp.jpg',
    description: 'Udang windu laut tangkapan liar Selat Malaka segar beku kilat suhu -40°C, daging kenyal manis, sertifikasi HACCP dan ekspor ke Jepang dan Uni Eropa.',
    featured: true,
  },
  {
    id: 'prod-seafood-02',
    category: 'Seafood',
    name: 'Frozen Live-Quality Mud Crab (Kepiting Bakau Super)',
    latin_or_local_name: 'Scylla serrata',
    hs_code: '0306.14.00',
    min_order_qty: 5,
    unit: 'MT',
    price_estimate_usd: 14800,
    specs: {
      grade: 'Male & Female Egg (500g - 800g+ per crab)',
      moisture: 'IQF Blast Frozen -40°C',
      volatile_oil: 'Meat Fullness > 90%',
      packaging: 'Insulated Styrofoam Master Boxes 20 Kg with thermal gel packs',
      origin: 'East Coast Mangroves, North Sumatra',
    },
    image_url: '/images/products/mud-crab.jpg',
    description: 'Kepiting bakau hidup pilihan langsung dibekukan dengan nitrogen cepat, isi daging padat di atas 90%, capit tebal gurih untuk pasar Asia Timur dan Timur Tengah.',
    featured: false,
  },
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
    image_url: '/images/products/nutmeg-whole.jpg',
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
      grade: 'Lal Pari Handpicked 99.5% Pure',
      moisture: 'Max 11% - 12%',
      volatile_oil: 'Min 18% - 20% Eugenol',
      packaging: '50 Kg PP Woven Bags with PE Inner',
      origin: 'Zanzibar & Moluccas cultivars, North Sumatra',
    },
    image_url: '/images/products/dried-cloves.jpg',
    description: 'Cengkeh kering warna coklat kemerahan (Lal Pari), kadar minyak esensial eugenol pekat, cocok untuk industri farmasi, rokok kretek, dan bumbu dapur Eropa.',
    featured: true,
  },
  {
    id: 'prod-spices-03',
    category: 'Spices',
    name: 'Java Green Cardamom (Kapulaga Jawa Super)',
    latin_or_local_name: 'Amomum compactum',
    hs_code: '0908.31.00',
    min_order_qty: 2,
    unit: 'MT',
    price_estimate_usd: 14200,
    specs: {
      grade: 'Super Cleaned Bold',
      moisture: 'Max 11%',
      volatile_oil: 'Min 4.0%',
      packaging: '25 Kg Master Cartons with vacuum pouches',
      origin: 'West & North Sumatra highlands',
    },
    image_url: '/images/products/green-cardamom.jpg',
    description: 'Kapulaga putih/hijau berbentuk bulat utuh beraroma wangi herba kuat, dibersihkan higienis dengan sirkulasi udara hangat konstan.',
    featured: false,
  },
  {
    id: 'prod-spices-04',
    category: 'Spices',
    name: 'Gayo & Mandheling Arabica Green Coffee (Grade 1 TP)',
    latin_or_local_name: 'Coffea arabica',
    hs_code: '0901.11.10',
    min_order_qty: 10,
    unit: 'MT',
    price_estimate_usd: 6950,
    specs: {
      grade: 'Grade 1 Triple Picked (TP)',
      moisture: 'Max 12.0%',
      volatile_oil: 'Cupping Score > 84.5',
      packaging: '60 Kg GrainPro + Jute Bags',
      origin: 'Gayo Highlands & Mandailing, North Sumatra',
    },
    image_url: '/images/products/green-coffee-beans.jpg',
    description: 'Kopi arabika proses basah (wet-hulled / giling basah) aroma rempah rempah tanah basah khas Sumatera, cupping score di atas 84.5 poin.',
    featured: true,
  },
  {
    id: 'prod-textile-01',
    category: 'Textiles',
    name: 'Woven Viscose Rayon Fabric (Kain Rayon Ekspor)',
    latin_or_local_name: '100% Regenerated Cellulose',
    hs_code: '5408.22.00',
    min_order_qty: 20000,
    unit: 'Meters',
    price_estimate_usd: 1.85,
    specs: {
      grade: '30s x 30s / 68 x 68 (Width 58 inch)',
      moisture: 'Pre-shrunk, OEKO-TEX Standard 100',
      volatile_oil: 'Tensile Strength Certified',
      packaging: 'Rolls in plastic tubes with woven outer wrapping (100m/roll)',
      origin: 'Sumatra Integrated Textile Mills',
    },
    image_url: '/images/products/viscose-rayon-fabric.jpg',
    description: 'Kain rayon lembut jatuh sejuk di kulit dengan serapan pewarna reaktif tinggi, ramah lingkungan berstandar OEKO-TEX untuk industri garmen global.',
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
