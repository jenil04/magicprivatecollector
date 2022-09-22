// contracts/PrivateNFT.sol
// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";


contract PrivateNFT is ERC1155Supply {
    // string private _privateTokenURILocation;

    address payable deployerAddress;

    constructor() ERC1155("https://magicprivatecollector.com/metadata/polygon/mpc/{id}.json") {

        deployerAddress = payable(msg.sender);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        _mint(account, id, amount, data);
    }


    function executeSale(uint256 price, uint256 tokenId) public payable {

        //Actually transfer the token to the new owner
        _safeTransferFrom(deployerAddress, msg.sender, tokenId, 1, '0x');
       
        payable(deployerAddress).transfer(price);
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