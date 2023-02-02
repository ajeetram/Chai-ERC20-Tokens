import { use } from "chai";
import React, { useState } from "react";
import chaitoken from "../Images/chai.png";
import './transfer.css';
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractABI, contractAdd } from "../Context/constant";

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(contractAdd, contractABI, signerOrProvider);
function Transfer({
  NoOfToken,
  TokenName,
  TokenOwnerBal,
  // transferToken,
}) {
  const [transferAccount, setTransferAccount] = useState("");
  const [tokenNumber, setTokenNumber] = useState(0);
  const [formData, setformData] = useState({
    Address:"",
    NumberOfToken:""
  })

  const transferToken = async () => {
    try {
      //--creating connection to connect and fetch data
     //if (!formData.Address || !formData.Address) return console.log("No Data");
      //console.log(address, value * 1);
      console.log(formData.Address,formData.NumberOfToken)
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const transfer = await contract.transfer(formData.Address, formData.NumberOfToken);

      transfer.wait();
      
      // myLoader();
      window.location.reload();
    } catch (error) {
      console.log("something wrong while transfering token");
    }
  };


 const changeHandler=(e)=>
  {
    const value = e.target.value;
    const name = e.target.name;
    setformData({
      ...formData,
      [name]: value
    });

  }

  return (
    <div className="transfer">
      <div className="transfer_box">
        <div className="transfer_box_left">
          <h2>Token Analytics</h2>
          <div className="transfer_box_left_box">
            <p>
              Token Name
              <span>{TokenName}</span>
            </p>
            <p>
              Token Supply<span>{NoOfToken}</span>
            </p>
            <p>
              Token Symbol{" "}
              <span className="chaiToken">
                <img
                  src={chaitoken}
                  alt="symbol"
                  style={{ width: "70px", height: "70px " }}
                ></img>
              </span>
            </p>
            <p>
              Token Left <span>{TokenOwnerBal}</span>
            </p>
          </div>
        </div>
        <div className="transfer_box_right">
          <h2>Transfer Token</h2>
          <input
            placeholder="Enter Address"
            type="text"
            name="Address"
            onChange={changeHandler}
            value={formData.Address}
          ></input>
          <input
            placeholder="Token Number"
            type="number"
            min={1}
            name="NumberOfToken"
            value={formData.NumberOfToken}
            onChange={changeHandler}
          ></input>
          <div className="transfer_box_right_btn">
            <button onClick={transferToken}>
              Send Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
