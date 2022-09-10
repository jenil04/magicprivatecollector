// contracts/PrivateNFT.sol
// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

contract PrivateNFT {
    string private _privateTokenURILocation;

    // Emitted when the stored value changes
    event privateTokenURIChanged(string privateTokenURILocation);

    // Stores a new metadata location in the contract
    function store(string memory privateTokenURILocation) public {
        _privateTokenURILocation = privateTokenURILocation;
        emit privateTokenURIChanged(privateTokenURILocation);
    }

    // Reads the last stored string
    function privateTokenURI() public view returns (string memory) {
        return _privateTokenURILocation;
    }
}