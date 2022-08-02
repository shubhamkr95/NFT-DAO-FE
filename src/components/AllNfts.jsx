import React, { useState, useEffect } from "react";
import { provider } from "../utils/Connectors";
import { nftTokenAddress } from "../utils/Connectors";

const AllNfts = () => {
 const [Loading, setLoading] = useState(true);
 const [Data, setData] = useState("");

 const fetchNft = async () => {
  try {
   const accounts = await provider.send("eth_requestAccounts", []);
   const address = accounts[0];
   const url = `https://deep-index.moralis.io/api/v2/${address}/nft/${nftTokenAddress}?chain=rinkeby&format=decimal`;

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
   <div className="flex justify-center">
    <h1 className=" m-5 text-white text-2xl">NFT's</h1>
   </div>
   <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto m-10">
    {Data.result.length !== 0 ? (
     <div className="flex flex-row mt-4  ">
      <img src={Data.result[0].token_uri} className=" h-60 w-96 rounded-lg" alt="" />
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

export default AllNfts;
