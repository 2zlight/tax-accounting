import { TableColumn } from "./table-column"

export interface TaxRecord {
  id: string
  [TableColumn.Date]: Date
  [TableColumn.IncomeUSD]: number
  [TableColumn.IncomeGEL]: number
}
