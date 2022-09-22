import { useState, useRef } from 'react';
import { useS3Upload } from "next-s3-upload";
import axios from "axios";
import { useRouter } from 'next/router';

import { NFT, Metadata } from '../types/NFT';
import { abi } from '../data/abi';

import { Button, ButtonDisabled } from '../components/Button';
import { ethers } from 'ethers';


export default function Mint(
  { isConnected, account, connectWallet, handleNewAccounts }: {
    isConnected: boolean;
    account: string;
    connectWallet: any;
    handleNewAccounts: any;
  }) {

  const router = useRouter();
  
  const [totalSupply, setTotalSupply] = useState('');
  const [totalSupplyError, setTotalSupplyError] = useState(false);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [privateContentTitle, setPrivateContentTitle] = useState('');
  const [privateContentTitleError, setPrivateContentTitleError] = useState(false);
  const [privateContentDescription, setPrivateContentDescription] = useState('');
  const [privateContentDescriptionError, setPrivateContentDescriptionError] = useState(false);

  const [isMintInProgress, setIsMintInProgress] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_MPC_CONTRACT_ADDRESS as string | '';

  // preview content files
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlError, setImageUrlError] = useState(false);
  const [privateContentUrl, setPrivateContentUrl] = useState('');
  const [privateContentUrlError, setPrivateContentUrlError] = useState(false);

  let { uploadToS3, files, resetFiles } = useS3Upload();


  // these two functions need to be combined into one!
  async function handleFileChange(event: any) {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);

    setImageUrl(url);
    resetFiles();
  };


  async function handlePrivateContentFile(event: any) {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);

    setPrivateContentUrl(url);
    resetFiles();

  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    let isSubmitReady = true;


    // @TODO had to add else on all of these to clear the error when it is fixed by the user
    if (!totalSupply || totalSupply === '') {
      setTotalSupplyError(true);
      isSubmitReady = false;
    }
    else {
      setTotalSupplyError(false);
    }



    if (!price || price === '') {
      setPriceError(true);
      isSubmitReady = false;
    }

    else {
      setPriceError(false);
    }
    
    if (!name || name === '') {
      setNameError(true);
      isSubmitReady = false;
    }
    else {
      setNameError(false);
    }

    if (!description || description === '') {
      setDescriptionError(true);
      isSubmitReady = false;
    }
    else {
      setDescriptionError(false);
    }

    if (!imageUrl || imageUrl === '') {
      setImageUrlError(true);
      isSubmitReady = false;
    }
    else {
      setImageUrlError(false);
    }


    if (!privateContentTitle || privateContentTitle === '') {
      setPrivateContentTitleError(true);
      isSubmitReady = false;
    }
    else {
      setPrivateContentTitleError(false);
    }

    if (!privateContentDescription || privateContentDescription === '') {
      setPrivateContentDescriptionError(true);
      isSubmitReady = false;
    }
    else { 
      setPrivateContentDescriptionError(false);
    }

    if (!privateContentUrl || privateContentUrl === '') {
      setPrivateContentUrlError(true);
      isSubmitReady = false;
    }
    else {
      setPrivateContentUrlError(false);
    }
   

    if (isSubmitReady) {

      // needs to be a number!
      const tokenId = Date.now().toString();

      // create the form data
      const nft: NFT = {
        // this needs to be reconfigured when the mint actually happens
        tokenAddress: contractAddress,
        // the owner is the person that is logged in with their metamask right now and this is the minter.
        owner: account,
        chainId: 37,
        chainName: "Polygon",

        contractType: "ERC1155",
        name: "MagicPrivateCollector - Secret NFTs",
        uri: `https://magicprivatecollector.com/nft/37/${contractAddress}/${tokenId}`,

        tokenId,
        totalSupply: Number(totalSupply),
        availableSupply: Number(totalSupply),
        price: Number(price),
        metadata: {
          "image": imageUrl,
          "name": name,
          "description": description,
          "private": {
            "url": privateContentUrl,
            "name": privateContentTitle,
            "description": privateContentDescription
          }
        } as Metadata
      };



      if (window.ethereum && await window.ethereum.request({ method: 'eth_requestAccounts' })) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        // the person that is currently logged into metamask
        const address = await signer.getAddress();

        console.log(contractAddress);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const result = await contract.mint(address, tokenId, Number(totalSupply), '0x');
        setIsMintInProgress(true);


        console.log('mint result: ', result);

        const backendResult = await axios.post('https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/mint',
          nft,
          {
            headers: {
              'Accept': 'application/json',
            }
          });

        console.log(backendResult);
        handleNewAccounts(account);

        result.wait().then(function (receipt: any) {
          console.log('mint result: ', receipt);

          setIsMintInProgress(false);

          router.push('/');

        });




      } else {
        console.log('user must connect wallet');
      }



      const backendResult = await axios.post('https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/mint',
        nft,
        {
          headers: {
            'Accept': 'application/json',
          }
        });

      console.log(backendResult);


    }

  }

  return (

    <div className="rounded-lg border border-gray-200 bg-gray-800 p-4">

      <div>
        <h3 className="text-2xl font-medium">Create a Private NFT</h3>
        <p className="mt-1 text-base text-gray-200">
          {isConnected ?
            <p>
              Enter the details for your private NFT below. Please bear in mind the information in the teaser section will be publicly viewable. The private section is will only be viewable to a purchaser of the NFT!
            </p>
            :
            <p>
              <a onClick={connectWallet} title='Connect MetaMask' className='inline text-mwt cursor-pointer'> Connect your MetaMask Wallet to get started.</a> <span>Once you&apos;re connected you&apos;ll be able to create private NFTs right here!</span>
            </p>
          }
        </p>
      </div>
      <form className="text-gray-200 text-base" onSubmit={handleSubmit}>

        <fieldset className="rounded-lg border border-gray-200 my-4 p-4" disabled={isConnected ? false : true}>
          <legend className="m-2 px-2">Public NFT Info</legend>
          <div>
            <label htmlFor="totalSupply" className="block font-medium">
              Total Supply
            </label>
            {totalSupplyError ?

              <p className='text-red-600'>Please enter the Total Supply</p>

              : ''
            }
            <div className="mt-1">
              <input
                type="text"
                id="totalSupply"
                name="totalSupply"
                placeholder="1000"
                className={`${totalSupplyError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                value={totalSupply}
                onChange={ev => setTotalSupply(ev.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="price" className="block font-medium">
              Price
            </label>
            {priceError ?

              <p className='text-red-600'>Please enter the Price</p>

              : ''
            }
            <div className="relative rounded-md shadow-sm">
              <div className="mt-1">
                <input
                  type="text"
                  id="price"
                  name="price"
                  className={`${priceError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                  placeholder="0.001"
                  value={price}
                  onChange={ev => setPrice(ev.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                    MATIC
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="name" className="block font-medium">
              Teaser Title
            </label>
            {nameError ?
              <p className='text-red-600'>Please enter the Teaser Title</p>
              : ''
            }
            <div className="mt-1">
              <input
                type="text"
                id="name"
                name="name"
                className={`${nameError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                value={name}
                onChange={ev => setName(ev.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block font-medium">
              Teaser Description
            </label>
            {descriptionError ?
              <p className='text-red-600'>Please enter the Teaser Description</p>
              : ''
            }
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                className={`${descriptionError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                rows={3}
                value={description}
                onChange={ev => setDescription(ev.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="image" className="block font-medium">
              Teaser Image
            </label>
            {imageUrlError ?
              <p className='text-red-600'>Please upload the Teaser Image</p>
              : ''
            }
            <img 
              src={imageUrl} 
              alt={name}
              width={100} 
              />
            <div className="pt-8">
              {files.map((file, index) => (
                <div key={index}>
                  File #{index} progress: {file.progress}%
                </div>
              ))}
            </div>
            <div className="mt-1">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className={`${imageUrlError ? "border-red-600 border-2" : ""} relative cursor-pointer bg-gray-50 rounded-md border-gray-300 text-gray-900 p-2`}
                >
                  <span>Upload an image</span>
                  <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-300 mt-2">Please upload the teaser image as a PNG, JPG, GIF, or WEBP</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-gray-200 p-4" disabled={isConnected ? false : true}>
          <legend className="m-2 px-2 text-rose-600">Private NFT Info</legend>
          <div className="">
            <label htmlFor="privateContentTitle" className="font-medium">
              Private Content Title
            </label>
            {privateContentTitleError ?
              <p className='text-red-600'>Please enter the Private Content Title</p>
              : ''
            }
            <div className="mt-1">
              <input
                type="text"
                id="privateContentTitle"
                name="privateContentTitle"
                className={`${privateContentTitleError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                value={privateContentTitle}
                onChange={ev => setPrivateContentTitle(ev.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="privateContentDescription" className="block font-medium">
              Private Content Description
            </label>
            {privateContentDescriptionError ?
              <p className='text-red-600'>Please enter the Private Content Description</p>
              : ''
            }
            <div className="mt-1">
              <textarea
                id="privateContentDescription"
                name="privateContentDescription"
                className={`${privateContentDescriptionError ? "border-red-600 border-2" : ""} block w-full rounded-md text-gray-900 p-2 `}
                rows={3}
                value={privateContentDescription}
                onChange={ev => setPrivateContentDescription(ev.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 mb-6">
            <label htmlFor="image" className="block font-medium">
              Private Content Image
            </label>
            {privateContentUrlError ?
              <p className='text-red-600'>Please upload the Private Content Image</p>
              : ''
            }
            <div className="pt-8">
              {files.map((file, index) => (
                <div key={index}>
                  File #{index} progress: {file.progress}%
                </div>
              ))}
            </div>
            <img 
              src={privateContentUrl} 
              alt={privateContentTitle}
              width={100} />

            <div className="mt-1">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="pc-file-upload"
                  className={`${imageUrlError ? "border-red-600 border-2" : ""} relative cursor-pointer bg-gray-50 rounded-md border-gray-300 text-gray-900 p-2`}
                >
                  <span>Upload an image</span>
                  <input
                    type="file"
                    id="pc-file-upload"
                    name="pc-file-upload"
                    className="sr-only"
                    onChange={handlePrivateContentFile}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-300 mt-2">Please upload your <span className='font-semibold'>PRIVATE</span> image as a PNG, JPG, GIF, or WEBP</p>
            </div>
          </div>
        </fieldset>
        {isMintInProgress ? <div className='text-mwt text-2xl'>Transaction is waiting to finish on the blockchain. Please stay put you will be redirected when its ready!</div> : ''}
        <div className="text-right mt-4">

          {isConnected ? <Button btnText="Create Private NFT" />
            :
            <ButtonDisabled btnText="Create Private NFT" />
          }

        </div>
      </form>
    </div>

  )
}

