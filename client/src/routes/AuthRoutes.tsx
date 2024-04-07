import AuthLayout from "@/screens/(auth)/layout";
import useAppStore from "@/store";

import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const AuthRoutes = () => {
  // TODO: Use authentication token
  const authSession = useAppStore(useShallow((state) => state.authSession));

  return authSession ? <Navigate to="/" replace /> : <AuthLayout />;
};

export default AuthRoutes;
