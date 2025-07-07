import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { routes } from "./routes";
import { HomePage } from "../../pages/HomePage/HomePage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { SpendingPage } from "../../pages/SpendingPage/SpendingPage";
import { BudgetPage } from "../../pages/BudgetPage/BudgetPage";
import { DataPage } from "../../pages/DataPage/DataPage";
import { ProtectedRoutes } from "../auth/ProtectedRoutes";
import { GuestRoutes } from "../auth/GuestRoutes";
import { CategoryExpensePage } from "../../pages/CategoryExpensePage/CategoryExpensePage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <MainLayout />,
    children: [
      {
        element: <GuestRoutes />,
        children: [
          { path: routes.HOME, element: <HomePage /> },
          { path: routes.REGISTER, element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: routes.SPENDING, element: <SpendingPage /> },
          {
            path: `${routes.CATEGORY_SPENDING_PAGE}/:categoryId`,
            element: <CategoryExpensePage />,
          },
          { path: routes.BUDGET, element: <BudgetPage /> },
          { path: routes.DATA, element: <DataPage /> },
        ],
      },
      { path: routes.NOT_FOUND, element: <NotFoundPage /> },
      { path: "*", element: <Navigate replace to={routes.NOT_FOUND} /> },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
