import { Outlet } from "react-router-dom";
import { AppNavBar } from "../../components/AppBar/AppNavBar";
import { AppInitializer } from "../../utils/AppInitializer";

export const MainLayout = () => {
  return (
    <>
      <AppInitializer>
        <AppNavBar />
        <Outlet />
      </AppInitializer>
    </>
  );
};
