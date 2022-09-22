import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import { Button, ButtonDisabled } from '../components/Button';
import { NFT } from "../types/NFT";
import { abi } from '../data/abi';

const NFTGallery = (props: { nfts: Array<NFT>, 
  chainId: string, 
  isOwned: boolean, 
  isConnected: boolean, 
  account: string }) => {
  const { nfts, chainId, isOwned, isConnected, account } = props;

  const contractAddress = process.env.NEXT_PUBLIC_MPC_CONTRACT_ADDRESS as string | '';
  
  const buyNFT = async (tokenAddress: string, tokenId: string) => {
    if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {

      
      console.log(tokenId);
      console.log(tokenAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      // the person that is currently logged into metamask
      const address = await signer.getAddress();


      const contract = new ethers.Contract(contractAddress, abi, signer);

      const result = await contract.executeSale(0.001, Number(tokenId));

      console.log('transfer result: ', result);

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
                <div className="relative h-60 group-hover:opacity-75">
                  <Image
                    src={nft.metadata.image}
                    alt={nft.metadata.name}
                    className=""
                    layout='fill'
                    objectFit="contain"
                  />
                </div>
                {/* NFT info */}
                <div className="rounded-lg bg-gray-800 mt-3">
                  <div className="font-medium space-y-2 py-3 px-4">
                    <h3>
                      <span className="font-light uppercase">NFT Name:</span> {nft.metadata.name}
                    </h3>
                    <p>
                      <span className="font-light uppercase">Description:</span> {nft.metadata.description}
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
            {/* Buy NFT 
              if the user isConnected or not for disabled button <ButtonDisabled btnText={"BUY NOW"} />
            */}
            {isOwned ? '' :
              <>
                <div className="text-center my-3">
                  <button onClick={ev => buyNFT(nft.tokenAddress, nft.tokenId)} className="text-black">BUY NOW</button>
                </div>
              </>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;