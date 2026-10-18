import type { ProvinceData } from './types';
import { SUMATRA_PROVINCES } from './sumatra';
import { JAVA_PROVINCES } from './java';
import { KALIMANTAN_PROVINCES } from './kalimantan';
import { SULAWESI_PROVINCES } from './sulawesi';
import { EASTERN_PROVINCES } from './eastern';

export * from './types';
export { SUMATRA_PROVINCES } from './sumatra';
export { JAVA_PROVINCES } from './java';
export { KALIMANTAN_PROVINCES } from './kalimantan';
export { SULAWESI_PROVINCES } from './sulawesi';
export { EASTERN_PROVINCES } from './eastern';

export const INDONESIA_PROVINCES: ProvinceData[] = [
  ...SUMATRA_PROVINCES,
  ...JAVA_PROVINCES,
  ...KALIMANTAN_PROVINCES,
  ...SULAWESI_PROVINCES,
  ...EASTERN_PROVINCES,
];

export function getAllProvinces(): string[] {
  return INDONESIA_PROVINCES.map((p) => p.province);
}

export function getCitiesByProvince(provinceName: string): string[] {
  if (!provinceName) return [];
  const found = INDONESIA_PROVINCES.find(
    (p) => p.province.toLowerCase() === provinceName.trim().toLowerCase()
  );
  return found ? found.cities : [];
}
