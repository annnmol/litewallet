import { Button } from "@/components/ui/button";
import { LocalStorageService } from "@/services/localstorage";
import useAppStore from "@/store";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const LoginScreen = () => {
  const setAuthSession = useAppStore(
    useShallow((state) => state.setAuthSession)
  );
  const handleLogin = () => {
    LocalStorageService.set("auth-session", "anmool");
    setAuthSession("anmool");
  };
  return (
    <div>
      LoginScreen
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginScreen;
