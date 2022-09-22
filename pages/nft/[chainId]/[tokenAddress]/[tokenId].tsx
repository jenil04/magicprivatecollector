
import axios from "axios";
import { useEffect, useState } from "react";
import NFTDetailPage from '../../../../components/NFTDetailPage';
import { NFT } from "../../../../types/NFT";



const DetailPage = (props: {
  nft: NFT, isConnected: boolean;
  account: string;
  connectWallet: any;
}) => {
  const [nft, setNFT] = useState(props.nft);

  useEffect(() => {
    

      const fetchData = async () => {

        if (window.ethereum && window.ethereum.selectedAddress) {
        const url = `https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/nft?chainId=37&tokenAddress=${props.nft.tokenAddress}&tokenId=${props.nft.tokenId}&address=${window.ethereum.selectedAddress}`;


        const result = await axios.get(url, {
          headers: {
            'Accept': 'application/json'
          }
        });

        setNFT(result.data);
      }
      }

      fetchData();

    

  }, [props.nft]);



  return (
    <NFTDetailPage nft={nft} isConnected={props.isConnected} account={props.account} connectWallet={props.connectWallet} />

  )
}

export default DetailPage;

export const getServerSideProps = async (context: any) => {

  const { chainId, tokenAddress, tokenId } = context.query;

  const url = `https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/nft?chainId=37&tokenAddress=${tokenAddress}&tokenId=${tokenId}`;


  const result = await axios.get(url, {
    headers: {
      'Accept': 'application/json'
    }
  });


  const nft = result.data;

  return {
    props: {
      nft,
    },

  }
}
