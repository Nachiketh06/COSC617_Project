import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
  transactions: [],
  error: null,
  loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions(userId) {

    try {
      const res = await axios.get(`https://d391-204-62-51-191.ngrok-free.app/api/v1/transactions/${userId}`);

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
        headers:{'ngrok-skip-browser-warning': 'any_value'}
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }

  }

  async function deleteTransaction(id) {

    fetch(`https://d391-204-62-51-191.ngrok-free.app/api/v1/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any_value'
      },
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  async function addTransaction(transaction) {
  
    fetch('https://d391-204-62-51-191.ngrok-free.app/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any_value'
      },
      body: JSON.stringify(transaction)
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }



  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}
