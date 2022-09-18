import { NFT } from "../../types/NFT";


export const parseMetadata = (nfts: Array<NFT>):
Array<NFT> => {

    const parsedNFTs = [] as Array<NFT>;

    for (let index = 0; index < nfts.length; index++) {
        
        parsedNFTs.push({...nfts[index], metadata: JSON.parse(nfts[index].metadata as string)});
    }
    return parsedNFTs;
}
