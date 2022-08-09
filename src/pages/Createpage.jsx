import React, { useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Create } from "../components/Create.jsx";
import { nftContract, provider } from "../utils/Connectors.jsx";

const Createpage = () => {
 const [VotingAddress, setVotingAddress] = useState("");
 const [VotesThreshold, setVotesThreshold] = useState(-1);

 React.useEffect(() => {
  if (window.ethereum) {
   window.ethereum.on("accountsChanged", () => {
    window.location.reload();
   });
  }

  const main = async () => {
   const addressList = await provider.listAccounts();
   setVotingAddress(addressList[0]);

   const getVotes = await nftContract.balanceOf(VotingAddress);
   setVotesThreshold(getVotes.toNumber());
  };
  main().catch(console.error);
 });

 return (
  <div>
   <Navbar />
   <div className="mx-5 md:mx-0">
    <Create data={VotesThreshold} />
   </div>
  </div>
 );
};

export default Createpage;
