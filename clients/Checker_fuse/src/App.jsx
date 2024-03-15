import React from 'react'
import ListOfData from './Components/listOfData';
import Add from "./Components/add"
import Update from './Components/Update';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>  
          <Route path='/' Component={ListOfData}/>
          <Route path='/add' Component={Add}/>
          <Route path='/update/:id' Component={Update}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
