# magicprivatecollector

# Configure image upload
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