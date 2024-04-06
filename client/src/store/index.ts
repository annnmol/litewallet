import { create } from "zustand";

export type StoreState = {
  transactions: any;
  setTransactions: (transactions: any[]) => void;
  removeEverything: () => void;
};

const useAppStore = create<StoreState>((set) => ({
  transactions: [],
  setTransactions: (transactions: any) => set({ transactions }),
  removeEverything: () => set({}, true),
}));

export default useAppStore;
