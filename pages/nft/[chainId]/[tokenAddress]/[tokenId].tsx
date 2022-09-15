
import axios from "axios";
import NFTDetailPage from '../../../../components/NFTDetailPage';
import nftList from '../../../../data/nftList.json';
import { NFT } from "../../../../types/NFT";

const DetailPage = (props: {nft: NFT}) => {

  return (
    <NFTDetailPage nft={props.nft} />

  )
}

export default DetailPage;

export const getServerSideProps = async (context: any) => {

  const { chainId, tokenAddress, tokenId } = context.query;

  const nft = nftList[0] as NFT;
  // const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenId}?chain=${chainId}&format=decimal`;


  // const result = await axios.get(url, {
  //   headers: {
  //     'Accept': 'application/json',
  //     'X-API-Key': 'h9U7pEVDckfIrOATb5iUnzCuSekKSkpTHqSdrl2ST5WVuN02PI3zA7oVbwtSmPMP'
  //   }
  // });


  // const nft = { ...result.data, metadataObj: JSON.parse(result.data.metadata) };

  return {
    props: {
      nft,
    },

  }
}
