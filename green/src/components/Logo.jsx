import React from 'react'
import { cn } from '../config/helper'

const Logo = ({className = 'size-10'}) => {
    return (
        <div className='relative'>
            <div className={cn('absolute -top-8 left-8 bg-[#97cd62] rounded-br-2xl rounded-tl-2xl', className)}></div>
            <div className={cn('relative top-0 left-0 bg-[#346a36] rounded-br-2xl rounded-tl-2xl', className)}></div>
            <div className={cn('absolute -top-5 left-5 bg-[#74c7479c] rounded-br-2xl rounded-tl-2xl', className)}></div>
        </div>
    )
}

export const LogoSm = ({className}) => {
    return <div className='flex items-end justify-start size-12 p-2 rounded-xl'>
        <div className='relative'>
            <div className={cn('absolute -top-4 left-4 bg-[#97cd62] rounded-br-lg rounded-tl-lg', className)}></div>
            <div className={cn('relative top-0 left-0 bg-[#346a36] rounded-br-lg rounded-tl-lg', className)}></div>
            <div className={cn('absolute -top-2.5 left-2.5 bg-[#74c7479c] rounded-br-lg rounded-tl-lg', className)}></div>
        </div>
    </div>
}

export const LogoText = ({className}) => {
    return <p className={cn('text-3xl', className)}><span className='font-extrabold text-[#274721]'>KRISHI</span><span className='text-[#588349] font-semibold'>MITRA</span></p>
}

export default Logo