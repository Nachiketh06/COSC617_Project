import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

import CircularProgressBar from "./graph/CircularProgressBar.js";
export const IncomeExpenses = ({userId}) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  const total = (Number(income)+Number(expense));
  const incomePercent = (Number(income)/total)*100;
  const expensePercent = (Number(expense)/total)*100;
  return (
    <>
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
  <p className="money plus">${numberWithCommas(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
  <p className="money minus">${numberWithCommas(expense)}</p>
        </div>
        
      </div>
      <hr></hr>
      <div className="inc-exp-container">
      <div>
      <CircularProgressBar
                  percentage={incomePercent.toFixed(0)}
                  color="green"
                />
      </div>
      <div>
      <CircularProgressBar
                  percentage={expensePercent.toFixed(0)}
                  color="red"
                />
      </div>
      </div>
      </>
  )
}
