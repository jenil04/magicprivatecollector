import React from "react";
import Link from "next/link";
import Image from "next/image";

const NFTDetailPage = (props: any) => {
  const nft = props.nft;
 
  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">

      COLLECTION: {nft.name}

    </div>
  );
};

export default NFTDetailPage;