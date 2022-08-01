import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { provider } from "../utils/Connectors";

const Nft = () => {
 const [Loading, setLoading] = useState(true);
 const [Data, setData] = useState({});

 const fetchNft = async () => {
  try {
   const accounts = await provider.send("eth_requestAccounts", []);
   const address = accounts[0];
   const url = `https://deep-index.moralis.io/api/v2/${address}/nft/0x2fFda8135aE1fc22b84EC6F8d185D8F3dFC9a352?chain=mumbai&format=decimal`;

   fetch(url, {
    method: "GET",
    headers: {
     "Content-Type": "application/json;charset=UTF-8",
     "x-api-key": process.env.REACT_APP_API_KEY,
    },
   })
    .then((res) => res.json())
    .then((json) => {
     setData(json);
     setLoading(false);
    })
    .catch((err) => {
     console.log(err);
    });
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  fetchNft();
 }, [Data]);

 if (Loading) {
  return (
   <div className="text-white mr-10">
    <h1>Loading....</h1>
   </div>
  );
 }
 return (
  <div>
   <div className="md:w-64  sm:w-full   py-4 px-3 mt-1 ml-5 rounded-xl border" style={{ borderColor: "#2d2d2d" }}>
    <div className="flex flex-row justify-between">
     {Data.result.length !== 0 ? (
      <div>
       <h3 className="text-white">NFT ID - {Data.result[0].token_id}</h3>
      </div>
     ) : (
      <div>
       <h3 className="text-white">NFT ID </h3>
      </div>
     )}
     <div className="text-white flex flex-row items-center">
      <a href="/Nft">
       View <BsArrowRightCircle className="ml-2" />
      </a>
     </div>
    </div>
    {Data.result.length !== 0 ? (
     <div className="flex flex-row mt-4  ">
      <img src={Data.result[0].token_uri} className=" h-40 w-60 rounded-lg" alt="" />
     </div>
    ) : (
     <div className="flex flex-row mt-4  ">
      <img src="" className=" h-40 w-60 rounded-lg" alt="" />
     </div>
    )}
   </div>
  </div>
 );
};

export default Nft;
