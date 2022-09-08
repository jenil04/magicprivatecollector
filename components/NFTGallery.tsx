import NextLink from "next/link";
import React from "react";
import Image from "next/image";

const NFTGallery = () => {
  return (
    <div className="bg-white">

      <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <button disabled={isDisabled} onClick={onClick} className="rounded-md shadow">
          {/* what is this button for in this use? */}
          <p className="inline-flex items-center justify-center px-5 py-3 border border-mwt text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">{buttonText}</p>
        </button>
        <h2 className="text-xl font-semibold">Connected Address: <span>{accounts[0]}</span></h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {nfts.map((nft: any, index) => (
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
                  <p>{JSON.stringify(nft, null, 2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default NFTGallery;