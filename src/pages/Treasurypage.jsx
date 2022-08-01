import React from "react";
import Treasury from "../components/Treasury";
import { Navbar } from "../components/Navbar";
import Nft from "../components/Nft.jsx";
import { Sidebar } from "../components/Sidebar";

const Treasurypage = () => {
 return (
  <div>
   <Navbar />
   <div className="flex flex-col md:flex-row justify-center">
    <div>
     <Sidebar />
    </div>

    <div className="flex flex-col p-4">
     <div>
      <Nft />
     </div>
     <div className="mt-5">
      <Treasury />
     </div>
    </div>
   </div>
  </div>
 );
};

export default Treasurypage;
