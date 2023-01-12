import DeleteIcon from "@mui/icons-material/Delete"
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"

import { TableColumn } from "@/models/table-column"
import { useTaxRecordsContext } from "@/state"

import { useDataTablePresenter } from "./data-table.presenter"

const TableColumnName: Record<TableColumn, string> = {
  [TableColumn.Date]: "Date",
  [TableColumn.IncomeUSD]: "Income ($USD)",
  [TableColumn.IncomeGEL]: "Income (₾GEL)",
  [TableColumn.TaxUSD]: "Tax ($USD)",
  [TableColumn.TaxGEL]: "Tax (₾GEL)",
  [TableColumn.AccumulatedUSD]: "Accumulated ($USD)",
  [TableColumn.AccumulatedGEL]: "Accumulated (₾GEL)",
}

export const DataTable = () => {
  const { removeRecord } = useTaxRecordsContext()
  const { tableRows } = useDataTablePresenter()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.entries(TableColumnName).map(([key, name]) => (
              <TableCell key={key}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableRows.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>{rec[TableColumn.Date].toDateString()}</TableCell>
              <TableCell>{rec[TableColumn.IncomeUSD]}</TableCell>
              <TableCell>{rec[TableColumn.IncomeGEL]}</TableCell>
              <TableCell>{rec[TableColumn.TaxUSD]}</TableCell>
              <TableCell>{rec[TableColumn.TaxGEL]}</TableCell>
              <TableCell>{rec[TableColumn.AccumulatedUSD]}</TableCell>
              <TableCell>{rec[TableColumn.AccumulatedGEL]}</TableCell>

              <TableCell>
                <IconButton onClick={() => removeRecord(rec.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
