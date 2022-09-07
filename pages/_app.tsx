import Head from "next/head";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="text" />
        
        <meta name="author" content="Magic Wizard Tech Inc., New York, USA" />
    
        <meta name="robots" content="index, follow" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <title>Magic Private Collector</title>

      </Head>
      
        <Component {...pageProps} />

    </>
  );
}
export default MyApp;
