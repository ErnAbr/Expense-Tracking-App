import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";
import { routes } from "../routes/routes";

export const GuestRoutes = () => {
  const { user } = useStore(useAppContext);
  const location = useLocation();

  if (user) {
    return <Navigate to={routes.BUDGET} replace state={{ from: location }} />;
  }

  return <Outlet />;
};
