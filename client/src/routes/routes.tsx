import { Navigate, createBrowserRouter } from "react-router-dom";
//user defined
import CreateWalletScreen from "@/screens/(auth)/create-wallet-screen";
import TransactionsScreen from "@/screens/(protected)/transactions-screen";
import HomeScreen from "@/screens/(protected)/home-screen";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";
import ErrorScreen from "@/screens/error-screen";

const appRouter = createBrowserRouter(
  [
    {
      element: <AuthRoutes />,
      children: [
        {
          path: "/create-wallet",
          element: <CreateWalletScreen />,
        },
      ],
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
          errorElement: <Navigate to="/error" />,
        },
        {
          path: "/transactions/:id",
          element: <TransactionsScreen />,
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
