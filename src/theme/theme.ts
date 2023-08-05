import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F28E18",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      dark: "#E5E5E5",
      light: "#FF8B00",
    },
    info: {
      main: "#FF8B00",
    },
  },
  typography: {
    fontFamily: "\"Poppins\"",
    fontSize: 16,
    button: {
      textTransform: "none",
      whiteSpace: "nowrap",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 600,
      lg: 1450,
      xl: 1536,
    },
  },
});
