import hre from "hardhat";

async function main() {
  const secretStore = await hre.ethers.deployContract("SecretStore");

  console.log(`secretStore deployed to ${secretStore.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
