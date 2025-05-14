import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });
  // const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }


      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        //API call for COD
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
          if (response.data.success === true) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        //API call for flutterwave
        case "flutterwave":
          try {
            const flutterRes = await axios.post(`${backendUrl}/api/order/flutterwave`, orderData, {
              headers: {
                "Content-Type": "application/json",
                token
              }
            });

            if (flutterRes.data.success === true) {
              const { authorization_url } = flutterRes.data;
              window.location.replace(authorization_url);
            } else {
              toast.error(flutterRes.data.message)
            }


          } catch (error) {
            console.log("Flutterwave payment init error:", error);
            toast.error("Something went wrong while initializing payment. Please try again");
          }
          break;

          //API call for paypal
          case "paypal":
          try {
            const nairaAmount = orderData.amount;
            const exchangeRate = 1600;
            const usdAmount = (nairaAmount / exchangeRate).toFixed(2);
            const paypalRes = await axios.post(`${backendUrl}/api/order/paypal`, {orderData, amount: usdAmount, address: orderData.address,}, {
              headers:{
                "Content-Type" : "application/json",
                token,
              },
            })

            if (paypalRes.data.success === true) {
              const { approvalUrl } = paypalRes.data;
              window.location.replace(approvalUrl);
            }else{
              toast.error(paypalRes.data.message || "Failed to initialize Paypal payment");
            }

          } catch (error) {
            console.log("Paypal payment init error:", error);
            toast.error("Something went wrong while initializing Paypal payment. Please try again")
          }


          break;

        default:
          break;
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80-vh] border-t'>
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

          <div className="text-xl sm:text-2xl my-3">
            <Title text1={'DELIVERY'} text2={'INFORMATION'}></Title>
          </div>
          <div className="flex gap-3">
            <input required onChange={handleChange} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required onChange={handleChange} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          </div>
          <input required onChange={handleChange} name='email' value={formData.email} type="email" placeholder='Enter email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={handleChange} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <div className="flex gap-3">
            <input required onChange={handleChange} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required onChange={handleChange} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          </div>
          <div className="flex gap-3">
            <input required onChange={handleChange} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required onChange={handleChange} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          </div>
          <input required onChange={handleChange} name='phone' value={formData.phone} type="tel" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        {/* Right Side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal></CartTotal>
          </div>

          <div className="mt-12">
            <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
            {/* Payment Methods */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('flutterwave')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'flutterwave' ? 'bg-green-500' : ''}`}></p>
                <img src={assets.flutterwave_logo} className='h-8 mx-4' alt="" />
              </div>
              <div onClick={() => setMethod('paypal')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-500' : ''}`}></p>
                <img src={assets.paypal_logo} className='h-6 mx-4' alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-md cursor-pointer'>PLACE ORDER</button>
            </div>
          </div>

        </div>
      </form>
    </>
  )
}

export default PlaceOrder