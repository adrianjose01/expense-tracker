import React, { useState, useRef, useEffect } from "react";
import classes from "./TrackerInput.module.css";

const TrackerInput = (props) => {
  const [currBalance, setCurrBalance] = useState(0);

  useEffect(() => {
    const transaction = JSON.parse(localStorage.getItem("transactions"));
    if (transaction) {
      let balance = 0;
      transaction.map((t) => {
        balance += +t.amount;
        setCurrBalance(+balance);
        return null;
      });
    }
    if (transaction.length <= 0) setCurrBalance(0);
  });

  const nameInputRef = useRef();
  const typeInputRef = useRef();
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;

    let obj = {};

    if (enteredType === "Income") {
      obj = {
        name: enteredName,
        type: enteredType,
        amount: enteredAmount,
        id: Math.random(),
      };
    } else {
      obj = {
        name: enteredName,
        type: enteredType,
        amount: `-${enteredAmount}`,
        id: Math.random(),
      };
    }
    nameInputRef.current.value = "";
    amountInputRef.current.value = "";
    amountInputRef.current.blur();
    props.onAddTransaction(obj);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <small>Your current Balance</small>
        <p>DOP {currBalance}</p>
      </div>
      <form onSubmit={submitHandler}>
        <p>Add new transaction</p>
        <div className={classes.label_container}>
          <label>
            <span>Name</span>
            <input
              id="name"
              type="text"
              required
              placeholder="Ex. My Salary"
              ref={nameInputRef}
            />
          </label>
        </div>
        <div className={classes.label_container}>
          <label>
            <span>Type</span>
            <select id="type" ref={typeInputRef}>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </label>
        </div>
        <div className={classes.label_container}>
          <label>
            <span>Amount</span>
            <input
              id="amount"
              type="number"
              required
              placeholder="300"
              ref={amountInputRef}
            />
          </label>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TrackerInput;
