import React from "react";
import Image from "next/image";
import { NFT, Metadata } from "../types/NFT";

const NFTDetailPage = (props: { nft: NFT }) => {
  const { nft } = props;
  const metadata = nft.metadata as Metadata;

  return (
    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 rounded-lg border border-gray-200 bg-gray-800">
      {/* Name & Price */}
      <div className="lg:col-span-5 lg:col-start-8">
        <h1 className="text-3xl font-semibold">{metadata.name}</h1>
        <div>
          <span className="font-light uppercase">Price:</span> {nft.price} MATIC
        </div>
      </div>

      {/* Thumbnail / Teaser Image */}
      <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Teaser Image</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          <div className="relative h-screen lg:col-span-2 lg:row-span-2">
            <Image
              src={metadata.image}
              alt={metadata.name}
              className=""
              layout='fill'
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      {/* NFT details (floats below thumbnail on mobile) */}
      <div className="lg:col-span-5">
        <div className="">
          <p>
            <span className="font-light uppercase">Description:</span> {metadata.description}
          </p>
          <p>
            <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
          </p>
        </div>
      </div>

      {/* Main NFT section */}
      <div className="mt-8 col-span-12">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
          alt="Black TEE real deal"
          className='lg:col-span-2 lg:row-span-2 rounded-lg'
        />
      </div>
    </div>
  );
};

export default NFTDetailPage;