import React, { useState } from 'react';
import axios from 'axios';
import { HelpSquareIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {
    // 1. State for user inputs
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 2. React Query Mutation to handle the API call to Flask
    const loginMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await axios.post("http://127.0.0.1:5000/LoginFarmer", payload);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.user) {
                // Store user details in session/local storage for the chatbot to use
                localStorage.setItem("farmer", JSON.stringify(data.user[0]));
                toast.success("Login successful.")
                navigate("/user/dashboard"); // Move to the crop advisor screen

                localStorage.setItem("farmer_id", data.user.id)
                localStorage.setItem("farmer_name", data.user.name)
                localStorage.setItem("farmer_phone", data.user.phone)
                localStorage.setItem("farmer_role", data.user.role)
            } else {
                toast.error("Incorrect Phone or Password. Please try again.");
            }
        },
        onError: (error) => {
            console.error("Login Error:", error);
            toast.error("Could not connect to the server");
        }
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!phone || !password) {
            toast.error("Please enter both mobile number and password.");
            return;
        }
        // Trigger the backend call
        loginMutation.mutate({ phone: phone, Password: password });
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white'>
            {/* Left Side: Login Form */}
            <div className='w-full flex flex-col items-center justify-center p-8'>
                <div className='max-w-md w-full'>
                    {/* Brand Logo Section */}
                    <div className='flex flex-col items-center justify-center mb-8'>
                        <div className='relative h-12 w-12'>
                            <div className='absolute -top-4 left-4 bg-[#97cd62] rounded-br-2xl rounded-tl-2xl size-10'></div>
                            <div className='relative top-0 left-0 bg-[#346a36] rounded-br-2xl rounded-tl-2xl size-10'></div>
                            <div className='absolute -top-2 left-2 bg-[#74c7479c] rounded-br-2xl rounded-tl-2xl size-10'></div>
                        </div>
                        <p className='text-3xl mt-6'>
                            <span className='font-extrabold text-[#274721]'>KRISHI</span>
                            <span className='text-[#588349] font-semibold'>MITRA</span>
                        </p>
                    </div>

                    <div className='text-[#274721]'>
                        <p className='mb-8 text-center text-gray-600'>
                            Welcome to the Krishi Mitra portal. Sign in to access your crop recommendations.
                        </p>

                        <form onSubmit={handleFormSubmit} className='space-y-4'>
                            <input 
                                type="number" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className='p-3 text-sm focus:outline-none border border-gray-300 bg-[#f6fbee] rounded-lg w-full placeholder:text-gray-400 text-green-700' 
                                placeholder='Mobile Number *' 
                                required
                            />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-3 text-sm focus:outline-none border border-gray-300 bg-[#f6fbee] rounded-lg w-full placeholder:text-gray-400 text-green-700' 
                                placeholder='Password *' 
                                required
                            />
                            
                            <button 
                                type="submit"
                                disabled={loginMutation.isPending}
                                className={`w-full p-3 rounded-lg font-bold transition-all ${
                                    loginMutation.isPending ? 'bg-gray-400' : 'bg-[#a2cd34] hover:bg-[#8eb52d] text-[#274721]'
                                }`}
                            >
                                {loginMutation.isPending ? 'Checking Credentials...' : 'Sign In'}
                            </button>

                            <div className="py-3 flex items-center justify-between text-sm text-gray-500">
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className='accent-[#346a36]'/> Remember Me 
                                </label>
                                <div className='flex items-center gap-2 cursor-pointer hover:text-[#346a36]'>
                                    Forgot password <HugeiconsIcon icon={HelpSquareIcon} size={16}/> 
                                </div>
                            </div>
                        </form>

                        <div className='my-8 border-b border-gray-200 relative'>
                            <p className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-xs text-gray-400 uppercase tracking-wider">
                                Single Sign On Coming Soon
                            </p>
                        </div>

                        <p className='text-xs text-center text-gray-400 mt-12'>
                            Copyright @2026 | KRISHI MITRA
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Section */}
            <div className='hidden lg:block p-4'>
                <div className="bg-[url('/assets/field_image.jpeg')] bg-cover bg-center w-full h-full rounded-3xl relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/60 flex items-end p-12">
                        <div className='max-w-md'>
                            <p className="text-5xl text-white font-bold leading-tight">
                                Modern farming to gain maximum produce!
                            </p>
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 h-20 w-48 bg-white/10 backdrop-blur-md rounded-br-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
