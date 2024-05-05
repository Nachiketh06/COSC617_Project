// import React, { useContext, useEffect, useState } from 'react';
// import { Transaction } from './Transaction';

// import { GlobalContext } from '../context/GlobalState';
// // import { Bar } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from 'chart.js';
// export const TransactionList = ({userId}) => {
//   const { transactions, getTransactions } = useContext(GlobalContext);
//   const [chartData, setChartData] = useState({});
//   const [transaction, setTransaction] = useState({});

//   useEffect(() => {
//     getTransactions(userId);
//     setTransaction(transactions);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
    
//   }, [userId,transaction]);


//   return (
//     <>
//       <h3>History</h3>
//       <ul className="list">
//         {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
//       </ul>
     
//     </>
//   )
// }

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
