import './App.css';
import React, { useState } from 'react';

// 라우팅 관련 import
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// 로그인 관련 import
import LoginMain from './components/LoginMain';
import { Account } from "./components/Account";

// Planner 관련 import
import Planner from './components/Planner';





function App() {
  
  
 
 
  return (
    <Account>
      <BrowserRouter>
    
      <Routes>
          <Route path="/" element={<LoginMain />}/>
          <Route path="/planner" element= {<Planner/>}/>  
      </Routes>
      </BrowserRouter>
    </Account>
   
  );
}

export default App;
