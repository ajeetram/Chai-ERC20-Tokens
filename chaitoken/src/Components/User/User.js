import React from 'react'
import chaitoken from "../Images/chai.png";
import './user.css'
function User({holderArray}) {
  return (
    <div className='user'>
      {holderArray.map((el,i)=>(
        <div key = {i+1} className="user_box">
        <h4 className='user_box_name'>
          User#{el[0].toNumber()}
        </h4>
        <div className='user_box_price_box'>
         <p className='user_box_price'>
        {el[3].toNumber()} Token
         </p>
         <p className='user_box_status'>
          ${el[3].toNumber()*50}/{el[3].toNumber()}Your Token Worth
         </p>
        </div>
        <div className='user_box_img'>
        <img className='user_box_img_img' src={chaitoken} alt="chaiToken" style={{width:"35px", height:"35px"}}></img>
        <p>To: {el[1].slice(0,22)}...</p>
        </div>
        </div>
      ))}
    </div>
  )
}

export default User