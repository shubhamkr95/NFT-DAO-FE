import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { governanceContract, nftTokenAddress } from "../utils/Connectors";
import { Loader } from "./Loader";

const Card = (prop) => {
 const [Stage, setStage] = useState([]);
 const [Loading, setLoading] = useState(true);
 const [Uri, setUri] = useState([]);
 const { data } = prop;

 useEffect(() => {
  async function main(propId) {
   const ids = await governanceContract.state(propId.id.toString());
   setStage(ids);
   setLoading(false);

   const url = `https://deep-index.moralis.io/api/v2/${data.address}/nft/${nftTokenAddress}?chain=rinkeby&format=decimal`;

   axios(url, {
    method: "GET",
    headers: {
     "Content-Type": "application/json;charset=UTF-8",
     "x-api-key": process.env.REACT_APP_API_KEY,
    },
   })
    .then((res) => {
     setUri(res.data.result[0].token_uri);
    })
    .catch((err) => {
     console.log(err);
    });
  }

  main(data);
 }, [data]);

 if (Loading) {
  return <Loader />;
 } else {
  return (
   <div key={data.objId}>
    <a
     href={`/views/${data.objId}`}
     className="block p-4 md:p-7 m-2 mx-5 md:m-3 max-w-2xl  rounded-lg border shadow-md hover:bg-gray-700 h-60 md:52"
     style={{ borderColor: "#2d2d2d" }}
    >
     <div className="mb-3 flex flex-row justify-between">
      <div className="flex flex-row">
       <img src={Uri} className=" h-6 w-6 rounded-full" alt="" />
       <p className=" font-medium text-gray-400 ml-2">{`${data.address.slice(0, 5)}...${data.address.slice(
        data.address.length - 4
       )}`}</p>
      </div>
      {Stage === 1 ? (
       <button className="bg-green-500 text-white font-bold  px-3 rounded-full">Active</button>
      ) : Stage === 7 ? (
       <button className="bg-violet-500 text-white font-bold  px-3 rounded-full">Closed</button>
      ) : Stage === 3 ? (
       <button className="bg-red-500  text-white font-bold  px-3 rounded-full">Rejected</button>
      ) : (
       <button className="bg-yellow-500  text-white font-bold  px-3 rounded-full">Pending</button>
      )}
     </div>
     <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white group-hover:text-gray-400">{`${data.desc.slice(
      0,
      32
     )}`}</h5>
     <p className="font-normal text-gray-200 mt-1 md:mt-4">Proposal ID - {`${data.id.slice(0, 30)}...`}</p>
     <p className="font-normal text-xs md:text-xl text-gray-400 mt-1 md:mt-3">{`${data.desc.slice(0, 120)}`}</p>
    </a>
   </div>
  );
 }
};

export default Card;
