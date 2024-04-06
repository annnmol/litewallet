import { Button } from "@/components/ui/button";
import { LocalStorageService } from "@/services/localstorage";
import useAppStore from "@/store";
import React from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import Loader from "../loader";

const HomeScreen = () => {
  const setAuthSession = useAppStore(
    useShallow((state) => state.setAuthSession)
  );
  const handleLogout = () => {
    LocalStorageService.remove("auth-session");
    setAuthSession(null);
   };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
      HomeScreen
      <Link to="detailed-transaction">deatiled transaction</Link>
      <Loader />
    </div>
  );
};

export default HomeScreen;
