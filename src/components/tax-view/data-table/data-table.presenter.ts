import { useMemo } from "react"

import { TableColumn, TaxTableRecord } from "@/models/table-column"
import { TaxRecord } from "@/models/tax-record"
import { useTaxRecordsContext } from "@/state"

const getAccIncome = (
  taxRecords: TaxRecord[],
  column: TableColumn.IncomeUSD | TableColumn.IncomeGEL,
  dateUntil: Date
): number =>
  taxRecords.reduce((acc, rec) => {
    if (rec[TableColumn.Date] < dateUntil) {
      acc += rec[column]
      return acc
    }

    return acc
  }, Number(0))

export const useDataTablePresenter = () => {
  const { taxRecords } = useTaxRecordsContext()

  const tableRows: TaxTableRecord[] = useMemo(
    () =>
      taxRecords.map((rec) => ({
        ...rec,
        taxUsd: rec.incomeUsd * 0.01,
        taxGel: Math.ceil(rec.incomeGel * 100) / 10000,
        accUsd: getAccIncome(taxRecords, TableColumn.IncomeUSD, rec.date) + rec.incomeUsd,
        accGel: getAccIncome(taxRecords, TableColumn.IncomeGEL, rec.date) + rec.incomeGel,
      })),
    [taxRecords]
  )

  return useMemo(
    () => ({
      tableRows,
    }),
    [tableRows]
  )
}
