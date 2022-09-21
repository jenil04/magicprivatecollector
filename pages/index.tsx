import NFTGallery from '../components/NFTGallery';
import { Button, ButtonDisabled } from '../components/Button';
import Link from 'next/link';
import { NFTLIST } from "../types/NFT";


// polygon quicknode
// const provider = new ethers.providers.JsonRpcProvider('https://multi-necessary-morning.matic.quiknode.pro/9cebc8e52d41fb7a7cf25167b7f92f740a892623/');

export default function Index(
  { isConnected, account, connectWallet, nfts }: {
  isConnected: boolean;
  account: string;
  connectWallet: any;
  nfts: NFTLIST;
}) {
  
  return (
    <>
      <h1 className="text-xl text-white font-bold pb-4">
        <span>Magic Wizard Tech&apos;s</span> <span className="text-mwt">Magic Private Collector</span>
      </h1>
      <p>
         Welcome to your one stop shop for creating, browsing, and buying private NFTs! 
         {isConnected ? <p>You&apos;re connected!</p> : 
         <a onClick={connectWallet} title='Connect MetaMask' className='inline text-mwt cursor-pointer'> Connect your MetaMask Wallet to get started.</a>} Once you&apos;re connected you&apos;ll be able to view all of the private NFTs you&apos;ve purchased, create your very own to sell, and browse and buy the private NFTs on offer below.
      </p>      
      <h3 className='mt-8 mb-2 text-lg'>
        MY COLLECTION
      </h3>
      {/* not connected state */}
      {isConnected ? '' :
        <>
          <span>Nothing here yet :(</span><span className='ml-4'>Connect MetaMask to view and build your collection. </span>
        </>
      }
      
      {/* connected but no assets @TODO this may be wrong... */}
      {isConnected && nfts.owned && nfts.owned.length === 0 ?
        <p>
          You&apos;re connected! Now you can browse and purchase some of the private NFTs on offer below!
        </p>
      : '' }
      
      {/* connected with assets */}
      {nfts.owned && nfts.owned.length > 0 ?
        <NFTGallery nfts={nfts.owned} chainId="37" isOwned={true} />
      : '' }

      <h3 className='mb-2 mt-8 text-lg'>
        FOR SALE
      </h3>
      {nfts.notOwned && nfts.notOwned.length > 0 ?
        <NFTGallery nfts={nfts.notOwned} chainId="37" isOwned={false} />
      : '' }

      <h3 className="text-lg text-mwt font-medium">
        About Magic Private Collector
      </h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor velit dolor, non ornare eros posuere non. Pellentesque vitae sodales enim. Donec nec tellus lacinia, dapibus ligula id, tempor dui. Cras dapibus nisi at gravida venenatis. Sed augue ante, accumsan sit amet placerat quis, feugiat et diam. Praesent feugiat lorem dignissim imperdiet lacinia. Aliquam libero tortor, hendrerit nec dapibus quis, sollicitudin id eros.
      </p>
    </>
  )
}
