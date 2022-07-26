import React from "react";
import Treasury from "../components/Treasury";
import { Navbar } from "../components/Navbar";
import Nft from "../components/Nft.jsx";

const Treasurypage = () => {
 return (
  <div>
   <Navbar />
   <div className="flex flex-col md:flex-row justify-center">
    <div>
     <Nft />
    </div>
    <div className="flex flex-col">
     <Treasury />
    </div>
   </div>
  </div>
 );
};

export default Treasurypage;
