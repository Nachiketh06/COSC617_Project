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
    const response = await fetch(`https://d391-204-62-51-191.ngrok-free.app/api/v1/transactions/${userId}`, {
      method: 'GET',  // GET is the default method, specified here for clarity
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any_value'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: 'GET_TRANSACTIONS',
      payload: data.data,
    });
  } catch (error) {
    console.error('Error:', error);
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: error.message  // Adjusted to capture generic errors along with HTTP specific ones
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
