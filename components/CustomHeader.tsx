import Link from "next/link";
import React from "react";
import { Popover } from "@headlessui/react";
import {
  //WalletIcon, @TODO there are more and better icons in v2.0.0 (if we wish)
  BriefcaseIcon, //Stand in for Wallet (until we decide to use "cash" or upgrade)
  ShoppingBagIcon,
  SparklesIcon,
  InformationCircleIcon,
  // @TODO these icons are not available in v2
  // MenuIcon,
  // XIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import { Account } from "../types/Account";

const features = [
  {
    name: "Connect Wallet",
    href: "#", // @TODO need the link to pop the wallet hereS
    description: "Connect Wallet",
    icon: BriefcaseIcon,
  },
  {
    name: "View Private Collection",
    href: "#",
    description: "View Private Collection",
    icon: InformationCircleIcon,
  },
  {
    name: "Buy Private NFTs",
    href: "#",
    description: "Buy Private NFTs",
    icon: ShoppingBagIcon,
  },
  {
    name: "Create Private NFTs",
    href: "#",
    description: "Create Private NFTs",
    icon: SparklesIcon,
  }
];




export default function CustomHeader(account: Account) {
  const {isConnected, address} = account;
  console.log(isConnected);
  console.log(address);

  return (
    <Popover className="relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={`/`}>
              <a>
                <span className="sr-only">Magic Wizard Tech</span>

                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/img/magicwizardtech.png"
                  alt="Magic Wizard Tech"
                  width="100"
                  height="100"
                />

              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-white border-white border focus:outline-none">
              <span className="sr-only">Open menu</span>
              {/* @TODO icon is not available */}
              {/* <MenuIcon className="h-6 w-6" aria-hidden="true" /> */}
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {features.map((item) => (
              <Link href={item.href} key={item.name}>
                <a title={item.description} className="font-medium text-white hover:text-mwt">
                  {item.name}
                </a>
              </Link>
            ))}
          </Popover.Group>
        </div>
      </div>
      <Popover.Panel
        focus
        className="absolute top-0 inset-x-0 z-10 origin-top-right md:hidden"
      >
        <div className="bg-gray-900 rounded-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
          <div className="pt-6 pb-6 px-6 border-b border-mwt rounded-b-sm">
            <div className="flex items-center justify-between">
              <div>

                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/img/magicwizardtech.png"
                  alt="Magic Wizard Tech"
                  width="100"
                  height="100"
                />

              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-gray-900 ring-gray-400 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400">
                  <span className="sr-only">Close menu</span>
                  {/* @TODO icon is not available */}
                  {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {features.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-m-3 p-3 flex items-center rounded-md"
                  >
                    <item.icon
                      className="flex-shrink-0 h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-white">
                      {item.name}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
