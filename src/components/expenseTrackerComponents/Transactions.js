import React from "react";
import classes from "./Transactions.module.css";
import Trash from "../UI/Trash";

const Transactions = (props) => {
  const { transactions } = props;

  const deleteTransaction = (e) => {
    props.onDeleteTransaction(
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.id
    );
  };

  return (
    <div className={classes.transactions}>
      <p className={classes.transactions_title}>Your Transactions:</p>
      <div className={classes.transaction_tracker__container}>
        {transactions &&
          transactions.map((t) => (
            <div
              className={`${classes.transactions_tracker} ${
                t.type === "Income" ? classes.bg_green : classes.bg_red
              }`}
              key={t.id}
              data-id={t.id}
            >
              <p>{t.name}</p>
              <div className={classes.transactions_tracker__expense_delete}>
                <span>DOP {t.amount}</span>
                <button className={classes.delete_btn}>
                  <Trash onClick={deleteTransaction} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Transactions;
