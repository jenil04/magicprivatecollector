// contracts/PrivateNFT.sol
// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";


contract PrivateNFT is ERC1155Supply {
    // string private _privateTokenURILocation;

    constructor() ERC1155("https://magicprivatecollector.com/metadata/polygon/mpc/{id}.json") {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        _mint(account, id, amount, data);
    }

    

//     // Emitted when the stored value changes
//     event privateTokenURIChanged(string privateTokenURILocation);

//    // Set a new metadata location in the contract
//     function setPrivateTokenURI(string memory privateTokenURILocation) public onlyOwner{
//         _privateTokenURILocation = privateTokenURILocation;
//         emit privateTokenURIChanged(privateTokenURILocation);
//     }

//     // Reads the last stored string
//     function privateTokenURI() public view returns (string memory) {
//         return _privateTokenURILocation;
//     }
}