
import axios from "axios";
import NFTDetailPage from '../../../../components/NFTDetailPage'

const DetailPage = (props: any) => {
  const nft = props.nft;

  return (
    <NFTDetailPage nft={nft} />
  )
}

export default DetailPage;

export const getServerSideProps = async (context: any) => {

  const { chainId, contractAddress, tokenId } = context.query;


  const url = `https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenId}?chain=${chainId}&format=decimal`;


  const result = await axios.get(url, {
    headers: {
      'Accept': 'application/json',
      'X-API-Key': 'h9U7pEVDckfIrOATb5iUnzCuSekKSkpTHqSdrl2ST5WVuN02PI3zA7oVbwtSmPMP'
    }
  });


  const nft = { ...result.data, metadataObj: JSON.parse(result.data.metadata) };

  return {
    props: {
      nft,
    },

  }
}