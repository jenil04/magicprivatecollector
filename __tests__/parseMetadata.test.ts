import { parseMetadata } from "../backend/utils/parseMetadata";
import nftList from "./testData/nftList.json";

describe("parseMetadata", () => {
    test("parseMetadata 1", () => {
        const response = parseMetadata([{
            contractType: 'ERC1155',
            metadata: `{"image":"http://magicprivatecollector.com/img/ramen.jpg","name":"The Ultimate Tonkotsu Ramen Video [*SECRET*]","description":"This is a very private video of a bowl of tonkotsu ramen filmed undercover in a secret location in New York City. You can only watch this video when you are the owner of this NFT and signed in with your wallet on our website https://magicprivatecollector.com","externalUrl":"https://magicprivatecollector.com","private":{"url":"http://magicprivatecollector.com/img/ramen.mov","name":"Everything you ever wanted to see in a Tonkotsu Ramen and MORE!","description":"Look at this beautiful bowl of soup in all it's glory. Aren't you getting hungry and excited? Call up your local ramen supplier now and get your fix!"}}`,
            tokenId: '87105043568808739812058016404600634887640787305169396005463421980573154934785',
            availableSupply: 100,
            uri: 'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0xc093b5219cfb7572354b8907cd0c9bf9735371ed000000000000020000000001',
            name: 'MagicPrivateCollector - Secret NFTs',
            chainId: 37,
            tokenAddress: '0x495f947276749ce646f68ac8c248420045cb7b5e',
            totalSupply: 10000,
            tokenAddressTokenId: '0x495f947276749ce646f68ac8c248420045cb7b5e_87105043568808739812058016404600634887640787305169396005463421980573154934785',
            owner: '0xea33cccd251792a8eb25674009922f4f8c5abcf6',
            price: 0.002,
            chainName: 'Polygon'
        }]);
        expect(response).toEqual([{
            contractType: 'ERC1155',
            metadata: {
                "image": "http://magicprivatecollector.com/img/ramen.jpg",
                "name": "The Ultimate Tonkotsu Ramen Video [*SECRET*]",
                "description": "This is a very private video of a bowl of tonkotsu ramen filmed undercover in a secret location in New York City. You can only watch this video when you are the owner of this NFT and signed in with your wallet on our website https://magicprivatecollector.com",
                "externalUrl": "https://magicprivatecollector.com",
                "private": {
                    "url": "http://magicprivatecollector.com/img/ramen.mov",
                    "name": "Everything you ever wanted to see in a Tonkotsu Ramen and MORE!",
                    "description": "Look at this beautiful bowl of soup in all it's glory. Aren't you getting hungry and excited? Call up your local ramen supplier now and get your fix!"
                }
            },
            tokenId: '87105043568808739812058016404600634887640787305169396005463421980573154934785',
            availableSupply: 100,
            uri: 'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0xc093b5219cfb7572354b8907cd0c9bf9735371ed000000000000020000000001',
            name: 'MagicPrivateCollector - Secret NFTs',
            chainId: 37,
            tokenAddress: '0x495f947276749ce646f68ac8c248420045cb7b5e',
            totalSupply: 10000,
            tokenAddressTokenId: '0x495f947276749ce646f68ac8c248420045cb7b5e_87105043568808739812058016404600634887640787305169396005463421980573154934785',
            owner: '0xea33cccd251792a8eb25674009922f4f8c5abcf6',
            price: 0.002,
            chainName: 'Polygon'
        }]);
    });


});
