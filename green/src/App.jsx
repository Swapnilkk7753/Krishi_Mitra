import React from 'react'
import Dashboard from './pages/users/Dashboard'
import Login from './pages/Login'
import { LogoSm, LogoText } from './components/Logo'
import { Link, Outlet } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowRight02Icon, Location09Icon, Plant01Icon } from '@hugeicons/core-free-icons'
import { Toaster } from 'react-hot-toast';


const App = () => {
    return (
        <div className="bg-[#f2f2f2] min-h-screen w-full">
            <Outlet />
            <Toaster />
        </div>
    )
}

export default App