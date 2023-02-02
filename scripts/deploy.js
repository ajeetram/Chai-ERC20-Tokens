// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  
  const ChaiToken = await hre.ethers.getContractFactory("ChaiToken");
  const chaitoken = await ChaiToken.deploy(1000000);

  await chaitoken.deployed();

  console.log("Contract Address : ",chaitoken.address)
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
