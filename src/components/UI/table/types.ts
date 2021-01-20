export type HeaderItemType = {
  text: string;
  value: string;
  class?: string;
  position?: string;
  editable?: boolean;
  sortable?: boolean;
} & {
  [x:string]: any;
}

export type BodyItemType = {
  [x:string]: any;
}

export type CellItem = {
  value: string;
  text: string;
  rowIndex: string | number;
}

export type RowItem = CellItem[]
