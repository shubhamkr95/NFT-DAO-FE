import logo from './logo.svg';
import './App.css';

import React from "react";

import Home from './pages/Home';
import Createpage from './pages/Createpage';
import Treasurypage from './pages/Treasurypage';
import Aboutpage from './pages/Aboutpage';
import Detailspage from './pages/Detailspage';
import { Route,Routes } from 'react-router-dom';



export default function App() {
  return (
  
  <div>
    
  <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route  path ="/Create" element={<Createpage/>}/>
    <Route  path="/Treasury" element={<Treasurypage/>}/>
    <Route  path="/About" element={<Aboutpage/>}/>
    <Route path="/Details" element={<Detailspage/>}/>
  </Routes>
    

   
    
     
      
        
      
       
         
         
  </div>
  
  
    
   
  )
}

