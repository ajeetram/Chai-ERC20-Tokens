import React, { useEffect, useState, createContext } from "react";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractABI, contractAdd } from "./constant";
var BigInt = require("big-integer");
export const ERC20ICOContext = createContext("");


const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(contractAdd, contractABI, signerOrProvider);

export const ERC20Provider = ({ children }) => {

  //--user account
  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccounts] = useState("");
  const [accountBal, setAccountBal] = useState("");
  const [userId, setUserId] = useState("");

  // --token information
  const [NoOfToken, setNoOfToken] = useState(" ");
  const [TokenName, setTokenName] = useState(" ");
  const [TokenStandard, setTokenStandard] = useState(" ");
  const [TokenSymbol, setTokenSymbol] = useState(" ");
  const [TokenOwner, setTokenOwner] = useState(" ");
  const [TokenOwnerBal, setTokenOwnerBal] = useState(" ");

  //---connecting wallet to applicatio

  const checkConnection = async() => {
    try {
      if (window.ethereum) 
      {
      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });
      setAccounts(accounts[0]);

      //--creating connection to connect and fetch data
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      //-- get all token holder
      const allTokenHolder = await contract.balanceOf(accounts[0]);
      setAccountBal(allTokenHolder.toNumber());

      const totalHolder = await contract._userId();
      setUserId(totalHolder.toNumber());
      //console.log(contract);
    }
    else
    {
        alert("Please Install MetaMask");
    }
    } catch (error) {
      console.log("App is not connected");
    }
  };

  // --ERC20 contract

  const ERC20ChaiToken = async () => {
    try {
      //--- connection
      if (window.ethereum) 
      {
      //--creating connection to connect and fetch data
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(
        "0x47ee0DF89e858Ca4D128089e2Ac9eaDE81779be7"
      );
      const contract = fetchContractERC20(signer);

      // token supply
      const supply = await contract.totalSupply();
      const totalSupply = supply.toNumber();
      setNoOfToken(totalSupply);

      // Token Name

      const Name = await contract.name();
      setTokenName(Name);

      // Token Symbol

      const tokenSymbol = await contract.symbol();
      setTokenSymbol(tokenSymbol);

      // token standard
      const standard = await contract.standard();
      setTokenStandard(standard);

      // token ownercontract
      const ownercontract = await contract.ownerOfcontract();
      setTokenOwner(ownercontract);

      // owner token bal
      const balanceToken = await contract.balanceOf(
        "0x47ee0DF89e858Ca4D128089e2Ac9eaDE81779be7"
      );
      setTokenOwnerBal(balanceToken.toNumber());
      }
    
    } catch (error) {
      console.log("Error in ERC20 token");
    }
  };

  // const transferToken = async (address, value) => {
  //   try {
  //     //--creating connection to connect and fetch data
  //    // if (!address || !value) return console.log("No Data");
  //     console.log(address, value * 1);
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     const contract = fetchContractERC20(signer);

  //     const transfer = await contract.transfer(address, value);

  //     transfer.wait();

  //     // myLoader();
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("something wrong while transfering token");
  //   }
  // };

  // GET TOKEN HOLDER DATA
// useEffect(() => {
//   const allTokenHolderData = async () => {
//     try {
//       const web3Modal = new Web3Modal();
//       const connection = await web3Modal.connect();
//       const provider = new ethers.providers.Web3Provider(connection);
//       const signer = provider.getSigner();
//       const contract = fetchContractERC20(signer);

//       const allTokenHolder = await contract.getTokenHolder();
     
//       allTokenHolder.map(async (el) => {
//         const singleHolderData = await contract.getTokenHolderData(el);
//         holderArray.push(singleHolderData);
//         console.log("Ajeet")
//       });
//     } catch (error) {
//       console.log("Worng getting data");
//     }

   
//   };
//    allTokenHolderData();
   
 
// }, [])


  const allTokenHolderData = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const allTokenHolder = await contract.getTokenHolder();

      allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        holderArray.push(singleHolderData);
        console.log(holderArray);
      });
    } catch (error) {
      console.log("Worng getting data");
    }
  };

  return (
    <ERC20ICOContext.Provider
      value={{
        checkConnection,
        ERC20ChaiToken,
        // transferToken,
         allTokenHolderData,
        holderArray,
        account,
        accountBal,
        userId,
        NoOfToken,
        TokenName,
        TokenStandard,
        TokenSymbol,
        TokenOwner,
        TokenOwnerBal,
        
      }}
    >
      {children}
      
    </ERC20ICOContext.Provider>
  );
};
