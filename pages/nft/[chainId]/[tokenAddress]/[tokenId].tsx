
import axios from "axios";
import NFTDetailPage from '../../../../components/NFTDetailPage';
import { NFT } from "../../../../types/NFT";

const DetailPage = (props: {nft: NFT}) => {

  return (
    <NFTDetailPage nft={props.nft} />

  )
}

export default DetailPage;

export const getServerSideProps = async (context: any) => {

  const { chainId, tokenAddress, tokenId } = context.query;

  const url = `https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/nft?chainId=${chainId}&${tokenAddress}=tokenAddress&tokenId=${tokenId}`;


  const result = await axios.get(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  console.log(result);
  const nft = result.data;

  return {
    props: {
      nft,
    },

  }
}
