import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { treasuryContract, signer, treasuryAddress, provider } from "../utils/Connectors";

const Treasury = () => {
 const [AccountBalance, setAccountBalance] = useState(0);
 const [Ether, setEther] = useState(0);
 const [TxnHash, setTxnHash] = useState("");

 const getBalance = async () => {
  const chainId = await provider.getNetwork();
  if (chainId.chainId !== 80001) {
   return alert("Please select mumbai testnet");
  } else {
   const balance = await treasuryContract.balance();
   const parseBalance = await ethers.utils.formatEther(balance);
   setAccountBalance(parseBalance);
  }
 };

 useEffect(() => {
  getBalance();
 }, []);

 const handleEther = async (e) => {
  if (typeof e.target.value === String) {
   e.preventDefault();
  }
  setEther(e.target.value);
 };

 const handleSubmit = async (e) => {
  try {
   e.preventDefault();
   if (Ether < 1) {
    alert("Please enter the minimum value");
   } else {
    const data = {
     to: treasuryAddress,
     value: ethers.utils.parseUnits(Ether, 18),
    };

    const txn = await signer.sendTransaction(data);
    setTxnHash(txn.hash);
   }
  } catch (error) {
   console.error(error.message);
  }
 };

 return (
  <>
   <div className="mx-auto mt-5 max-w-2xl text-2xl text-gray-50">
    <h1>Treasury</h1>
   </div>
   <div
    className="mx-auto mt-2 block p-6 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-400"
    style={{ borderColor: "#2d2d2d" }}
   >
    <div className="text-gray-500 text-xl text-center">
     <p>Treasury balance</p>
    </div>
    <p className=" text-3xl text-center">
     <span className="font-extrabold text-gray-50">{AccountBalance}</span>
     <span className="font-normal text-gray-50"> Ether</span>
    </p>
   </div>

   <div className="mx-auto max-w-2xl text 2xl text-gray-50 text-center">
    <form onSubmit={handleSubmit}>
     <label htmlFor="MATIC" className="text-gray-400 font-extrabold mr-1">
      MATIC
      <input
       className="bg-white border border-solid text-black text-center w-20 ml-2 rounded-lg drop-shadow-xl"
       type="number"
       min="0"
       value={Ether}
       onChange={handleEther}
      />
     </label>
     <div>
      <button className="bg-cyan-700 w-40 p-2 rounded-lg mt-2">Deposit</button>
     </div>
    </form>
    <div className="text-gray-400 font-extrabold mt-3">{TxnHash}</div>
   </div>
  </>
 );
};

export default Treasury;
