import { ethers } from "ethers";
import React from "react";
import { governanceContract, provider } from "../utils/Connectors";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import Axios from "axios";

const Details = () => {
 const [Description, setDescription] = useState("");
 const [Proposer, setProposer] = useState("");
 const [ProposalID, setProposalID] = useState("");
 const [QuorumPercentage, setQuorumPercentage] = useState(0);
 const [ProposalThreshold, setProposalThreshold] = useState(0);
 const [Stage, setStage] = useState("");
 const [Loading, setLoading] = useState(true);

 const hash = async () => {
  Axios.get("http://127.0.0.1:5000/api/proposalHash")
   .then((res) => {
    const txHash = res.data[0].proposal_hash.toString();
    receipt(txHash);
   })
   .catch((error) => console.log(`Error: ${error}`));
 };

 const receipt = async (hash) => {
  try {
   const events = await provider.getTransactionReceipt(hash);
   const logs = events.logs[0].data;

   const data = ethers.utils.defaultAbiCoder.decode(
    ["uint256", "address", "address[]", "uint256[]", "string[]", "bytes[]", "uint256", "uint256", "string"],
    logs
   );

   let ID = data[0].toString();

   setProposer(data[1]);
   setDescription(data[8]);
   setProposalID(ID);

   let stage = await governanceContract.state(ID);
   setStage(stage);

   const quorum = await governanceContract.quorumNumerator();
   setQuorumPercentage(quorum.toString());

   const threshold = await governanceContract.proposalThreshold();
   setProposalThreshold(threshold.toString());

   setLoading(false);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  hash();
 }, []);

 if (Loading) {
  return <Loader />;
 } else {
  return (
   <div>
    <div className="mx-auto max-w-2xl">
     <div className=" mt-5  text-3xl font-bold text-gray-50">
      <h1>{`${Description.slice(0, 20)}`}</h1>
     </div>
     <div className="mt-5 flex flex-row">
      {Stage === 1 ? (
       <button className="bg-green-500 text-white font-bold  px-1 rounded-full">Active</button>
      ) : Stage === 7 ? (
       <button className="bg-violet-500 text-white font-bold  px-1 rounded-full">Closed</button>
      ) : Stage === 3 ? (
       <button className="bg-red-500 hover:bg-blue-700 text-white font-bold  px-1 rounded-full">Rejected</button>
      ) : (
       <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold  px-1 rounded-full">Pending</button>
      )}
      <p className=" font-extrabold text-gray-50 ml-2">{Proposer}</p>
     </div>
     <div>
      <p className=" font-medium text-xl text-gray-400 mt-5">Proposer Address: {Proposer}</p>
      <p className=" font-medium text-xl text-gray-200 mt-5">Quorum Required: {QuorumPercentage} Percentage</p>
      <p className=" font-medium text-xl text-gray-400 mt-5">Proposal Threshold: {ProposalThreshold} GTK</p>
      <p className=" font-medium text-xl text-gray-200 mt-5">
       Proposal ID: <span className="font-small text-sm">{ProposalID}</span>
      </p>
     </div>
     <div className=" mt-5  text-3xl font-bold text-gray-50">
      <h1>DESCRIPTION</h1>
     </div>
     <div>
      <p className=" font-medium text-xl text-gray-400 mt-5">{Description}</p>
     </div>
    </div>
   </div>
  );
 }
};

export default Details;
