// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const PrivateNFT = await ethers.getContractFactory('PrivateNFT');
    console.log('Deploying PrivateNFT...');
    const privateNFT = await PrivateNFT.deploy();
    await privateNFT.deployed();
    console.log('PrivateNFT deployed to:', privateNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });