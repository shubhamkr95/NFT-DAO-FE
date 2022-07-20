import { ethers } from "ethers";
import treasuryABI from "./Treasury.json";
import governanceABI from "./Governance.json";

// export const treasuryAbi = treasuryABI.abi;
export const governanceAbi = governanceABI.abi;

export const treasuryAddress = "0x637F221a5E31b13446B027462E543245C3531090";
export const governanceAddress = "0xb38D990Ac50E51435f155FE263DBdC0B746F206F";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();

export const treasuryContract = new ethers.Contract(treasuryAddress, treasuryABI.abi, signer);

export const governanceContract = new ethers.Contract(governanceAddress, governanceABI.abi, signer);
