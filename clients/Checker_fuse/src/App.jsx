import React from 'react';
import ListOfData from "./Components/listOfData"
import Add from "./Components/add";
import Update from './Components/Update';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>  
          <Route path='/' element={<Login />} />
          <Route path='/listofentities' element={<ListOfData />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
