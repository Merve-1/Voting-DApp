import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Web3 from 'web3';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import Welcome from './Welcome';
import VotingPage from './VotingPage';


import { contractAbi, contractAddress } from './Constant/constant';

const App = () => {
  const [account, setAccount] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]); // Changed to index 0, assuming admin account is first

          const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
          setContract(contractInstance);

          // Fetch the admin address
          const managerAddress = await contractInstance.methods.manager().call();

          // Determine if the current account is the admin
          setIsAdmin(accounts[0] === managerAddress);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          setError('Error connecting to MetaMask. Please try refreshing the page or make sure MetaMask is properly installed.');
        }
      } else {
        setError('MetaMask is not installed. Please install MetaMask to use this application.');
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <Router>
      {error ? (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminPage account={account} contract={contract} /> : <Navigate to="/user" />}
          />
          <Route
            path="/user"
            element={!isAdmin ? <UserPage account={account} contract={contract} /> : <Navigate to="/admin" />}
          />

          <Route
            path="/voting"
            element={<VotingPage contract={contract} />} />

        </Routes>
      )}
    </Router>
  );
};

export default App;
