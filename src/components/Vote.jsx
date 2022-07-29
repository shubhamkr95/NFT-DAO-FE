import React from "react";
import { useState, useEffect } from "react";
import { governanceContract } from "../utils/Connectors";
import { useNavigate } from "react-router-dom";

const Vote = (props) => {
 const navigate = useNavigate();
 const [Stage, setStage] = useState("");
 const [ProposalID, setProposalID] = useState("");

 const { ID } = props;

 useEffect(() => {
  fetch(`http://127.0.0.1:5000/api/views/${ID}`)
   .then((res) => res.json())
   .then((data) => {
    receipt(data.proposal_id.toString());
    setProposalID(data.proposal_id.toString());
   })
   .catch((error) => console.log(`Error: ${error}`));
 }, []);

 const receipt = async (id) => {
  const state = await governanceContract.state(id);
  setStage(state);
 };

 const handleButton = async (e) => {
  try {
   const choice = Number(e.target.id);
   const voteTx = await governanceContract.castVote(ProposalID, choice);
   console.log(voteTx);
   navigate("/");
  } catch (error) {
   console.error(`Error - ${error}`);
  }
 };

 if (Stage !== 1) {
  return (
   <div>
    <p className="text-white mt-10 text-3xl hover:text-green-700">Voting period is over</p>
   </div>
  );
 } else {
  return (
   <div>
    <div>
     <ul
      className="mx-auto max-w-2xl mt-5 text-lg font-medium   rounded-lg border   border-gray-600 text-white"
      style={{ borderColor: "#2d2d2d" }}
     >
      <li className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       Cast Your Vote
      </li>
      <li className=" py-2 px-4 w-full border-b  border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <button
        id="0"
        className="text-white ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border hover:to-blue-800"
        style={{ borderColor: "#2d2d2d" }}
        onClick={handleButton}
       >
        Vote against the proposal
       </button>
       <button
        id="1"
        className="text-white ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border hover:to-blue-800"
        style={{ borderColor: "#2d2d2d" }}
        onClick={handleButton}
       >
        Vote for the proposal
       </button>
       <button
        id="2"
        className="text-white ml-5 mt-5 mb-5  w-11/12  mx-auto font-bold  py-2 rounded-full border hover:to-blue-600"
        style={{ borderColor: "#2d2d2d" }}
        onClick={handleButton}
       >
        Abstain your vote
       </button>
      </li>
     </ul>
    </div>
   </div>
  );
 }
};

export default Vote;
