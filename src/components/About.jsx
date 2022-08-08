import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { nftTokenAddress } from "../utils/Connectors";
import "../assets/about.css";

const About = () => {
 const [Data, setData] = useState("");
 const [Loading, setLoading] = useState(true);
 const [Authors, setAuthors] = useState([]);

 const fetchNft = async () => {
  const url = `https://deep-index.moralis.io/api/v2/0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B/nft/${nftTokenAddress}?chain=rinkeby&format=decimal`;

  axios(url, {
   method: "GET",
   headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "x-api-key": process.env.REACT_APP_API_KEY,
   },
  })
   .then((res) => {
    setData(res.data.result);
    setLoading(false);
   })
   .catch((err) => {
    console.log(err);
   });
 };

 const getAuthors = () => {
  const url = `https://deep-index.moralis.io/api/v2/nft/0xCB48a311045B8ccBBEaBBee0F117d008F43fB6c9/owners?chain=rinkeby&format=decimal&limit=8
`;

  axios(url, {
   method: "GET",
   headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "x-api-key": process.env.REACT_APP_API_KEY,
   },
  })
   .then((res) => setAuthors(res.data.result))
   .catch((err) => {
    console.log(err);
   });
 };

 useEffect(() => {
  fetchNft();
  getAuthors();
 }, []);

 if (Loading) {
  return (
   <main style={{ padding: "1rem 0" }}>
    <h2 className="text-white ml-10">Loading...</h2>
   </main>
  );
 }
 return (
  <div>
   <>
    <div className="mx-auto mt-5 max-w-xl text-xl text-gray-50">
     <h1>About</h1>
    </div>
    <div
     className="mx-auto mt-2 block p-6 m-2 max-w-xl rounded-lg border shadow-md "
     style={{ borderColor: "#2d2d2d" }}
     id="about"
    >
     <h1 className=" text-gray-50 text-lg font-semibold">Network</h1>
     <p className="font-normal text-gray-400">Rinkeby Testnet</p>

     <h1 className=" text-gray-50 text-lg font-semibold mt-4">Proposal Validation</h1>
     <p className="font-normal text-gray-400 ">ERC 721 votes</p>

     <h1 className=" text-gray-50 text-lg font-semibold mt-4">Voting Strategy</h1>
     <p className="font-normal text-gray-400 ">Single chain</p>
    </div>
    <div>
     <ul
      className="mx-auto max-w-xl mt-5 text-lg font-medium   rounded-lg border border-gray-600 text-white"
      style={{ borderColor: "#2d2d2d" }}
     >
      <li
       className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
       style={{ borderColor: "#2d2d2d" }}
      >
       Admins
      </li>
      <li
       className="flex flex-row py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"
       style={{ borderColor: "#2d2d2d" }}
      >
       <img src={Data[0].token_uri.slice(34)} className=" h-8 w-8 rounded-full" alt="" />{" "}
       <a
        href="https://rinkeby.etherscan.io/address/0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B"
        className="mt-3 ml-3 text-sm hover:text-cyan-200"
       >
        {Data[0].owner_of.slice(0, 35)}
       </a>
      </li>
     </ul>
    </div>
    <div>
     <ul
      className="mx-auto max-w-xl mt-5 mb-5 text-lg font-medium   rounded-lg border   border-gray-600 text-white"
      style={{ borderColor: "#2d2d2d" }}
     >
      <li className="py-3 px-4 w-full rounded-t-lg border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       Authors
      </li>
      {Authors.map((item, index) => {
       return (
        <li
         className="flex flex-row py-3 px-4 w-full border-b border-gray-600"
         style={{ borderColor: "#2d2d2d" }}
         key={index}
        >
         <img src={item.token_uri} className=" h-8 w-8 rounded-full" alt="" />
         <a
          href={`https://rinkeby.etherscan.io/address/${item.owner_of}`}
          className="text-sm mt-3 ml-3 hover:text-cyan-200"
         >
          {item.owner_of.slice(0, 35)}
         </a>
        </li>
       );
      })}
     </ul>
    </div>
   </>
  </div>
 );
};

export default About;
