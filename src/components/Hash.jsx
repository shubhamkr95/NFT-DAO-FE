import React from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";

function Hash(prop) {
 const { data } = prop;

 return (
  <div className="mt-5 ml-1 mr-1 text-xs md:text-lg  border h-16 rounded-lg" style={{ borderColor: "#2d2d2d" }}>
   <div className="flex flex-row justify-between mt-4">
    <div className="ml-4  text-white  hover:text-blue-600">
     <a href={`https://rinkeby.etherscan.io/tx/${data.hash}`}>{data.hash.slice(0, 20)}</a>
    </div>
    <div className="flex flex-row mr-4 text-white">
     <BsBoxArrowUpRight className="ml-1 mt-1" />
    </div>
   </div>
  </div>
 );
}

export default Hash;
