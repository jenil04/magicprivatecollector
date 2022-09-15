
import { useState, useEffect, useRef } from 'react';
import { ethers } from "ethers";

import NFTGallery from '../components/NFTGallery';
import Button from '../components/Button';
import nftList from '../data/nftList.json';

// NFT type
import { NFT } from "../types/NFT";

// polygon quicknode
// const provider = new ethers.providers.JsonRpcProvider('https://multi-necessary-morning.matic.quiknode.pro/9cebc8e52d41fb7a7cf25167b7f92f740a892623/');

export default function Index(
  { isConnected, account, connectWallet }: {
  isConnected: boolean;
  account: string;
  connectWallet: any;
}) {

  
  const [nfts, setNFTs] = useState([] as Array<NFT>);

  
  useEffect(() => {
    if (account !== '') {
     handleNewAccounts(account);
    }
  });

  async function handleNewAccounts(account: string) {
    
      // const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
      // console.log(chainId);

      setNFTs(nftList);
      

    //   const url = 'https://deep-index.moralis.io/api/v2/0xea33CCCd251792a8eb25674009922F4F8c5aBCf6/nft?chain=eth&format=decimal';
    //   const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'h9U7pEVDckfIrOATb5iUnzCuSekKSkpTHqSdrl2ST5WVuN02PI3zA7oVbwtSmPMP' } };

    //   fetch(url, options)
    //     .then(res => res.json())
    //     .then(json => {

    //       const nftArray = [] as Array<any>;
    //       let obj = {} as any;

    //       console.log(json);

    //       for (let index = 0; index < json.result.length; index++) {
    //         obj = JSON.parse(json.result[index].metadata);

    //         if (obj.image && obj.image.includes('ipfs://')) {
    //           obj.image = obj.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
    //         }
    //         if (obj.image_url) {
    //           obj.image = obj.image_url;
    //         }
    //         nftArray.push({ ...json.result[index], metadataObj: obj });

    //       }
    //       console.log(nftArray);
    //       setNFTs(nftArray);
    //     })
    //     .catch(err => console.error('error:' + err));
     

  }

  

  


  return (
    <>
      <h1 className="text-4xl text-white font-bold pb-4">
        <span>Magic Wizard Tech&apos;s</span> <span className="text-mwt">Magic Private Collector</span>
      </h1>
      <div className='mb-4'>
        <button onClick={connectWallet} className={isConnected ? "hidden" : "rounded-md shadow pr-5"}>
          <p className="inline-flex items-center justify-center px-5 py-3 pr-5 border border-mwt text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-500">{isConnected ? "Connected" : "Connect Wallet"}</p>
        </button>
        <Button buttonText={"Create Private NFTs"} />
      </div>  

      <h2 className={isConnected ? "text-lg font-semibold text-white pb-4" : "text-lg font-semibold text-white mb-4 hidden"}>
        Connected Wallet Address: <span className="font-normal">{account}</span>
      </h2>
      
      
      <NFTGallery nfts={nfts} chainId="37" />

      <h3 className="text-lg text-mwt font-medium">
        About Magic Wizard Collector
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor velit dolor, non ornare eros posuere non. Pellentesque vitae sodales enim. Donec nec tellus lacinia, dapibus ligula id, tempor dui. Cras dapibus nisi at gravida venenatis. Sed augue ante, accumsan sit amet placerat quis, feugiat et diam. Praesent feugiat lorem dignissim imperdiet lacinia. Aliquam libero tortor, hendrerit nec dapibus quis, sollicitudin id eros.
      </p>
      <h3 className='text-lg text-mwt font-medium pt-4'>
        About Magic Wizard Tech
      </h3>
      <p>
        MWT builds tools to democratize access to Blockchains and power the future of Web3. We are a team of engineers and product developers based in New York City dedicated to creating easy access for everyone to the Web3 ecosystem.
      </p>

    </>
  )
}
