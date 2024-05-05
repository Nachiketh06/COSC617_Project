import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = ({ userId }) => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  console.log("User ID in Balance:", userId); 
  return (
    <>
      <h4>Your Balance</h4>
    <h1>${numberWithCommas(total)}</h1>
    </>
  )
}
