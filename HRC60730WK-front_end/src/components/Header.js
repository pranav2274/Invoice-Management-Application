import React from "react";
import { Component } from "react";

const Header= () => {
   return (
       <div className="header">
       <img src= "./Images/Groupabc.png" alt="ABC Product" style={{width:"20%", height:'51px'}}/>  
       <h1 style={{marginBlockStart: "75px",marginBlockEnd:"-18px",marginLeft: '-39rem'}}>
                Invoice List</h1>
       <img src="./Images/logo.png" alt='Highradius'  style={{marginRight:"40%", height:'50%', width:'16%'}}/>
       </div> 
       )
}

export default Header

