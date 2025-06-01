import { useStore } from "zustand";
import { queryCategories } from "../../api/queryCategories";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";

// 1 MOVE DATA QUERING TO APPINIT COMPONENT AND SAVE IT TO GLOBALSTATE

export const SpendingPage = () => {
  const navigate = useNavigate();
  const {
    categories: storedCategories,
    setCategories,
    logout,
  } = useStore(useAppContext);

  const {
    data: queriedCategories,
    error,
    isPending: loadingCategories,
  } = queryCategories();

  useEffect(() => {
    if (!storedCategories && queriedCategories) {
      setCategories(queriedCategories);
    }
  }, [storedCategories, queriedCategories]);

  useEffect(() => {
    if (error) {
      logout();
      navigate(routes.HOME);
    }
  }, [error, logout, navigate]);

  console.log(queriedCategories);

  if (loadingCategories) {
    return <LoadingComponent loadingMessage={"loading User Data..."} />;
  }

  return <h1>This Is Spending Page</h1>;
};
