import React from 'react'
import ListOfData from './Components/listOfData';
import Add from "./Components/add"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <Routes>  
          <Route path='/' Component={ListOfData}/>
          <Route path='/add' Component={Add}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
