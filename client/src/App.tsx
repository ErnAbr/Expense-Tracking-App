import "./app.scss";
import { createTheme, CssBaseline } from "@mui/material";
import { Routes } from "./navigation/routes/router";
import { ThemeProvider } from "@emotion/react";
import { useStore } from "zustand";
import { useAppContext } from "./context/appContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { darkMode } = useStore(useAppContext);

  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode === false ? "#eaeaea" : "rgb(0, 8, 15)",
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
        <ToastContainer closeOnClick position="bottom-right" theme="colored" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
