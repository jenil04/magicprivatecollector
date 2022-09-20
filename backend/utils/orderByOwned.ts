import { NFT, NFTLIST } from "../../types/NFT";
import { Ownership } from "../../types/Ownership";


// order NFTs by owned  / not owned
export const orderByOwned = (allNFTs: Array<NFT>, ownedNFTs: Array<Ownership>):
    NFTLIST => {

    const nfts = {
        owned: [] as Array<NFT>,
        notOwned: [] as Array<NFT>,
    };
    let owned = false;

    

    for (let index = 0; index < allNFTs.length; index++) {
        for (let inner = 0; inner < ownedNFTs.length; inner++) {
            
            if (ownedNFTs[inner].tokenAddressTokenId === allNFTs[index].tokenAddressTokenId && ownedNFTs[inner].amount > 0) {
                owned = true;

            }
        }

        if (owned === true) {
            nfts.owned.push(allNFTs[index]);
        }

        else {
            nfts.notOwned.push(allNFTs[index]);
        }
        owned = false;

    }
    return nfts;
}
