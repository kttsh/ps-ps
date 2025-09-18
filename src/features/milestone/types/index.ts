// Re-export all types from milestone.ts
export * from './milestone';

// Column Definition type (moved from component)
export interface ColumnDefinition {
  header: string;
  binding?: string;
  width?: number;
  columns?: ColumnDefinition[];
  cellTemplate?: (
    panel: any,
    row: number,
    col: number,
    cell: HTMLElement,
  ) => void;
}