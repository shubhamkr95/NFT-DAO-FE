import React, { useState } from "react";
import Details from "../components/Details";
import { Navbar } from "../components/Navbar";
import Vote from "../components/Vote";
import Sidetabs from "../components/Sidetabs";
import { useParams } from "react-router-dom";
import { url } from "../utils/Connectors";
import axios from "axios";

const Detailspage = () => {
 const { id } = useParams();
 const [data, setdata] = useState({});

 React.useEffect(() => {
  loadData();
 }, []);

 const loadData = async () => {
  try {
   axios.get(`${url}views/${id}`).then((res) => setdata(res.data));
  } catch (error) {
   console.error(error.message);
  }
 };

 return (
  <div>
   <Navbar />
   <div className="flex flex-col md:flex-row mx-auto justify-center">
    <div>
     <Details data={data} />
     <Vote data={data} />
    </div>
    <div>
     <Sidetabs data={data} />
    </div>
   </div>
  </div>
 );
};

export default Detailspage;
