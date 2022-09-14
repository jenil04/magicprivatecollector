import { useState } from 'react';
import { useS3Upload } from "next-s3-upload";

import Button from '../components/Button';

const Mint = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privateContentTitle, setPrivateContentTitle] = useState('');
    const [privateContentDescription, setPrivateContentDescription] = useState('');

    let { uploadToS3 } = useS3Upload();


    // these two functions need to be combined into one!
    async function handleFileChange(event: any) {
        let file = event.target.files[0];
        let { url } = await uploadToS3(file);
    
        console.log("Successfully uploaded to S3 Image!", url);
      };

      
      async function handlePrivateContentFile(event: any) {
        let file = event.target.files[0];
        let { url } = await uploadToS3(file);
    
        console.log("Successfully uploaded to S3 Private!", url);
      };
      

    function handleSubmit(event: any) {
        console.log(name)
        event.preventDefault();
    }

  return (
    <div className = "rounded-lg border border-gray-200 bg-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          Name: </label>
        <input
          type="text" name="name" id="name"
          value={name}
          onChange={ev => setName(ev.target.value)}
        />

        <label htmlFor='description'>
          Description: </label>
        <input
          type="text" name="description" id="description"
          value={description}
          onChange={ev => setDescription(ev.target.value)}
        />

        <label htmlFor='image'>
          Image: </label>
        <input type="file" onChange={handleFileChange} />

        <label htmlFor='privateContentTitle'>
          Private Content Title: </label>
        <input
          type="text" name="privateContentTitle" id="privateContentTitle"
          value={privateContentTitle}
          onChange={ev => setPrivateContentTitle(ev.target.value)}
        />

        <label htmlFor='privateContentDescription'>
          Private Content Description: </label>
        <input
          type="text" name="privateContentDescription" id="privateContentDescription"
          value={privateContentDescription}
          onChange={ev => setPrivateContentDescription(ev.target.value)}
        />

        <label htmlFor='privateContentFile'>
          privateContentFile: </label>
        <input type="file" onChange={handlePrivateContentFile} />

        <Button buttonText="Create Private NFT" />

      </form>

      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    workcation.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>

  )
}

export default Mint;

