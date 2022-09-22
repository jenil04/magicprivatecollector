# magicprivatecollector

## Configure image upload
Make sure to create this file on your local:
.env.local
and put these variables in:
S3_UPLOAD_KEY=AAAAAAAAAAAAAAAAAAAA
S3_UPLOAD_SECRET=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
S3_UPLOAD_BUCKET=name-of-s3-bucket
S3_UPLOAD_REGION=bucket-region-us-east-1

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
