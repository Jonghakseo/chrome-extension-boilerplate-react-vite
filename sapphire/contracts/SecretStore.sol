// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SecretStore {
    struct Secret {
        string secret;
        address owner;
    }

    function setSecrets(Secret[] memory _secrets) public {
        // console.log("Setting secret: %s", _secret);
    }

    function getSecrets() public view returns (Secret[] memory) {
        // console.log("Getting secret: %s", _secret
    }
}
