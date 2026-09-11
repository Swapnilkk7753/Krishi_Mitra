import React from 'react'
import { navigation } from '../config/navigation'
import { Link, useLocation, useNavigation } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { Settings01Icon, ShieldUserIcon } from '@hugeicons/core-free-icons'
import Logo, { LogoSm } from './Logo'

const SideBar = () => {
     
    const location = useLocation()

    return (
        <aside className='w-full h-full flex flex-col justify-between items-center'>
            <div className='w-full bg-white/40 h-18 flex items-center justify-center'>
                <LogoSm className='size-5'/>
            </div>
            <ul>
                {
                    navigation.map((nav, idx) => {
                        let isActive = location.pathname.startsWith(nav.url)
                        let size = isActive ? 21 : 26
                        return <li key={idx} title={nav.name}>
                            <Link to={nav.url} className={` ${isActive && 'border border-gray-200 bg-white/60'} size-10 flex items-center justify-center mb-5 hover:bg-white/80 transition-all duration-200 rounded-lg`}>
                                <HugeiconsIcon icon={nav.icon} size={size} className={`${isActive ? 'text-gray-700' : 'text-gray-500'}`}/>
                            </Link>
                        </li>
                    })
                }
            </ul>
            <ul>
                <NavItem name={'Settings'} url={'/users/settings'} icon={Settings01Icon}/>
                <NavItem name={'Profile'} url={'/users/profile'} icon={ShieldUserIcon}/>
            </ul>
        </aside>
    )
}

const NavItem = ({name, url, icon}) => {
    const location = useLocation()
    let isActive = location.pathname.startsWith(url)
    let size = isActive ? 21 : 26

    return <li title={name}>
        <Link to={url} className={` ${isActive && 'border border-gray-200 bg-white/60'} size-10 flex items-center justify-center mb-5 hover:bg-white/80 transition-all duration-200 rounded-lg`}>
            <HugeiconsIcon icon={icon} size={size} className={`${isActive ? 'text-gray-700' : 'text-gray-500'}`}/>
        </Link>
    </li>
}

export default SideBar