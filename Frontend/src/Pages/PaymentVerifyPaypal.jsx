import React from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import {ShopContext} from '../context/ShopContext'
import { useEffect } from 'react'

const PaymentVerifyPaypal = () => {
    const [params] = useSearchParams();
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
    const orderId = params.get("orderId");
    const navigate = useNavigate();
    const { backendUrl, setCartItems, token } = useContext(ShopContext);

    useEffect(()=>{
        const verifyPayment = async ()=>{
            try {
                
                const res = await axios.post(`${backendUrl}/api/order/paypal-verify`, {
                    paymentId,
                    payerId,
                    orderId,
                }, {
                    headers:{
                        token
                    }
                });
                if (res.data.success) {
                    setCartItems({});
                    window.location.href = '/payment-success';
                }else{
                    window.location.href = '/payment-failed';
                }

            } catch (error) {
                console.log("Payment verification error:", error)
                navigate('/payment-failed')
            }
        };
        if (paymentId && payerId && orderId) {
            verifyPayment();
        }else{
            navigate('/payment-cancelled');
        }
    }, [paymentId, payerId, orderId, token, navigate, backendUrl, setCartItems])



  return (
    <div>Verifying paypal payment, please wait...</div>
  )
}

export default PaymentVerifyPaypal