import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import { Button, ButtonDisabled } from '../components/Button';
import { NFT } from "../types/NFT";

const NFTGallery = (props: { nfts: Array<NFT>, chainId: string, isOwned: boolean, isConnected: boolean }) => {
  const { nfts, chainId, isOwned, isConnected } = props;

  const buyNFT = async (tokenAddress: string, tokenId: string) => {
    if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {

      console.log(tokenId);
      console.log(tokenAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      // the person that is currently logged into metamask
      const address = await signer.getAddress();

      // params: [
      //   {
      //     from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
      //     to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
      //     gas: '0x76c0', // 30400
      //     gasPrice: '0x9184e72a000', // 10000000000000
      //     value: '0x9184e72a', // 2441406250
      //     data:
      //       '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
      //   },
      // ];

      // window.ethereum
      //   .request({
      //     method: 'eth_sendTransaction',
      //     params,
      //   })
      //   .then((result) => {
      //     // The result varies by RPC method.
      //     // For example, this method will return a transaction hash hexadecimal string on success.
      //   })
      //   .catch((error) => {
      //     // If the request fails, the Promise will reject with an error.
      //   });

      // const contract = new ethers.Contract(tokenAddress, abi, signer);

      // const result = await contract.mint(address, tokenId, Number(totalSupply), '0x');

      // console.log('buy result: ', result);
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
            {isConnected && !isOwned ? <div className="text-center my-3">
              <button onClick={ev => buyNFT(nft.tokenAddress, nft.tokenId)} className="inline-flex items-center justify-center px-5 py-3 border-2 border-mwt text-base font-medium rounded-md text-white bg-mwt hover:border-gray-800">BUY NOW</button>
            </div> : ''}

            {/* disabled buy button for not connected */}
            {!isConnected ? <div className="text-center my-3">
              <ButtonDisabled btnText="BUY NOW" />
            </div> : ''}
      
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;