import { NFT } from "../../types/NFT";
import { Ownership } from "../../types/Ownership";

interface NFTLIST {
    owned: Array<NFT>;
    notOwned: Array<NFT>;
}

// order NFTs by owned  / not owned
export const orderByOwned = (allNFTs: Array<NFT>, ownedNFTs: Array<Ownership>):
    NFTLIST => {

    const nfts = {
        owned: [] as Array<NFT>,
        notOwned: [] as Array<NFT>,
    };
    for (let i = 0; i < allNFTs.length; i + 1) {
        for (let k = 0; k < ownedNFTs.length; k + 1) {
            if (ownedNFTs[k].tokenAddressTokenId === allNFTs[i].tokenAddress && ownedNFTs[k].amount > 0) {
                nfts.owned.push(allNFTs[i]);
            }
            else {
                nfts.notOwned.push(allNFTs[i]);
            }

        }
    }
    return nfts;
}
