import { ethers } from 'ethers';

const providerUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;

const provider = new ethers.JsonRpcProvider(providerUrl);

export { provider, ethers };