import Link from "next/link";
import React from "react";
import { Popover } from "@headlessui/react";
import {
  WalletIcon,
  EyeIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import { Account } from "../types/Account";

const features = [
  {
    name: "About",
    href: "/about",
    description: "About Magic Wizard Tech",
    icon: InformationCircleIcon,
  },
  {
    name: "Create Private NFTs",
    href: "/mint",
    description: "Create Private NFTs",
    icon: SparklesIcon,
  }
];

export default function CustomHeader(account: Account) {
  const { isConnected, address, connectWallet } = account;

  return (
    <Popover className="relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
            <Link href="/">
              <a>
                <span className="sr-only">Magic Private Collector</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/img/magicwizardtech.png"
                  alt="Magic Wizard Tech"
                  width="100"
                  height="100"
                />

              </a>
            </Link>
            <Link href="/">
              <a title="Magic Private Collector" className="flex items-center text-2xl text-mwt ml-3">MWT&apos;s Magic Private Collector</a>
            </Link>
          </div>

          {/* Mobile Nav Open */}
          <div className="-my-2 lg:hidden">
            <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-white border-white border focus:outline-none">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-10">
            <nav className="flex font-medium text-white cursor-pointer">
              {isConnected ? '' :
                <a onClick={connectWallet} title="Connect MetaMask" className="flex items-center hover:text-mwt">
                  <WalletIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                  <span className="ml-0.5">
                    Connect MetaMask
                  </span>
                </a>}
              <Link href="/">
                <a title="View Collection" className="flex items-center hover:text-mwt ml-3">
                  <EyeIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                  <span className="ml-0.5">
                    Collection
                  </span>
                </a>
              </Link>
              <Link href="/#for-sale">
                <a title="NFTs For Sale" className="flex items-center hover:text-mwt ml-3">
                  <ShoppingBagIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                  <span className="ml-0.5">
                    For Sale
                  </span>
                </a>
              </Link>
              <Link href="/mint">
                <a title="Create Private NFTs" className="flex items-center hover:text-mwt ml-3">
                  <SparklesIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                  <span className="ml-0.5">
                    Create Private NFTs
                  </span>
                </a>
              </Link>
              <Link href="/about">
                <a title="About MWT" className="flex items-center hover:text-mwt ml-3">
                  <InformationCircleIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                  <span className="ml-0.5">
                    About
                  </span>
                </a>
              </Link>
            </nav>
          </div>

        </div>
      </div>
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 z-10 origin-top-right lg:hidden"
      >
        <div className="bg-gray-900 rounded-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
          <div className="pt-6 pb-6 px-6 border-b border-mwt rounded-b-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href={`/`}>
                  <a>
                    <span className="sr-only">Magic Private Collector</span>
                    <Image
                      className="h-8 w-auto sm:h-10"
                      src="/img/magicwizardtech.png"
                      alt="Magic Wizard Tech"
                      width="100"
                      height="100"
                    />

                  </a>
                </Link>
                <Link href="/">
                  <a title="Magic Private Collector" className="flex items-center text-2xl text-mwt ml-3">MWT&apos;s Magic Private Collector</a>
                </Link>
              </div>

              {/* Mobile Nav Close */}
              <div>
                <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-white border-white border focus:outline-none">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="mt-6">
              <nav className="grid gap-y-8 font-medium text-white cursor-pointer">
                {isConnected ? '' :
                  <a onClick={connectWallet} title="Connect MetaMask" className="flex items-center hover:text-mwt -m-3 p-3">
                    <WalletIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    <span className="ml-1.5">
                      Connect MetaMask
                    </span>
                  </a>}
                <Link href="/">
                  <a title="View Collection" className="flex items-center hover:text-mwt -m-3 p-3">
                    <EyeIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    <span className="ml-1.5">
                      Collection
                    </span>
                  </a>
                </Link>
                <Link href="/#for-sale">
                  <a title="NFTs For Sale" className="flex items-center hover:text-mwt -m-3 p-3">
                    <ShoppingBagIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    <span className="ml-1.5">
                      For Sale
                    </span>
                  </a>
                </Link>
                <Link href="/mint">
                  <a title="Create Private NFTs" className="flex items-center hover:text-mwt -m-3 p-3">
                    <SparklesIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    <span className="ml-1.5">
                      Create Private NFTs
                    </span>
                  </a>
                </Link>
                <Link href="/about">
                  <a title="About MWT" className="flex items-center hover:text-mwt -m-3 p-3">
                    <InformationCircleIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    <span className="ml-1.5">
                      About
                    </span>
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
