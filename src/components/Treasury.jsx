import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { treasuryContract, signer, treasuryAddress, provider, url } from "../utils/Connectors";
import ButtonLoader from "./ButtonLoader";
import { useNavigate } from "react-router-dom";

const Treasury = (prop) => {
 const { data } = prop;
 const navigate = useNavigate();
 const [AccountBalance, setAccountBalance] = useState(0);
 const [Ether, setEther] = useState(0);
 const [TxnHash, setTxnHash] = useState("");
 const [Loading, setLoading] = useState(false);

 const getBalance = async () => {
  const chainId = await provider.getNetwork();
  if (chainId.chainId !== 4) {
   return alert("Please select rinkeby network");
  } else {
   const balance = await treasuryContract.balance();
   const parseBalance = await ethers.utils.formatEther(balance);
   setAccountBalance(parseBalance);
  }
 };

 useEffect(() => {
  getBalance();
  console.log(data);
 }, [data]);

 const handleEther = async (e) => {
  if (typeof e.target.value === String) {
   e.preventDefault();
  }
  setEther(e.target.value);
 };

 const handleSubmit = async (e) => {
  try {
   e.preventDefault();
   setLoading(true);
   if (Ether < 1) {
    alert("Please enter the minimum value");
    setLoading(false);
   } else {
    const data = {
     to: treasuryAddress,
     value: ethers.utils.parseUnits(Ether, 18),
    };

    const txn = await signer.sendTransaction(data);
    const Txn = await txn.wait();

    const treasuryTx = { hash: Txn.transactionHash };

    fetch(`${url}treasury`, {
     method: "POST",
     body: JSON.stringify(treasuryTx),
     headers: {
      "Content-Type": "application/json",
     },
    })
     .then((res) => res.text())
     .then((data) => setTxnHash(data));
    navigate("/");
   }
  } catch (error) {
   console.error(error.message);
   setLoading(false);
  }
 };

 return (
  <>
   <div className="border rounded-lg p-3" style={{ borderColor: "#2d2d2d" }}>
    <div className="mx-auto mt-5 max-w-2xl ml-4 text-2xl text-gray-50">
     <h1>Treasury</h1>
    </div>
    <div
     className="mx-auto mt-2 block p-2 w-48 m-2 max-w-2xl rounded-lg border shadow-md hover:bg-gray-400"
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
       ETHER
       <input
        className="bg-white border border-solid text-black text-center w-20 ml-2 rounded-lg drop-shadow-xl"
        type="number"
        min="0"
        value={Ether}
        onChange={handleEther}
       />
      </label>
      {!Loading ? (
       <div>
        <button className="bg-cyan-700 w-40 p-2 rounded-lg mt-2">Deposit</button>
       </div>
      ) : (
       <ButtonLoader />
      )}
     </form>
     <a href={`https://rinkeby.etherscan.io/tx/${TxnHash}`} className="text-gray-400 font-extrabold mt-3">
      {TxnHash.slice(0, 20)}
     </a>
    </div>
   </div>
  </>
 );
};

export default Treasury;
