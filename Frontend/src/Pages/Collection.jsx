import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let filterProductCopy = filterProducts.slice();

    switch(sortType){
      case 'budget-premium':
        setFilterProducts(filterProductCopy.sort((a,b)=>(a.price - b.price)));
        break;

        case 'premium-budget':
          setFilterProducts(filterProductCopy.sort((a,b)=>(b.price-a.price)));
          break;

          default:
            applyFilter();
            break;
    }

  }

  useEffect(() => {
   applyFilter();
  }, [category, subCategory, products, search, showSearch])

  useEffect(()=>{
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options Dawg */}
      <div className='min-w-60 '>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>
        {/* Aiit Time For The Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-xs font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Men`} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Women`} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Kids`} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* Aiit time for the subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-xs font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Tops`} onChange={toggleSubCategory} />Tops
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Bottoms`} onChange={toggleSubCategory} />Bottoms
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={`Fits-For-The-Cold`} onChange={toggleSubCategory} />Fits For The Cold
            </p>
          </div>
        </div>
      </div>

      {/* Right side dawg */}
      <div className="flex-1">
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          {/* Sort Product Section  */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="budget-premium">Sort by: Budget to Premium</option>
            <option value="premium-budget">Sort by: Premium to Budget</option>
          </select>
        </div>

        {/* Display Product Section */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}></ProductItem>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection