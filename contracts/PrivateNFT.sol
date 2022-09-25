// contracts/PrivateNFT.sol
// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract PrivateNFT is ERC1155Supply {

    constructor() ERC1155("https://magicprivatecollector.com/metadata/polygon/mpc/{id}.json") {
        
        // deployerAddress = payable(msg.sender);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        _mint(account, id, amount, data);

        // the person that minted, needs to approve the sale
        setApprovalForAll(address(this), true); 
    }

    
    // function showPrivateContent(uint256 tokenId) public pure returns (bool){
    function showPrivateContent() public pure returns (bool){
        // make sure caller is owner of this token
        // TODO
        // return true or false
        return true;
    }

    function executeSale(address seller, address buyer, uint256 tokenId) public payable {
      // payable(seller).transfer(price);

        //Actually transfer the token to the new owner
        _safeTransferFrom(seller, buyer, tokenId, 1, '0x');
      
    }
}   
