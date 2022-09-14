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

    <div className="rounded-lg border border-gray-200 bg-gray-800 p-4">
      <form className="text-gray-200 text-base" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-2xl font-medium">Private NFT Details</h3>
          <p className="mt-1 text-sm text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor velit dolor, non ornare eros posuere non. Pellentesque vitae sodales enim.
          </p>
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
            <p className="text-xs text-gray-300 mt-1">GUIDELINES?!?!? PNG, JPG, GIF up to 10MB</p>
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
              value={description}
              onChange={ev => setPrivateContentDescription(ev.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 mb-6">
          <label htmlFor="image" className="block font-medium">
            Private Content File
          </label>
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
            <p className="text-xs text-gray-300 mt-1">GUIDELINES?!?!?</p>
          </div>
        </div>
        <div className="text-right">
          <Button buttonText="Create Private NFT" />
        </div>
      </form>
    </div>

  )
}

export default Mint;

