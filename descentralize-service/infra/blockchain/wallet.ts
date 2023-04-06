import { provider, ethers } from "./ethers";

const privateKey = process.env.PRIVATE_KEY || "";
const wallet = new ethers.Wallet(privateKey, provider);
export { wallet }