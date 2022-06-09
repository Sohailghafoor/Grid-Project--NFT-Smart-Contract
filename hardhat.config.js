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

const REACT_APP_PRIVATE_KEY ="0xe6471b44975f63f53a1cd6b6d1ceeb2657139c9a1395091f4474017c6b4f71c7";
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
  etherscan: {
    apiKey: etherscanAPIKey,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
};
