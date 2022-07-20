import { ethers } from "ethers";
import React from "react";
import { governanceContract, provider } from "../utils/Connectors";
import { useEffect, useState } from "react";

const Details = () => {
 const [Description, setDescription] = useState("");
 const [Proposer, setProposer] = useState("");
 const [ProposalID, setProposalID] = useState("");
 const [QuorumPercentage, setQuorumPercentage] = useState(0);
 const [ProposalThreshold, setProposalThreshold] = useState(0);

 useEffect(() => {
  async function receipt() {
   const events = await provider.getTransactionReceipt(
    "0xeae0c5becc6e12701670a9144099a81170516829233031fd310ef313a7d183a9"
   );
   const logs = events.logs[0].data;

   const data = ethers.utils.defaultAbiCoder.decode(
    ["uint256", "address", "address[]", "uint256[]", "string[]", "bytes[]", "uint256", "uint256", "string"],
    logs
   );

   let ID = data[0].toString();

   setProposer(data[1]);
   setDescription(data[8]);
   setProposalID(`${ID.slice(0, 10)}......${ID.slice(ID.length - 10)}`);

   const quorum = await governanceContract.quorumNumerator();
   setQuorumPercentage(quorum.toString());

   const threshold = await governanceContract.proposalThreshold();
   setProposalThreshold(threshold.toString());
  }

  receipt();
 }, []);
 return (
  <div>
   <div className="mx-auto max-w-2xl">
    <div className=" mt-5  text-3xl font-bold text-gray-50">
     <h1>{Description}</h1>
    </div>
    <div className="mt-5 flex flex-row">
     <button className="bg-green-500 hover:bg-blue-700 text-white font-bold  px-1 rounded-full">Active</button>
     <p className=" font-extrabold text-gray-50 ml-2">{Proposer}</p>
    </div>
    <div>
     <p className=" font-medium text-xl text-gray-400 mt-5">Proposer Address: {Proposer}</p>
     <p className=" font-medium text-xl text-gray-200 mt-5">Quorum Required: {QuorumPercentage} Percentage</p>
     <p className=" font-medium text-xl text-gray-400 mt-5">Proposal Threshold: {ProposalThreshold} GTK</p>
     <p className=" font-medium text-xl text-gray-200 mt-5">Proposal ID: {ProposalID}</p>
    </div>
    <div className=" mt-5  text-3xl font-bold text-gray-50">
     <h1>DESCRIPTION</h1>
    </div>
    <div>
     <p className=" font-medium text-xl text-gray-400 mt-5">{Description}</p>
    </div>
    <div className=" mt-5  text-3xl font-bold text-gray-50">
     <h1>Members stepping down</h1>
    </div>
    <div>
     <ul className="list-disc list-inside">
      <li className=" font-medium text-xl text-gray-400 mt-5">Kouros (term limit)</li>
      <li className=" font-medium text-xl text-gray-400 mt-5">Chuck</li>
      <li className=" font-medium text-xl text-gray-400 mt-5">Icedcool (term limit)</li>
     </ul>
    </div>
   </div>
  </div>
 );
};

export default Details;
