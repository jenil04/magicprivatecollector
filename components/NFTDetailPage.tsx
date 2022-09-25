import React from "react";
import { NFT, Metadata } from "../types/NFT";
import { ButtonDisabled } from '../components/Button';
import { ethers } from "ethers";
import axios from "axios";
import { abi } from '../data/abi';
import { useRouter } from 'next/router';


const NFTDetailPage = (props: {
  nft: NFT, isConnected: boolean;
  account: string;
  connectWallet: any;
}) => {
  const { nft, isConnected, account, connectWallet } = props;
  const metadata = nft.metadata as Metadata;
  const isOwned = nft.isOwner;

  const router = useRouter();
  

  const contractAddress = process.env.NEXT_PUBLIC_MPC_CONTRACT_ADDRESS as string | '';

  const showPrivateContent = async (tokenId: string, tokenAddress: string) => {
    if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {
      // in order to see the private content we make a request to the smart contract
      // and get a transaction hash. The smart contract makes sure this address still owns the NFT.
      // Once the transaction is confirmed we sent this to the backend. The backend will also check if the transaction was done by the owner
      // and was successful we are using the transaction hash for this because it is upredictable and unique
      // the call is also necessary to ensure that this address still owns the NFT!
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      // the person that is currently logged into metamask
      const address = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const result = await contract.showPrivateContent( { gasLimit: 10152132 });
      
      result.wait().then(async function  (receipt: any) {
        console.log('private result: ', receipt);

        // this call still needs to be secured of course! To make sure that the person calling
        // really is the address logged in right now.
        // the private content is now sent back. This call only works once!
        // if you want to see the content again, you will need to make another request

        const backendResult = await axios.post(`https://${process.env.NEXT_PUBLIC_MPC_AWS_ENDPOINT}.execute-api.us-east-1.amazonaws.com/api/private`,
          {
            tx: receipt.hash,
            address,
            tokenId,
            tokenAddress

          },
          {
            headers: {
              'Accept': 'application/json',
            }
          });

        console.log(backendResult);

      });

    }
    // send to smart contract and get tx
  }

  const buyNFT = async (tokenAddress: string, tokenId: string, owner: string) => {
    if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {

      console.log(tokenId);
      console.log(tokenAddress);
      console.log(owner);

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      // the person that is currently logged into metamask
      const address = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      
      const result = await contract.executeSale(owner, address,Number(tokenId), { gasLimit: 10152132 });

      // when the sale is done, update our database

      console.log('transfer result: ', result);

      const backendResult = await axios.post(`https://${process.env.NEXT_PUBLIC_MPC_AWS_ENDPOINT}.execute-api.us-east-1.amazonaws.com/api/sale`,
          {
            tokenAddressTokenId: `${tokenAddress}_${tokenId}`,
            chainId: "37",
            buyer: address
          },
          {
            headers: {
              'Accept': 'application/json',
            }
          });

        console.log(backendResult);

        result.wait().then(function (receipt: any) {
          console.log('sale result: ', receipt);

          router.push(`/nft/37/${tokenAddress}/${tokenId}`);

        });

    }


  };

  return (
    <div className="">

      {/* Teaser section */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 p-4 rounded-lg border border-gray-200 bg-gray-800">

        {/* Name & Description */}
        <div className="lg:col-span-7 lg:col-start-6">
          <h1 className="text-3xl font-semibold">{metadata.name}</h1>
          <p className="mt-3 leading-7">
            {metadata.description}
          </p>

        </div>

        {/* Thumbnail / Teaser Image */}
        <div className="mt-8 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
          <div className="relative lg:col-span-2 lg:row-span-2">
            <img
              src={metadata.image}
              alt={metadata.name}
              className='rounded-lg max-h-72 mx-auto'
            />
          </div>
        </div>

        {/* NFT details (floats below thumbnail on mobile) */}
        <div className="lg:col-span-5">
          <div className="mt-4">
            <p className="text-xl">
              <span className="font-light uppercase">Price:</span> {nft.price} MATIC
            </p>

            {/* BUY NOW button section */}
            {/* show private content  */}
            {isConnected && isOwned ?
              <div className="my-4"></div>
              : ''}

            {/* enabled buy button only if are connected and don't own it */}
            {isConnected && !isOwned ?
              <div className="my-4">
                <button onClick={ev => buyNFT(nft.tokenAddress, nft.tokenId, nft.owner)} 
                className="inline-flex items-center justify-center px-5 py-3 border-2 border-mwt text-base font-medium rounded-md text-white bg-mwt hover:border-gray-800">
                  BUY NOW
                </button>
              </div>
              : ''}

            {/* disabled buy button for not connected */}
            {!isConnected ?
              <div className="my-4">
                <ButtonDisabled btnText="BUY NOW" />
              </div>
              : ''}

            <p>
              <span className="font-light uppercase">Available Supply:</span> {nft.availableSupply}
            </p>
            <p>
              <span className="font-light uppercase">Total Supply:</span> {nft.totalSupply}
            </p>
            <p>
              <span className="font-light uppercase">Blockchain:</span> {nft.chainName}
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
          </div>
        </div>
      </div>


      {/* Main Private NFT section */}
      <div className="mt-8 col-span-12">
        <fieldset className="rounded-lg border border-gray-200 my-4 p-4">
          <legend className="m-2 px-2 text-rose-600">Private NFT</legend>

          {isOwned ?

            /* display private NFT if isOwned */
            <>
              <div className="-mt-4">
                <p className="text-3xl font-semibold">
                  {metadata.private.name}
                </p>
                <p className="my-2 leading-7">
                  {metadata.private.description}
                </p>
              </div>
              <div className="relative">
                <img
                  src={metadata.private.url}
                  alt={metadata.private.name}
                  className='rounded-lg'
                />
              </div>
            </>
            /* display blurred dummy if is not owned */
            :
            <>
              <div className="-mt-4 select-none" style={{color: 'transparent', textShadow: 'rgba(255, 255, 255, 0.95) 0px 0px 20px'}}>
                <p className="text-3xl font-semibold">
                  Lorem ipsum dolor sit amet.
                </p>
                <p className="my-2 leading-7">
                  Donec ut fermentum erat. Aenean sed turpis molestie est pulvinar mollis. Integer scelerisque eros a tortor porttitor eleifend. Suspendisse placerat mattis metus, ac euismod leo egestas eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1529686159790-3246c5082afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="It's private! You wanna see it? Buy it!"
                  className='rounded-lg'
                  style={{filter: 'blur(1rem)'}}
                />
              </div>
            </>
          }
        </fieldset>

      </div>
    </div>
  );
};

export default NFTDetailPage;