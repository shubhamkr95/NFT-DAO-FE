import React from "react";
import About from "../components/About";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

const Aboutpage = () => {
 return (
  <div>
   <Navbar />
   <div className="flex flex-col md:flex-row mx-auto justify-center">
    <div>
     <Sidebar />
    </div>
    <div className="mx-5 md:mx-0">
     <About />
    </div>
   </div>
  </div>
 );
};

export default Aboutpage;
