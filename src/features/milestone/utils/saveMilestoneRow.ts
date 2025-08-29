import { API_URL } from '../../../config/apiConfig';
import { MSRAIPDataType } from '../types/milestone';

interface saveMilestoneResult {
    returnMessage: string | null;
    loading: boolean;
    error: Error | null;
}

function FormatJSON(data: string): string {
    // let formatError:string;

    // if (!data) {
    //     // formatError = "入力値が不正です。aaa"
    //     throw new Error('入力値が不正ですaaa。');
    // }

    let parsedData;
    // try {
    //     parsedData = JSON.parse(data);
    // } catch (err) {
    //     error = err instanceof Error ? err : new Error('不正なJSON形式です。');
    //     // throw new Error('不正なJSON形式です。');
    // }
    // ↓はエラーを通すためにいったん書き換えた ↑に戻したい
    try {
        parsedData = JSON.parse(data);
    } catch {
        throw new Error('不正なJSON形式です。');
    }

    // 整形後のデータを格納する配列
    const formattedData: MSRAIPDataType[] = [];

    // 各キーのデータを整形して配列に追加
    for (const key in parsedData) {
        if (key !== 'length' && key !== '_updating' && key !== 'collectionChanged') {
            const item = parsedData[key];
            const formattedItem: MSRAIPDataType = {
                PIPNo: item.PIPNo,
                PIPName: item.PIPName,
                JobNo: item.JobNo,
                FG: item.FG,
                AIP: [
                    {
                        AIPNo: item.AIPNo,
                        VendorName: item.VendorName,
                        CountryName: item.Country ? item.Country.substring(2, 10) : '',
                        CountryCode: item.Country ? item.Country.substring(0, 2) : '',
                        BuyerName: item.BuyerName,
                        Status: item.Status,
                        FGName: "",
                        KPinFG:"",
                        Shore:"",
                        ReqNo:"",
                        Deliverable: [],
                        TaskTracking: []
                    }
                ]
            };

            // DeliverableとTaskTrackingの処理
            for (const subKey in item) {
                if (subKey.startsWith('PJD-')) {
                    const deliverableID = subKey.split('_')[0];
                    const taskID = subKey.split('_')[1];
                    const propertyType = subKey.split('_')[2];
                    const propertyID = subKey.split('_')[3];

                    let deliverable = formattedItem.AIP[0].Deliverable.find(d => d.ID === deliverableID);
                    if (!deliverable) {
                        deliverable = { ID: deliverableID, Rev: '0', TaskID: taskID, Property: [] };
                        formattedItem.AIP[0].Deliverable.push(deliverable);
                    }

                    deliverable.Property.push({
                        ID: propertyID,
                        // Type: typeof item[subKey] === 'number' ? 'FLOAT' : 'TEXT',
                        Type: propertyType,
                        Value: item[subKey].toString()
                    });
                } else if (subKey.startsWith('PJT-')) {
                    const taskID = subKey.split('_')[0];
                    const dateType = subKey.split('_')[1];

                    formattedItem.AIP[0].TaskTracking.push({
                        ID: taskID,
                        DateType: dateType,
                        Date: item[subKey]
                    });
                }
            }
            formattedData.push(formattedItem);
        }
    }
    // 整形後のJSONを返す
    console.log("hozon"+JSON.stringify(formattedData));
    return JSON.stringify(formattedData, null);
}

export async function saveMilestoneRow(tableData: string): Promise<saveMilestoneResult> {
    let returnMessage = null;
    let loading = true; // データ取得中かどうかを示すBoolean
    let error = null; // エラー情報を持つ

    if (!tableData) {
        returnMessage = "入力値が空です。";
        error = new Error("入力値が空です。")
        loading = false;
    } else {

        try {
            // if (!tableData) {
            //     error = new Error('入力値が空です。')
            // } else {
            const formattedData = FormatJSON(tableData);

            const APIUrl = API_URL.SaveDataAll;
            const response = await fetch(APIUrl, {
                method: 'POST',
                body: JSON.stringify({ MilestoneDataJSON: formattedData }),
            });
            // レスポンス処理
            // まずはレスポンスが正常かチェック、異常時はエラースロー
            if (!response.ok) {
                throw new Error(`リクエストエラー: ${response.status}`);
            }
            const data = await response.json();
            returnMessage = data.ReturnMessage;
            // }
        } catch (err) {
            error = err instanceof Error ? err : new Error('不明なエラーが発生しました');
            // return {returnMessage, loading, Promise.reject(error)};
        } finally {
            loading = false;
        }
    }
    return { returnMessage, loading, error };
}

