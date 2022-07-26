import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { governanceContract, provider } from "../utils/Connectors";
import { Loader } from "./Loader";
import Axios from "axios";

const Card = () => {
 const [Description, setDescription] = useState("");
 const [Proposer, setProposer] = useState("");
 const [ProposalID, setProposalID] = useState("");
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
   let stage = await governanceContract.state(ID);

   setStage(stage);
   setProposer(`${data[1].slice(0, 10)}......${data[1].slice(data[1].length - 10)}`);
   setDescription(data[8]);
   setProposalID(`${ID.slice(0, 10)}......${ID.slice(ID.length - 10)}`);

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
    <a
     href="/Details"
     className="block p-6 m-2 max-w-2xl    rounded-lg border shadow-md hover:bg-gray-700"
     style={{ borderColor: "#2d2d2d" }}
    >
     <div className="mb-3 flex flex-row justify-between">
      <div className="flex flex-row">
       <img src="https://mdbootstrap.com/img/new/standard/city/041.jpg" className=" h-6 w-6 rounded-full" alt="" />
       <p className=" font-medium text-gray-400 ml-2">{Proposer}</p>
      </div>
      {Stage === 1 ? (
       <button className="bg-green-500 text-white font-bold  px-3 rounded-full">Active</button>
      ) : Stage === 7 ? (
       <button className="bg-violet-500 text-white font-bold  px-3 rounded-full">Closed</button>
      ) : Stage === 3 ? (
       <button className="bg-red-500 hover:bg-blue-700 text-white font-bold  px-3 rounded-full">Defeated</button>
      ) : (
       <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold  px-3 rounded-full">Pending</button>
      )}
     </div>
     <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white group-hover:text-gray-400">{`${Description.slice(
      0,
      20
     )}`}</h5>
     <p className="font-normal text-gray-400">Proposal ID - {ProposalID}</p>
     <p className="font-normal text-gray-400">7 days left</p>
    </a>
   </div>
  );
 }
};

export default Card;
