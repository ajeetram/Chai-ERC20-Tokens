require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/5nWVOKijPuUN7EMCDbVTY7NWXQChmci8",
      accounts:["a4bbee8a9a8ef5c90f577df72e931febe494ddd2808fb38233050d9e2d5cc462"],
    },
  },
};
