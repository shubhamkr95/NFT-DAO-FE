import React, { useState } from "react";

const AllNfts = () => {
 return (
  <div>
   <div className="flex justify-center">
    <h1 className=" m-5 text-white text-2xl">NFT's</h1>
   </div>
   <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto m-10">
    <div>
     <img src="https://mdbootstrap.com//img/Photos/Square/1.jpg" className="w-48 h-48" alt="" />
    </div>
   </div>
  </div>
 );
};

export default AllNfts;
