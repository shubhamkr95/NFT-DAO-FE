import React from "react";

const Vote = () => {
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
       className="text-white ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border"
       style={{ borderColor: "#2d2d2d" }}
      >
       Vote for the proposal
      </button>
      <button
       className="text-white ml-5 mt-5 mx-auto font-bold w-11/12  py-2 rounded-full border"
       style={{ borderColor: "#2d2d2d" }}
      >
       Vote against the proposal
      </button>
      <button
       className="text-white ml-5 mt-5 mb-5 bg-blue-600 w-11/12  mx-auto font-bold  py-2 rounded-full border"
       style={{ borderColor: "#2d2d2d" }}
      >
       Abstain your vote
      </button>
     </li>
    </ul>
   </div>
  </div>
 );
};

export default Vote;
