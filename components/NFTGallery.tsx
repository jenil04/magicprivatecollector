import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ethers, FixedNumber } from "ethers";
import { Button, ButtonDisabled } from '../components/Button';
import { NFT } from "../types/NFT";
import { abi } from '../data/abi';
import axios from "axios";
import { useRouter } from 'next/router';

const NFTGallery = (props: { nfts: Array<NFT>, 
  chainId: string, 
  isOwned: boolean, 
  isConnected: boolean, 
  account: string,
  handleNewAccounts: any }) => {
  const { nfts, chainId, isOwned, isConnected, account, handleNewAccounts } = props;

  const contractAddress = process.env.NEXT_PUBLIC_MPC_CONTRACT_ADDRESS as string | '';
  
  const router = useRouter();

  const buyNFT = async (tokenAddress: string, tokenId: string, owner: string) => {
    if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {

      console.log(tokenId);
      console.log(tokenAddress);
      console.log(owner);

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      // the person that is currently logged into metamask
      const address = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      
      const result = await contract.executeSale(owner, address,Number(tokenId), { gasLimit: 10152132 });

      // when the sale is done, update our database

      console.log('transfer result: ', result);

      const backendResult = await axios.post('https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/sale',
          {
            tokenAddressTokenId: `${tokenAddress}_${tokenId}`,
            chainId: "37",
            buyer: address
          },
          {
            headers: {
              'Accept': 'application/json',
            }
          });

        console.log(backendResult);
        handleNewAccounts(account);

        result.wait().then(function (receipt: any) {
          console.log('sale result: ', receipt);

          router.push('/');

        });

    }


  };

  return (

    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {nfts.map((nft: any, index: number) => (
        <div key={index}>

          <div className="group relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            <Link href={`/nft/polygon/${nft.tokenAddress}/${nft.tokenId}`}>
              <a>
                {/* NFT thumbnail */}
                <div className="relative group-hover:opacity-75 m-1">
                  <img
                    src={nft.metadata.image}
                    alt={nft.metadata.name}
                    className='rounded-lg max-h-64 mx-auto'
                  />
                </div>
                {/* NFT info */}
                <div className="rounded-lg bg-gray-800 mx-1">
                  <div className="space-y-2 py-3 px-4">
                    <h3 className="text-xl font-medium">
                      {nft.metadata.name}
                    </h3>
                    <p>
                      {nft.metadata.description}
                    </p>
                    <p>
                      <span className="font-light uppercase">Price:</span> {nft.price} MATIC
                    </p>
                    <p>
                      <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
                    </p>
                  </div>
                </div>
              </a>
            </Link>

            {/* BUY NOW button section */}
            {/* show nothing if are connected and don't own it */}
            {isConnected && isOwned ? '' : ''}

            {/* enabled buy button only if are connected and don't own it */}
            {isConnected && !isOwned ?
              <div className="text-center my-3">
                <button onClick={ev => buyNFT(nft.tokenAddress, nft.tokenId, nft.owner)} className="inline-flex items-center justify-center px-5 py-3 border-2 border-mwt text-base font-medium rounded-md text-white bg-mwt hover:border-gray-800">
                  BUY NOW
                </button>
              </div>
              : ''}

            {/* disabled buy button for not connected */}
            {!isConnected ?
              <div className="text-center my-3">
                <ButtonDisabled btnText="BUY NOW" />
              </div>
              : ''}

          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;