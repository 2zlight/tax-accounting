export interface CurrencyResponse {
  currencies: Currency[]
  date: Date
}

export interface Currency {
  code: string
  quantity: number
  rateFormated: string
  diffFormated: string
  rate: number
  name: string
  diff: number
  date: Date
  validFromDate: Date
}
