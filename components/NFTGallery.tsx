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

          <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
            <Link key={index} href={`/nft/polygon/${nft.tokenAddress}/${nft.tokenId}`}>
              <a>
                <div className="relative rounded-lg border border-gray-200 h-60 group-hover:opacity-75">
                  <Image
                    src={nft.metadata.image}
                    alt={nft.metadata.name}
                    className="rounded-lg"
                    layout='fill'
                    objectFit="contain"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute inset-0" />
                    NFT Name: {nft.metadata.name}
                  </h3>
                  <p>
                    <span className="font-light uppercase">Description:</span> {nft.metadata.description}
                  </p>
                  <div className="flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">PRICE</p>
                  </div>
                </div>
              </a>
            </Link>
            {isOwned ? '' : <Button buttonText={"BUY ME@!"} />}
          </div>



        </>

      ))}
    </div>
  );
};

export default NFTGallery;