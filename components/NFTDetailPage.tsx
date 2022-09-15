import React from "react";
import Image from "next/image";
import { NFT } from "../types/NFT";

const NFTDetailPage = (props: {nft: NFT}) => {
  const {nft} = props;
  
  return (
    <>
      <h1 className='text-3xl font-semibold mb-4'>
        {nft.metadata.name}
      </h1>
      <div className="rounded-lg border border-gray-200 bg-gray-800 mb-5">
        <div className="font-medium space-y-2 p-4">
          <p>
            <span className="font-light uppercase">Collection:</span> {nft.name}
          </p>
          <p>
            <span className="font-light uppercase">Description:</span> {nft.metadata.description}
          </p>
          <p>
            <span className="font-light uppercase">Other metadata:</span> what metadata?
          </p>
          <p>
            <span className="font-light uppercase">Price:</span> do we want price? (what price?)
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200">
        <div className="">
          <Image
            src={nft.metadata.image}
            alt={nft.metadata.name}
            className="h-full w-full object-fill object-center sm:h-full sm:w-full rounded-lg"
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