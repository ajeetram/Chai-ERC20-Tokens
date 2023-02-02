import React,{useState,useEffect,useContext} from 'react'
import { ERC20ICOContext } from './Context/ChaiToken'
import chaiToken from './Images/chai.png';
import Transfer from './Transfer/Transfer';
import User from './User/User';
import './home.css'
const Home=()=> {
  const {checkConnection,
    ERC20ChaiToken,
    transferToken,
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
    TokenOwnerBal} = useContext(ERC20ICOContext)
    
    useEffect(() => {
      checkConnection();
      allTokenHolderData();
      ERC20ChaiToken();
   
    },[])
    




  return (
    <div className='style'>
    <div className='heroSection'>
    <div className="heroSection_left">
    <h1>Launching Chai Token(Chai) ERC20 Token</h1>
    <p>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Error 
        veritatis temporibus rerum
    </p>
    <div className='heroSection_left_btn'>
     <button className='btn'>White paper</button>
     <button className='btn'>product intro</button>
    </div>
    </div>
    <div className='heroSection_right'>
    <img src={chaiToken} alt="chaiToken" style={{width:"300px", height:"300px"}} className='heroSection_right_img_one'></img>
    <img src={chaiToken} alt="chaiToken" style={{width:"200px", height:"100px"}} className='heroSection_right_img'></img>
    <img src={chaiToken} alt="chaiToken" style={{width:"100px", height:"100px"}} className='heroSection_right_img'></img>
    <img src={chaiToken} alt="chaiToken" style={{width:"50px", height:"50px"}} className='heroSection_right_img'></img>
    <img src={chaiToken} alt="chaiToken" style={{width:"20px", height:"20px"}} className='heroSection_right_img'></img>

    </div>
    </div>
     <Transfer

     NoOfToken = {NoOfToken}
     TokenName={TokenName}
     TokenStandard = {TokenStandard}
     TokenSymbol = {TokenSymbol}
     TokenOwnerBal={TokenOwnerBal}
     transferToken = {transferToken} 
     ></Transfer>
     <User
     holderArray={holderArray}
     ></User> 
    </div>
  )
}
export default Home