import NFTGallery from '../components/NFTGallery';
import Button from '../components/Button';
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
      <h1 className="text-4xl text-white font-bold pb-4">
        <span>Magic Wizard Tech&apos;s</span> <span className="text-mwt">Magic Private Collector</span>
      </h1>
      <div className='mb-4'>
        <button onClick={connectWallet} className={isConnected ? "hidden" : "rounded-md shadow pr-5"}>
          <p className="inline-flex items-center justify-center px-5 py-3 pr-5 border border-mwt text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-500">{isConnected ? "Connected" : "Connect MetaMask"}</p>
        </button>
        <Link href="/mint">
          <a>
            <Button buttonText={"Create Private NFTs"} />
          </a>
        </Link>
      </div> 
      
      <h3 className='mb-2 text-lg'>
        MY COLLECTION
      </h3>
      {/* not connected state */}
      {isConnected ? '' :
        <p>
          <a onClick={connectWallet} title="Connect MetaMask" className="inline text-mwt">Connect your MetaMask Wallet</a> to browse your current collection or purchase some of the private NFTs on offer below!
        </p>
      }
      
      {/* connected but no assets @TODO this may be wrong... */}
      {isConnected && nfts.owned && nfts.owned.length === 0 ?
        <p>
          You're connected! Now you can browse and purchase some of the private NFTs on offer below!
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
      <h3 className='text-lg text-mwt font-medium pt-4'>
        About Magic Wizard Tech
      </h3>
      <p>
        MWT builds tools to democratize access to Blockchains and power the future of Web3. We are a team of engineers and product developers based in New York City dedicated to creating easy access for everyone to the Web3 ecosystem.
      </p>

    </>
  )
}
