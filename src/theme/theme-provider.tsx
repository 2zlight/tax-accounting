import React, { PropsWithChildren } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider as OriginalThemeProvider } from "@mui/material/styles"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <OriginalThemeProvider theme={darkTheme}>
    <CssBaseline />
    {children}
  </OriginalThemeProvider>
)
