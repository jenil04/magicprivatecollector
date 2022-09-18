import { NFT } from "../../types/NFT";


export const parseMetadata = (nfts: Array<NFT>):
Array<NFT> => {

    const parsedNFTs = [] as Array<NFT>;

    for (let i = 0; i < nfts.length; i + 1) {
        
        parsedNFTs.push({...nfts[i], metadata: JSON.parse(nfts[i].metadata as string)});
    }
    return nfts;
}
