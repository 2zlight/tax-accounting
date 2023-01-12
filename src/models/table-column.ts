import { TaxRecord } from "@/models/tax-record"

export enum TableColumn {
  Date = "date",
  IncomeUSD = "incomeUsd",
  IncomeGEL = "incomeGel",
  TaxUSD = "taxUsd",
  TaxGEL = "taxGel",
  AccumulatedUSD = "accUsd",
  AccumulatedGEL = "accGel",
}

export interface TaxTableRecord extends TaxRecord {
  [TableColumn.TaxUSD]: number
  [TableColumn.TaxGEL]: number
  [TableColumn.AccumulatedUSD]: number
  [TableColumn.AccumulatedGEL]: number
}
