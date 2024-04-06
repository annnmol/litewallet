import { useState } from "react";

//user defined components
import ONBOARD_IMAGE from "@/assets/wallet--person.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useWalletService from "@/hooks/useWalletService";
import Loader from "@/screens/loader";


const CreateWalletForm =()=> {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const { setupWallet, loading } = useWalletService();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(name, balance);
    setupWallet(name, balance)
  };
  return (
    <>
      {
        loading ? <Loader /> : null
      }
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="hidden bg-muted w-full h-screen lg:flex lg:justify-center lg:items-center lg:flex-col lg:gap-8">
          <img
            src={ONBOARD_IMAGE}
            alt="onboarding-img"
            className="h-[70%] object-fit dark:brightness-[0.2] dark:grayscale"
          />
          <p className="text-2xl font-medium text-slate-700">
            Keep track of your money at one place.
          </p>
        </div>
        <div className="flex items-center justify-center py-12 w-full h-screen">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold"> LiteWallet</h1>
              <p className="text-balance text-muted-foreground">
                Enter your name to setup a wallet.
              </p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Anmol Tanwar"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balance">Intial Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    required
                    name="balance"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateWalletForm;
