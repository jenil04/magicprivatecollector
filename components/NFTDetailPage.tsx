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
            <span className="font-light uppercase">Collection:</span> {nft.name}
          </p>
          <p>
            <span className="font-light uppercase">Description:</span> {metadata.description}
          </p>
          <p>
            <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
          </p>
          <p>
            <span className="font-light uppercase">Price:</span> {nft.price} ETH
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="">
          <Image
            src={metadata.image}
            alt={metadata.name}
            className="rounded-lg"
            layout='responsive'
            height={100}
            width={100}
          />
        </div>

      </div>
    </>
  );
};

export default NFTDetailPage;