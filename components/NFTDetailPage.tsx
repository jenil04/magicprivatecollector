import React from "react";
import Image from "next/image";
import { NFT, Metadata } from "../types/NFT";
//import ReactPlayer from 'react-player';

const NFTDetailPage = (props: { nft: NFT }) => {
  const { nft } = props;
  const metadata = nft.metadata as Metadata;
  console.log(nft);

  return (
    <div className="">

      {/* Teaser section */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 p-4 rounded-lg border border-gray-200 bg-gray-800">

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
          <div className="">
            <p>
              <span className="font-light uppercase">Description:</span> {metadata.description}
            </p>
            {/* @TODO these supply numbers are usually for collections not copies of NFTs... */}
            <p>
              <span className="font-light uppercase">Available Supply:</span> {nft.availableSupply}
            </p>
            <p>
              <span className="font-light uppercase">Total Supply:</span> {nft.totalSupply}
            </p>
            <p>
              <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
            </p>
          </div>
        </div>
      </div>


      {/* Main Private NFT section */}
      {/* @TODO talk about formats supported...mov is not */}
      <div className="mt-8 col-span-12">
        <div className="relative">
          <video 
            controls
            muted
            src={metadata.private.url} 
            //src="https://archive.org/download/ElephantsDream/ed_hd.avi"
            //src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
            //src="https://file-examples.com/wp-content/uploads/2018/04/file_example_MOV_480_700kB.mov"
          />
        </div>
        <div className="mt-4">
          <span className="font-light uppercase">Private NFT Description:</span> {metadata.private.description}
        </div>
      </div>
    </div>
  );
};

export default NFTDetailPage;