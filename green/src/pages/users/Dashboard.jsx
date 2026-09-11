import { KeyframeAddIcon, ListSettingIcon, Mic01Icon, Plant02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

const Dashboard = () => {

    const [chatting, setChatting] = useState([])
    
    const bottomElmRef = useRef()
    const [isThinking, setIsThinking] = useState(false)

    const loadTasks = async () => {
        setIsThinking(true)
        
        const famrData = new FormData()
        famrData.append("farmer_id", localStorage.getItem("farmer_id"))

        try {
            const response = await axios.post("http://127.0.0.1:5000/Task_Manager", famrData)

            setChatting(prev => {
                return [...prev, {
                    bot : response.data
                }]
            })
        } catch (error) {
            toast.error("Something went wrong.")
        }
        setIsThinking(false)
    }

    const recommedCrops = async () => {
        setIsThinking(true)
        
        const famrData = new FormData()
        famrData.append("farmer_id", localStorage.getItem("farmer_id"))

        try {
            const response = await axios.post("http://127.0.0.1:5000/crop_recommendation", famrData)

            setChatting(prev => {
                return [...prev, {
                    bot : response.data
                }]
            })
        } catch (error) {
            toast.error("Something went wrong.")
        }
        setIsThinking(false)
    }

    useEffect(() => {
        bottomElmRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatting]);

    return (
        <div className="flex justify-center w-full">
            {
                (chatting.length === 0 && !isThinking) ? 
                    <div className="container h-[80vh] flex justify-center">
                        <div className="h-full w-3/4 p-5 relative">
                            <p className="text-2xl xl:text-4xl text-[#346a36] font-medium">Hello {localStorage.getItem('farmer_name')}!</p>
                            <p className="text-sm xl:text-lg text-[#346a3688] font-medium">How can I help you today?</p>

                            <div onClick={loadTasks} className="cursor-points py-4 pt-7 xl:pt-20 grid grid-cols-3 gap-3">
                                <div className='lg:h-40 xl:h-60 rounded-xl bg-linear-to-tr from-white/30 to-[#dfffe067] border border-gray-300 p-4 flex flex-col justify-between'>
                                    <div className="lg:size-13 xl:size-15 rounded-xl bg-white/50 flex items-center justify-center shadow">
                                        <HugeiconsIcon className='text-primary' icon={ListSettingIcon} size={30}/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[1rem] xl:text-lg text-primary">Task Manager</p>
                                        <p className='text-xs xl:text-sm text-gray-500'>Get list of task that you should  din order to gain maxmimum output.</p>
                                    </div>
                                </div>

                                <div onClick={recommedCrops} className='lg:h-40 xl:h-60 rounded-xl bg-linear-to-tr from-white/30 to-[#dfffe067] border border-gray-300 p-4 flex flex-col justify-between'>
                                    <div className="lg:size-13 xl:size-15 rounded-xl bg-white/50 flex items-center justify-center shadow">
                                        <HugeiconsIcon className='text-primary' icon={Plant02Icon} size={30}/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[1rem] xl:text-lg text-primary">Recommendation</p>
                                        <p className='text-xs xl:text-sm text-gray-500'>AI based recommendation for crop based on your soil stats.</p>
                                    </div>
                                </div>

                                <Link to={'/user/field/add'} className='lg:h-40 xl:h-60 rounded-xl bg-linear-to-tr from-white/30 to-[#dfffe067] border border-gray-300 p-4 flex flex-col justify-between'>
                                    <div className="lg:size-12 xl:size-15 rounded-xl bg-white/50 flex items-center justify-center shadow">
                                        <HugeiconsIcon className='text-primary' icon={KeyframeAddIcon} size={30}/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[1rem] xl:text-lg text-primary">Add Field</p>
                                        <p className='text-xs xl:text-sm text-gray-500'>Add new field to your account to manager.</p>
                                    </div>
                                </Link>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full flex items-center justify-center">
                                <input type="text" className='w-full bg-[#f2f2f2] rounded-lg py-3 px-5' placeholder='Ask about you todays tasks...' />
                                <div className="relative">
                                    <button className="absolute right-1 -top-4.75 px-5 py-1.75 bg-[#97cd62] text-white rounded-lg flex items-center gap-2"><HugeiconsIcon icon={Mic01Icon} size={18}/> Ask</button>
                                </div>
                            </div>
                        </div>
                    </div>
                :

                <div className="container h-[85vh] flex justify-center relative">
                    <div className="h-full w-3/4 p-5 overflow-hidden overflow-y-scroll pb-10 overflowScroller">
                        <p className="text-2xl text-[#346a36] font-medium">Hello {localStorage.getItem('farmer_name')}!</p>
                        <p className="text-sm text-[#346a3688] mb-4">
                            {isThinking ? 'Thinking...' : 'Reload to for new chat'}
                        </p>
    
                        <div>
                            {chatting.map(chat => {
                                const key = Object.keys(chat)[0]
    
                                return <div className={`flex items-center ${key == "user" ? 'justify-end' : 'justify-start'}`}>
                                
                                <div className='rounded rounded-tr-0 p-3 max-w-100 bg-gray-100 mb-3'>{chat[key]}</div>
                            </div>
                            })}
    
                            <div ref={bottomElmRef}></div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard