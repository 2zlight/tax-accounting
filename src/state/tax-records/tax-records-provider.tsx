import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react"
import noop from "lodash.noop"
import { v4 } from "uuid"

import { TaxRecord } from "@/models/tax-record"

interface Context {
  taxRecords: TaxRecord[]
  addRecord: (record: TaxRecord) => void
  removeRecord: (id: string) => void
}

const fakeRecord: TaxRecord = {
  id: v4(),
  date: new Date(),
  incomeUsd: 1500,
  incomeGel: 4500,
}

const fakeRecords: TaxRecord[] = [fakeRecord]

const initialState: Context = {
  taxRecords: fakeRecords,
  addRecord: noop,
  removeRecord: noop,
}

const TaxRecordsContext = createContext<Context>(initialState)

export const useTaxRecordsContext = () => useContext(TaxRecordsContext)

export const TaxRecordsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [taxRecords, setTaxRecords] = useState<TaxRecord[]>(initialState.taxRecords)

  const addRecord = (record: TaxRecord) =>
    setTaxRecords((prevState) =>
      [...prevState, record].sort((rec1, rec2) => {
        if (rec1.date === rec2.date) {
          return 0
        }

        return rec1.date > rec2.date ? 1 : -1
      })
    )

  const removeRecord = (id: string) =>
    setTaxRecords((prevState) => prevState.filter((rec) => rec.id !== id))

  const value: Context = useMemo(
    () => ({
      taxRecords,
      addRecord,
      removeRecord,
    }),
    [taxRecords]
  )

  return <TaxRecordsContext.Provider value={value}>{children}</TaxRecordsContext.Provider>
}
