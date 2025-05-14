import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Add = ({token}) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const[price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState("Tops");
    const [bestSeller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestSeller", JSON.stringify(bestSeller));
            formData.append("sizes", JSON.stringify(sizes));
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const token = localStorage.getItem('token');
            const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}})

            if(response.data.success === true){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setPrice('')
                setSizes([])
                setBestSeller(false)
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
            }else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }

  return (
   <>
   {loading && <Loader></Loader>}
   <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3 ml-5 sm:ml-10'>
        <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>
                <label className='cursor-pointer' htmlFor="image1">
                    <img className='w-20' src={image1 ? URL.createObjectURL(image1) : assets.upload_area } alt="" />
                    <input type="file"  id="image1" hidden onChange={(e)=>setImage1(e.target.files[0])} required />
                </label>
                <label className='cursor-pointer' htmlFor="image2">
                    <img className='w-20' src={image2 ? URL.createObjectURL(image2) : assets.upload_area  } alt="" />
                    <input type="file"  id="image2" hidden onChange={(e)=>setImage2(e.target.files[0])} />
                </label>
                <label className='cursor-pointer' htmlFor="image3">
                    <img className='w-20' src={image3 ? URL.createObjectURL(image3) : assets.upload_area } alt="" />
                    <input type="file"  id="image3" hidden onChange={(e)=>setImage3(e.target.files[0])} />
                </label>
                <label className='cursor-pointer' htmlFor="image4">
                    <img className='w-20' src={image4 ?  URL.createObjectURL(image4) : assets.upload_area} alt="" />
                    <input type="file"  id="image4" hidden onChange={(e)=>setImage4(e.target.files[0])} />
                </label>
            </div>
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter product name' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='w-full'>
            <p className='mb-2'>Product description</p>
            <textarea type="text" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder='Describe the product' required className='w-full max-w-[500px] px-3 py-2' />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Product category</p>
                <select className='w-full px-3 py-2' onChange={(e)=>setCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Sub category</p>
                <select className='w-full px-3 py-2' onChange={(e)=>setSubCategory(e.target.value)}>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Fits-For-The-Cold">Fits For The Cold</option>
                </select>
            </div>

            <div>
                <p className='mb-2'>Product price</p>
                <input className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='1000' onChange={(e)=>setPrice(e.target.value)} value={price} />
            </div>
        </div>

    <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
            <div onClick={()=>setSizes((prev) => prev.includes("S") ? prev.filter((item)=> item !== "S") : [...prev, "S"])}>
                <p className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-300"} px-3 py-1 cursor-pointer`}>S</p>
            </div>

            <div onClick={()=>setSizes((prev) => prev.includes("M") ? prev.filter((item)=> item !== "M") : [...prev, "M"])}>
                <p className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-300"} px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div onClick={()=>setSizes((prev) => prev.includes("L") ? prev.filter((item)=> item !== "L") : [...prev, "L"])}>
                <p className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-300"} px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div onClick={()=>setSizes((prev) => prev.includes("XL") ? prev.filter((item)=> item !== "XL") : [...prev, "XL"])}>
                <p className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-300"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div onClick={()=>setSizes((prev) => prev.includes("XXL") ? prev.filter((item)=> item !== "XXL") : [...prev, "XXL"])}>
                <p className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-300"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
        </div>
    </div>

    <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox"  id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestSeller">Add to bestseller</label>
    </div>

    <button type="submit" className='w-28 py-3 mt-4 bg-black text-white cursor-pointer rounded-md'>ADD</button>

    </form>
   </>
  )
}

export default Add