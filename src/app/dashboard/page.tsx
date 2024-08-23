"use client"

import React, { useState } from "react";
import Header from "@/components/headers/top";
import StatisticsChartCard from "@/components/cards/statistics";
import Table from "@/components/tables/in-out/table";
import ConfirmAction from "@/components/modals/confirmAction";
import { useDashboardStore } from "@/app/stores/dashboard";
import { monthBalance, Transactions, TransactionType } from "@/app/lib/mockData";
import AddTransactionModal from "@/components/modals/addTransaction";

function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    transactions,
    isModalOpen,
    selectedUserId,
    toDelete,
    monthBalanceData,
    transactionsData,
    toggleModal,
    editTransaction,
    deleteTransaction,
    resetSelection,
    loadTransactions,
    setToDeleteId,
    setMonthBalanceData,
    setTransactionsData,
    addTransaction,
  } = useDashboardStore((state) => ({
    transactions: state.transactions,
    isModalOpen: state.isModalOpen,
    selectedUserId: state.selectedUserId,
    toDelete: state.toDelete,
    monthBalanceData: state.monthBalanceData,
    transactionsData: state.transactionsData,
    toggleModal: state.toggleModal,
    editTransaction: state.editTransaction,
    deleteTransaction: state.deleteTransaction,
    resetSelection: state.resetSelection,
    loadTransactions: state.loadTransactions,
    setToDeleteId: state.setToDeleteId,
    setMonthBalanceData: state.setMonthBalanceData,
    setTransactionsData: state.setTransactionsData,
    addTransaction: state.addTransaction,
  }));

  React.useEffect(() => {
    const fetchData = async () => {
      await loadTransactions(selectedUserId || "1");
    };

    fetchData();
  }, [loadTransactions, selectedUserId]);

  React.useEffect(() => {
    setMonthBalanceData(monthBalance);
    setTransactionsData(transactions);
  }, [transactions, setMonthBalanceData, setTransactionsData]);

  const handleDelete = (id: string) => {
    toggleModal();
    setToDeleteId(id);
  };

  const handleCancel = () => {
    resetSelection();
  };

  const handleConfirm = () => {
    if (toDelete) {
      deleteTransaction(toDelete);
    }
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSaveClick = async (newTransaction: Omit<Transactions, 'id'>) => {
    await addTransaction(newTransaction);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex h-full flex-1 animate-fade flex-col overflow-hidden animate-duration-[2000ms]">
      <Header />
      <ConfirmAction
        isOpen={isModalOpen}
        title="Você realmente que deletar essa translação?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      {isAddModalOpen && (
        <AddTransactionModal 
          isOpen={isAddModalOpen}
          onSave={handleAddSaveClick}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}
      <main className="bg-old-rose-300 p-5">
        <header className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-extrabold text-old-rose-950">
            Dashboard
          </h1>
          <button
            type="button"
            className="ml-auto px-4 py-2 bg-old-rose-800 text-old-rose-50 rounded-md"
            onClick={handleAddClick}
          >
            Add Transaction
          </button>
        </header>

        {/* <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {monthBalanceData.map(({ title, canvasID, totalNumber, percentage, year }) => (
            <StatisticsChartCard key={canvasID} title={title} totalNumber={totalNumber} percentage={percentage} year={year} />
          ))}
        </section> */}

        <section className="mt-6">
          <h3 className="text-xl font-extrabold text-old-rose-950">Balanço</h3>
          <Table
            labels={["Nome", "Valor", "Tipo", "Data", "Ações"]}
            data={transactionsData}
            onDelete={handleDelete}
            onEdit={(id: string, updatedData: Partial<Transactions>) => {
              editTransaction(id, updatedData);
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;