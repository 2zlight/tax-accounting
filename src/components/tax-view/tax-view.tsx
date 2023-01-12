import { Box } from "@mui/material"

import { DataTable } from "./data-table"
import { TaxRecordForm } from "./tax-record-form"
import { useTaxViewPresenter } from "./tax-view.presenter"

export const TaxView = () => {
  const { onAdd } = useTaxViewPresenter()

  return (
    <Box display="flex" rowGap={2} flexDirection="column" position="relative">
      <DataTable />
      <TaxRecordForm onAdd={onAdd} />
    </Box>
  )
}
