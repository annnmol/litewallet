import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { Coins, LogOut } from "lucide-react";
import useAppStore from "@/store";
import { useEffect } from "react";
import useWalletService from "@/hooks/useWalletService";

const Header = () => {
  const { setAuthSession, currentWallet, authSession } = useAppStore();

  const { getMyWallet } = useWalletService();

  useEffect(() => {
    if (authSession) {
      getMyWallet(authSession);
    }
    return () => {};
  }, [authSession]);

  const handleLogout = () => {
    setAuthSession(null);
  };
  return (
    <>
      <nav className="flex-col gap-6 text-lg font-medium items-center">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Coins className="h-6 w-6 text-primary-foreground" />
          <span className="text-primary-foreground">LiteWallet</span>
        </Link>
      </nav>

      <div className="flex w-full items-center justify-end gap-6">
        <span className="text-primary-foreground">{currentWallet?.name}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-[20px] w-[20px] bg-transparent"
          onClick={handleLogout}
          title="logout"
        >
          <LogOut className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>
    </>
  );
};

export default Header;
