import { ethers } from "ethers";
import treasuryABI from "./Treasury.json";
import governanceABI from "./Governance.json";

export const treasuryAbi = treasuryABI.abi;
export const governanceAbi = governanceABI.abi;

export const treasuryAddress = "0xF9C0722047CD51e82EC59856BD86ad869FF6f4f6";

export const governanceAddress = "0xc14118810f2251b4472b4399fe2D3092e009db91";

export const nftTokenAddress = "0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9";

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const signer = provider.getSigner();

export const treasuryContract = new ethers.Contract(treasuryAddress, treasuryABI.abi, signer);

export const governanceContract = new ethers.Contract(governanceAddress, governanceABI.abi, signer);
