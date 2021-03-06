import logo from "./logo.svg";
import "./App.css";

import React from "react";

import Home from "./pages/Home";
import Createpage from "./pages/Createpage";
import Treasurypage from "./pages/Treasurypage";
import Aboutpage from "./pages/Aboutpage";
import Detailspage from "./pages/Detailspage";
import { Route, Routes } from "react-router-dom";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
 const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.ropsten, chain.rinkeby],
  [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
 );

 const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
 });

 const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
 });

 return (
  <WagmiConfig client={wagmiClient}>
   <RainbowKitProvider chains={chains}>
    <div>
     <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Create" element={<Createpage />} />
      <Route path="/Treasury" element={<Treasurypage />} />
      <Route path="/About" element={<Aboutpage />} />
      <Route path="/Details" element={<Detailspage />} />
     </Routes>
    </div>
   </RainbowKitProvider>
  </WagmiConfig>
 );
}
