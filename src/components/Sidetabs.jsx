import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { governanceContract, provider } from "../utils/Connectors";
import Axios from "axios";

const Sidetabs = () => {
 const [ProposalSnapshot, setProposalSnapshot] = useState(0);
 const [StartBlock, setStartBlock] = useState(0);
 const [EndBlock, setEndBlock] = useState(0);
 const [ProposalVotes, setProposalVotes] = useState("");

 const hash = async () => {
  Axios.get("http://127.0.0.1:5000/api/proposalHash")
   .then((res) => {
    const txHash = res.data[0].proposal_hash.toString();
    receipt(txHash);
   })
   .catch((error) => console.log(`Error: ${error}`));
 };

 async function receipt(hash) {
  try {
   const events = await provider.getTransactionReceipt(hash);
   const logs = events.logs[0].data;

   const data = ethers.utils.defaultAbiCoder.decode(
    ["uint256", "address", "address[]", "uint256[]", "string[]", "bytes[]", "uint256", "uint256", "string"],
    logs
   );

   const ID = data[0].toString();
   const snapshot = await governanceContract.proposalSnapshot(ID);
   setProposalSnapshot(snapshot.toString());

   setStartBlock(data[6].toString());
   setEndBlock(data[7].toString());

   const proposalVotes = await governanceContract.proposalVotes(ID);
   setProposalVotes(proposalVotes.toString());
  } catch (error) {
   console.error(error);
  }
 }

 useEffect(() => {
  hash();
 }, []);

 return (
  <div>
   <div>
    <ul
     className="mx-auto w-72 mt-5 font-normal  rounded-lg border border-gray-600 text-white"
     style={{ borderColor: "#2d2d2d" }}
    >
     <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
      information
     </li>

     <li
      className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
     >
      <div style={{ color: "#8b949e" }}>Voting system</div>
      <div className="text-white">Single NFT voting</div>
     </li>
     <li
      className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
     >
      <div style={{ color: "#8b949e" }}>Start Block</div>
      <div className="text-white">{StartBlock}</div>
     </li>
     <li
      className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
     >
      <div style={{ color: "#8b949e" }}>End Block</div>
      <div className="text-white">{EndBlock}</div>
     </li>
     <li
      className="flex flex-row justify-between py-2 px-4 w-full border-b border-gray-600"
      style={{ borderColor: "#2d2d2d" }}
     >
      <div style={{ color: "#8b949e" }}>Snapshot</div>
      <div className="text-white">{ProposalSnapshot}</div>
     </li>
    </ul>
   </div>
   <div>
    <ul
     className="mx-auto w-72 mt-5 font-normal  rounded-lg border border-gray-600 text-white"
     style={{ borderColor: "#2d2d2d" }}
    >
     <li className="py-2 px-4 w-full rounded-t-lg border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
      Votes
     </li>
     <li className=" py-2 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
      <div>Against Votes - {ProposalVotes[0]}</div>
     </li>
     <li className=" py-2 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
      <div>For Votes - {ProposalVotes[2]}</div>
     </li>
     <li className=" py-2 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
      <div>Abstain - {ProposalVotes[4]}</div>
     </li>
    </ul>
   </div>
  </div>
 );
};

export default Sidetabs;
