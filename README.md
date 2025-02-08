# React App with Truffle Setup

## Introduction

This project provides a template for building a React application integrated with Truffle for smart contract development. Below are the steps to create the project from scratch and instructions for those who want to clone and run the project.

## Creating the Project from Scratch

1. **Create a Project Folder**: Open your terminal and create a folder for your project.
   ```bash
   mkdir my-react-truffle-app
   cd my-react-truffle-app
   ```

2. **Initialize npm**: Initialize npm in your project folder.
   ```bash
   npm init
   ```

3. **Change Entry Point**: Update the entry point to `truffle-config.js` in `package.json`.

4. **Install Dependencies**: Install necessary dependencies.
   ```bash
   npm i
   npm install truffle --save-dev
   ```

5. **Initialize Truffle**: Initialize Truffle inside your project.
   ```bash
   truffle init
   ```

6. **Compile Contracts**: Compile your smart contracts.
   ```bash
   truffle compile
   ```

7. **Add Migration Scripts**: Create migration scripts for deploying contracts.

8. **Migrate Contracts**: Migrate your contracts to the blockchain.
   ```bash
   truffle migrate
   ```
   **Note**: Before migrating, ensure that Ganache is running, as the contracts will be deployed on it.

## After Cloning

1. **Start Ganache**: Ensure that Ganache is running before proceeding with migration.

2. **Update constant.js**: Inside the `Constant` folder.
   ```javascript
   // src/constants/constants.js
   const contractConstants = {
       contractAddress: "<Your_Contract_Address>",
       contractABI: "<Your_Contract_ABI>"
   };

   export default contractConstants;
   ```

## Running the React App

1. **Start the React App**: 
   ```bash
   npm start
   ```

2. **View the App**: 
   Open your browser and go to `http://localhost:3000/` to view the React app.

## Screenshots

### Welcome Page
![image](https://github.com/user-attachments/assets/77222ca0-a575-402c-94eb-bf4723951c2e)

### Admin Page
![image](https://github.com/user-attachments/assets/6eaa51d2-e90d-41e7-ba73-f9b6b20d345f)

### Candidate Registered
![image](https://github.com/user-attachments/assets/eb889cba-09f3-46c2-b996-f4f4092839ec)

### User Page
![image](https://github.com/user-attachments/assets/b3cf31a6-67a1-431c-aa64-562bf41d6974)

### Voting Page
![image](https://github.com/user-attachments/assets/e6c49039-257c-414f-822f-9cb415125540)

### Voting Done
![image](https://github.com/user-attachments/assets/959c5e6a-3cd2-405e-bd51-dfe97c7f5f88)

## Explanation 

https://www.youtube.com/watch?v=fDWI0yzeOdw&list=PLvbB9_57RxMexOSOruXk-SzA47v9KGJa-
