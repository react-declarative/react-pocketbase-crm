import { createTheme } from "@mui/material";

export const THEME_DARK = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#F5F8FF",
    },
    success: {
      dark: "#2F6b39",
      light: "#5fc16d",
      main: "#38b249",
    },
    warning: {
      dark: "#8D682d",
      light: "#f7bb57",
      main: "#f6ab2e",
    },
    info: {
      dark: "#1D4580",
      light: "#4483df",
      main: "#1664d8",
    },
    error: {
      dark: "#85372b",
      light: "#eb6d57",
      main: "#e6492d",
    },
    text: {
      primary: "#fff9",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    background: {
      default: "#111318",
      paper: "#111318",
    },
  },
});

export default THEME_DARK;
