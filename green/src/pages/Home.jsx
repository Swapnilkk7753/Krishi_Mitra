import React from 'react'
import { Link } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon, Location09Icon } from '@hugeicons/core-free-icons'
import { LogoSm, LogoText } from '../components/Logo'

const Home = () => {
    return <div className='p-2'>
        <div className="bg-white rounded-lg p-2 flex items-center justify-between mb-2">
            <div className='flex gap-2 items-center'>
                <div className='flex items-start justify-end'>
                    <LogoSm className={'size-6'}/>
                </div>
                <LogoText />
            </div>
            <div className='flex items-center gap-1'>
                <div className='border border-gray-400 text-sm text-gray-500 px-3 py-1 rounded bg-gray-100/30'>Features</div>
                <div className='border border-gray-400 text-sm text-gray-500 px-3 py-1 rounded bg-gray-100/30'>How it Works?</div>
                <div className='border border-gray-400 text-sm text-gray-500 px-3 py-1 rounded bg-gray-100/30'>AI Assistant</div>
            </div>
            <div className='bg-linear-to-r from-gray-300 to-white rounded-xl flex gap-3 items-center'>
                <Link to={'/login'} className='px-5 py-2 flex font-medium'>Login</Link>
                <Link to={'/register'} className='px-5 py-2 flex text-sm bg-black text-white rounded-lg'>Sign Up</Link>
            </div>
        </div>
        <div className="bg-white rounded-lg p-10 grid grid-cols-4 gap-3">
            <div className="col-span-2 py-10">
                <p className="font-medium text-[3rem] leading-14 mb-5">Smart Farming Solutions for Efficient Growth</p>
                <p className="text-sm text-gray-600 mb-10">Efforlessly monitor, strtigically plan, and continuously optimize your highland farms -- all from anywhere you choose.</p>

                <div className='flex mb-20'>
                    <div className="border border-gray-200 p-1 rounded-lg">
                        <Link to={'/register'} className='px-4 py-2 bg-black text-white flex items-center gap-2 text-sm rounded-lg'>Register for Free <HugeiconsIcon icon={ArrowRight02Icon} size={16}/></Link>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <div className="w-full border border-gray-200 p-3 flex gap-2 rounded-lg mb-3">
                            <div className="size-8 rounded-full bg-green-400"></div>
                            <div>
                                <p>Monitor Field</p>
                                <p className="text-xs text-gray-500">Actively Track Status</p>
                            </div>
                        </div>
                        <div className="w-full border border-gray-200 p-3 flex gap-2 rounded-lg">
                            <div className="size-8 rounded-full bg-green-400"></div>
                            <div>
                                <p>Mordern UI</p>
                                <p className="text-xs text-gray-500">Ease of use</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="w-full border border-gray-200 p-3 flex gap-2 rounded-lg mb-3">
                            <div className="size-8 rounded-full bg-green-400"></div>
                            <div>
                                <p>AI Chatbot</p>
                                <p className="text-xs text-gray-500">Get personalized suggestations</p>
                            </div>
                        </div>
                        <div className="w-full border border-gray-200 p-3 flex gap-2 rounded-lg mb-3">
                            <div className="size-8 rounded-full bg-green-400"></div>
                            <div>
                                <p>Save More</p>
                                <p className="text-xs text-gray-500">Save water/energy with adv. IoT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-2 overflow-hidden p-20'>
                <div className='relative'>
                    <div className="h-40 w-60 border-2 border-dashed border-gray-300 rounded-xl -skew-x-45 skew-y-10 px-2 py-1.25">
                        <div className="bg-gray-100 w-full h-full border-2 border-dashed border-gray-300 rounded-lg"></div>
                    </div>
                    <div className="flex absolute top-10 w-80">
                        <div className='rounded-full p-1 bg-white flex items-center gap-2 border border-gray-200'>
                            <div className='size-5 bg-green-400 rounded-full'></div>
                            <p className='flex items-center gap-3'>Cabbage Field <HugeiconsIcon icon={Location09Icon} size={16}/></p>
                        </div>
                    </div>
                </div>
                <div className='relative ml-58 -mt-35'>
                    <div className="h-40 w-60 border-2 border-dashed border-gray-300 rounded-xl -skew-x-45 skew-y-10 px-2 py-1.25">
                        <div className="bg-[url(/assets/field_image.jpeg)] bg-cover w-full h-full border-2 border-dashed border-gray-300 rounded-lg"></div>
                    </div>
                    <div className="flex absolute top-10 w-80">
                        <div className='rounded-full p-1 backdrop-blur-2xl flex items-center gap-2 border border-gray-200'>
                            <div className='size-5 bg-white rounded-full'></div>
                            <p className='flex items-center gap-3'>Tea Plantation <HugeiconsIcon icon={Location09Icon} size={16}/></p>
                        </div>
                    </div>
                </div>
                <div className='relative mt-8'>
                    <div className="h-40 w-80 border-2 border-dashed border-gray-300 rounded-xl -skew-x-45 skew-y-10 px-2 py-1.25">
                        <div className='w-full h-full border-2 border-dashed border-gray-300 rounded-lg relative'>
                            <div className="bg-[url(/assets/field_image.jpeg)] bg-cover w-full h-full shadow-xl shadow-black/30 rounded-xl absolute -top-2 -left-5"></div>
                        </div>
                    </div>
                    <div className="flex absolute top-10 w-80">
                        <div className='rounded-full p-1 backdrop-blur-xs flex items-center gap-2 border border-gray-200'>
                            <div className='size-5 bg-white rounded-full'></div>
                            <p className='flex items-center gap-3 text-white'>Tea Plantation <HugeiconsIcon icon={Location09Icon} size={16}/></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Home