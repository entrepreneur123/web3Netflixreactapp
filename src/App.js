import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from "./pages/Player";
import "./App.css";
//https://www.youtube.com/watch?v=cPjnjxmLS5k&t=900s
//https://github.com/MoralisWeb3/youtube-tutorials/blob/main/Netflix-Decentralized/src/helpers/library.js

const App = () => {
  return (
    <div className="appDiv">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<player />} />
      </Routes>
    </div>
  );
};

export default App;
