import { useCallback, useMemo } from "react"
import { Dayjs } from "dayjs"
import { v4 } from "uuid"

import { API, httpClient } from "@/api"
import { CurrencyResponse } from "@/models/currency"
import { TaxRecord } from "@/models/tax-record"
import { useTaxRecordsContext } from "@/state"

import { TaxRecordFormType } from "./tax-record-form"

export const useTaxViewPresenter = () => {
  const { addRecord } = useTaxRecordsContext()

  const getCurrencyRate = async (code: string, date: Dayjs) => {
    const url = new URL(API.currency)
    url.searchParams.append("currencies", code)
    url.searchParams.append("date", date.format("YYYY-MM-DD"))

    const currency = await httpClient.get<CurrencyResponse[]>(url.toString()).catch(() => null)

    return currency
  }

  const onAdd = useCallback(
    async (taxRecordForm: TaxRecordFormType) => {
      const currencyInfo = await getCurrencyRate("USD", taxRecordForm.date)

      if (currencyInfo == null) {
        return
      }

      const rate = currencyInfo[0].currencies[0].rate
      const gelIncome = Math.ceil(taxRecordForm.incomeUsd * rate * 100) / 100

      const taxRecord: TaxRecord = {
        id: v4(),
        date: taxRecordForm.date.toDate(),
        incomeUsd: Number(taxRecordForm.incomeUsd),
        incomeGel: gelIncome,
      }

      addRecord(taxRecord)
    },
    [addRecord]
  )

  return useMemo(() => ({ onAdd }), [onAdd])
}
