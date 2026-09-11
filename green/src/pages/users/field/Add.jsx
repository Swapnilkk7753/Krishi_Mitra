import React, { useState } from 'react'
import { Input } from '../../../components/HTML'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Add = () => {

    const [formData, setFormData] = useState({
        farmer_id : localStorage.getItem('farmer_id'),
        slug: '',
        area: '',
        current_plantation: '',
        plantation_date: '',
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        // const { name, value, files } = e.target;
        // setFormData(prev => ({
        //     ...prev,
        //     [name]: files ? files[0] : value
        // }));

        setFormData(prev => {
            return {...prev, [e.target.name] : e.target.value }
        })
    };

    const handleSubmit = async () => {
        // Simple Validation for required fields
        if (!formData.slug || !formData.area) {
            toast.error("Slug and Area are required!");
            return;
        }

        // Use FormData for handling text + potential images
        const data = new FormData();
        data.append('farmer_id', formData.farmer_id);
        data.append('slug', formData.slug);
        data.append('area', formData.area);
        if (formData.current_plantation) data.append('current_plantation', formData.current_plantation);
        if (formData.plantation_date) data.append('plantation_date', formData.plantation_date);
        if (formData.image) data.append('image', formData.image);

        try {
            const response = await axios.post('http://127.0.0.1:5000/add-field', data, {
                withCredentials: true
            });
            console.log("Success:", response.data);
            toast.success("Feild added successfully")
            navigate("/user/field")
        } catch (err) {
            console.error("Error saving field:", err);
            toast.error("Something went wrong!")
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <div className="container">
                <p className='tetx-3xl font-medium'>Add New Feild</p>
                <p className="text-xs text-gray-500">Add new field to manage your farm automatically. Monitor status and get best recommendations.</p>
                <div className="grid grid-cols-4 gap-5 pt-10">
                    <div className='text-right'>
                        <p className="font-mdium">Slug</p>
                        <p className='text-xs text-gray-500'>Name of your field.</p>
                    </div>
                    <div className='col-span-2'>
                        <Input name='slug' type="text" onChange={handleChange} value={formData.slug} />
                    </div>
                    <div></div>

                    <div className='text-right'>
                        <p className="font-mdium">Area (m<sup>2</sup>)</p>
                        <p className='text-xs text-gray-500'>Size of your field to accuratly recommend the fertiizers amount.</p>
                    </div>
                    <div className='col-span-2'>
                        <Input name='area' type="number" onChange={handleChange} value={formData.area} />
                    </div>
                    <div></div>

                    <div className='text-right'>
                        <p className="font-mdium">Current Plantation</p>
                        <p className='text-xs text-gray-500'>If you already have planted crops no worries we will recommend you to get best output possible.</p>
                    </div>
                    <div className='col-span-2'>
                        <Input name='current_plantation' onChange={handleChange} value={formData.current_plantation}/>
                    </div>
                    <div></div>

                    <div className='text-right'>
                        <p className="font-mdium">Plantation Date</p>
                        <p className='text-xs text-gray-500'>Ifv panted then to predict the requirements and harvest.</p>
                    </div>
                    <div className='col-span-2'>
                        <Input name='plantation_date' type="date" onChange={handleChange} value={formData.plantation_date}/>
                    </div>
                    <div></div>

                    {/* <div className='text-right'>
                        <p className="font-medium">Field Photo</p>
                        <p className='text-xs text-gray-500'>For AI to detect plant health and monitor growth.</p>
                    </div>
                    <div className='col-span-2'>
                        <Input type="file" name="image" onChange={handleChange} className="text-sm" />
                    </div>
                    <div></div> */}

                    <div className="col-span-3 flex items-center justify-end">
                        <button onClick={handleSubmit} className="bg-secondary rounded-lg text-white px-5 py-2 flex items-center gap-3 hover:gap-5 w-31 cursor-pointer transition-all duration-150">Submit <HugeiconsIcon icon={ArrowRight02Icon} size={18}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add