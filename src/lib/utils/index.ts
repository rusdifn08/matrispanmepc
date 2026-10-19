export const MEPC_ADMIN_WA = '6285183110510';
export const MEPC_ADMIN_DISPLAY_PHONE = '+62 851-8311-0510';
export const MEPC_OFFICIAL_EMAIL = 'info@matrispanmepc.com';
export const MEPC_HEADQUARTERS = 'Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia';

/**
 * Formats monetary amounts in USD or IDR with smart automatic exchange rate conversion
 */
export function formatCurrency(
  amount: number,
  currency: 'USD' | 'IDR' = 'USD',
  rate: number = 16250
): string {
  if (currency === 'IDR') {
    // If the input amount is given in USD (typically < 500,000 for item prices), convert to IDR
    const idrVal = amount < 500000 ? amount * rate : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(idrVal);
  }

  // If currency is USD but input is in IDR (>= 500,000), convert to USD
  const usdVal = amount >= 500000 ? amount / rate : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(usdVal);
}

export function convertUsdToIdr(usd: number, rate: number = 16250): number {
  return usd * rate;
}

export function convertIdrToUsd(idr: number, rate: number = 16250): number {
  return idr / rate;
}

/**
 * Formats date into readable string
 */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Generates official Click-to-Chat WhatsApp URL for PT. MEPC Admin
 */
export function getWhatsAppAdminUrl(message: string): string {
  return `https://wa.me/${MEPC_ADMIN_WA}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL to contact any Buyer or Supplier
 */
export function getWhatsAppChatUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Synthesizes a gentle two-tone chime alert using standard Web Audio API
 * No external sound files or internet connection required!
 */
export function playNotificationChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // First tone (E5 ~ 659 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second harmonious tone (B5 ~ 987 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.6);
  } catch (err) {
    console.debug('Web Audio chime not permitted yet:', err);
  }
}

export * from './pdf-exporter';
