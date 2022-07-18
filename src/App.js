import logo from './logo.svg';
import './App.css';

import React from "react";

import Home from './pages/Home';
import Createpage from './pages/Createpage';
import Treasurypage from './pages/Treasurypage';
import Aboutpage from './pages/Aboutpage';
import Detailspage from './pages/Detailspage';
import { BrowserRouter as Router, Route } from 'react-router-dom';



export default function App() {
  return (
  
  <div>
    
   
    <Route exact path="/" component={Home} />
    <Route  path ="/Create" component={Createpage}/>
    <Route   path="/Treasury" component={Treasurypage}/>
    <Route  path="/About" component={Aboutpage}/>
    <Route path="/Details" component={Detailspage}/>
   
    

   
    
     
      
        
      
       
         
         
  </div>
  
  
    
   
  )
}

