const { JsonRpcProvider } = require('ethers');

const provider = new JsonRpcProvider('https://base-mainnet.g.alchemy.com/v2/_Y3OwAuZbct_RW9YhwVAdFbxw8uw4Nqu');

async function getBlockNumber() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Current block number:', blockNumber);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBlockNumber();
