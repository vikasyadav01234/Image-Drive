import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { toast,ToastContainer } from 'react-toastify';
import { signupUser } from '../context/authService';


const Signup = () => {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const  handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const data = await signupUser(formData);

            toast.success("Signup Successful");
            navigate("/login");
        }catch(err){
            toast.error("Signup Failed");
            console.error(err);
        }
    }
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
            <div className='flex flex-row items-center justify-center gap-2 mb-4 text-3xl'>
                <Link to="/" className="text-blue-400 hover:underline mt-4 block text-center"><IoHomeOutline/> </Link>
            </div>
            <h1 className="text-white text-3xl font-bold mb-4">Sign Up</h1>
            <form className="bg-black p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="username">Username</label>
                <input className="w-full px-3 text-white py-2 border rounded bg-black" type="text" name="username" placeholder="Enter your username" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 text-white border rounded bg-black" type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="password">Password</label>
                <input className="w-full px-3 py-2 text-white border rounded bg-black" type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200" 
            type='submit'>Sign Up</button>
            <div className='flex flex-row items-center justify-center gap-2 '>
                <Link to="/login" className="text-blue-400 hover:underline mt-4 block text-center">Already have an account? Login</Link><span className='text-blue-400 mt-5'><FaArrowRight/></span>
            </div>
            </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default Signup
