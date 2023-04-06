import { provider, ethers } from "./ethers";

const contractAddress = process.env.CONTRACT_ADDRESS || "";
const abi = [];
const contract = new ethers.Contract(contractAddress, abi, provider);

export { contract };