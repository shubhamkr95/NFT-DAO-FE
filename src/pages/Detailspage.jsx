import React from "react";
import Details from "../components/Details";
import { Navbar } from "../components/Navbar";
import Vote from "../components/Vote";
import Sidetabs from "../components/Sidetabs";
import { useParams } from "react-router-dom";

const Detailspage = () => {
 const { id } = useParams();
 return (
  <div>
   <Navbar />
   <div className="flex flex-col md:flex-row mx-auto justify-center">
    <div>
     <Details ID={id} />
     <Vote ID={id} />
    </div>
    <div>
     <Sidetabs />
    </div>
   </div>
  </div>
 );
};

export default Detailspage;
