import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";
import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../routes/routes";

export const ProtectedRoutes = () => {
  const { user } = useStore(useAppContext);

  if (!user) {
    return <Navigate to={routes.HOME} />;
  }

  return <Outlet />;
};
