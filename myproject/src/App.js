import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbars from "./Components/Navbars/Navbars";
import Home from "./Components/Home/Home";
import "./App.css";
import Register from "./Components/Register/Register";
import Adddata from "./Components/Adddata/Adddata";
import Showdata from "./Components/ShowData/Showdata";
import Update from "./Components/Update/Update";
function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Navbars />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Adddata" element={<Adddata />} />
            <Route path="/Showdata" element={<Showdata />} />
            <Route path="/Update/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
