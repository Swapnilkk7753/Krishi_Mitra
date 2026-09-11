import React, { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChatBotIcon, FastWindIcon, HumidityIcon, Location01Icon, Plant01Icon, SoilMoistureGlobalIcon, TemperatureIcon, WaterEnergyIcon } from '@hugeicons/core-free-icons'
import { Link, useParams } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const Info = () => {

    const {id} = useParams()
    const [cropData, setCropData] = useState({})

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/CropFieldStatusPost', {
                    params: {
                        field_id: id
                    }
                });
                setCropData(response.data)
            } catch (err) {
                console.error("Error:", err);
                toast.error("Something went wrong!")
            }
        })()
    }, [])

    return (
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className='col-span-1'>
                <div className='h-80 relative rounded-xl overflow-hidden mb-3'>
                    <img className='h-80' src="/assets/field_image.jpeg" alt="camera_one_plant_image" />
                    <div className="absolute top-0 left-0 h-full w-full bg-linear-to-b from-gray-500/70 via-transparent to-gray-500/40 p-4">
                        <p className='text-white font-medium'>Camera 1</p>
                    </div>
                </div>
                <div className='bg-white/60 rounded-xl overflow-hidden p-4'>
                    <p className="text-lg font-medium mb-3">Task</p>
                    <div className='h-1 w-full bg-gray-300 rounded-full overflow-hidden'>
                        <div className="h-1 w-2/5 bg-green-500"></div>
                    </div>
                    <div className='flex items-center justify-between mt-2 mb-5 text-sm'>
                        <p className='font-medium'>40%</p>
                        <p className='font-medium'>2/5 <span className='text-gray-500 font-normal'>Task Completed</span></p>
                    </div>

                    <div className='bg-white flex p-4 rounded-lg gap-3 justify-between mb-3'>
                        <div className='grow'>
                            <p className='font-medium'>Watering</p>
                            <p className="text-sm text-gray-500">Water plants with 1 inches of water in the morning.</p>
                        </div>
                        <div className='w-5'>
                            <input type='checkbox'/>
                        </div>
                    </div>

                    <div className='bg-white flex p-4 rounded-lg gap-3 justify-between mb-3'>
                        <div className='grow'>
                            <p className='font-medium'>Fertilizing</p>
                            <p className="text-sm text-gray-500">Apply organic fertilizer at base of plants. Quantity 50g per pant.</p>
                        </div>
                        <div className='w-5'>
                            <input type='checkbox'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='bg-white/60 rounded-xl overflow-hidden p-4'>
                    <p className="text-lg font-medium mb-3">Device</p>
                    <table className='w-full mb-5'>
                        <tbody>
                            <tr>
                                <td>
                                    <p className='text-sm text-gray-500'>Sensor</p>
                                    <p className='font-medium'>4</p>
                                </td>
                                <td>
                                    <p className='text-sm text-gray-500'>Camera</p>
                                    <p className='font-medium'>1</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='bg-white p-4 rounded-lg mb-3'>
                        <div className="size-1.5 rounded-full bg-green-500 mb-2"></div>
                        <p className='mb-1 font-medium'>JLNew H10 : Soil Moisture Sensor</p>
                        <p className='text-gray-500 text-sm flex items-center gap-3'><span>#SM201</span> <span className='size-0.75 bg-gray-500 rounded-full'></span> <span>Sensor</span></p>
                    </div>
                    <div className='bg-white p-4 rounded-lg mb-3'>
                        <div className="size-1.5 rounded-full bg-green-500 mb-2"></div>
                        <p className='mb-1 font-medium'>HC T200 : Wind Sensor</p>
                        <p className='text-gray-500 text-sm flex items-center gap-3'><span>#SM201</span> <span className='size-0.75 bg-gray-500 rounded-full'></span> <span>Sensor</span></p>
                    </div>
                    <div className='bg-white p-4 rounded-lg mb-3'>
                        <div className="size-1.5 rounded-full bg-amber-500 mb-2"></div>
                        <p className='mb-1 font-medium'>ACE Temperature & Humidity Sensor</p>
                        <p className='text-gray-500 text-sm flex items-center gap-3'><span>#SM201</span> <span className='size-0.75 bg-gray-500 rounded-full'></span> <span>Sensor</span></p>
                        <div className='bg-amber-100/50 mt-3 text-sm rounded py-1 px-3 text-amber-500'>Signal issue since 08:02 PM</div>
                    </div>
                    <div className='bg-white p-4 rounded-lg mb-3'>
                        <div className="size-1.5 rounded-full bg-green-500 mb-2"></div>
                        <p className='mb-1 font-medium'>VG 550 Camera</p>
                        <p className='text-gray-500 text-sm flex items-center gap-3'><span>#SM201</span> <span className='size-0.75 bg-gray-500 rounded-full'></span> <span>Camera</span></p>
                    </div>
                    <div className='bg-white p-4 rounded-lg mb-3'>
                        <div className="size-1.5 rounded-full bg-green-500 mb-2"></div>
                        <p className='mb-1 font-medium'>PH Meter</p>
                        <p className='text-gray-500 text-sm flex items-center gap-3'><span>#SM201</span> <span className='size-0.75 bg-gray-500 rounded-full'></span> <span>Sensor</span></p>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-3">
                    <div className='rounded-xl bg-linear-to-br from-green-500 to-green-600 p-4 text-white relative'>
                        <HugeiconsIcon icon={Plant01Icon} size={18}/>
                        <p className='mt-1'>Plant Health</p>
                        <p className='my-3 text-5xl font-medium'>94% <span className='text-green-500 rounded-full bg-white px-2 py-1 text-[0.75rem]'>Good</span></p>
                        <p className="text-xs">Your plants are thriving and showing excellent health.</p>
                    </div>
                    <div className='rounded-xl bg-white/60 p-4'>
                        <HugeiconsIcon icon={FastWindIcon} size={18}/>
                        <p className='mt-1'>Wind</p>
                        <p className='my-3 text-5xl font-medium'>{cropData.wind} <span className='text-gray-500 text-sm'>m/s</span></p>
                        <p className="text-xs text-gray-500">Make sure there is still adequate aitrflow</p>
                    </div>
                    <div className='rounded-xl bg-white/60 p-4'>
                        <HugeiconsIcon icon={TemperatureIcon} size={18}/>
                        <p className='mt-1'>Temperature</p>
                        <p className='my-3 text-5xl font-medium'>{cropData.temp} <span className='text-gray-500 text-sm'> <sup>o</sup>C </span></p>
                        <p className="text-xs text-gray-500">Maintain temperature between 15 <sup>o</sup>C to 20 <sup>o</sup>C</p>
                    </div>
                    <div className='rounded-xl bg-white/60 p-4'>
                        <HugeiconsIcon icon={WaterEnergyIcon} size={18}/>
                        <p className='mt-1'>pH Level</p>
                        <p className='my-3 text-5xl font-medium'>{cropData.ph}</p>
                        <p className="text-xs text-gray-500">Add acidic composite to balance pH</p>
                    </div>  
                    <div className='rounded-xl bg-white/60 p-4'>
                        <HugeiconsIcon icon={HumidityIcon} size={18}/>
                        <p className='mt-1'>Humidity</p>
                        <p className='my-3 text-5xl font-medium'>{cropData.humi} <span className='text-gray-500 text-sm'>%</span></p>
                        <p className="text-xs text-gray-500">Add acidic composite to balance pH</p>
                    </div>
                    <div className='rounded-xl bg-white/60 p-4'>
                        <HugeiconsIcon icon={SoilMoistureGlobalIcon} size={18}/>
                        <p className='mt-1'>Soil Moisture</p>
                        <p className='my-3 text-5xl font-medium'>{cropData.moist} <span className='text-gray-500 text-sm'>%</span></p>
                        <p className="text-xs text-gray-500">Add acidic composite to balance pH</p>
                    </div> 
                </div>
                <div className='rounded-xl bg-white/60 p-4 pb-30 relative'>
                    <div className="flex items-center justify-between">
                        <p className='flex gap-3 items-center font-medium text-sm'><HugeiconsIcon size={18} icon={Location01Icon}/> Allahabad, Uttar Pradesh</p>
                        <p className='text-sm'>Thu 16, April 2026 09:37 AM</p>
                    </div>
                    <p className='mb-5 text-5xl font-bold mt-10'>{cropData.temp_api}<span className='text-gray-500 font-normal'> <sup>o</sup>C </span></p>
                    <div className='absolute bottom-0 left-0 rounded-xl bg-white p-3'>
                        <p className="font-medium">Spinach Garden 08</p>
                        <p className="text-sm mt-2"><span className='text-xs text-gray-400'>Area</span> <span>200 m<sup>2</sup></span></p>
                    </div>
                    <Link to={`/user/field/friend/${id}`} className='absolute bottom-0 right-0 rounded-xl bg-white px-10 py-3 text-center flex flex-col items-center justify-center'>
                        <div className='size-10 flex items-center justify-center rounded-full bg-gray-400 text-white'>
                            <HugeiconsIcon icon={ChatBotIcon} size={35}/>
                        </div>
                        <p className="font-medium">Ask Chatbot</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Info