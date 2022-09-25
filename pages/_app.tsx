import Head from "next/head";
import "../styles/globals.css";
import CustomHeader from "../components/CustomHeader";
import FooterMWT from "../components/FooterMWT";
import axios from "axios";

import type { AppProps } from "next/app";
import { useState, useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NFTLIST } from "../types/NFT";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}


export default function MyApp({ Component, pageProps }: AppProps) {

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const onboarding = useRef<MetaMaskOnboarding>();
  const [nfts, setNFTs] = useState({} as NFTLIST);

  

  const clearAccount = () => {

    if (!window.ethereum || !window.ethereum.selectedAddress || window.ethereum.selectedAddress === '') {

      setIsConnected(false);
      setAccount('');
      handleNewAccounts('');

    }
  }

  useEffect(() => {
    handleNewAccounts('');
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (window.ethereum?.selectedAddress || (account !== '' && onboarding.current)) {

        setIsConnected(true);

      } else {

        handleNewAccounts('');
        setIsConnected(false);
      }
    }
  }, [account]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {

      if (window.ethereum.selectedAddress && window.ethereum.selectedAddress !== '') {
        setAccount(window.ethereum.selectedAddress);

        setIsConnected(true);

        handleNewAccounts(window.ethereum.selectedAddress);


        window.ethereum.on('accountsChanged', clearAccount);
      }
    }
  }, []);

  

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (newAccounts: any) => {
          if (newAccounts && newAccounts.length > 0 && newAccounts[0] !== '') {
            setAccount(newAccounts[0]);

            handleNewAccounts(newAccounts[0]);



          }
        });



    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  };




  async function handleNewAccounts(account: string) {

    // const chainId = await window.ethereum?.request({ method: 'eth_chainId' });

    let url = `https://${process.env.NEXT_PUBLIC_MPC_AWS_ENDPOINT}.execute-api.us-east-1.amazonaws.com/api/nfts`;

    if (account && account !== '') {
      url = `${url}?address=${account}`;
    }

    const result = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
      }
    });

    setNFTs(result.data);

  }

  return (
    <>
      <Head>
        <title>Magic Private Collector</title>
        <meta name="description" content="text" />
        <meta name="author" content="Magic Wizard Tech Inc., New York, USA" />
        <meta name="robots" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P5ZCW8C');`,
          }}
        />
      </Head>

      <div className="bg-gray-900">
        {/* Section: Header w/ Nav */}
        <CustomHeader isConnected={isConnected} address={account} connectWallet={connectWallet} />

        
        <main className="mx-auto max-w-2xl pb-16 px-4 sm:px-6 lg:max-w-7xl text-gray-100">


          <Component {...pageProps} handleNewAccounts={handleNewAccounts} nfts={nfts} isConnected={isConnected} account={account} connectWallet={connectWallet} />

        </main>
        {/* Section: Footer */}
        <FooterMWT isConnected={isConnected} address={account} connectWallet={connectWallet} />
      </div>
    </>
  );
}
