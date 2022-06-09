
const hre = require("hardhat");

async function main() {

  const NFTmy = await hre.ethers.getContractFactory("NFTmy");
  const nftMy = await NFTmy.deploy();

  await nftMy.deployed();

  console.log("NFT Contract deployed to:", nftMy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
