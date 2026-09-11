import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Dashboard from './pages/users/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import AdminLayout from './pages/users/AdminLayout.jsx'
import Main from './pages/users/field/Main.jsx'
import Add from './pages/users/field/Add.jsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Register from './pages/Register.jsx'
import Info from './pages/users/field/Info.jsx'
import Bot from './pages/users/field/Bot.jsx'

const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {
                index : true,
                element : <Home />,
            },
            {
                path : "login",
                element : <Login />,
            },
            {
                path : "register",
                element : <Register/>,
            },
            {
                path : "user",
                element : <AdminLayout />,
                children : [
                    {
                        path : "dashboard",
                        element : <Dashboard />
                    },
                    {
                        path : "field",
                        children : [
                            {
                                index : true,
                                element : <Main />,
                            },
                            {
                                path : "add",
                                element : <Add />
                            },
                            {
                                path : ":id",
                                element : <Info />
                            },
                            {
                                path : "friend/:id",
                                element : <Bot />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>

        
    </StrictMode>,
)
