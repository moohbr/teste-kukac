import { create } from "zustand";
import { Transactions } from "@/app/lib/mockData";

interface DashboardState {
  transactions: Transactions[];
  isModalOpen: boolean;
  selectedUserId: string | null;
  toDelete: string | null;
  monthBalanceData: {
    title: string;
    canvasID: string;
    totalNumber: number;
    percentage: number;
    year: number;
  }[];
  transactionsData: Transactions[];
}

type DashboardActions = {
  toggleModal: () => void;
  addTransaction: (data: Omit<Transactions, 'id'>) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
  editTransaction: (transactionId: string, data: Partial<Transactions>) => Promise<void>;
  resetSelection: () => void;
  loadTransactions: (userId: string) => Promise<void>;
  setToDeleteId: (id: string | null) => void;
  setMonthBalanceData: (data: DashboardState["monthBalanceData"]) => void;
  setTransactionsData: (data: Transactions[]) => void;
};

export const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  transactions: [],
  isModalOpen: false,
  selectedUserId: null,
  toDelete: null,
  monthBalanceData: [],
  transactionsData: [],
  loadTransactions: async (userId: string) => {
    const response = await fetch(`http://localhost:8080/transaction/user/${userId}`);
    const data = await response.json();
    set({ transactions: data });
  },
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  deleteTransaction: async (transactionId: string) => {
    const { selectedUserId, loadTransactions, toggleModal } = useDashboardStore.getState();
    const response = await fetch(`http://localhost:8080/transaction/${transactionId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Transaction deleted");
    } else {
      console.error("Transaction not deleted");
    }

    await loadTransactions(selectedUserId || "1");
    toggleModal();
  },
  editTransaction: async (transactionId: string, data: Partial<Transactions>) => {
    const { selectedUserId, transactions, setTransactionsData } = useDashboardStore.getState();
    const response = await fetch(`http://localhost:8080/transaction/${transactionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      console.log("Transaction edited");
      const updatedTransactions = transactions.map(transaction =>
        transaction.id === transactionId
          ? { ...transaction, ...data }
          : transaction
      );
      setTransactionsData(updatedTransactions);
    } else {
      console.error("Transaction not edited");
    }
  },
  resetSelection: () => {
    set({
      isModalOpen: false,
      selectedUserId: null,
      toDelete: null,
    });
  },
  setToDeleteId: (id: string | null) => {
    set({ toDelete: id });
  },
  setMonthBalanceData: (data: DashboardState["monthBalanceData"]) => {
    set({ monthBalanceData: data });
  },
  setTransactionsData: (data: Transactions[]) => {
    set({ transactionsData: data });
  },
  addTransaction: async (data: Omit<Transactions, 'id'>) => {
    const { selectedUserId, loadTransactions } = useDashboardStore.getState();
    const dateNumber = new Date(data.date).toISOString();
    const response = await fetch('http://localhost:8080/transaction', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        date: dateNumber,
        userId: selectedUserId || 1,
      }),
    });

    if (response.ok) {
      await loadTransactions(selectedUserId || "1");
    } 
  },
}));