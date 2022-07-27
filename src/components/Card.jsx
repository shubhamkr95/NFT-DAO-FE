import React from "react";
import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { governanceContract, provider } from "../utils/Connectors";
import { Loader } from "./Loader";
import Axios from "axios";

const Card = () => {
 const [Stage, setStage] = useState("");
 const [Loading, setLoading] = useState(true);
 const [Data, setData] = useState([]);

 useEffect(() => {
  hash();
 }, []);

 Data.map(async (item) => {
  const state = await governanceContract.state(item.id.toString());
  setStage(state);
 });

 const hash = async () => {
  Axios.get("http://127.0.0.1:5000/api/proposal_hash")
   .then((res) => {
    setData(res.data);
   })
   .catch((error) => console.log(`Error: ${error}`));

  setLoading(false);
  console.log(Stage);
 };

 if (Loading) {
  return <Loader />;
 } else {
  return Data.map((item) => {
   return (
    <div key={item.objId}>
     <a
      href="/Details"
      className="block p-7 m-3 max-w-2xl    rounded-lg border shadow-md hover:bg-gray-700"
      style={{ borderColor: "#2d2d2d" }}
     >
      <div className="mb-3 flex flex-row justify-between">
       <div className="flex flex-row">
        <img src="https://mdbootstrap.com/img/new/standard/city/041.jpg" className=" h-6 w-6 rounded-full" alt="" />
        <p className=" font-medium text-gray-400 ml-2">{item.address}</p>
       </div>
       <div className="ml-2">
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
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white group-hover:text-gray-400">{`${item.desc.slice(
       0,
       20
      )}`}</h5>
      <p className="font-normal text-gray-400">Proposal ID - {`${item.id.slice(0, 30)}...`}</p>
      <p className="font-normal text-gray-400">7 days left</p>
     </a>
    </div>
   );
  });
 }
};

export default Card;
