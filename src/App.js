import React, { useState, useEffect } from "react";
import TrackerInput from "./components/expenseTrackerComponents/TrackerInput";
import Transactions from "./components/expenseTrackerComponents/Transactions";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("transactions"));
    if (t) {
      setTransactions(t);
    }
  }, []);

  const addTransactions = (objTran) => {
    setTransactions((prev) => {
      localStorage.setItem("transactions", JSON.stringify([...prev, objTran]));
      return [...prev, objTran];
    });
  };

  const deleteTransactions = (id) => {
    setTransactions((prev) => {
      const newArray = prev.filter((t) => t.id.toString() !== id);
      localStorage.setItem("transactions", JSON.stringify(newArray));
      return newArray;
    });
  };

  return (
    <div className="app-container">
      <Header />
      <section>
        <TrackerInput onAddTransaction={addTransactions} />
        <Transactions
          transactions={transactions}
          onDeleteTransaction={deleteTransactions}
        />
      </section>
      <Footer />
    </div>
  );
};

export default App;
