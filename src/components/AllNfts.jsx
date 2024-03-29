import axios from "axios";
import React, { useState } from "react";
import { nftTokenAddress } from "../utils/Connectors";

const AllNfts = () => {
 const [data, setData] = useState([]);

 const fetchNft = async () => {
  const url = `
https://deep-index.moralis.io/api/v2/nft/${nftTokenAddress}/owners?chain=rinkeby&format=decimal&limit=8`;

  axios(url, {
   method: "GET",
   headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "x-api-key": process.env.REACT_APP_API_KEY,
   },
  })
   .then((res) => setData(res.data.result))
   .catch((err) => {
    console.log(err);
   });
 };

 React.useEffect(() => {
  fetchNft();
 }, []);

 return (
  <div>
   <div className="flex justify-center">
    <h1 className=" m-5 text-white text-2xl">NFT's</h1>
   </div>
   <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto m-10">
    {data.map((item, index) => {
     return (
      <div key={index}>
       <a href={`https://rinkeby.etherscan.io/address/${item.owner_of}`}>
        <img src={item.token_uri} className=" h-60 w-96 rounded-lg text-white" alt={`TokenID - ${item.token_id}`} />
       </a>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default AllNfts;
