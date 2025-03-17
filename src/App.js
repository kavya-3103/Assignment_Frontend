import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Addition from "./Components/Addition";
import Fibonacci from "./Components/Fibonacci";
import Prime from "./Components/Prime";
import Power from "./Components/Power";
import Factorial from "./Components/Factorial";


import "./Components/style.css"; // Global styles
import OperationList from "./Components/OperationList";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Hi! You are here to do some math operations.</h1>
        <nav>
          <Link to="/addition" className="nav-button">Addition</Link>
          <Link to="/factorial" className="nav-button">Factorial</Link>
          <Link to="/fibonacci" className="nav-button">Fibonacci</Link>
          <Link to="/prime" className="nav-button">Prime Number</Link>
          <Link to="/power" className="nav-button">Power Calculation</Link>
          <Link to="/operations" className="nav-button">Operation List</Link>
        </nav>

        <Routes>
          <Route path="/addition" element={<Addition />} />
          <Route path="/factorial" element={<Factorial />} />
          <Route path="/fibonacci" element={<Fibonacci />} />
          <Route path="/prime" element={<Prime />} />
          <Route path="/power" element={<Power />} />
          <Route path="/operations" element={<OperationList />} />
        </Routes>
      </div>
    </Router>
  );
}




export default App;
