import nftList from "../../../../../data/nftList.json";
import { NFT } from "../../../../../types/NFT";

export default function handler(req: any, res: any) {

  const { chainId, tokenAddress, tokenId } = req.query;

  // make database connection and fetch the metadata
  // hard coded for now!

  const nft = nftList[0] as NFT;

  res.setHeader('Content-Type', 'application/json');
  res.send(nft);

}

