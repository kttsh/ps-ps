import * as wjcCore from "@mescius/wijmo";
import "@mescius/wijmo.cultures/wijmo.culture.ja";
import { FlexGrid, GridPanel } from "@mescius/wijmo.grid";
import * as wjcInput from "@mescius/wijmo.input";
import "@mescius/wijmo.styles/wijmo.css";

// ステータス選択肢の定数（API取得で置き換え可能）
const STATUS_OPTIONS = [
  { code: 'PJS-00000001', name: '引合準備中' },
  { code: 'PJS-00000002', name: '引合完了' },
  { code: 'PJS-00000003', name: '見積待' },
  { code: 'PJS-00000004', name: '見積入手済' },
  { code: 'PJS-00000005', name: 'PO待' },
  { code: 'PJS-00000006', name: 'PO済' },
  { code: 'PJS-00000007', name: '発注なし' },
  { code: 'PJS-00000008', name: '輸送待' },
  { code: 'PJS-00000009', name: '輸送完了' }
];

// 国旗表示用の関数
function renderFlag(cell: HTMLElement, country: string) {
  const countryCode = country.substring(0, 2).toLowerCase(); // ISOコード（例: JP）
  const countryName = country.substring(2); // 国名（例: Japan）

  const img = document.createElement('img');
  img.src = `https://flagcdn.com/${countryCode}.svg`;
  img.alt = countryName;
  img.title = countryName; // ホバー時に表示されるツールチップ
  img.style.width = '25px';
  img.style.height = 'auto';
  img.style.display = 'inline-block';
  img.style.verticalAlign = 'middle';

  cell.innerHTML = '';
  cell.appendChild(img);
}

// 日付入力用のカレンダーを表示する関数
function renderCalendarOnClickExpanded(
  cell: HTMLElement,
  item: any,
  binding: string,
  collectionView: wjcCore.CollectionView
) {
  cell.innerHTML = '';

  const label = document.createElement('span');
  
  const date = item[binding] instanceof Date
    ? item[binding]
    : (item[binding] ? new Date(item[binding]) : null);

  label.textContent = date && !isNaN(date.getTime())
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

  label.onclick = (e) => {
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
      selectionMode: 'Day'
    });

    // 日付選択時のイベント
    calendar.valueChanged.addHandler(() => {
      collectionView.editItem(item);
      item[binding] = calendar.value;
      collectionView.commitEdit();
      collectionView.refresh();
      label.textContent = wjcCore.Globalize.format(calendar.value, 'yyyy/MM/dd');

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

const STATUS_COLORS = [
  { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' },
  { backgroundColor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' },
  { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' },
  { backgroundColor: '#cce5ff', color: '#004085', borderColor: '#b8daff' },
  { backgroundColor: '#e2e3e5', color: '#383d41', borderColor: '#d6d8db' },
  { backgroundColor: '#f8f9fa', color: '#6c757d', borderColor: '#dee2e6' },
  { backgroundColor: '#f5c6cb', color: '#721c24', borderColor: '#f1b0b7' },
  { backgroundColor: '#c3e6cb', color: '#155724', borderColor: '#d4edda' },
  { backgroundColor: '#bee5eb', color: '#0c5460', borderColor: '#d1ecf1' }
];

// ステータス選択用のセレクトボックスを表示する関数
function renderStatusSelectBox(
  cell: HTMLElement,
  item: any,
  collectionView: wjcCore.CollectionView
) {
  cell.innerHTML = '';

  const selectedIndex = STATUS_OPTIONS.findIndex(opt => opt.code === item.Status);
  const selectedOption = STATUS_OPTIONS[selectedIndex];
  const labelText = selectedOption ? selectedOption.name : '';

  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';

  const label = document.createElement('span');
  label.textContent = labelText;

  label.style.display = 'flex';
  label.style.alignItems = 'center';
  label.style.justifyContent = 'center';
  label.style.width = '100%';
  label.style.height = '100%';
  label.style.padding = '4px 8px';
  label.style.cursor = 'pointer';
  label.style.textAlign = 'center';
  label.style.fontSize = '14px';
  label.style.fontWeight = 'bold';

  if (item.Status) {
    label.style.borderRadius = '12px';
    label.style.border = '1px solid transparent';

    const colorSet = STATUS_COLORS[selectedIndex % STATUS_COLORS.length];
    label.style.backgroundColor = colorSet.backgroundColor;
    label.style.color = colorSet.color;
    label.style.borderColor = colorSet.borderColor;
  } else {
    label.style.color = '#999';
    label.style.backgroundColor = '';
    label.style.border = '';
  }

  const select = document.createElement('select');
  select.style.position = 'absolute';
  select.style.top = '0';
  select.style.left = '0';
  select.style.width = '100%';
  select.style.height = '100%';
  select.style.opacity = '0';
  select.style.cursor = 'pointer';

  STATUS_OPTIONS.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.code;
    opt.text = option.name;
    select.appendChild(opt);
  });

  select.value = item.Status || '';

  select.addEventListener('change', (e) => {
    const newValue = (e.target as HTMLSelectElement).value;
    const newIndex = STATUS_OPTIONS.findIndex(opt => opt.code === newValue);
    const newLabel = STATUS_OPTIONS[newIndex]?.name || '';
    const newColorSet = STATUS_COLORS[newIndex % STATUS_COLORS.length];

    collectionView.editItem(item);
    item.Status = newValue;
    collectionView.commitEdit();
    collectionView.refresh();

    label.textContent = newLabel;

    if (newValue) {
      label.style.borderRadius = '12px';
      label.style.border = '1px solid transparent';
      label.style.backgroundColor = newColorSet.backgroundColor;
      label.style.color = newColorSet.color;
      label.style.borderColor = newColorSet.borderColor;
    } else {
      label.style.backgroundColor = '';
      label.style.color = '#999';
      label.style.border = '';
    }
  });

  container.appendChild(label);
  container.appendChild(select);
  cell.appendChild(container);
}

// セルテンプレート生成関数
export function createCellTemplate(flex: FlexGrid, collectionView: wjcCore.CollectionView) {
  console.log("createCellTemplate");
  return flex.itemFormatter = (panel: GridPanel, r: number, c: number, cell: HTMLElement) => {
    const item = panel.rows[r].dataItem;
    let binding = panel.columns[c].binding || "empty"; // bindingがnullの場合は仮の値を設定

    // ヘッダーセルは中央揃え
    if (cell.getAttribute('role') === 'columnheader') {
      cell.style.textAlign = 'center';
      return;
    }

    // データ行のみ処理
    if (r > 0) {
      // 国コードがある場合は国旗を表示
      if (binding === 'Country' && item.Country && cell.innerText) {
        renderFlag(cell, item.Country);
        cell.style.textAlign = 'center';
        return;
      }

      // PJT- や DATE を含むカラムはカレンダー入力にする
      if ((binding.startsWith('PJT-') || binding.includes('DATE')) &&
          cell.getAttribute('aria-readonly') !== 'true' &&
          !cell.classList.contains('wj-group')) {
        renderCalendarOnClickExpanded(cell, item, binding, collectionView);
        return;
      }

      // ステータスカラムはセレクトボックスを表示
      if (binding === 'Status') {
        renderStatusSelectBox(cell, item, collectionView);
        cell.style.textAlign = 'center';
        return;
      }
    }

    // 編集不可のカラム設定
    const readOnlyBindings = ['AIPNo', 'VendorName', 'Country', 'FGName', 'KPinFG'];
    if (readOnlyBindings.includes(binding)) {
      panel.columns[c].isReadOnly = true;
    }

    // 非表示にするカラム
    if (binding === 'JobNo') {
      panel.columns[c].visible = false;
    }

    // 表示を強制するカラム
    if (binding === 'FG') {
      panel.columns[c].visible = true;
    }
  };
}
