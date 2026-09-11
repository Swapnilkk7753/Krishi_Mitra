import React, { useEffect, useRef, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon, PlusSignIcon } from '@hugeicons/core-free-icons'
import { Link } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const Main = () => {

    const [fields, setFeilds] = useState([])
    const isFisrtRender = useRef(false)



    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/Fields', {
                    params: {
                    farmer_id: localStorage.getItem("farmer_id")
                    }
                });
                setFeilds(response.data)
            } catch (err) {
                console.error("Error:", err);
                toast.error("Something went wrong!")
            }
        })()
    })

    return (
        <div className="p-5 flex justify-center w-full">
            <div className="container">
                <div className='grid grid-cols-4 gap-5'>
                    <Link to={'/user/field/add'}>
                        <div className="h-60 shadow flex flex-col rounded-xl bg-white/30 relative overflow-hidden">
                            <div className='h-40 overflow-hidden flex items-center justify-center'>
                                <HugeiconsIcon className='text-primary' icon={PlusSignIcon} size={55}/>
                            </div>
                            <div className='h-25 p-3 bg-white/40'>
                                <p className='font-medium text-primary'>Add Field</p>
                                <p className='text-xs text-gray-500'>Add new field to manage your farm automatically. Monitor status and get best recommendations.</p>
                            </div>
                            <div className="absolute top-2 right-2 shadow size-10 rounded-lg bg-white flex items-center justify-center">
                                <HugeiconsIcon className='text-primary' icon={PlusSignIcon} size={18}/>
                            </div>
                        </div>
                    </Link>

                    {
                        fields.map(field => (
                            <Link to={`/user/field/${field[0]}`} key={field[0]} className="h-60 shadow flex flex-col rounded-xl bg-white/30 relative overflow-hidden">
                                <div className='h-40 overflow-hidden'>
                                    <img className='w-full' src="/assets/field_image.jpeg" alt="field image" />
                                </div>
                                <div className='h-20 p-3 bg-white/40'>
                                    <p className='font-medium text-primary'>{field[3]}</p>
                                    <p className='text-xs text-gray-500'>{field[2]}</p>
                                </div>
                                <div className="absolute top-2 right-2 shadow size-10 rounded-lg bg-white flex items-center justify-center">
                                    <HugeiconsIcon className='text-primary' icon={ArrowUpRight01Icon} size={18}/>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Main