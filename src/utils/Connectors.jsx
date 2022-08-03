import { ethers } from "ethers";
import treasuryABI from "./Treasury.json";
import governanceABI from "./Governance.json";

export const treasuryAbi = treasuryABI.abi;
export const governanceAbi = governanceABI.abi;

export const treasuryAddress = "0xF9C0722047CD51e82EC59856BD86ad869FF6f4f6";

export const governanceAddress = "0xc14118810f2251b4472b4399fe2D3092e009db91";

export const nftTokenAddress = "0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9";

export const provider = new ethers.providers.Web3Provider(window.ethereum);

<<<<<<< HEAD
// export const url = "http://127.0.0.1:5000/api/";
=======
>>>>>>> ae864b5077315f81fafb47a5af9721479a7bce98
export const url = "https://still-everglades-35996.herokuapp.com/api/";

export const signer = provider.getSigner();

export const treasuryContract = new ethers.Contract(treasuryAddress, treasuryABI.abi, signer);

export const governanceContract = new ethers.Contract(governanceAddress, governanceABI.abi, signer);
