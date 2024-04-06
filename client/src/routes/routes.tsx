import LoginScreen from "@/screens/(auth)/login-screen";
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
          element: <LoginScreen />,
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
          path: "/detailed-transaction",
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
