import Signup from "./Signup";
import Login from "./Login";
import { Account } from "./Account";
import { Link, Routes } from 'react-router-dom';  //'react-router-dom'에서 제공하는 {Link}를 import
import Planner from "./Planner";
import { BrowserRouter, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const LoginMain = () => {

  return (
    
    <Account>
      
      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

        }}

      >

        <Signup />

 
        
        <Login />
        
      </div>
    </Account>
    
  );
};

export default LoginMain;





