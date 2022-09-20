/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');

const POLYGON_TESTNET_KEY = 'get this from env.local';

const POLYGON_TESTNET_PRIVATE_KEY = 'get this from env.local';

module.exports = {
  solidity: "0.8.9",
  networks: {
    polygonTestnet: {
      url: `https://purple-silent-shadow.matic-testnet.quiknode.pro/${POLYGON_TESTNET_KEY}`,
      accounts: [POLYGON_TESTNET_PRIVATE_KEY]
    }
  }
};
