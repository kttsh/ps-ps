import type { Vendor } from '@/types';
import type { VendorResponse } from '@/types/common-api';

export const transformVendorResponseToVendorData = (
	response: VendorResponse[],
): Vendor[] => {
	return response.map((vendor) => ({
		vendorId: vendor.vendorId,
		vendorName: vendor.vendorName,
		aipCode: vendor.vendorCode.trim(), // 末尾の空白を除去
	}));
};
