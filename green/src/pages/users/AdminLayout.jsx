import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../../components/SideBar'
import { LogoText } from '../../components/Logo'

const AdminLayout = () => {
    return (
        <div className='flex relative bg-[#dcdcdc]'>
            {/* <div className='min-h-screen w-18 shadow-[inset_-3px_2px_4px_2px_rgba(255,255,255,0.3)] border border-gray-200 '> */}
            <div className='min-h-screen w-18 border-r border-gray-400/50 '>
                <SideBar />
            </div>
            <div className="w-full flex justify-center">
                <div className="grow">
                    <div className='mb-5 h-18 px-3 py-2 bg-white/40'>
                        <LogoText />
                        <p className="text-xs text-gray-500">One stop solutrion for all agricultulral IOT automation.</p>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout