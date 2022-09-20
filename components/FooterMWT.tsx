import { Account } from "../types/Account";
import {
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";

export default function Footer(account: Account) {
  const { isConnected, address } = account;

  console.log(isConnected);
  console.log(address);
  return (
    <footer className="bg-gray-900 text-gray-400" aria-labelledby="footer-heading">
      <div className="text-center">
        <span className="mr-3">Email us:</span>
        <a
          href="mailto:info@magicwizardtech.com"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
          target="_blank"
        >
          info@magicwizardtech.com
          <ArrowTopRightOnSquareIcon className="-mr-1 ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      </div>
      <div className="mx-auto py-6 px-4">
        <p className="text-base text-center">&copy; {new Date().getFullYear()} Magic Wizard Tech, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
