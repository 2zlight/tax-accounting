import React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import { MainPage } from "@/pages"
import { ThemeProvider } from "@/theme"

import "./global.css"

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MainPage />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
