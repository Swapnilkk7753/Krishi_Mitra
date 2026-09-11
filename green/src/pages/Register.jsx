import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HelpSquareIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Register = () => {
    // 1. Setup states to capture form data
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    // 2. Setup the mutation to talk to your Flask backend
    const registerMutation = useMutation({
        mutationFn: async (payload) => {
            // This hits your @app.route("/RegisterFarmer")
            const response = await axios.post("http://127.0.0.1:5000/RegisterFarmer", payload);
            return response.data;
        },
        onSuccess: (data) => {
            // Check if backend returned success
            if (data.status === "success") {
                toast.success("Registration successfull")
                navigate("/login"); 
            } else {
                toast.error(data.message || "Something went wrong!")
                console.log(data);
                
            }
        },
        onError: (error) => {
            console.error("Reg Error:", error);
            toast.error("Something went wrong!")
        }
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (password !== confirmPassword) {
            toast.error("Invalid password")
            return;
        }

        // 3. Send data to Flask (matching your data.get keys)
        registerMutation.mutate({
            name: fullName,
            phone: phone,
            password: password,
            confirmPassword: confirmPassword
        });
    };

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white'>
            {/* Left Side: Form */}
            <div className='w-full flex flex-col items-center justify-center p-8'>
                <div className='max-w-md w-full'>
                    
                    {/* Krishi Mitra Logo */}
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
                            Join us to get expert advice on your crops and soil.
                        </p>

                        <form onSubmit={handleFormSubmit} className='space-y-4'>
                            <input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='p-3 text-sm focus:outline-none border border-gray-300 bg-[#f6fbee] rounded-lg w-full placeholder:text-gray-400 text-green-700' 
                                placeholder='Full Name *' 
                                required 
                            />
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
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='p-3 text-sm focus:outline-none border border-gray-300 bg-[#f6fbee] rounded-lg w-full placeholder:text-gray-400 text-green-700' 
                                placeholder='Confirm Password *' 
                                required 
                            />

                            <button 
                                type="submit" 
                                disabled={registerMutation.isPending}
                                className={`w-full p-3 rounded-lg font-bold transition-all ${
                                    registerMutation.isPending ? 'bg-gray-400' : 'bg-[#a2cd34] hover:bg-[#8eb52d] text-[#274721]'
                                }`}
                            >
                                {registerMutation.isPending ? 'Registering...' : 'Create Account'}
                            </button>
                        </form>

                        <p className='mt-6 text-center text-sm'>
                            Already have an account? <span onClick={() => navigate('/login')} className='text-[#588349] font-bold cursor-pointer underline'>Login here</span>
                        </p>

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
                                Helping farmers grow better together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
