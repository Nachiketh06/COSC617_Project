
import React, { useContext, useEffect,useState } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = ({ userId }) => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  useEffect(() => {
    const handler = setTimeout(() => {
      getTransactions(userId);
    }, 2000);  // Delay the API call by 5000 milliseconds (5 seconds)
    
    return () => clearTimeout(handler);  // Clear the timeout if the component unmounts or dependencies change
  }, [userId, getTransactions]); 

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}
