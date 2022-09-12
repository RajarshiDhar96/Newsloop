import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Layout from '../components/Layout'
import Spinner from '../components/Spinner'

function PostedNewsItems() {
    const [loading, setLoading] = useState(false)
    const [newsItems, setNewsItems] = useState([])
    const user = JSON.parse(localStorage.getItem('newsloop-user'))
    const navigate = useNavigate();
    const getData = async () => {

        setLoading(true)
        try {


            const result = await axios.post('/api/newsitems/getnewsitemsbyuserid', { userid: user._id })

            setLoading(false)
            setNewsItems(result.data)
        }
        catch (error) {
            console.log(error);
            toast('News retreiving failed !!', 'error')
            setLoading(false)
        }


    }

    const deleteItem = async (newsid) => {
        setLoading(true)
        try {


            await axios.post('/api/newsitems/deletenewsitem', { newsid })

            getData()
        }
        catch (error) {
            console.log(error);
            toast('News retreiving failed !!', 'error')
            setLoading(false)
        }


    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Layout>
            {loading && (<Spinner />)}

            {newsItems.length > 0 && (
                <div className='p-10'>
                    <h1 className='text-2xl text-gray-600 my-5 font-semibold '>Posted News Items</h1>
                    <table className='w-full border-2 border-gray-500 p-10'>
                        <thead className='w-full'>
                            <tr className='w-full'>
                                <th className='border-2  border-gray-500 p-2'>Id</th>
                                <th className='border-2  border-gray-500 p-2'>Title</th>
                                <th className='border-2  border-gray-500 p-2'>Posted On</th>
                                <th className='border-2  border-gray-500 p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsItems.map((item) => {
                                return <tr>
                                    <td className='border-2  border-gray-500 p-2'>{item._id}</td>
                                    <td className='border-2  border-gray-500 p-2'>{item.title}</td>
                                    <td className='border-2  border-gray-500 p-2'>{item.createdAt.slice(0, 10)}</td>
                                    <td className='border-2  border-gray-500 p-2 items-center'>
                                        <div className='flex justify-end space-x-5 pr-5 mt-5 '>
                                            <button className='px-5 py-1 bg-red-700 rounded text-sm text-white' onClick={()=>deleteItem(item._id)}>Delete</button>
                                            <button className='px-5 py-1 bg-green-700 rounded text-sm text-white o' onClick={() => navigate(`/edit/${item._id}`)}>Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </Layout>
    )
}

export default PostedNewsItems;