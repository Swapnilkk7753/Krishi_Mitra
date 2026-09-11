import { ChatBotIcon, DropletIcon, FastWindIcon, HumidityIcon, Plant01Icon, TemperatureIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "../config/helper"
import { Toggle } from "./html"

export const Temperature = ({degree = 24}) => {
    return <div className='bg-[#e9e9e9] rounded-full p-4 flex items-center justify-between text-gray-800'>
        <div className="flex gap-3 items-center">
            <HugeiconsIcon icon={TemperatureIcon} size={26}/>
            <p className="font-medium">Temperature</p>
        </div>
        <p className="text-xl">{degree}<sup>o</sup> C</p>
    </div>
}

export const Wind = ({speed = 24}) => {
    return <div className='bg-[#e9e9e9] rounded-full p-4 flex items-center justify-between text-gray-800'>
        <div className="flex gap-3 items-center">
            <HugeiconsIcon icon={FastWindIcon} size={26}/>
            <p className="font-medium">Wind</p>
        </div>
        <p className="text-xl">{speed} m/s</p>
    </div>
}

export const Humidity = ({scale = 24}) => {
    return <div className='bg-[#e9e9e9] rounded-full p-4 flex items-center justify-between text-gray-800'>
        <div className="flex gap-3 items-center">
            <HugeiconsIcon icon={HumidityIcon} size={26}/>
            <p className="font-medium">Moisture</p>
        </div>
        <p className="text-xl">{scale} %</p>
    </div>
}

export const PlantHealth = ({health = 95}) => {
    return <div className='mt-3 shadow rounded-2xl border border-gray-200 p-4 bg-white/40'>
        <div className="flex items-center gap-3">
            <div className="size-10 bg-gray-200 rounded-full flex items-center justify-center">
                <HugeiconsIcon icon={Plant01Icon} size={25} className="text-green-500"/>
            </div>
            <p className="text-2xl font-medium">Plant Health</p>
        </div>
        <div className="flex items-end gap-3 mt-5">
            <p className="text-5xl font-medium">{health}%</p>
            <p>Excellent</p>
        </div>
    </div>
}

export const ActiveCropZone = ({zones = 9}) => {
    return <div className='mt-3 shadow rounded-2xl border border-gray-200 p-4 bg-white/40'>
        <div className="flex items-center gap-3">
            <div className="size-10 bg-gray-200 rounded-full flex items-center justify-center">
                <HugeiconsIcon icon={Plant01Icon} size={25} className="text-green-500"/>
            </div>
            <p className="text-2xl font-medium">Active Plant Zones</p>
        </div>
        <div className="flex items-end gap-3 mt-5">
            <p className="text-5xl font-medium">{zones}</p>
            <p>Zones</p>
        </div>
    </div>
}

export const SoilNutrientsStatus = ({status = 'Optimal', className}) => {
    return <CardWraper className={className}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-medium">Soil Nutrients Satus</p>
                <p className="text-gray-300">Balanced nutrients composition</p>
            </div>
            <div>
                <p className="text-xl font-medium text-green-500">{status}</p>
            </div>
        </div>
    </CardWraper>
}

export const AutoWatering = ({className}) => {
    return <CardWraper className={className}>
        <HugeiconsIcon icon={DropletIcon} size={25}/>
        <p className="text-xl mt-3 font-medium">Auto Watering</p>
        <p className="mt-1 mb-3 text-gray-400 text-sm">Water every 3 hours</p>
        <div className="flex gap-3">
            <Toggle /> On
        </div>
    </CardWraper>
}

export const PHBalancer = ({ph = 6.4, className}) => {
    return <CardWraper className={className}>
        <HugeiconsIcon icon={DropletIcon} size={25}/>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xl mt-3 font-medium">pH Balancer</p>
                    <p className="mt-1 mb-3 text-gray-400 text-sm">Status : Stable</p>
                </div>
                <p className="font-medium text-2xl">{ph}</p>
            </div>
        <div className="flex gap-3">
            <Toggle /> Auto
        </div>
    </CardWraper>
}

export const FertilizationApplicationLevel = ({className}) => {
    return <CardWraper className={className}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xl font-medium">Fretilization Application Level</p>
                <p className="text-sm text-gray-400 font-medium mb-3">Current dosage intensity</p>
            </div>
            <p className="font-medium">Moderate - High</p>
        </div>
        <div className="bg-linear-to-r from-red-500 via-amber-300 to-green-600">
            <div class="h-20 w-full bg-[repeating-linear-gradient(to_right,transparent,transparent_10px,white_10px,white_15px)]"></div>
        </div>

    </CardWraper>
}

export const GrowthAnalytics = ({className}) => {
    return <CardWraper className={`${className} bg-white`}>
        <p className="text-xl font-medium">Fretilization Application Level</p>
        <p className="text-sm text-gray-400 font-medium mb-3">Strong nutrient balance</p>
        <div>
            <div className="h-50 flex items-start justify-center overflow-hidden">
                <div className="size-100 flex items-center justify-center bg-linear-to-r from-green-100 to-green-600 rounded-full">
                    <div className="size-95 rounded-full bg-white flex items-center justify-center">
                        
                        <div className="rounded-full relative flex size-94 items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 
                                bg-[repeating-conic-gradient(from_270deg,green_0deg_1deg,transparent_1deg_2deg)]
                                flex items-center justify-center opacity-50">
                                    <div className="size-90 bg-white rounded-full flex flex-col items-center justify-start">
                                        <p className="text-[5rem] mt-9">87%</p>
                                        <p className="font-medium text-gray-400">Growth Level</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="flex items-center justify-between mt-8">
                <p className="text-2xl font-medium">92 <sup className="text-gray-400 font-normal text-sm">Max</sup></p>
                <p className="text-2xl font-medium">72 <sup className="text-gray-400 font-normal text-sm">Min</sup></p>
                <p className="text-2xl font-medium">64 <sup className="text-gray-400 font-normal text-sm">Avg</sup></p>
            </div>
        </div>
    </CardWraper>
}

export const AIAssistant = ({className}) => {
    return <CardWraper className={`${className} bg-linear-to-tr from-red-400 via-amber-400 to-blue-300`}>
        <h2 className="text-lg text-gray-800 font-semibold">AI Assistant</h2>
        <div className='flex items-center justify-end mb-3'>
            <p className='px-3 py-1 bg-white border border-gray-200 rounded-lg rounded-tr-none'>Hey, give me recommendations for area 1</p>
        </div>
        <div className='flex items-center justify-start mb-3'>
            <div className='p-3 bg-white border border-gray-200 rounded-lg rounded-tr-none'>
                <p className='mb-3'>Sure, here are your recommendations for area 1 [rice fueld] : </p>
                <ul className='text-sm'>
                    <li>Moniter soiul moisture for next 48 hours</li>
                    <li>Maintain current soil fertilization level</li>
                    <li>Prepare for mid season pest inspection</li>
                </ul>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className='size-20 shadow-2xl flex items-center justify-center text-white rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%'>
                <HugeiconsIcon size={45} icon={ChatBotIcon}/>
            </div>
        </div>
    </CardWraper>
}

export const CardWraper = ({bg = 'bg-white/40', children, className}) => {
    return <div className={cn(`mt-3 shadow rounded-2xl border border-gray-200 p-4`, bg, className)}>
        {children}
    </div>
}