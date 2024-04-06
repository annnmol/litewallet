import ProtectedLayout from "@/screens/(protected)/layout";
import useAppStore from "@/store";

import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const authSession = useAppStore(useShallow((state) => state.authSession));

  console.log(
    `🚀 ~ file: ProtectedRoutes.tsx:10 ~ ProtectedRoutes ~ authSession:`,
    authSession
  );

  return authSession ? <ProtectedLayout /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
