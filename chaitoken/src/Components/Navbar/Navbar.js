import React,{useState,useContext} from 'react'
import './Navbar.css';
import {ERC20ICOContext} from "../Context/ChaiToken";
//import loader from '../Images/loader.gif';
import chaitoken from '../Images/chai.png';

function Navbar() {
  const {account, accountBal, userId} = useContext(ERC20ICOContext);

  return (
    <div className='navBar'>
      <div className='navBar_box'>
      <div className='navBar_box_left'>
      <h1>Chai Token</h1>
      </div>
      <div className='navBar_box_right'>
      <p>
        Token balance {" "} {" "} <span>{accountBal}</span>
      </p>
      <p>
        <span>
          UserId #{userId} {""} {""} {account}
        </span>
      </p>
      </div>
      </div>
    </div>
  )
}

export default Navbar