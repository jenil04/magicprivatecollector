import MetaMaskOnboarding from '@metamask/onboarding';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useState, useEffect, useRef } from 'react';
import { ethers } from "ethers";

import NFTGallery from '../components/NFTGallery';
import Button from '../components/Button';
import { SparklesIcon } from '@heroicons/react/outline';


// polygon quicknode
const provider = new ethers.providers.JsonRpcProvider('https://multi-necessary-morning.matic.quiknode.pro/9cebc8e52d41fb7a7cf25167b7f92f740a892623/');

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

export default function Index() {

  const [buttonText, setButtonText] = useState('Click here to install MetaMask!');
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const onboarding = useRef<MetaMaskOnboarding>();

  const [nfts, setNFTs] = useState([] as Array<any>);


  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0 && onboarding.current) {
        setButtonText('Connected');
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText("Connect Wallet");
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    async function handleNewAccounts(newAccounts: any) {


      // const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
      // console.log(chainId);


      const url = 'https://deep-index.moralis.io/api/v2/0xea33CCCd251792a8eb25674009922F4F8c5aBCf6/nft?chain=eth&format=decimal';
      const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'h9U7pEVDckfIrOATb5iUnzCuSekKSkpTHqSdrl2ST5WVuN02PI3zA7oVbwtSmPMP' } };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {

          const nftArray = [] as Array<any>;
          let obj = {} as any;

          console.log(json);

          for (let index = 0; index < json.result.length; index++) {
            obj = JSON.parse(json.result[index].metadata);

            if (obj.image && obj.image.includes('ipfs://')) {
              obj.image = obj.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
            }
            if (obj.image_url) {
              obj.image = obj.image_url;
            }
            nftArray.push({ ...json.result[index], metadataObj: obj });

          }
          console.log(nftArray);
          setNFTs(nftArray);
        })
        .catch(err => console.error('error:' + err));

      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      const ethereum = window.ethereum;
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: any) => {

          setAccounts(newAccounts);
        })
    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  };


  return (
    <>
      <h1 className="text-4xl text-white font-bold pb-4">
        <span>Magic Wizard Tech&apos;s</span> <span className="text-mwt">Magic Private Collector</span>
      </h1>
      <button disabled={isDisabled} onClick={onClick} className={isDisabled ? "hidden" : "rounded-md shadow pr-5"}>
        <p className="inline-flex items-center justify-center px-5 py-3 pr-5 border border-mwt text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600">{buttonText}</p>
      </button>
      <h2 className={isDisabled ? "text-lg font-semibold text-white pb-4" : "text-lg font-semibold text-white pb-4 hidden"}>
        Connected Wallet Address: <span className="font-normal">{accounts[0]}</span>
      </h2>
      
      <Button buttonText={"Create Private NFTs"} />
      <NFTGallery nfts={nfts} />

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
