  require("@nomiclabs/hardhat-waffle");
  require("@nomiclabs/hardhat-etherscan");



  //require('dotenv').config();

  // This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const REACT_APP_PRIVATE_KEY ="0xa2c088ef3dae1bf877102cafd30c5486bd8f38e0744a0f857a5cf45fcf755a33";
const etherscanAPIKey = "27GY3QA4QHPSWIU759AHMYIP96PI2HAEUZ";
module.exports = {
  defaultNetwork: "ropsten",
  networks: {
    hardhat: { },
    ropsten: {
      url: "https://ropsten.infura.io/v3/3b2dad5f4a7f44cd9d85b2f41cb9b842",
      accounts: [REACT_APP_PRIVATE_KEY]
    },
  },
  etherscan: { //0xd5AA0B46A886a8685F63C81050A476220cBEce00 deploy address
    apiKey: etherscanAPIKey,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000
      }
    }
  },
};
