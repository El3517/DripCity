import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loader from '../components/Loader'

const List = ({ token }) => {

    const [list, setList] = useState([]);
     const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            if (response.data.success === true) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    const deleteProduct = async (id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/product/delete`, { id }, { headers: { token } })
            if (response.data.success === true) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
        {loading && <Loader></Loader>}
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 ml-4">
           <p className='font-semibold'>All Products</p>
           <p className='font-semibold'>{list.length} Items</p>
           </div>
            <div className='flex flex-col gap-2'>
                {/* List Table Title */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm ml-4'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>


                {/* Product List */}
                {
                    list.length === 0 ? <div className='justify-center'>
                        <p className='text-center text-black text-2xl mt-10'>Nothing to see here...yet</p>
                    </div> : list.map((item, index) => (
                        <div key={index} className='grid grid-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ml-4 border-gray-300'>
                            <img src={item.image[0]} alt="" className='w-12' />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p className='text-center md:text-center cursor-pointer text-lg border bg-red-500 text-white w-10 rounded-md' onClick={() => deleteProduct(item._id)}>X</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default List