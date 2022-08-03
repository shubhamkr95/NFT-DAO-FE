import React, { useState } from "react";
import Treasury from "../components/Treasury";
import { Navbar } from "../components/Navbar";
import Nft from "../components/Nft.jsx";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { url } from "../utils/Connectors";

const Treasurypage = () => {
 const [Data, setData] = useState([]);

 const loadData = async () => {
  try {
   axios.get(`${url}transactions`).then((res) => setData(res.data));
  } catch (error) {
   console.error(error.message);
  }
 };

 React.useEffect(() => {
  loadData();
 }, []);

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
      {Data.map((item, index) => {})}
      <Treasury />
     </div>
    </div>
   </div>
  </div>
 );
};

export default Treasurypage;
