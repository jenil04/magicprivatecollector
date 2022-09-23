/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');

const POLYGON_TESTNET_KEY = '1b88e804226061412b922007050122f06b1f19ea';

const POLYGON_TESTNET_PRIVATE_KEY = '2936487f3deeb77ff28212379d759c6e73828f23cb66add294be736c47481011';

module.exports = {
  solidity: "0.8.9",
  networks: {
    polygonTestnet: {
      url: `https://purple-silent-shadow.matic-testnet.quiknode.pro/${POLYGON_TESTNET_KEY}`,
      accounts: [POLYGON_TESTNET_PRIVATE_KEY]
    }
  }
};
