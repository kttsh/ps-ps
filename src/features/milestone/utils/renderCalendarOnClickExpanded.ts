import * as wjcCore from '@mescius/wijmo';
import '@mescius/wijmo.cultures/wijmo.culture.ja';
import * as wjcInput from '@mescius/wijmo.input';
import '@mescius/wijmo.styles/wijmo.css';
import type { MSRAIPDataType } from '../types/milestone';

/**
 * 日付入力用のカレンダーを表示する関数
 * @param cell 
 * @param item 
 * @param binding 
 * @param collectionView 
 */
export function renderCalendarOnClickExpanded(
    cell: HTMLElement,
    item: MSRAIPDataType,
    binding: string,
    collectionView: wjcCore.CollectionView,
) {
    cell.innerHTML = '';

    const label = document.createElement('span');

    const date =
        item[binding] instanceof Date
            ? item[binding]
            : item[binding]
                ? new Date(item[binding])
                : null;

    label.textContent =
        date && !Number.isNaN(date.getTime())
            ? wjcCore.Globalize.format(date, 'yyyy/MM/dd')
            : '';

    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.justifyContent = 'center';
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.padding = '4px';
    label.style.cursor = 'pointer';
    label.style.textAlign = 'center';

    cell.appendChild(label);

    label.onclick = () => {
        // 既存のカレンダーを削除（複数表示防止）
        const existingCalendar = document.getElementById('floating-calendar');
        if (existingCalendar) {
            document.body.removeChild(existingCalendar);
        }

        const rect = cell.getBoundingClientRect();

        const calendarDiv = document.createElement('div');
        calendarDiv.id = 'floating-calendar';
        calendarDiv.style.position = 'absolute';
        calendarDiv.style.zIndex = '10000';
        calendarDiv.style.background = '#fff';
        calendarDiv.style.border = '1px solid #ccc';
        calendarDiv.style.padding = '4px';
        calendarDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        calendarDiv.style.top = `${rect.bottom + window.scrollY}px`;
        calendarDiv.style.left = `${rect.left + window.scrollX}px`;

        const calendar = new wjcInput.Calendar(calendarDiv, {
            value: item[binding],
            selectionMode: 'Day',
        });

        // 日付選択時のイベント
        calendar.valueChanged.addHandler(() => {
            collectionView.editItem(item);
            item[binding] = calendar.value;
            collectionView.commitEdit();
            collectionView.refresh();
            label.textContent = wjcCore.Globalize.format(
                calendar.value,
                'yyyy/MM/dd',
            );

            // カレンダーを閉じる
            if (calendarDiv.parentElement) {
                calendarDiv.parentElement.removeChild(calendarDiv);
            }
        });

        // カレンダー以外をクリックしたら閉じる
        const closeOnOutsideClick = (event: MouseEvent) => {
            if (!calendarDiv.contains(event.target as Node)) {
                if (calendarDiv.parentElement) {
                    calendarDiv.parentElement.removeChild(calendarDiv);
                }
                document.removeEventListener('click', closeOnOutsideClick);
            }
        };
        setTimeout(() => {
            document.addEventListener('click', closeOnOutsideClick);
        }, 0);

        document.body.appendChild(calendarDiv);
        calendar.focus();
    };
}