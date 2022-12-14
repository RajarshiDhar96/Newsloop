import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function SideBar({showSideBar}) {
    const location = useLocation()
    const navigate=useNavigate();
    const menuItems = [
        {
            title: 'Home',
            path: '/home'
        },

        {
            title: 'Posted',
            path: '/posted'
        },
        {
            title: 'AddNews',
            path: '/add'
        },
        // {
        //     title: 'Profile',
        //     path: '/profile'
        // },
        {
            title: 'Logout',
            path: '/logout'
        }
    ]

    const logout=()=>{
        localStorage.removeItem('newsloop-user')
        navigate('/')
    }

    return (
        <div className={` min-h-screen max-h-full  transition-all duration-300 bg-primary  overflow-hidden h-screen flex flex-col ${showSideBar ?'w-64':'w-0'}`}>
            <div className='mr-5'>
                {/* <h1 className='text-2xl font-bold mt-6 ml-5 text-sky-100 bg-[#1e3a8a]'>NewsLoop</h1> */}
                <h1 className='text-4xl font-bold mt-6 ml-5 bg-[white] rounded'><span className='text-[#0555f5]' >News</span><span className='text-[red]' >Loop</span></h1>
                

            </div>

            <div className='flex flex-col mt-20  '>
                {menuItems.map((item) => {
                    return (
                    item.title!=='Logout' ? <Link to={`${item.path}`} 
                    className={` text-xl pl-10 py-5 text-gray-50 hover:bg-gray-50 hover:text-[black] sm:text-sm 
                    ${location.pathname.includes(item.path)&&'bg-[#171717] text-yellow-200 font-bold '}`}>
                        {item.title}</Link> : (<span onClick={logout} className='text-xl pl-10 py-5 text-gray-50 hover:bg-gray-50 hover:text-gray-700 sm:text-sm cursor-pointer'>Logout</span>)
                        )
                })}


            </div>


        </div>
    )
}

export default SideBar;