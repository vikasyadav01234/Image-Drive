import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { toast,ToastContainer } from 'react-toastify';
import { loginUser } from '../context/authService';

const Login = () => {
    const [userData, setUserData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange =(e)=>{
        setUserData({
            ...userData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await loginUser(userData);
            toast.success("Login Successful");
            navigate("/folders")
        }
        catch(err){
            console.log(err);
            toast.error("Login Failed");
        }
    }

  return (
    <div>
        <div className="flex flex-col border rounded-md items-center justify-center h-screen bg-gray-800">
            <div className='flex flex-row items-center justify-center gap-2 mb-4 text-3xl'>
                <Link to="/" className="text-blue-400 hover:underline mt-4 block text-center"><IoHomeOutline/> </Link>
            </div>
            <h1 className="text-white text-3xl font-bold mb-4">Login</h1>
            <form className="bg-black p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="username">Email
                </label>
                <input className="w-full text-white px-3 py-2 border rounded bg-black" type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>  
                </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="password">Password
                </label>
                <input className="w-full px-3 py-2 text-white border rounded bg-black" type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200" type='submit'>Login</button>
            <div className='flex flex-row items-center justify-center gap-2 '>
                <Link to="/signup" className="text-blue-400 hover:underline mt-4 block text-center">Don't have an account? Sign Up</Link><span className='text-blue-400 mt-5'><FaArrowRight/></span>
            </div>
            </form>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default Login
