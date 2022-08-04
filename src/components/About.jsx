import React from "react";
import { useState, useEffect } from "react";
import { nftTokenAddress } from "../utils/Connectors";

const About = () => {
 const [Data, setData] = useState("");
 const [Loading, setLoading] = useState(true);

 const fetchNft = async () => {
  const url = `https://deep-index.moralis.io/api/v2/0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B/nft/${nftTokenAddress}?chain=rinkeby&format=decimal`;

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
 };

 useEffect(() => {
  fetchNft();
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
     className="mx-auto mt-2 block p-6 m-2 max-w-xl  rounded-lg border shadow-md "
     style={{ borderColor: "#2d2d2d", width: "700px" }}
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
       <img src={Data.result[0].token_uri.slice(34)} className=" h-8 w-8 rounded-full" alt="" />{" "}
       <a
        href="https://rinkeby.etherscan.io/address/0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B"
        className="mt-3 ml-3 text-sm"
       >
        0xa7f3c0D12481957A6FAc82cC4EC31f0f9f12843B
       </a>
      </li>
     </ul>
    </div>
    <div>
     <ul
      className="mx-auto max-w-xl mt-5 mb-5 text-lg font-medium   rounded-lg border border-gray-200  border-gray-600 text-white"
      style={{ borderColor: "#2d2d2d" }}
     >
      <li className="py-3 px-4 w-full rounded-t-lg border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       Authors
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/041.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       0x47f8...32a1
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/042.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       abvavgjoe.eth
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/043.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       redvan.eth
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/044.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       grendel.eth
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/045.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       frogmonkee.eth
      </li>
      <li className="flex flex-row py-3 px-4 w-full border-b border-gray-600" style={{ borderColor: "#2d2d2d" }}>
       <img src="https://mdbootstrap.com/img/new/standard/city/046.jpg" class=" h-8 w-8 rounded-full" alt="" />{" "}
       icedcool.eth
      </li>
     </ul>
    </div>
   </>
  </div>
 );
};

export default About;
