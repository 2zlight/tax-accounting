import { Controller, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab"
import { Box, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"

export interface TaxRecordFormType {
  date: Dayjs
  incomeUsd: number
}

const defaultValues: TaxRecordFormType = {
  date: dayjs(),
  incomeUsd: 0,
}

interface TaxRecordFormProps {
  onAdd: (taxRecord: TaxRecordFormType) => Promise<void>
}

export const TaxRecordForm = (props: TaxRecordFormProps) => {
  const { onAdd } = props

  const { handleSubmit, control, register, formState } = useForm<TaxRecordFormType>({
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onAdd)}>
      <Box display="flex" position="fixed" bottom="40px" left="40px">
        <Controller
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Income payment date"
              {...field}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          name="date"
        />

        <TextField
          sx={{ ml: 1 }}
          {...register("incomeUsd")}
          variant="outlined"
          label="Income in USD"
          type="number"
        />

        <Box display="flex" alignItems="center">
          <LoadingButton
            type="submit"
            sx={{ ml: 1 }}
            variant="contained"
            loading={formState.isSubmitting}
          >
            Add
          </LoadingButton>
        </Box>
      </Box>
    </form>
  )
}
