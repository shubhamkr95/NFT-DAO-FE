import { ethers } from "ethers";
import Abi from "./Treasury.json";

export const treasuryAbi = Abi.abi;
export const treasuryAddress = "0x637F221a5E31b13446B027462E543245C3531090";
export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const treasuryContract = new ethers.Contract(treasuryAddress, treasuryAbi, signer);
