export type PipItem = {
    pipItemNo: string;
    pipCoreItemNo: string;
    pipItemName: string;
    pipItemQty: string;
    pipElement: string;
    pipIBSCode: string;
};

export type Aip = {
    aipCode: string;
    aipPsysVendorId: string;
    vendorName: string;
    vendorCode: string;
};

export type PipResponse = {
    jobNo: string;
    fgCode: string;
    pipCode: string;
    pipNickName: string;
    itemCount: string;
    item: PipItem[];
    aipCount: string;
    aip: Aip[];
};

