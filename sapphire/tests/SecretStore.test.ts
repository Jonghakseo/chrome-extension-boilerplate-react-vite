import hre from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import "@nomicfoundation/hardhat-chai-matchers"

interface Secret {
  domain: string;
  secret: string;
}

describe("SecretStore", () => {
  async function deploySecretStoreFixture() {
    const contract = await hre.viem.deployContract("SecretStore");
    const [ wallet ] = await hre.viem.getWalletClients();

    return { contract, wallet };
  }

  it("should set secret and emit the SecretStored event", async () => {
    const { contract, wallet } = await loadFixture(deploySecretStoreFixture);
    const secret = ["www.test.com","test"]; 
    
    // Expect the transaction to emit the SecretStored event
    await expect(contract.write.setSecret(secret))
      .to.emit(contract, "SecretStored")
      .withArgs(wallet.account, secret[0]);
  });

  it("should get 0 secrets", async () => {
    const { contract } = await loadFixture(deploySecretStoreFixture);
    const secrets = await contract.read.getSecrets();
    console.log(`secrets: ${secrets}`);

    expect(secrets).to.be.an( "array" ).that.is.empty;
  });

  it("should set/get correct secret", async () => {
    const { contract } = await loadFixture(deploySecretStoreFixture);
    const secret = ["www.test.com", "test"]
    const setSecret = await contract.write.setSecret(secret);
    console.log(`setSecret: ${setSecret}`);

    const secrets = await contract.read.getSecrets();
    expect(secrets[0].domain).to.equal(secret[0]);
    expect(secrets[0].secret).to.equal(secret[1]);
  })
});
