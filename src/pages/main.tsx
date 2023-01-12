import { Box } from "@mui/material"

import { TaxView } from "@/components/tax-view"
import { TaxRecordsProvider } from "@/state"

export const MainPage = () => (
  <TaxRecordsProvider>
    <Box p={5}>
      <TaxView />
    </Box>
  </TaxRecordsProvider>
)
