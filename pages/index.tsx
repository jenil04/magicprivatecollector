import MetaMaskOnboarding from '@metamask/onboarding';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useState, useEffect, useRef } from 'react';
import { ethers } from "ethers";

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
        setButtonText('Connect');
        setDisabled(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    async function handleNewAccounts(newAccounts: any) {


      const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
      console.log(chainId);

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
    <div className="bg-white">

      <main>
        <p>Hello World!</p>

        <button disabled={isDisabled} onClick={onClick}>
          <p> {buttonText}</p>
        </button>

        <p>Connected Address:</p>
        <p>{accounts[0]}</p>
        <ul>
          {nfts.map((nft: any, index) => (
            <li key={index} className="pt-8">
              <p>{index}</p>
              <p>{nft.metadataObj.image}</p>
              <img src={nft.metadataObj && nft.metadataObj.image ? nft.metadataObj.image : ''} />
            
            </li>
          ))}
        </ul>
      </main>

    </div>

  )
}
