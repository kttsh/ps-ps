import type { MSRAIPDataType } from "../types/milestone";

/**
 * JSON文字列を整形して、MSRAIPDataTypeの配列として返す関数
 * @param data 
 * @returns 
 */
export function formatJSON(data: string): string {

    let parsedData: Record<string, any>;
    try {
        // JSON文字列をオブジェクトに変換
        parsedData = JSON.parse(data);
    } catch {
        // パースに失敗した場合はエラーを投げる
        throw new Error('不正なJSON形式です。');
    }

    // 整形後のデータを格納する配列
    const formattedData: MSRAIPDataType[] = [];

    // 各キーのデータを整形して配列に追加
    for (const key in parsedData) {
        // 特定のキーはスキップ
        if (
            key !== 'length' &&
            key !== '_updating' &&
            key !== 'collectionChanged'
        ) {
            const item = parsedData[key];

            // MSRAIPDataTypeの形式に整形
            const formattedItem: MSRAIPDataType = {
                PIPNo: item.PIPNo,
                PIPName: item.PIPName,
                JobNo: item.JobNo,
                FG: item.FG,
                AIP: [
                    {
                        AIPNo: item.AIPNo,
                        VendorName: item.VendorName,
                        VendorCode: item.VendorCode,
                        CountryName: item.Country ? item.Country.substring(2, 10) : '',
                        CountryCode: item.Country ? item.Country.substring(0, 2) : '',
                        BuyerName: item.BuyerName,
                        Status: item.Status,
                        FGName: '',
                        KPinFG: '',
                        Shore: '',
                        ReqNo: '',
                        Order: '',
                        Deliverable: [],
                        TaskTracking: [],
                    },
                ],
            };

            // DeliverableとTaskTrackingの情報を処理
            for (const subKey in item) {
                // Deliverableのプロパティ情報（PJD-で始まるキー）
                if (subKey.startsWith('PJD-')) {
                    const deliverableID = subKey.split('_')[0];
                    const taskID = subKey.split('_')[1];
                    const deliverableTemplateID = subKey.split('_')[2];
                    const taskTemplateID = subKey.split('_')[3];
                    const propertyType = subKey.split('_')[4];
                    const propertyID = subKey.split('_')[5];

                    // 既存のDeliverableを検索、なければ新規作成
                    let deliverable = formattedItem.AIP[0].Deliverable.find(
                        (d) => d.ID === deliverableID,
                    );
                    if (!deliverable) {
                        deliverable = {
                            ID: deliverableID,
                            TemplateID: deliverableTemplateID,
                            Rev: '0',
                            TaskID: taskID,
                            TaskTemplateID: taskTemplateID,
                            Property: [],
                        };
                        formattedItem.AIP[0].Deliverable.push(deliverable);
                    }

                    // プロパティを追加
                    deliverable.Property.push({
                        ID: propertyID,
                        Type: propertyType,
                        Value: item[subKey].toString(),
                    });
                }
                // TaskTrackingの情報（PJT-で始まるキー）
                else if (subKey.startsWith('PJT-')) {
                    const taskID = subKey.split('_')[0];
                    const taskTemplateID = subKey.split('_')[1];
                    const dateType = subKey.split('_')[2];

                    // TaskTrackingに追加
                    formattedItem.AIP[0].TaskTracking.push({
                        ID: taskID,
                        TemplateID: taskTemplateID,
                        DateType: dateType,
                        Date: item[subKey],
                    });
                }
            }

            // 整形済みデータを配列に追加
            formattedData.push(formattedItem);
        }
    }

    // 整形後のJSON文字列を返す（インデントなし）
    return JSON.stringify(formattedData, null);
}
