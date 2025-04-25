import "./app.scss";
import { createTheme, CssBaseline } from "@mui/material";
import { Routes } from "./navigation/routes/router";
import { ThemeProvider } from "@emotion/react";
import { useStore } from "zustand";
import { useAppContext } from "./context/appContext";

function App() {
  const { darkMode } = useStore(useAppContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode === false ? "#eaeaea" : "rgb(0, 8, 15)",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
