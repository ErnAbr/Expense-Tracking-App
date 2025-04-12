import { Outlet } from "react-router-dom";
import { AppNavBar } from "../../components/AppBar/AppNavBar";

export const MainLayout = () => {
  return (
    <>
      <AppNavBar />
      <Outlet />
    </>
  );
};
