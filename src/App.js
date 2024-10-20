import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Data from "./pages/data";
import Artikel from "./pages/articel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data" element={<Data />} />
        <Route path="/artikel" element={<Artikel />} />
      </Routes>
    </Router>
  );
}

export default App;
