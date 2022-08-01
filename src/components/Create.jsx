import { ethers } from "ethers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { governanceContract, treasuryContract, treasuryAddress } from "../utils/Connectors";

export const Create = () => {
 const navigate = useNavigate();
 const [Address, setAddress] = useState("");
 const [Ether, setEther] = useState(0);
 const [Description, setDescription] = useState("");
 const [Data, setData] = useState("");

 const handleAddress = async (e) => {
  try {
   e.preventDefault();
   setAddress(e.target.value);
  } catch (error) {
   console.error(error);
  }
 };

 const handleEther = (e) => {
  try {
   e.preventDefault();
   setEther(e.target.value);
  } catch (error) {
   console.error(error);
  }
 };

 const handleDescription = (e) => {
  try {
   e.preventDefault();
   setDescription(e.target.value);
  } catch (error) {
   console.error(error);
  }
 };

 const handleSubmit = async (e) => {
  try {
   e.preventDefault();

   const encodeFunctionCall = treasuryContract.interface.encodeFunctionData("withdrawFunds", [
    Address,
    ethers.utils.parseEther(Ether, "ether"),
   ]);

   const tx = await governanceContract.propose([treasuryAddress], [0], [encodeFunctionCall], Description);
   const resultTxn = await tx.wait();
   const proposeTx = { hash: resultTxn.transactionHash };

   fetch("http://127.0.0.1:5000/api/create", {
    method: "POST",
    body: JSON.stringify(proposeTx),
    headers: {
     "Content-Type": "application/json",
    },
   })
    .then((res) => res.text())
    .then((data) => setData(data));
   navigate("/");
  } catch (error) {
   console.error(error);
  }
 };

 return (
  <>
   <div
    className="mx-auto mt-5 block p-6 m-2 max-w-2xl rounded-lg border shadow-md "
    style={{ borderColor: "#2d2d2d" }}
   >
    <p className=" font-bold text-2xl text-gray-100">Create proposal.</p>
   </div>
   <div>
    <form onSubmit={handleSubmit}>
     <label className="block mt-10 mx-auto max-w-2xl text-lg font-normal text-gray-200" onChange={handleAddress}>
      To
     </label>
     <input
      aria-describedby="helper-text-explanation"
      className=" border mx-auto max-w-2xl  text-gray-900 text-sm rounded-lg  block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
      placeholder="receiver address"
      value={Address}
      onChange={handleAddress}
      required={true}
     />
     <label className="block mt-10 mx-auto max-w-2xl text-lg font-normal text-gray-200 ">Amount</label>
     <input
      type="number"
      min="0"
      className=" border mx-auto max-w-2xl  text-gray-900 text-sm rounded-lg  block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
      placeholder="amount in Ether"
      onChange={handleEther}
      value={Ether}
      required={true}
     />

     <label htmlFor="message" className=" mt-10 block  mb-2 text-lg font-medium text-gray-200 mx-auto max-w-2xl ">
      Description
     </label>
     <textarea
      id="message"
      rows="6"
      className="block p-2.5 w-full mx-auto max-w-2xl text-sm rounded-lg border  focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-black "
      placeholder="Write the description for the proposal"
      value={Description}
      onChange={handleDescription}
      required={true}
     ></textarea>
     <div className="mx-auto max-w-2xl text-center">
      <button className="bg-cyan-700 w-40 p-2 rounded-lg mt-10 ext font-bold text-white">CREATE</button>
     </div>
    </form>
    <p className="text-white">{Data}</p>
   </div>
  </>
 );
};
