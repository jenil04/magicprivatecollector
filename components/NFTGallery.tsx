import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from '../components/Button';
import { NFT } from "../types/NFT";

const NFTGallery = (props: { nfts: Array<NFT>, chainId: string, isOwned: boolean }) => {
  const { nfts, chainId, isOwned } = props;
  // console.log(chainId);
  // console.log(nfts);

  console.log(isOwned);

  return (

    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {nfts.map((nft: any, index: number) => (
        <>

          <div className="group relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100">
            <Link key={index} href={`/nft/polygon/${nft.tokenAddress}/${nft.tokenId}`}>
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
            {/* Buy NFT */}
            {isOwned ? '' : 
              <div className="text-center my-3">
                <Button buttonText={"BUY ME@!"} />
              </div>
            }
          </div>



        </>

      ))}
    </div>
  );
};

export default NFTGallery;