import { useState } from 'react';
import { useS3Upload } from "next-s3-upload";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

import { NFT, Metadata } from '../types/NFT';

import Button from '../components/Button';
import { ethers } from 'ethers';

//const Mint = () => {

export default function Mint(
    { isConnected, account, connectWallet }: {
    isConnected: boolean;
    account: string;
    connectWallet: any;
  }) {
  
  const [totalSupply, setTotalSupply] = useState('1000');
  const [price, setPrice] = useState('0.001');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privateContentTitle, setPrivateContentTitle] = useState('');
  const [privateContentDescription, setPrivateContentDescription] = useState('');

  // preview content files
  const [imageUrl, setImageUrl] = useState('');
  const [privateContentUrl, setPrivateContentUrl] = useState('');

  let { uploadToS3 } = useS3Upload();


  // these two functions need to be combined into one!
  async function handleFileChange(event: any) {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);

    setImageUrl(url);
    console.log("Successfully uploaded to S3 Image!", url);
  };


  async function handlePrivateContentFile(event: any) {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);

    setPrivateContentUrl(url);
    console.log("Successfully uploaded to S3 Private!", url);
  };


  async function handleSubmit(event: any) {
    event.preventDefault();

    const tokenId = Date.now() + uuidv4();

    const tokenAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e';

    // create the form data
    const nft: NFT = {  
      // this needs to be reconfigured when the mint actually happens
        tokenAddress,
        owner: account,
        chainId: 37,
        chainName: "Polygon",
        
        contractType: "ERC1155",
        name: "MagicPrivateCollector - Secret NFTs",
        uri: `https://magicprivatecollector.com/nft/37/${tokenAddress}/${tokenId}`,

        tokenId,
        totalSupply: Number(totalSupply),
        availableSupply: Number(totalSupply),
        price: Number(price),
        metadata:  {
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

    console.log(nft);

    const result = await axios.post('https://ap4ic1f999.execute-api.us-east-1.amazonaws.com/api/mint', 
    nft,
    {
      headers: {
        'Accept': 'application/json',
      }
    });

    console.log(result);
    
  }

  return (

    <div className="rounded-lg border border-gray-200 bg-gray-800 p-4">
      <form className="text-gray-200 text-base" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-2xl font-medium">Private NFT Details</h3>
          <p className="mt-1 text-sm text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor velit dolor, non ornare eros posuere non. Pellentesque vitae sodales enim.
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="totalSupply" className="block font-medium">
            Total Supply
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="totalSupply"
              name="totalSupply"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              value={totalSupply}
              onChange={ev => setTotalSupply(ev.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="price" className="block font-medium">
           price
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="price"
              name="price"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              value={price}
              onChange={ev => setPrice(ev.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              rows={3}
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="image" className="block font-medium">
            Image
          </label>

          <img src={imageUrl} />
          <div className="mt-1">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-gray-50 rounded-md border-gray-300 text-gray-900 p-2"
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
            <p className="text-xs text-gray-300 mt-1">Please upload your teaser image as a PNG, JPG, or GIF</p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="privateContentTitle" className="block font-medium">
            Private Content Title
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="privateContentTitle"
              name="privateContentTitle"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              value={privateContentTitle}
              onChange={ev => setPrivateContentTitle(ev.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="privateContentDescription" className="block font-medium">
            Private Content Description
          </label>
          <div className="mt-1">
            <textarea
              id="privateContentDescription"
              name="privateContentDescription"
              className="block w-full rounded-md border-gray-300 text-gray-900 p-2"
              rows={3}
              value={privateContentDescription}
              onChange={ev => setPrivateContentDescription(ev.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 mb-6">
          <label htmlFor="image" className="block font-medium">
            Private Content File
          </label>

          {privateContentUrl.includes('.mov') ?
            <video controls>
              <source src={privateContentUrl} type="video/mov" />
            </video>
            :
            <img src={privateContentUrl} />
          }

          <div className="mt-1">
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="pc-file-upload"
                className="relative cursor-pointer bg-gray-50 rounded-md border-gray-300 text-gray-900 p-2"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  id="pc-file-upload"
                  name="pc-file-upload"
                  className="sr-only"
                  onChange={handlePrivateContentFile}
                />
              </label>
            </div>
            <p className="text-xs text-gray-300 mt-1">Upload your private file in one of the following formats: </p>
          </div>
        </div>
        <div className="text-right">
          <Button buttonText="Create Private NFT" />
        </div>
      </form>
    </div>

  )
}

