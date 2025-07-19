import React from 'react'
import { Link } from "react-router-dom";
import { VscArrowCircleRight } from "react-icons/vsc";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 gap-3">
      <div className="flex flex-row items-center justify-center gap-3">
        <h1 className=" text-5xl font-bold text-white">Welcome to </h1>
      <span className=" text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Image Drive</span>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <button className="flex flex-row items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 gap-2">
          <Link to='/login'>Login</Link><span className="mt-1"><VscArrowCircleRight/></span>
        </button>
        <button className="flex flex-row items-center gap-2 justify-center bg-green-500 text-white px-4 py-2 rounded  hover:bg-blue-600  transition duration-200 ml-4">
          <Link to='/signup'>Sign Up</Link><span className="mt-1"><VscArrowCircleRight/></span>
        </button>
      </div>
    </div>
  );
}

export default Home
