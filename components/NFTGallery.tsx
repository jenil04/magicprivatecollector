import React from "react";
import NextLink from "next/link";
import Image from "next/image";

const NFTGallery = (props: any) => {
  const { nfts } = props;
  console.log(nfts);
  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {nfts.map((nft: any, index: number) => (
        <div
          key={index}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
            <img
              src={nft.metadataObj.image}
              alt={nft.metadataObj.name}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              <span aria-hidden="true" className="absolute inset-0" />
              COLLECTION: {nft.name}
            </h3>
            <p className="text-sm text-gray-500">NFT Name: {nft.metadataObj.name} </p>
            <div className="flex flex-col justify-end">
              <p className="text-sm italic text-gray-500">OPTIONS</p>
              <p className="text-base font-medium text-gray-900">PRICE</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;