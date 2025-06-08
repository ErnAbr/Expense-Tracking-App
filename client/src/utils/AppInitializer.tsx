import { ReactNode, useEffect, useState } from "react";
import { useStore } from "zustand";
import { useAppContext } from "../context/appContext";
import { api } from "../api/api";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";
import { queryCategories } from "../api/categories.query";
import iconNames from "../components/IconPicker/fa-icons.json";

interface AppInitializerProps {
  children: ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    user,
    setUser,
    categories: storedCategories,
    setCategories,
  } = useStore(useAppContext);

  const { data: queriedCategories, isPending: loadingCategories } =
    queryCategories(!!user);

  useEffect(() => {
    if (!storedCategories && queriedCategories) {
      setCategories(queriedCategories);
    }
  }, [storedCategories, queriedCategories]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const response = await api.User.getCurrentUser();
        setUser(response);
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
