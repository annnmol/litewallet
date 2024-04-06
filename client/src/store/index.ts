import { LocalStorageService } from "@/services/localstorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type StoreState = {
  authSession: any;
  setAuthSession: (authSession: any) => void;
  transactions: any;
  setTransactions: (transactions: any[]) => void;
  removeEverything: () => void;
};

export const useAppStore = create(
  persist(
    (set) => ({
      authSession: LocalStorageService.get("auth-session") || null,
      setAuthSession: async (payload: any) => {
        set({ authSession: payload });
      },
      transactions: [],
      setTransactions: (transactions: any) => set({ transactions }),
      removeEverything: () => set({}, true),
    }),
    {
      name: "auth-session",
      partialize: (state: StoreState) => ({ authSession: state.authSession }),
    }
  )
);

export default useAppStore;
