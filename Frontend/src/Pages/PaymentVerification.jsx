import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const PaymentVerification = () => {
    const [params] = useSearchParams();
    const transactionId = params.get("transaction_id");
    const orderId = params.get("orderId");
    const navigate = useNavigate();
    const { backendUrl, setCartItems, token } = useContext(ShopContext)

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!token) {
                    return null
                }
                const res = await axios.post(`${backendUrl}/api/order/payment-redirect`, {
                     transaction_id: transactionId,
                        orderId,
                        status: params.get("status"),
                }, {
                    headers: { token }
                });
                if (res.data.success) {
                    window.location.href = '/payment-success';
                    setCartItems({})
                } else {
                    window.location.href = '/payment-failed'
                }
            } catch (error) {
                console.log("Verification error", error)
                navigate("/payment-failed");
            }
        };
        if (transactionId && orderId) verifyPayment()
        else window.location.href = '/payment-cancelled';
    }, [transactionId, orderId, navigate, token])

    return (
        <div>Verifying your payment, please wait...</div>
    )
}

export default PaymentVerification