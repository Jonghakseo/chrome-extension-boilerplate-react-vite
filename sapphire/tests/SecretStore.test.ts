import hre from "hardhat";
import { expect } from "chai";

// Using ethers
describe("SecretStore", () => {
  async function deploySecretStore() {
    const contract = await hre.ethers.deployContract("SecretStore");
    const [owner] = await hre.ethers.getSigners();

    return { contract, owner };
  }

  // TODO: Issue with hardhat-chai-matchers: Error: Invalid Chai property: emit. Did you mean "exist"?
  // it("should set secret and emit the SecretStored event", async () => {
  //   const { contract, owner } = await deploySecretStore();
  //   const secret = { domain: "www.test.com", secret: "test" };

  //   // Expect the transaction to emit the SecretStored event
  //   await expect(contract.setSecret(secret.domain, secret.secret))
  //     .to.emit(contract, "SecretStored")
  //     .withArgs(owner, secret.domain);
  // });

  it("should get 0 secrets", async () => {
    const { contract } = await deploySecretStore();
    const secrets = await contract.getSecrets();
    console.log(`secrets: ${secrets}`);

    expect(secrets).to.be.an("array").that.is.empty;
  });

  it("should set/get correct secret", async () => {
    const { contract } = await deploySecretStore();
    const secret = { domain: "www.test.com", secret: "test" };
    await contract.setSecret(secret.domain, secret.secret);

    const secrets = await contract.getSecrets();
    console.log(`secrets: ${secrets}`);
    expect(secrets[0].domain).to.equal(secret.domain);
    expect(secrets[0].secret).to.equal(secret.secret);
  });

  it("should update correct secret", async () => {
    const { contract } = await deploySecretStore();
    const secretdomain = "www.test.com";
    const secret1 = "test1";
    const secret2 = "test2";
    await contract.setSecret(secretdomain, secret1);
    await contract.setSecret(secretdomain, secret2);

    const secrets = await contract.getSecrets();
    console.log(`secrets: ${secrets}`);
    expect(secrets[0].domain).to.equal(secretdomain);
    expect(secrets[0].secret).to.equal(secret2);
  });

  it("should delete correct secret", async () => {
    const { contract } = await deploySecretStore();
    const secret = { domain: "www.test.com", secret: "test" };
    await contract.setSecret(secret.domain, secret.secret);

    let secrets = await contract.getSecrets();
    console.log(`secrets: ${secrets}`);
    expect(secrets[0].domain).to.equal(secret.domain);
    expect(secrets[0].secret).to.equal(secret.secret);

    await contract.deleteSecret(secret.domain);
    secrets = await contract.getSecrets();
    expect(secrets).to.be.an("array").that.is.empty;
  });
});
