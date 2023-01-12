import React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { MainPage } from "@/pages"

import "./global.css"

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MainPage />
      </LocalizationProvider>
    </div>
  )
}

export default App
