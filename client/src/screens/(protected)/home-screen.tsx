import { Button } from "@/components/ui/button";
import useWalletService from "@/hooks/useWalletService";
import { LocalStorageService } from "@/services/localstorage";
import useAppStore from "@/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import Loader from "../loader";

import { Activity, ArrowUpRight, DollarSign } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateTransactionForm from "@/components/wallet/create-transaction-form";
import RecentTransactions from "@/components/wallet/recent-transactions";
import useTransactionService from "@/hooks/useTransactionService";
import { formatDateTime } from "@/lib/utils";
import DashboardCards from "@/components/wallet/dashboard-cards";

const HomeScreen = () => {
  const { getMyWallet, loading, currentWallet } = useWalletService();
  const { getTranscations } = useTransactionService();
  const { authSession, transactions } = useAppStore();

  useEffect(() => {
    if (authSession) {
      getMyWallet(authSession);
      getTranscations({ id: authSession, limit: 3, skip: 0, date: -1 });
    }
    return () => {};
  }, [authSession]);

  const setAuthSession = useAppStore(
    useShallow((state) => state.setAuthSession)
  );
  const handleLogout = () => {
    LocalStorageService.remove("auth-session");
    setAuthSession(null);
  };

  const DASHBOARD_CARDS_DATA = [
    {
      title: "Total Balance",
      value: currentWallet?.balance ?? 0,
      percentage: "+17.8% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Last Transaction",
      value: transactions?.[0]?.amount ?? 0,
      percentage: formatDateTime(transactions?.[0]?.date).dateTime,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Balance",
      value: currentWallet?.balance ?? 0,
      percentage: "+17.8% from last month",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Last Transaction",
      value: transactions?.[0]?.amount ?? 0,
      percentage: formatDateTime(transactions?.[0]?.date).dateTime,
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-12">
        <div className="w-[60%] flex flex-col gap-16">
          <div className="flex flex-row justify-center items-center gap-12 flex-wrap">
            <DashboardCards data={DASHBOARD_CARDS_DATA} />
          </div>
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your wallet.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to={`/transactions/${currentWallet?._id}`}>
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <RecentTransactions data={transactions} />
            </CardContent>
          </Card>
        </div>
        <div className=" w-[35%] flex justify-center items-center gap-8">
          <CreateTransactionForm />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
