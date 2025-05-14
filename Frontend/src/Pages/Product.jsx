import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async()=>{

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
       setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-1 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Display Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Display Product Images */}
        <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full scrollbar-none'>
            {
              productData.image.map((item,index)=>(
                <img  onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* Display Product Information */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon}  alt="" />
              <img className='w-3.5' src={assets.star_icon}  alt="" />
              <img className='w-3.5' src={assets.star_icon}  alt="" />
              <img className='w-3.5' src={assets.star_dull_icon}  alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index)=>(
                  <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 cursor-pointer rounded-md border-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer rounded-sm'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
        </div>
      </div>

      {/* Description and Review */}
      <div className='mt-20'>
          <div className='flex'>
                <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
                <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews(122)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-gray-500">
            <p>Discover fashion made to fit your lifestyle. From timeless essentials to bold statement pieces, our collection is crafted with premium materials and a modern edge.</p>
            <p>Whether you are dressing for comfort or making an entrance, every piece is designed to elevate your wardrobe and express your individuality</p>
          </div>
      </div>

      {/* Display Related Products */}

      <RelatedProducts category = {productData.category} subCategory = {productData.subCategory}></RelatedProducts>

    </div>
  ):<div className='opacity-0'></div>
}

export default Product