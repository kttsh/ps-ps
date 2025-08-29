import type { Vendor } from '@/types';
import type { VendorResponse } from '../types/types';

export const transformVendorResponseToVendorData = (
  response: VendorResponse[]
): Vendor[] => {
  return response.map((item) => ({
    id: item.aipPsysVendorId,
    name: item.vendorName,
    code: item.vendorCode.trim(), // 末尾の空白を除去
  }));
};
