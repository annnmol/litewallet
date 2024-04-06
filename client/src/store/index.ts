import { LocalStorageService } from "@/services/localstorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type StoreState = {
  authSession: any;
  setAuthSession: (authSession: any) => void;

  currentWallet: IWallet | null;
  setCurrentWallet: (wallet: any) => void;

  transactions: ITransaction[];
  setTransactions: (transactions: any[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  removeEverything: () => void;
};

export const useAppStore = create(
  persist(
    (set) => ({
      authSession: LocalStorageService.get("auth-session") || null,
      setAuthSession: async (payload: any) => {
        set({ authSession: payload });
        LocalStorageService.set("auth-session", payload);
      },

      currentWallet: null,
      setCurrentWallet: (wallet: any) => set({ currentWallet: wallet }),

      transactions: [],
      setTransactions: (transactions: any) => set({ transactions }),

      loading: false,
      setLoading: (payload: boolean) => set({ loading: payload }),

      removeEverything: () => set({}, true),
    }),
    {
      name: "auth-session",
      partialize: (state: StoreState) => ({ authSession: state.authSession }),
    }
  )
);

export default useAppStore;
