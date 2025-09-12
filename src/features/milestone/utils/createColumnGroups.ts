import type { MSRHeaderType } from '../types/milestone';

interface ColumnDefinition {
	header: string;
	binding?: string;
	width?: number;
	columns?: ColumnDefinition[];
}

export function createColumnGroups(
	header: MSRHeaderType[],
): ColumnDefinition[] {
	const columnGroups: ColumnDefinition[] = [
		{ header: 'AIP', binding: 'AIPNo', width: 160 },
		{ header: 'F/G', binding: 'FGName', width: 100 },
		{ header: 'KP in F/G', binding: 'KPinFG', width: 170 },
		{ header: 'Buyer', binding: 'BuyerName', width: 170 },
		{ header: 'Off/On', binding: 'Shore', width: 75 },
		{ header: 'Order', binding: 'Order', width: 200 },
		{ header: 'Req.No.', binding: 'ReqNo', width: 200 },
		{ header: 'Supplier/Contractor', binding: 'VendorName', width: 200 },
		{ header: 'Country', binding: 'Country', width: 75 },
		{ header: 'Status', binding: 'Status', width: 125 },
	];

	for (const milestone of header) {
		const milestoneGroup: ColumnDefinition = {
			header: milestone.MilestoneName,
			columns: [],
		};

		for (const task of milestone.Task) {
			const taskGroup: ColumnDefinition = {
				header: task.TaskName,
				columns: [],
			};

			// 日付カテゴリ
			for (const dateCategory of task.TaskDateCategory ?? []) {
				taskGroup.columns!.push({
					header: dateCategory.DateTypeCategory,
					binding: `${task.TaskID}_${dateCategory.DateType}`,
					width: 200,
				});
			}

			// 成果物
			for (const deliverable of task.Deliverable ?? []) {
				const deliverableGroup: ColumnDefinition = {
					header: deliverable.DeliverableName,
					columns: [],
				};

				for (const property of deliverable.DeliverableProperty ?? []) {
					const childProps =
						property.DeliverableChild?.map((child) => ({
							header: child.ChildDeliverablePropertyName,
							binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${child.ChildDeliverablePropertyType}_${child.ChildDeliverablePropertyId}`,
							width: 200,
						})) ?? [];

					if (childProps.length > 0) {
						deliverableGroup.columns!.push({
							header: property.DeliverablePropertyName,
							columns: childProps,
						});
					} else {
						deliverableGroup.columns!.push({
							header: property.DeliverablePropertyName,
							binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${property.DeliverablePropertyType}_${property.DeliverablePropertyId}`,
							width: 200,
						});
					}
				}

				taskGroup.columns!.push(deliverableGroup);
			}

			milestoneGroup.columns!.push(taskGroup);
		}

		columnGroups.push(milestoneGroup);
	}

	return columnGroups;
}