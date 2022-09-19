import React from "react";
import Image from "next/image";
import { NFT, Metadata } from "../types/NFT";

const NFTDetailPage = (props: {nft: NFT}) => {
  const {nft} = props;
  const metadata = nft.metadata as Metadata;

  return (
    <>
      <h1 className='text-3xl font-semibold mb-4'>
        {metadata.name}
      </h1>
      <div className="rounded-lg border border-gray-200 bg-gray-800 mb-5">
        <div className="font-medium space-y-2 p-4">
          <p>
            <span className="font-light uppercase">Description:</span> {metadata.description}
          </p>
          <p>
            <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
          </p>
          <p>
            <span className="font-light uppercase">Price:</span> {nft.price} MATIC
          </p>
        </div>
      </div>
      <div className="relative rounded-lg border border-gray-200 h-screen">
          <Image
            src={metadata.image}
            alt={metadata.name}
            className="rounded-lg"
            layout='fill'
            objectFit="contain"
          />
      </div>
    </>
  );
};

export default NFTDetailPage;