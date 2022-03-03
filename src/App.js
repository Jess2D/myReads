import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
