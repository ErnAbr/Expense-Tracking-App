import styles from "./appInitializer.module.scss";
import { ReactNode, useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAppContext } from "../context/appContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { routes } from "../navigation/routes/routes";

interface AppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setUser } = useStore(useAppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await api.User.getCurrentUser();
        setUser(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            navigate(routes.HOME);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress color="secondary" size={200} />
        <Typography variant="h4" mt={1}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};
