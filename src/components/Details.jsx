import React from "react";
import { governanceContract } from "../utils/Connectors";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

const Details = (props) => {
 const [Description, setDescription] = useState("");
 const [ProposalID, setProposalID] = useState([]);
 const [QuorumPercentage, setQuorumPercentage] = useState(0);
 const [ProposalThreshold, setProposalThreshold] = useState(0);
 const [Stage, setStage] = useState("");
 const [Loading, setLoading] = useState(true);
 const [Address, setAddress] = useState("");

 const { ID } = props;

 useEffect(() => {
  fetch(`http://127.0.0.1:5000/api/views/${ID}`)
   .then((res) => res.json())
   .then((data) => {
    setAddress(data.proposer_address);
    setProposalID(data.proposal_id);
    setDescription(data.proposal_description);
    receipt(data.proposal_id);
   })
   .catch((error) => console.log(`Error: ${error}`));
  setLoading(false);
 }, []);

 const receipt = async (ID) => {
  const id = ID.toString();
  const state = await governanceContract.state(id);
  setStage(state);

  const quorum = await governanceContract.quorumNumerator();
  setQuorumPercentage(quorum.toString());
  const threshold = await governanceContract.proposalThreshold();
  setProposalThreshold(threshold.toString());
 };

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
      ) : Stage === 3 || Stage === 6 ? (
       <button className="bg-red-500 hover:bg-blue-700 text-white font-bold  px-1 rounded-full">Rejected</button>
      ) : (
       <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold  px-1 rounded-full">Pending</button>
      )}
      <p className=" font-extrabold text-gray-50 ml-2">{Address}</p>
     </div>
     <div>
      <p className=" font-medium text-xl text-gray-400 mt-5">Proposer Address: {Address}</p>
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
