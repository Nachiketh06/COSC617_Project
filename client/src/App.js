import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication Components
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
// import Register from "./Components/Register/Register";
// import Profile from "./Components/Profile/Profile";

// Financial Tracking Components
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  const [userState, setUserState] = useState({});
  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userState));
  }, [userState]);
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setUserState={setUserState} />} />
        <Route path="/" element={
          userState && userState._id ? (
            <GlobalProvider>
              <Header />
              <div className="container">
                <h1>Welcome {userState.name} </h1>
                <hr></hr>
                <Balance userId={userState._id} />
                <IncomeExpenses userId={userState._id}/>
                <TransactionList userId={userState._id}/>
                <AddTransaction userId={userState._id}/>
              </div>
            </GlobalProvider>
          ) : (
            <Login setUserState={setUserState} />
          )
        } />
        <Route path="/signup" element={<Register />}></Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;


// import React from 'react';
// import { Header } from './components/Header';
// import { Balance } from './components/Balance';
// import { IncomeExpenses } from './components/IncomeExpenses';
// import { TransactionList } from './components/TransactionList';
// import { AddTransaction } from './components/AddTransaction';

// import { GlobalProvider } from './context/GlobalState';

// import './App.css';

// function App() {
//   return (
//     <GlobalProvider>
//       <Header />
//       <div className="container">
//         <Balance />
//         <IncomeExpenses />
//         <TransactionList />
//         <AddTransaction />
//       </div>
//     </GlobalProvider>
//   );
// }

// export default App;
