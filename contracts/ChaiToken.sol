// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract ChaiToken {
    string public name = "ChaiToken";
    string public symbol = "Chai";
    string public standard = "Chai v.0.1";
    uint256 public totalSupply;
    uint256 public _userId;
     
     address public ownerOfcontract;
     address[] public holderToken;

     event Transfer(address _from, address _to, uint value);

     event Approval
     (
        address indexed owner,
        address indexed spender,
        uint256 _value
     );

     mapping(address=>TokenHolderInfo) public tokenHolderInfos;

     struct TokenHolderInfo
     {
        uint256 _tokenId;
        address _from;
        address _to;
        uint totalToken;
        bool TokenHolder;

     }
   
   mapping(address=>uint) public balanceOf;

     constructor(uint _initialSupply) 
     {
      ownerOfcontract = msg.sender;
      balanceOf[msg.sender]= _initialSupply;
      totalSupply = _initialSupply;
     }

     function inc() internal{
      _userId++;
     }

     function transfer(address _to, uint _value) public returns(bool success)
     {
      require(balanceOf[msg.sender]>=_value,"insufficient balance");
      inc();

      balanceOf[msg.sender]-=_value;
      balanceOf[_to]+= _value;

      TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[_to];

      tokenHolderInfo._from = msg.sender;
      tokenHolderInfo._to= _to;
      tokenHolderInfo._tokenId= _userId;
      tokenHolderInfo.TokenHolder = true;
      tokenHolderInfo.totalToken = _value;

      holderToken.push(_to);

      emit Transfer(msg.sender, _to, _value);
      return true;

     }

     mapping(address=>mapping(address=>uint256)) public allowance;

     function approve(address _spender,uint256 _value) public returns(bool success)
     {
      allowance[msg.sender][_spender] = _value;

      emit Approval(msg.sender, _spender, _value);
      return true;

     }

     function transferFrom(address _from, address _to, uint256 _value) public returns(bool success)
     {
      balanceOf[_from] -= _value;
      balanceOf[_to] += _value;

      allowance[_from][msg.sender] -=_value;

      emit Transfer(_from, _to, _value);
      return true;

     }

     function getTokenHolderData(address _address) public view returns(uint256, address, address,uint256,bool)
     {
      return
      (
      tokenHolderInfos[_address]._tokenId,
      tokenHolderInfos[_address]._from,
      tokenHolderInfos[_address]._to,
      tokenHolderInfos[_address].totalToken,
      tokenHolderInfos[_address].TokenHolder);
      
     }

     function getTokenHolder() public view returns(address[] memory )
     {
      return holderToken;
     }
}
 

