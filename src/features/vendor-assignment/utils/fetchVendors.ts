// // api/fetchVendors.ts
// export const fetchVendors = async (fgCode: string) => {
//     const response = await fetch(
//         'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetVendorList',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-cache',
//             },
//             cache: 'no-store',
//             body: JSON.stringify({
//                 requestJSON: JSON.stringify({
//                     fgCode: fgCode.charAt(0),
//                 }),
//             }),
//         }
//     );

//     if (!response.ok) {
//         throw new Error(`HTTP status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data?.responseJSON) {
//         throw new Error('responseJSON is undefined');
//     }

//     const parsedResponse = JSON.parse(data.responseJSON);

//     if (!parsedResponse?.pip) {
//         throw new Error('parsedResponse.pip is undefined');
//     }

//     const vendorList = JSON.parse(parsedResponse.pip);

//     if (!Array.isArray(vendorList)) {
//         throw new Error('parsed vendorList is not an array');
//     }

//     return vendorList;
// }
