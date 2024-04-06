import CreateWalletScreen from "@/screens/(auth)/create-wallet-screen";
import DetailedTransactionScreen from "@/screens/(protected)/detailed-transaction-screen";
import HomeScreen from "@/screens/(protected)/home-screen";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import ErrorScreen from "@/screens/error-screen";

const appRouter = createBrowserRouter(
  [
    {
      element: <AuthRoutes />,
      children: [
        {
          path: "/login",
          element: <CreateWalletScreen />,
        },
      ],
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/home",
          element: <HomeScreen />,
          errorElement: <Navigate to="/error" />,
        },
        {
          path: "/transactions/:id",
          element: <DetailedTransactionScreen />,
        },
      ],
    },
    {
      path: "error",
      element: <ErrorScreen />,
    },
    // Add this route at the end
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
  ],
  {
    basename: "/",
  }
);

export default appRouter;
