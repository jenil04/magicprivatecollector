import { useState } from 'react';
import { useS3Upload } from "next-s3-upload";

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


                    

                    <br /><br /><br />
                    <input type="submit" value="Submit" />
                </form>



    )
}

export default Mint;

