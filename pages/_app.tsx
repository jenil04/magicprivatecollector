import Head from "next/head";
import "../styles/globals.css";
import CustomHeader from "../components/CustomHeader";
import FooterMWT from "../components/FooterMWT";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {

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
        <CustomHeader />

        <main className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:pb-8 text-gray-100">

          <Component {...pageProps} />

        </main>
        {/* Section: Footer */}
        <FooterMWT />
      </div>
    </>
  );
}
