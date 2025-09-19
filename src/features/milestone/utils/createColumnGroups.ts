import type { MSRHeaderType } from '../types/milestone';

interface ColumnDefinition {
	header: string; // 表示されるヘッダー名
	binding?: string; // データのバインディングキー
	width?: number; // カラムの幅
	columns?: ColumnDefinition[]; // ネストされたサブカラム
}

/**
 * カラムグループ生成関数
 * @param header
 * @returns
 */
export function createColumnGroups(
	header: MSRHeaderType[], // マイルストーン情報の配列
): ColumnDefinition[] {
	// 固定カラム（基本情報）
	const columnGroups: ColumnDefinition[] = [
		{ header: 'AIP', binding: 'AIPNo', width: 1 },
		{ header: 'F/G', binding: 'FGName', width: 100 },
		{ header: 'KP in F/G', binding: 'KPinFG', width: 160 },
		{ header: 'Buyer', binding: 'BuyerName', width: 160 },
		{ header: 'Off/On', binding: 'Shore', width: 70 },
		{ header: 'Order', binding: 'Order', width: 80 },
		{ header: 'Req.No.', binding: 'ReqNo', width: 80 },
		{ header: 'Supplier/Contractor', binding: 'VendorName', width: 200 },
		{ header: 'Country', binding: 'Country', width: 75 },
		{ header: 'Status', binding: 'Status', width: 125 },
	];

	// マイルストーンごとのカラムを追加
	for (const milestone of header) {
		const milestoneGroup: ColumnDefinition = {
			header: milestone.MilestoneName, // マイルストーン名
			columns: [],
		};

		// タスクごとのカラムを追加
		for (const task of milestone.Task) {
			const taskGroup: ColumnDefinition = {
				header: task.TaskName, // タスク名
				columns: [],
			};

			// 日付カテゴリ（例：予定日、実績日など）
			for (const dateCategory of task.TaskDateCategory ?? []) {
				taskGroup.columns?.push({
					header: dateCategory.DateTypeCategory, // 日付の種類
					binding: `${task.TaskID}_${task.TaskTemplateID}_${dateCategory.DateType}`, // 一意なキー
					width: 200,
				});
			}

			// 成果物（Deliverables）
			for (const deliverable of task.Deliverable ?? []) {
				const deliverableGroup: ColumnDefinition = {
					header: deliverable.DeliverableName, // 成果物名
					columns: [],
				};

				// 成果物のプロパティ
				for (const property of deliverable.DeliverableProperty ?? []) {
					// 子プロパティがある場合（ネスト構造）
					const childProps =
						property.DeliverableChild?.map((child) => ({
							header: child.ChildDeliverablePropertyName,
							binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${deliverable.DeliverableTemplateId}_${deliverable.DeliverablePJTaskTemplateId}_${child.ChildDeliverablePropertyType}_${child.ChildDeliverablePropertyId}`,
							width: 200,
						})) ?? [];

					if (childProps.length > 0) {
						// 子プロパティを持つ場合はグループ化
						deliverableGroup.columns?.push({
							header: property.DeliverablePropertyName,
							columns: childProps,
						});
					} else {
						// 子プロパティがない場合は単一カラム
						deliverableGroup.columns?.push({
							header: property.DeliverablePropertyName,
							binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${deliverable.DeliverableTemplateId}_${deliverable.DeliverablePJTaskTemplateId}_${property.DeliverablePropertyType}_${property.DeliverablePropertyId}`,
							width: 200,
						});
					}
				}

				// 成果物グループをタスクに追加
				taskGroup.columns?.push(deliverableGroup);
			}

			// タスクグループをマイルストーンに追加
			milestoneGroup.columns?.push(taskGroup);
		}

		// マイルストーングループを全体のカラムに追加
		columnGroups.push(milestoneGroup);
	}

	// 最終的なカラム定義を返す
	return columnGroups;
}