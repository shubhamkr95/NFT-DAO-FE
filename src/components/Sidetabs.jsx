import React from "react";
import { useEffect, useState } from "react";
import { governanceContract } from "../utils/Connectors";
import { useParams } from "react-router-dom";

const Sidetabs = () => {
 const [ProposalSnapshot, setProposalSnapshot] = useState(0);
 const [StartBlock, setStartBlock] = useState(0);
 const [EndBlock, setEndBlock] = useState(0);
 const [ProposalVotes, setProposalVotes] = useState("");
 const { id } = useParams();

 useEffect(() => {
  hash();
 }, []);

 const hash = async () => {
  fetch(`http://127.0.0.1:5000/api/views/${id}`)
   .then((res) => res.json())
   .then((data) => {
    setStartBlock(data.startBlock);
    setEndBlock(data.endBlock);
    receipt(data.proposal_id.toString());
   })
   .catch((error) => console.log(`Error: ${error}`));
 };

 const receipt = async (ID) => {
  try {
   const snapshot = await governanceContract.proposalSnapshot(ID);
   setProposalSnapshot(snapshot.toString());

   const proposalVotes = await governanceContract.proposalVotes(ID);
   setProposalVotes(proposalVotes.toString());
  } catch (error) {
   console.error(error);
  }
 };

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
   <div className="w-72 h-30 mt-5  rounded-lg border" style={{ borderColor: "#2d2d2d" }}>
    <div className="mt-2 mx-auto ">
     <h1 className="text-center text-white text-xl font-bold">Execute Proposal</h1>
     <div className="flex justify-center">
      <button
       class=" hover:bg-blue-700 text-gray-400 font-bold py-2 px-4 w-48 mb-5 mt-2 align-center rounded-full"
       style={{ backgroundColor: "#40474F" }}
      >
       Execute
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Sidetabs;
