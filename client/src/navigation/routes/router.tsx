import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { routes } from "./routes";
import { HomePage } from "../../pages/HomePage/HomePage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { SpendingPage } from "../../pages/SpendingPage/SpendingPage";
import { BudgetPage } from "../../pages/BudgetPage/BudgetPage";
import { DataPage } from "../../pages/DataPage/DataPage";

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <MainLayout />,
    children: [
      { path: routes.HOME, element: <HomePage /> },
      { path: routes.REGISTER, element: <RegisterPage /> },
      { path: routes.SPENDING, element: <SpendingPage /> },
      { path: routes.BUDGET, element: <BudgetPage /> },
      { path: routes.DATA, element: <DataPage /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
