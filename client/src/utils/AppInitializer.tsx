import { ReactNode, useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAppContext } from "../context/appContext";
import { api } from "../api/api";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";
import { queryCategories } from "../api/categories.query";
import axios from "axios";

interface AppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, setUser } = useStore(useAppContext);

  const { isPending: loadingCategories } = queryCategories(!!user);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await api.User.getCurrentUser();
        setUser(response);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null); 
        } else {
          console.error("Unexpected error during user fetch", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  if (isLoading || (user && loadingCategories)) {
    return <LoadingComponent loadingMessage={"initiating App..."} />;
  }

  return <>{children}</>;
};
