# magicprivatecollector
We are enabling users to create NFTs with private content.
This private content can only be accessed by the owner(s) of the NFT.
We are accomplishing this by:
1. A user buys an NFT with private content. The NFT is then transferred to her wallet.
2. Whenever she wants to see the private content, she needs to log into Metamask and sign a transaction. This transaction is calling a function in our smart contract called showPrivateContent(tokenId)
3. The smart contract verifies that this NFT is still owned by this address and sends back true or false.
4. The frontend receives the transaction hash and the information if the address still owns the NFT. It then waits until the transaction is confirmed on the blockchain.
5. It then sends a request to our backend with the transaction hash, tokenId and address. The backend verifies individually that this transaction has been made, was successful, is valid and has been performed in a timely manner (seconds ago). It then sends the private content and one time private content url to the frontend. This content is now visible in the current frontend session. Once the frontend session is destroyed, the content is gone. The post request can only be used once. The backend keeps track of expired transaction hashes in order to prevent from delivering the content multiple times (this might not be necessary, because the timestamp might be enough for this).


## Configure image upload
Make sure to create this file on your local:
.env.local
and put these variables in:
S3_UPLOAD_KEY=AAAAAAAAAAAAAAAAAAAA
S3_UPLOAD_SECRET=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
S3_UPLOAD_BUCKET=name-of-s3-bucket
S3_UPLOAD_REGION=bucket-region-us-east-1

## Configure Quicknode
QUICKNODE_PROVIDER=
QUICKNODE_APIKEY=


## Smart contract folders
We would prefer to move all the smart contract development files to it's own repository but for this hackathon we will keep it all in here.
This is a list of folders and files used for smart contract and should be ignored by frontend:
artifacts
cache
contracts
scripts
hardhat.config.js

Node modules for smart contract development:
@openzeppelin/contracts
hardhat
@nomiclabs/hardhat-ethers

## Setup smart contract development
- Make sure hardhat is installed:

```
$ npx hardhat
```

Then run a local node

```
$npx hardhat node
```

## Compile smart contract
Make sure hardhat node is running!

```
npx hardhat compile
npx hardhat run --network localhost scripts/deploy.js
```

Make sure to add the config in hardhat.config.js!!
```
npx hardhat run --network polygonTestnet scripts/deploy.js

```
## Magic Private Collector Contract - Polygon Mumbai Testnet
0x1D8793F7785fc2107bA1076fa8e23d13eeFFEa55
0x08923D7BD65357B99C44663F887418d5eDc59C63
0x4929B1C6f8deEded17a8403944d866bE70eFEe02
0xe3418f6DFfAF2879DcBb0a84a7c7456328c9D877

Danielas address (contract was created with this):
0xc093b5219CFb7572354B8907Cd0C9bF9735371ED

Danielas second address
0xF96733d133d987AC11d668E866842Fa47C57D5c7
