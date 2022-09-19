import Head from "next/head";
import "../styles/globals.css";
import CustomHeader from "../components/CustomHeader";
import FooterMWT from "../components/FooterMWT";

import type { AppProps } from "next/app";
import { useState, useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { MetaMaskInpageProvider } from "@metamask/providers";


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}


export default function MyApp({ Component, pageProps }: AppProps) {

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');
  const onboarding = useRef<MetaMaskOnboarding>();



  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account !== '' && onboarding.current) {
        
        
        setIsConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        
        
        setIsConnected(false);
      }
    }
  }, [account]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
     
      if(window.ethereum.selectedAddress && window.ethereum.selectedAddress !== '' ) {
        setAccount(window.ethereum.selectedAddress);
      
        setIsConnected(true);
      }
    }
  }, []);

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (newAccounts: any) => {
          if(newAccounts && newAccounts.length > 0 && newAccounts[0] !== '' ) {
          setAccount(newAccounts[0]);
        
          }
        });

    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  };

const obj = {isConnected, address: account};
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
      </Head>

      <div className="bg-gray-900">
        {/* Section: Header w/ Nav */}
        <CustomHeader isConnected={isConnected} address={account} connectWallet={connectWallet} />
        
        <main className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:pb-8 text-gray-100">

          <Component {...pageProps} isConnected={isConnected} account={account} connectWallet={connectWallet} />

        </main>
        {/* Section: Footer */}
        <FooterMWT isConnected={isConnected} address={account} connectWallet={connectWallet} />
      </div>
    </>
  );
}
