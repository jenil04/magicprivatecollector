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
  const [accounts, setAccounts] = useState([] as Array<any>);
  const onboarding = useRef<MetaMaskOnboarding>();



  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts && accounts.length > 0 && accounts[0] != null && onboarding.current) {
        
        
        setIsConnected(true);
        onboarding.current.stopOnboarding();
      } else {
        
        
        setIsConnected(false);
      }
    }
  }, [accounts]);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      const accounts = [window.ethereum.selectedAddress];
      setAccounts(accounts);
      //handleNewAccounts(accounts);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async (newAccounts: any) => {
          setAccounts(newAccounts);
         // await handleNewAccounts(newAccounts);

        });

    } else {
      if (onboarding.current) {
        onboarding.current.startOnboarding();
      }
    }
  };


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
        <CustomHeader isConnected={isConnected} accounts={accounts} />

        <main className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:pb-8 text-gray-100">

          <Component {...pageProps} isConnected={isConnected} accounts={accounts} connectWallet={connectWallet} />

        </main>
        {/* Section: Footer */}
        <FooterMWT isConnected={isConnected} accounts={accounts} />
      </div>
    </>
  );
}
