// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// import "@openzeppelin/contracts/ownership/Ownable.sol";

contract SecretStore {
    struct Secret {
        string domain;
        string secret;
    }

    mapping(address => Secret[]) private s_secrets;

    event SecretStored(address indexed owner, string indexed domain); // Event for store success
    event SecretUpdated(address indexed owner, string indexed domain); // Event for update success

    function setSecret(
        string calldata _domain,
        string calldata _secret
    ) external {
        // console.log("Hit setSecret: %s%s", _domain, _secret);

        // Find if service already exists
        bool serviceFound = false;
        for (uint256 i = 0; i < s_secrets[msg.sender].length; i++) {
            if (
                keccak256(abi.encodePacked(s_secrets[msg.sender][i].domain)) ==
                keccak256(abi.encodePacked(_domain))
            ) {
                // Update the secret
                s_secrets[msg.sender][i].domain = _secret;
                serviceFound = true;
                emit SecretUpdated(msg.sender, _domain);
                break;
            }
        }

        // If not found, add as a new secret
        if (!serviceFound) {
            s_secrets[msg.sender].push(Secret(_domain, _secret));
            emit SecretStored(msg.sender, _domain);
        }
    }

    function getSecrets() public view returns (Secret[] memory) {
        // console.log("Hit getSecrets: %s", s_secrets[msg.sender]);
        return s_secrets[msg.sender];
    }
}
