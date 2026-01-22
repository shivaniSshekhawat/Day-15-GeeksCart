import React from "react";
import Home from "./Screen/Home";
import Course from "./Screen/Course";
import Cart from "./Screen/Cart";
import Wishlist from "./Screen/Wishlist";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
      <footer className="bg-[#fcfdff] border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
            &copy; 2026 GeeksCart &bull; Educational Learning Platform
          </p>
          <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">
            This project is strictly for learning and portfolio purposes only
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;