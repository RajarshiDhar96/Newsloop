import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


function LandingPage() {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegisterForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const login = async () => {
        setLoading(true)
        try {
            const payload = {
                email, password
            }
            const result = await axios.post('/api/users/login', payload)
            toast('Login Successfull')

            localStorage.setItem('newsloop-user', JSON.stringify(result.data))
            navigate('/home')
            setLoading(false)
        }
        catch (error) {
            toast('Login failed, invalid username or password')
            setLoading(false)

        }
    }
    const register = async () => {
        setLoading(true)
        try {
            const payload = {
                email, password, name
            }
            await axios.post('/api/users/register', payload)
            toast('Registration Successfull, please login')
            setName('')
            setEmail('')
            setPassword('')
            setLoading(false)
            setShowRegisterForm(false)
            setShowLoginForm(true)

        }
        catch (error) {
            toast('Something went wrong')
            setLoading(false)

        }
    }

    useEffect(()=>{
        if(localStorage.getItem('newsloop-user'))
        navigate('/home')
    },[])
    return (
        <div className='h-screen flex items-center bg-black sm:flex-col'>
            {loading && (<Spinner />)}
            <div className={`w-1/2 px-10 space-y-5 sm:w-screen ${(showLoginForm || showRegisterForm)&& 'sm:hidden'}`}>
                <h1><b className='text-[#0555f5] text-8xl sm:text-6xl'>News</b><b className='text-[red] text-8xl  sm:text-6xl'>Loop</b></h1>
                <p className='text-lg my-10 text-white'>
                    NewsLoop is a news application that selects latest and best news from multiple
                    national and international sources and summarises them to present in a short
                    and crisp 60 words or less format.
                </p>
                <div className='space-x-5 my-10'>
                    <button className='bg-gray-300 px-10 py-3 rounded' onClick={() => {
                        setShowRegisterForm(false)
                        setShowLoginForm(true)

                    }}>Login</button>
                    <button className='bg-[#6593f0] px-10 py-3 rounded' onClick={() => {
                        setShowLoginForm(false)
                        setShowRegisterForm(true)
                    }}>Register</button>
                </div>

            </div>

            <div className='w-1/2 sm:w-screen'>
                {(!showLoginForm && !showRegisterForm) && (<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_mp6wwkvx.json"
                    background="transparent"
                    speed="1"

                    loop autoplay>

                </lottie-player>)}

                {showLoginForm && (
                    <div className='ml-40 sm:ml-0'>
                        <div className="text-white flex flex-col bg-[#8a0101] h-screen justify-center items-center px-20 space-y-5">
                            <h1 className='text-6xl text-gray-300 text-left w-full font-semibold my-5'>LOGIN</h1>


                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className='border-2 h-10 w-full border-gray-500 px-5 bg-transparent'
                                placeholder='email'
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className='border-2 h-10 w-full border-gray-500 px-5 bg-transparent'
                                placeholder='password'
                            />
                            <div className='flex justify-end w-full'>
                                <button className='bg-[black] px-10 py-3 rounded' onClick={login}
                                >LOGIN</button>

                            </div>

                        </div>

                    </div>

                )}

                {showRegisterForm && (
                    <div className='ml-40 sm:ml-0'>
                        <div className="text-white flex flex-col bg-[#8a0101] h-screen justify-center items-center px-20 space-y-5">
                            <h1 className='text-6xl text-gray-300 text-left w-full font-semibold my-5'>REGISTER</h1>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className='border-2 h-10 w-full border-gray-500 px-5 bg-transparent'
                                placeholder='name'
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className='border-2 h-10 w-full border-gray-500 px-5 bg-transparent'
                                placeholder='email'
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className='border-2 h-10 w-full border-gray-500 px-5 bg-transparent'
                                placeholder='password'
                            />
                            <div className='flex justify-end w-full'>
                                <button className='bg-[black] px-10 py-3 rounded' onClick={register} >Register</button>

                            </div>

                        </div>

                    </div>
                )}




            </div>

            {(showLoginForm || showRegisterForm) &&
                <AiOutlineClose
                    className='cursor-pointer  absolute top-5 right-5'
                    size={30}
                    color='gray'
                    onClick={() => {
                        setShowLoginForm(false)
                        setShowRegisterForm(false)
                    }}
                />}

        </div>
    )
}

export default LandingPage;