// 必要な Wijmo モジュールとスタイルをインポート
import * as wjcCore from '@mescius/wijmo';
import '@mescius/wijmo.cultures/wijmo.culture.ja'; // 日本語カルチャー設定
import '@mescius/wijmo.styles/wijmo.css'; // Wijmo のスタイル
import { STATUS_COLORS } from '../constants/status_colors'; // ステータスごとの色設定
import { STATUS_OPTIONS } from '../constants/status_options'; // ステータスの選択肢

/**
 * ステータス選択用のセレクトボックスを表示する関数
 * @param cell - セル要素（HTML）
 * @param item - 対象データ項目
 * @param collectionView - Wijmo の CollectionView（データソース）
 */
export function renderStatusSelectBox(
    cell: HTMLElement,
    item: any,
    collectionView: wjcCore.CollectionView,
) {
    // セルの中身を初期化
    cell.innerHTML = '';

    // 現在のステータスに対応する選択肢のインデックスを取得
    const selectedIndex = STATUS_OPTIONS.findIndex(
        (opt) => opt.code === item.Status,
    );
    const selectedOption = STATUS_OPTIONS[selectedIndex];
    const labelText = selectedOption ? selectedOption.name : '';

    // ラベルとセレクトボックスを包むコンテナを作成
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '100%';

    // 表示用ラベルを作成（選択されたステータス名を表示）
    const label = document.createElement('span');
    label.textContent = labelText;

    // ラベルのスタイル設定
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

    // ステータスが設定されている場合は色を適用
    if (item.Status) {
        label.style.borderRadius = '12px';
        label.style.border = '1px solid transparent';

        const colorSet = STATUS_COLORS[selectedIndex % STATUS_COLORS.length];
        label.style.backgroundColor = colorSet.backgroundColor;
        label.style.color = colorSet.color;
        label.style.borderColor = colorSet.borderColor;
    } else {
        // ステータス未設定の場合はグレー表示
        label.style.color = '#999';
        label.style.backgroundColor = '';
        label.style.border = '';
    }

    // 実際の選択操作を行うセレクトボックス（透明にしてラベルの下に配置）
    const select = document.createElement('select');
    select.style.position = 'absolute';
    select.style.top = '0';
    select.style.left = '0';
    select.style.width = '100%';
    select.style.height = '100%';
    select.style.opacity = '0'; // 透明にすることでラベルを見せる
    select.style.cursor = 'pointer';

    // ステータス選択肢をセレクトボックスに追加
    STATUS_OPTIONS.forEach((option) => {
        const opt = document.createElement('option');
        opt.value = option.code;
        opt.text = option.name;
        select.appendChild(opt);
    });

    // 現在のステータスをセレクトボックスに設定
    select.value = item.Status || '';

    // セレクトボックスの変更イベントを設定
    select.addEventListener('change', (e) => {
        const newValue = (e.target as HTMLSelectElement).value;
        const newIndex = STATUS_OPTIONS.findIndex((opt) => opt.code === newValue);
        const newLabel = STATUS_OPTIONS[newIndex]?.name || '';
        const newColorSet = STATUS_COLORS[newIndex % STATUS_COLORS.length];

        // データの更新処理
        collectionView.editItem(item);
        item.Status = newValue;
        collectionView.commitEdit();
        collectionView.refresh();

        // ラベルの表示とスタイルを更新
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

    // コンテナにラベルとセレクトボックスを追加し、セルに挿入
    container.appendChild(label);
    container.appendChild(select);
    cell.appendChild(container);
}
