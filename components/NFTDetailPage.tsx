import React from "react";
import Image from "next/image";
import { NFT, Metadata } from "../types/NFT";
//import ReactPlayer from 'react-player';

const NFTDetailPage = (props: {
  nft: NFT, isConnected: boolean;
  account: string;
  connectWallet: any;
}) => {
  const { nft, isConnected, account, connectWallet } = props;
  const metadata = nft.metadata as Metadata;

  return (
    <div className="">

      {/* Teaser section */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 p-4 rounded-lg border border-gray-200 bg-gray-800">
        {account === nft.owner ? 'OWNS IT!' : "does not own it"}
        {/* Name & Price */}
        <div className="lg:col-span-7 lg:col-start-6">
          <h1 className="text-3xl font-semibold">{metadata.name}</h1>
          <div>
            <span className="font-light uppercase">Price:</span> {nft.price} MATIC
          </div>
        </div>

        {/* Thumbnail / Teaser Image */}
        <div className="mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <div className="relative h-60 lg:col-span-2 lg:row-span-2">
            <Image
              src={metadata.image}
              alt={metadata.name}
              className="rounded-lg"
              layout='fill'
              objectFit="contain"
            />
            {/* <img
              src={metadata.image}
              alt={metadata.name}
              className='rounded-lg object-contain'
            /> */}
          </div>
        </div>

        {/* NFT details (floats below thumbnail on mobile) */}
        <div className="lg:col-span-5">
          <div className="leading-10">
            <p className="leading-6">
              <span className="font-light uppercase">Description:</span> <span >{metadata.description}</span>
            </p>
            <p>
              <span className="font-light uppercase">Available Supply:</span> {nft.availableSupply}
            </p>
            <p>
              <span className="font-light uppercase">Total Supply:</span> {nft.totalSupply}
            </p>
            {/* <p>
              <span className="font-light uppercase">Available until:</span> FAKE DATE
            </p>
            <p>
              <span className="font-light uppercase">Expires:</span> FAKE DATE
            </p>
            <p>
              <span className="font-light uppercase">Resaleable</span> YES/NO
            </p>
            <p>
              <span className="font-light uppercase">Resell commission to creator</span> 99%
            </p>
            <p>
              <span className="font-light uppercase">Number of views allowed</span> 4
            </p> */}
            <p>
              <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
            </p>
          </div>
        </div>
      </div>


      {/* Main Private NFT section */}
      <div className="mt-8 col-span-12">
        <div className="mt-4">
          <h2>
            Here's your private content
          </h2>
          <p>
            <span className="font-light uppercase">Private NFT Name:</span> {metadata.private.name}
          </p>
          <span className="font-light uppercase">Private NFT Description:</span> {metadata.private.description}
        </div>
        <div className="relative">
          {/* how do we check for video vs. image vs. audio? */}
          <video
            controls
            controlsList="nodownload"
            muted
            playsInline
            preload="metadata"
            src={metadata.private.url}
          />
        </div>

      </div>
    </div>
  );
};

export default NFTDetailPage;