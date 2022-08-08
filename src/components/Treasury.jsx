import React from "react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { treasuryContract, signer, treasuryAddress, provider, url } from "../utils/Connectors";
import ButtonLoader from "./ButtonLoader";
import { useNavigate } from "react-router-dom";

const Treasury = () => {
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
    <div className="mx-auto  max-w-2xl  text-lg text-gray-400">
     <h5>Treasury</h5>
    </div>
    <div
     className="mx-auto mt-2 block p-2 w-full m-3  max-w-2xl rounded-lg border shadow-md hover:bg-gray-400"
     style={{ borderColor: "#2d2d2d" }}
    >
     <div className="text-gray-500 mx-5   font-medium ">
      <p>The Total balance in the treasury is {AccountBalance} Ether</p>
     </div>
    </div>

    <div className="mx-auto max-w-2xl text 2xl text-gray-50 text-center">
     <form onSubmit={handleSubmit}>
      <label htmlFor="MATIC" className="block mt-5 mb-2 text-left max-w-2xl text-sm font-medium text-gray-400">
       Ether
      </label>
      <input
       className=" border mx-auto max-w-2xl  text-gray-400 text-sm rounded-lg  block w-full p-2.5 bg-transparent border-gray-600  focus:ring-blue-500 focus:border-blue-500"
       type="number"
       min="0"
       style={{ borderColor: "#2d2d2d" }}
       value={Ether}
       onChange={handleEther}
      />
      {!Loading ? (
       <div>
        <button
         className="bg-transparent border w-full empty:3 px-12 py-2 rounded-full mt-5 font-medium text-gray-400 hover:bg-blue-600"
         style={{ borderColor: "#2d2d2d" }}
        >
         Deposit
        </button>
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
